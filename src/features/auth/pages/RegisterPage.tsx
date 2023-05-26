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
import { setToken } from "@/utils/token";
import { useCreateUserMutation } from "@/services/serverApi";
import { setAuth } from "@/redux/reducers/authSlice";
import { User } from "@/services/types";
import { isUser } from "@/utils/typeGuards";

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
  const [showTagModal, { open, close }] = useDisclosure(false);

  /**
   * Handle Registration
   */
  const [createUser, { isLoading }] = useCreateUserMutation();

  const form = useForm<RegisterValues>({
    validate: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
      lastname: "",
      firstname: "",
      role: "user",
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: RegisterValues) => {
    createUser(values).then((response) => {
      if (isUser(response)) {
        dispatch(setUser(response.data));
        dispatch(setAuth(true));

        navigate("/profile");
      } else {
        /**
         * Check if the email is already used
         */
        // @ts-ignore
        if (response.error?.status === 409) {
          form.setErrors({ email: "User with same email already exists" });
        }
      }
    });
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
              disabled={isLoading}
              placeholder="John"
              autoComplete="off"
              {...form.getInputProps("firstname")}
            />
            <TextInput
              w="100%"
              disabled={isLoading}
              placeholder="Doe"
              autoComplete="off"
              {...form.getInputProps("lastname")}
            />
            <TextInput
              w="100%"
              disabled={isLoading}
              placeholder="example@mail.com"
              autoComplete="off"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              w="100%"
              disabled={isLoading}
              autoComplete="new-password"
              placeholder="***********"
              {...form.getInputProps("password")}
            />
            <Center w="100%">
              <Button fullWidth loading={isLoading} type="submit">
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
