import {
  Button,
  Modal,
  ModalProps,
  MultiSelect,
  Stack,
  TextInput,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import RichEditor from "./RichTextEditor";
import { useForm, yupResolver } from "@mantine/form";
import { QuestionFormValues } from "@/features/question/types";
import * as Yup from "yup";
import {
  useCreateQuestionMutation,
  useGetTagsQuery,
} from "@/services/serverApi";
import { tagsToMultiselectValues } from "@/utils/tagTransformer";
import { isQuestion } from "@/utils/typeGuards";

const useStyles = createStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",

    padding: "1rem 2rem",
  },
}));

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  // description: Yup.string()
  //   .required("Description is required")
  //   .min(20, "The description should be more than 20 chars."),
  tags: Yup.array()
    .max(10, "Only 10 tags are allowed")
    .min(1, "Provide at least one tag")
    .of(Yup.string()),
});

interface Props extends ModalProps {}

const NewQuestionModal: React.FC<Props> = ({ opened, onClose }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const form = useForm<QuestionFormValues>({
    validate: yupResolver(schema),
    initialValues: {
      tags: [],
      title: "",
      content: "",
    },
  });

  const { data: tags, isLoading, isError } = useGetTagsQuery();
  const [data, setData] = useState<{ label: string; value: string }[]>();

  useEffect(() => {
    setData(tagsToMultiselectValues(tags));
  }, [tags]);

  const [
    createQuestion,
    { isLoading: isCreatingQuestion, isError: isCreatingQuestionError, error },
  ] = useCreateQuestionMutation();

  const handleSubmit = (values: QuestionFormValues) => {
    console.log(values);

    createQuestion({ body: values })
      .then((response) => {
        if (isQuestion(response)) {
          console.log("question created", response.data);
          form.reset();
          onClose();
        } else {
          console.log("question creation error", response.error);
        }
      })
      .catch((err) => {
        console.log("question created err", err);
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Ask your question"
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      size="lg"
    >
      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          placeholder="What is your question"
          label="Question"
          withAsterisk
          {...form.getInputProps("title")}
        />
        <RichEditor form={form} />
        <MultiSelect
          label="Choose tag for you question"
          // @ts-ignore
          data={data}
          placeholder="Select items"
          withAsterisk
          searchable
          creatable
          maxSelectedValues={10}
          description="Max tags is set to 10"
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = {
              value: query.toUpperCase(),
              label: query.toUpperCase(),
            };
            // @ts-ignore
            setData((current) => [...current, item]);
            console.log(data);

            return item;
          }}
          {...form.getInputProps("tags")}
        />
        <Button type="submit" loading={isLoading || isCreatingQuestion}>
          Publish
        </Button>
      </form>
    </Modal>
  );
};

export default NewQuestionModal;
