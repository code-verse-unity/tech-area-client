import { useState } from "react";
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
} from "@tabler/icons-react";
import {
  Box,
  Divider,
  NavLink,
  Title,
  createStyles,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { SIDE_TOP_PADDING } from "@/constants/sizes";

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: theme.spacing.xs,
    boxShadow: theme.shadows.md,
    padding: 10,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : "white",
    position: "sticky",
    top: 0,
  },

  text: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: "lighter",
  },
}));

const data = [
  { icon: IconGauge, label: "Dashboard", description: "Item with description" },
  {
    icon: IconFingerprint,
    label: "Security",
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  },
  { icon: IconActivity, label: "Activity" },
];

const LeftNavigation = () => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineTheme();
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActive(index)}
      color={colorScheme === "dark" ? "green.0" : "green.8"}
      variant="subtle"
    />
  ));

  return (
    <Box pl="md" pt={SIDE_TOP_PADDING}>
      <Box className={classes.container}>
        <Title order={4} className={classes.text}>
          Navigation
        </Title>
        <Divider h={2} color="gray.6" my={5} />
        {items}
      </Box>
    </Box>
  );
};

export default LeftNavigation;
