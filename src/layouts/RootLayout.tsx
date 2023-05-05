import LeftNavigation from "@/components/LeftNavigation";
import Navigation from "@/components/Navigation";
import RightNavigation from "@/components/RightNavigation";
import {
  BackgroundImage,
  Box,
  Grid,
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
        : theme.colors.gray[0],
  },
}));

export default function RootLayout() {
  const { classes } = useStyles();
  return (
    <div>
      <Navigation />
      <Box maw="100vw">
        <BackgroundImage src={HomeCover} m={0} h={230}>
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
        </BackgroundImage>
      </Box>
      <Box w={"100vw"} sx={{ overflow: "hidden" }}>
        <Grid>
          <Grid.Col span={3} className={classes.wrapper}>
            <LeftNavigation />
          </Grid.Col>
          <Grid.Col span={6} className={classes.body}>
            <Outlet />
          </Grid.Col>
          <Grid.Col span={3} className={classes.wrapper}>
            <RightNavigation />
          </Grid.Col>
        </Grid>
      </Box>
    </div>
  );
}
