import { Stack, Title, createStyles } from "@mantine/core";
import PopularChallengeCard from "./PopularChallengeCard";

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === "dark" ? "#fff" : theme.black,
    fontSize: theme.fontSizes.md,
  },
}));

interface Props {
  // Props type definition here
}

const PopularChallengeList: React.FC<Props> = ({}) => {
  const { classes } = useStyles();
  return (
    <div>
      <Title order={3} className={classes.title} mb={10}>
        Popular challenges
      </Title>
      {[1, 2, 3].map((i) => (
        <PopularChallengeCard />
      ))}
    </div>
  );
};

export default PopularChallengeList;
