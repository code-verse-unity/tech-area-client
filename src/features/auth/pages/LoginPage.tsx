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
import { LoginValues } from "../types";
import { useLogUserMutation } from "@/services/serverApi";
import { isUser } from "@/utils/typeGuards";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setAuth } from "@/redux/reducers/authSlice";
import { setUser } from "@/redux/reducers/userSlice";
import { selectAuth } from "@/redux/selectors/authSelector";

const useStyles = createStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
  },
}));

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Your password must a least 8 characters"),
});

const initialValues: LoginValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { classes } = useStyles();

  const form = useForm({
    validate: yupResolver(schema),
    initialValues,
  });

  const [logUser, { isLoading }] = useLogUserMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginValues) => {
    const response = await logUser(values);

    if (isUser(response)) {
      dispatch(setUser(response.data));
      dispatch(setAuth(true));

      navigate("/profile");
    } else {
      // @ts-ignore
      if (response.error?.status === 401) {
        const errors = { email: "", password: "" };
        form.setErrors(errors);
      }
    }
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
          <Divider h={10} w="150px" color="green" />
          <div>or</div>
          <Divider h={10} w="150px" color="green" />
        </Flex>

        <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
          {form.errors?.email === "" && form.errors?.password === "" && (
            <Text color="red" fz="sm">
              Your email or password is incorrect. Please try again.
            </Text>
          )}
          <TextInput
            w="100%"
            disabled={isLoading}
            placeholder="example@mail.com"
            {...form.getInputProps("email")}
            /**
             * Allow to give a feed back when the user credential
             * doesn't match the records in the db
             */
            error={form.errors?.email === ""}
          />
          <PasswordInput
            w="100%"
            disabled={isLoading}
            {...form.getInputProps("password")}
            /**
             * Allow to give a feed back when the user credential
             * doesn't match the records in the db
             */
            error={form.errors?.password === ""}
          />
          <Center w="100%">
            <Button fullWidth loading={isLoading} type="submit">
              Sign in
            </Button>
          </Center>
        </form>
      </Stack>
    </Center>
  );
};

export default LoginPage;
