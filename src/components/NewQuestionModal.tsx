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
import { useState } from "react";
import RichEditor from "./RichTextEditor";
import { useForm, yupResolver } from "@mantine/form";
import { QuestionFormValues } from "@/features/question/types";
import * as Yup from "yup";

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
  const [data, setData] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);
  const [loading, setloading] = useState(false);
  const form = useForm<QuestionFormValues>({
    validate: yupResolver(schema),
    initialValues: {
      tags: [],
      title: "",
      description: "",
    },
  });

  const handleSubmit = (values: QuestionFormValues) => {
    setloading(true);
    console.log(values);
    form.reset();
    setTimeout(() => {
      setloading(false);
      onClose();
    }, 1000);
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
          data={data}
          placeholder="Select items"
          withAsterisk
          searchable
          creatable
          maxSelectedValues={10}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setData((current) => [...current, item]);
            return item;
          }}
          {...form.getInputProps("tags")}
        />
        <Button type="submit" loading={loading}>
          Publish
        </Button>
      </form>
    </Modal>
  );
};

export default NewQuestionModal;
