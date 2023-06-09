import RichEditor from "@/components/RichTextEditor";
import {
  useCreateAnswerMutation,
  useUpdateAnswerMutation,
} from "@/services/serverApi";
import { Answer } from "@/services/types";
import { isAnswer } from "@/utils/typeGuards";
import { Button, Center, Drawer, DrawerProps, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

interface Props extends DrawerProps {
  questionId: number;
  isEditing?: boolean;
  answer?: Answer;
}

const AnswerFormDrawer: React.FC<Props> = ({
  questionId,
  onClose,
  answer,
  isEditing = false,
  ...props
}) => {
  const [createAnswer, { isLoading }] = useCreateAnswerMutation();
  const [updateAnswer, { isLoading: isUpdating }] = useUpdateAnswerMutation();
  console.log("drawer", answer?.content);

  const [content, setcontent] = useState(answer?.content);

  const initialValues = {
    content: isEditing ? content : "",
  };

  const form = useForm({
    initialValues,
  });

  const handleSubmit = async (values: { content: string }) => {
    try {
      if (!isEditing) {
        const response = await createAnswer({
          questionId,
          content: values.content,
        });

        if (isAnswer(response)) {
          console.log("created");
          onClose();
        } else {
          console.log("error creating answer", response.error);
        }
      } else if (answer) {
        const response = await updateAnswer({
          questionId,
          answerId: answer.id,
          content: values.content,
        });

        if (isAnswer(response)) {
          console.log("updated");
          onClose();
        } else {
          console.log("error updating answer", response.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      {...props}
      onClose={onClose}
      position="bottom"
      overlayProps={{ opacity: 0.5, blur: 4 }}
      size="md"
    >
      <Center mb="md">
        {/* @ts-ignore */}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text mb="sm">{isEditing ? "Modify your answer" : "Add answer"}</Text>
          <RichEditor form={form} />
          <Button
            type="submit"
            mt="md"
            fullWidth
            loading={isLoading || isUpdating}
            disabled={isLoading || isUpdating}
            // leftIcon={<IconWorldUpload />}
            variant="gradient"
            gradient={{ from: "teal", to: "green", deg: 105 }}
          >
            {isEditing ? "Save change" : "Reply"}
          </Button>
        </form>
      </Center>
    </Drawer>
  );
};

export default AnswerFormDrawer;
