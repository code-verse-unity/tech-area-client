import LeftNavigation from "@/components/LeftNavigation";
import Navigation from "@/components/Navigation";
import RightNavigation from "@/components/RightNavigation";
import {
  AspectRatio,
  BackgroundImage,
  Box,
  Container,
  Grid,
  Overlay,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import HomeCover from "@/assets/img/home-cover.jpg";
import { Outlet } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  body: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : "white",
  },
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
  },
}));

export default function RootLayout() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Navigation />
      <Box maw="100vw">
        <BackgroundImage src={HomeCover} m={0} h={230} maw="100vw">
          <Container h="100%" size="xl">
            <Box
              px="md"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Title color="dark">Home</Title>
              <Text maw={600} color="dark">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae obcaecati debitis animi harum alias sit corporis,
                aliquam maiores neque nam temporibus numquam itaque, odit
                cupiditate ipsa consequuntur unde enim libero?
              </Text>
            </Box>
          </Container>
        </BackgroundImage>
      </Box>
      <Box sx={{ overflow: "hidden" }}>
        <Container size="xl">
          <Grid>
            <Grid.Col span={3}>
              <LeftNavigation />
            </Grid.Col>
            <Grid.Col span={6} className={classes.body}>
              <Outlet />
            </Grid.Col>
            <Grid.Col span={3}>
              <RightNavigation />
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
