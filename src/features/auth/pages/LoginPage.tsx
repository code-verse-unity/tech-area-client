import {
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Input,
  PasswordInput,
  Stack,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  container: {},
}));

interface Props {
  // Props type definition here
}

const LoginPage: React.FC<Props> = ({}) => {
  const { classes } = useStyles();
  const [loading, setloading] = useState(false);

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
        <Group>
          <IconBrandFacebook />
          <IconBrandGoogle />
          <IconBrandLinkedin />
        </Group>

        <Flex justify="center" align="center" gap={10}>
          {/* TODO: fix the dividers */}
          <Divider h={10} w="150px" color="green" />
          <div>or</div>
          <Divider h={10} w="150px" color="green" />
        </Flex>

        <Input type="text" name="email" w="100%" disabled={loading} />
        <PasswordInput w="100%" name="password" disabled={loading} />
        <Center w="100%">
          <Button w="100%" disabled={loading} onClick={handleSubmit}>
            Sign in
          </Button>
        </Center>
      </Stack>
    </Center>
  );
};

export default LoginPage;
