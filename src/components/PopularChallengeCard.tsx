import { ClassNames } from "@emotion/react";
import {
  Badge,
  Box,
  Flex,
  Grid,
  Group,
  Stack,
  Title,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    padding: "20px 10px",
    boxShadow: theme.shadows.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : "white",
  },
  time: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.xs,
  },
  text: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? "#fff" : theme.black,
  },
  username: {
    fontSize: theme.fontSizes.sm,
    // fontWeight: "lighter",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  },
  title: {
    color: theme.colorScheme === "dark" ? "#fff" : theme.black,
    fontSize: theme.fontSizes.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "red",
  },
}));

interface Props {
  // Props type definition here
}

const PopularChallengeCard: React.FC<Props> = ({}) => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Stack spacing={0}>
        <Grid>
          <Grid.Col span={10}>
            <Title order={4} className={classes.title}>
              Lorem ipsum dolor sit, amet consectetur adipisicing
            </Title>
          </Grid.Col>
          <Grid.Col span={1}>
            <Box className={classes.dot} />
          </Grid.Col>
        </Grid>
        <p className={classes.text}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A soluta
          itaque tempora quia, ut similique beataed
        </p>
        <Flex sx={{ gap: 4 }}>
          <Badge component="a" href="/tag" color="green" variant="filled">
            Badge
          </Badge>
          <Badge color="yellow" variant="filled">
            Badge
          </Badge>
          <Badge color="red" variant="filled">
            Badge
          </Badge>
        </Flex>
      </Stack>
    </div>
  );
};

export default PopularChallengeCard;
