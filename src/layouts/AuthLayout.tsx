import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/redux/selectors/authSelector";
import {
  AspectRatio,
  BackgroundImage,
  Box,
  Button,
  Grid,
  createStyles,
} from "@mantine/core";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

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
    [theme.fn.smallerThan("sm")]: {
      left: "1.5rem",
    },
  },
}));

interface Props {
  // Props type definition here
}

const AuthLayout: React.FC<Props> = ({}) => {
  const { classes } = useStyles();
  const location = useLocation();

  const { authenticated, isAuthenticating } = useAppSelector(selectAuth);
  const navigate = useNavigate();

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  /**
   * Redirect the user to the profile page when
   * he is already authenticated
   */
  if (authenticated) {
    navigate("/profile");
  }

  const SideContext = () => (
    <>
      {location.pathname.includes("login") ? (
        <>
          <h2 className={classes.text}>New Here</h2>
          <p className={classes.text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
            asperiores fuga atque accusantium dignissimos reprehenderit
          </p>
          <Button component={Link} to="/auth/register">
            Register now
          </Button>
        </>
      ) : (
        <>
          <h2 className={classes.text}>Already have an account</h2>
          <p className={classes.text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
            asperiores fuga atque accusantium dignissimos reprehenderit
          </p>
          <Button component={Link} to="/auth/login">
            Login now
          </Button>
        </>
      )}
    </>
  );

  return (
    <div className={classes.container}>
      <Box component={Link} to="/" className={classes.logo}>
        Tech area
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <BackgroundImage src="/e.png" className={classes.sideContainer}>
        <SideContext />
      </BackgroundImage>
    </div>
  );
};

export default AuthLayout;
