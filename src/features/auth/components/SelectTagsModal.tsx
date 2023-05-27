import { tags } from "@/constants/fakeData";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setUser, setUserTags } from "@/redux/reducers/userSlice";
import {
  useCreateUserTagMutation,
  useGetTagsQuery,
} from "@/services/serverApi";
import { tagsToMultiselectValues } from "@/utils/tagTransformer";
import { Tag } from "@/utils/types";
import {
  Button,
  Modal,
  ModalProps,
  MultiSelect,
  Text,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TagsValue } from "../types";
import { isUserTags } from "@/utils/typeGuards";
import { setAuth } from "@/redux/reducers/authSlice";
import { selectUserId } from "@/redux/selectors/userSelector";
import * as Yup from "yup";

interface Props extends ModalProps {
  // Props type definition here
}

const schema = Yup.object().shape({
  tags: Yup.array().min(1, "You have at least choose one tag"),
});

const useStyles = createStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    padding: "1rem 2rem",
    height: 300,
  },
}));

const initialValues: TagsValue = {
  tags: [],
};
const SelectTagsModal: React.FC<Props> = ({ opened, onClose }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [loading, setloading] = useState(false);

  const { data = [], isLoading, isError } = useGetTagsQuery();
  const [createUserTags, mutationState] = useCreateUserTagMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector(selectUserId);

  const form = useForm({
    validate: yupResolver(schema),
    initialValues,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const handleSubmit = ({ tags }: TagsValue) => {
    /**
     * This will automatically trigger the whoAmI query
     * The the user will be redirected
     */
    createUserTags({ tags, userId }).then((response) => {
      // console.log(response);
      if (isUserTags(response)) {
        dispatch(setUserTags(response.data));
      } else {
        console.log("error", response.error);
        form.setErrors({ tags: "Something goes wrong" });
      }
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Finalize your profile"
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      size="lg"
      centered
    >
      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <div>
          <MultiSelect
            label="Before continuing, you have to select at least one tag."
            data={tagsToMultiselectValues(data)}
            placeholder="Select tags"
            withAsterisk
            searchable
            maxSelectedValues={10}
            {...form.getInputProps("tags")}
          />
          <Text fw="lighter" fz="xs" color="gray.7" py="sm">
            This help us giving you the best experience while using this app.
          </Text>
        </div>

        <Button type="submit" loading={loading}>
          Continue
        </Button>
      </form>
    </Modal>
  );
};

export default SelectTagsModal;
