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
  useMantineTheme,
} from "@mantine/core";
import HomeCover from "@/assets/img/home-cover.jpg";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

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
  const location = useLocation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <div className={classes.wrapper}>
      <Navigation />
      {/* <Box maw="100vw">
        {location.pathname === "/" && (
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
        )}
      </Box> */}
      <Container size="xl" px={0}>
        <Grid m={0}>
          <Grid.Col span="auto" hidden={isMobile}>
            <LeftNavigation />
          </Grid.Col>
          <Grid.Col xs={12} md={6} className={classes.body}>
            <Outlet />
          </Grid.Col>
          <Grid.Col span="auto" hidden={isMobile}>
            <RightNavigation />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
