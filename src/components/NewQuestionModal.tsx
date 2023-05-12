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

const useStyles = createStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",

    padding: "1rem 2rem",
  },
}));

interface Props extends ModalProps {}

const NewQuestionModal: React.FC<Props> = ({ opened, onClose }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [data, setData] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);
  const [loading, setloading] = useState(false);

  const handleSubmit = () => {
    setloading(true);

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
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          placeholder="What is your question"
          label="Question"
          withAsterisk
        />
        <RichEditor />
        <MultiSelect
          label="Choose tag for you question"
          data={data}
          placeholder="Select items"
          withAsterisk
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setData((current) => [...current, item]);
            return item;
          }}
        />
        <Button type="submit" loading={loading}>
          Publish
        </Button>
      </form>
    </Modal>
  );
};

export default NewQuestionModal;
