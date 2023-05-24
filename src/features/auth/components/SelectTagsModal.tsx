import { tags } from "@/constants/fakeData";
import { useAppDispatch } from "@/hooks/redux";
import { setUser, setUserTags } from "@/redux/reducers/userSlice";
import { useGetTagsQuery } from "@/services/serverApi";
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
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props extends ModalProps {
  // Props type definition here
}

const useStyles = createStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    padding: "1rem 2rem",
    height: 300,
  },
}));

const initialValues: { tags: Tag[] } = {
  tags: [],
};
const SelectTagsModal: React.FC<Props> = ({ opened, onClose }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [loading, setloading] = useState(false);

  const { data, isLoading, isError } = useGetTagsQuery();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    initialValues,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (values: { tags: Tag[] }) => {
    setloading(true);

    setloading(false);
    navigate("/profile");
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
            data={tagsToMultiselectValues(data?.data.tags)}
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
