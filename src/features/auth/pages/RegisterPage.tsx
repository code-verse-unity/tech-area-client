import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/redux/reducers/userSlice";
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
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SelectTagsModal from "../components/SelectTagsModal";
import { useDisclosure } from "@mantine/hooks";
import { RegisterValues } from "../types";
import api from "@/services/api";

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
  firstname: Yup.string().required("First name is required"),
});

const RegisterPage: React.FC<Props> = ({}) => {
  const { classes } = useStyles();
  const [loading, setloading] = useState(false);
  const [showTagModal, { open, close }] = useDisclosure(false);

  const form = useForm<RegisterValues>({
    validate: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
      lastname: "",
      firstname: "",
      role: "student",
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: RegisterValues) => {
    setloading(true);

    try {
      // const res = await api.auth.register(values);
      // console.log(res);

      // Add the user data to redux
      // dispatch(
      //   setUser({
      //     avatarUrl: "",
      //     createdAt: "",
      //     email: values.email,
      //     password: values.password,
      //     firstname: values.firstname,
      //     lastname: values.lastname,
      //     role: "user",
      //     fullname: `${values.firstname} ${values.lastname}`,
      //     id: "fsdf",
      //     updatedAt: "sd",
      //     tags: [],
      //   })
      // );

      open();
      // navigate("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <Center h="100%">
        <Stack align="center">
          <Title>Create a new account</Title>
          <Text>Create using social networks</Text>
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
            <Divider h={10} w="150px" color="green" />
            <div>or</div>
            <Divider h={10} w="150px" color="green" />
          </Flex>

          <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
            <TextInput
              w="100%"
              disabled={loading}
              placeholder="John"
              autoComplete="off"
              {...form.getInputProps("firstname")}
            />
            <TextInput
              w="100%"
              disabled={loading}
              placeholder="Doe"
              autoComplete="off"
              {...form.getInputProps("lastname")}
            />
            <TextInput
              w="100%"
              disabled={loading}
              placeholder="example@mail.com"
              autoComplete="off"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              w="100%"
              disabled={loading}
              autoComplete="new-password"
              placeholder="***********"
              {...form.getInputProps("password")}
            />
            <Center w="100%">
              <Button fullWidth loading={loading} type="submit">
                Register
              </Button>
            </Center>
          </form>
        </Stack>
      </Center>
      <SelectTagsModal opened={showTagModal} onClose={close} />
    </>
  );
};

export default RegisterPage;
