import {
  AspectRatio,
  BackgroundImage,
  Box,
  Button,
  Grid,
  createStyles,
} from "@mantine/core";
import { Outlet } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
  },
  text: {
    color: "white",
    margin: 0,
  },
  sideContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    padding: "1rem 2rem",
    width: 300,
    gap: "1rem",
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  logo: {
    position: "absolute",
    left: "5rem",
    top: "1rem",
  },
}));

interface Props {
  // Props type definition here
}

const AuthLayout: React.FC<Props> = ({}) => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Box component="a" href="/" className={classes.logo}>
        Tech area
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <BackgroundImage src="/e.png" className={classes.sideContainer}>
        <h2 className={classes.text}>New Here</h2>
        <p className={classes.text}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
          asperiores fuga atque accusantium dignissimos reprehenderit
        </p>
        <Button>Register now</Button>
      </BackgroundImage>
    </div>
  );
};

export default AuthLayout;
