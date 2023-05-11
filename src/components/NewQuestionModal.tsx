import {
  Modal,
  ModalProps,
  MultiSelect,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import RichEditor from "./RichTextEditor";

interface Props extends ModalProps {}

const NewQuestionModal: React.FC<Props> = ({ opened, onClose }) => {
  const theme = useMantineTheme();
  const [data, setData] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);

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
      <Stack py={10}>
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
      </Stack>
    </Modal>
  );
};

export default NewQuestionModal;
