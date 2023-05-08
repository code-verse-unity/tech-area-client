import { BackgroundImage, Box, Container, Title } from "@mantine/core";

interface Props {
  // Props type definition here
}

const PopularEvent: React.FC<Props> = ({}) => {
  return (
    <BackgroundImage src={"/e.png"} h={250} radius="md">
      <Container py={10}>
        <Title order={3} color="white">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </Title>
        <p style={{ color: "white" }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
          doloremque cum expedita tempora, quidem amet voluptate qui obcaecati
          officiis ullam consequatur.
        </p>
      </Container>
    </BackgroundImage>
  );
};

export default PopularEvent;
