import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Input,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import * as Yup from "yup";

const useStyles = createStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
  },
}));

interface Props {
  // Props type definition here
}

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Your password must a least 8 characters"),
});

const LoginPage: React.FC<Props> = ({}) => {
  const { classes } = useStyles();
  const [loading, setloading] = useState(false);

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = () => {
    setloading(true);

    setTimeout(() => {
      setloading(false);
    }, 1000);
  };
  return (
    <Center h="100%">
      <Stack align="center">
        <Title>Login to your account</Title>
        <Text>Login using social networks</Text>
        <Group spacing={30}>
          <ActionIcon>
            <Avatar size="md" src="/facebook.svg" />
          </ActionIcon>
          <ActionIcon>
            <Avatar size="md" src="/google.svg" />
          </ActionIcon>
          <ActionIcon>
            <Avatar size="md" src="/linkedin.svg" />
          </ActionIcon>
        </Group>

        <Flex justify="center" align="center" gap={10}>
          {/* TODO: fix the dividers */}
          {/* text */}
          <Divider h={10} w="150px" color="green" />
          <div>or</div>
          <Divider h={10} w="150px" color="green" />
        </Flex>

        <form
          onSubmit={form.onSubmit((values) => console.log(values))}
          className={classes.form}
        >
          <TextInput
            w="100%"
            disabled={loading}
            placeholder="example@mail.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            w="100%"
            disabled={loading}
            {...form.getInputProps("password")}
          />
          <Center w="100%">
            <Button fullWidth loading={loading} type="submit">
              Sign in
            </Button>
          </Center>
        </form>
      </Stack>
    </Center>
  );
};

export default LoginPage;
