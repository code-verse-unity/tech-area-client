import Lottie from "lottie-react";
import SammyLineError from "@/assets/json/sammy-line-no-connection.json";
import { Center, Stack } from "@mantine/core";

const Error = () => {
  return (
    <Center>
      <Stack>
        <Lottie animationData={SammyLineError} style={{ width: "400px" }} />
        <h1>Oops! Something goes wrong</h1>
      </Stack>
    </Center>
  );
};

export default Error;
