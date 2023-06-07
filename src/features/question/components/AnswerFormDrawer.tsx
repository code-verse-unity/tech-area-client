import RichEditor from "@/components/RichTextEditor";
import { Button, Center, Drawer, DrawerProps, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

interface Props extends DrawerProps {
  isEditing?: boolean;
}

const AnswerFormDrawer: React.FC<Props> = ({ isEditing = false, ...props }) => {
  const form = useForm({
    initialValues: {
      content: "",
    },
  });

  const handleSubmit = (values: { content: string }) => {
    console.log(values);
  };

  return (
    <Drawer
      {...props}
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
            // loading={isLoading || isCreatingQuestion}
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
