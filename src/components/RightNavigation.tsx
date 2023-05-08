import { Box, Stack, createStyles } from "@mantine/core";
import ActionCard from "./ActionCard";
import { SIDE_TOP_PADDING } from "@/constants/sizes";
import PopularEvent from "./PopularEvent";
import PopularChallengeList from "./PopularChallengeList";

const useStyles = createStyles((theme) => ({
  sticky: {
    position: "sticky",
    top: 0,
  },
}));

const RightNavigation = () => {
  const { classes } = useStyles();
  return (
    <Stack pr="md" pt={SIDE_TOP_PADDING} className={classes.sticky}>
      <ActionCard />
      <PopularEvent />
      <PopularChallengeList />
    </Stack>
  );
};

export default RightNavigation;
