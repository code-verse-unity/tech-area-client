import RichEditor from "@/components/RichTextEditor";
import { useCreateAnswerMutation } from "@/services/serverApi";
import { isAnswer } from "@/utils/typeGuards";
import { Button, Center, Drawer, DrawerProps, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

interface Props extends DrawerProps {
  isEditing?: boolean;
  questionId: number;
}

const AnswerFormDrawer: React.FC<Props> = ({
  questionId,
  onClose,
  isEditing = false,
  ...props
}) => {
  const [createAnswer, { isLoading, isError }] = useCreateAnswerMutation();

  const form = useForm({
    initialValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: { content: string }) => {
    try {
      const response = await createAnswer({
        questionId,
        content: values.content,
      });

      if (isAnswer(response)) {
        console.log("created");
        onClose();
        form.reset();
      } else {
        console.log("error creating answer", response.error);
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
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text mb="sm">Enter you answer</Text>
          <RichEditor form={form} />
          <Button
            type="submit"
            mt="md"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            // leftIcon={<IconWorldUpload />}
            variant="gradient"
            gradient={{ from: "teal", to: "green", deg: 105 }}
          >
            Comment
          </Button>
        </form>
      </Center>
    </Drawer>
  );
};

export default AnswerFormDrawer;
