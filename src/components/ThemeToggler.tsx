import { Switch, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconMoonStars } from "@tabler/icons-react";
import { IconSun } from "@tabler/icons-react";

const ThemeToggler = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  return (
    <Switch
      size="md"
      color={theme.colorScheme === "dark" ? "gray" : "dark"}
      onClick={() => toggleColorScheme()}
      onLabel={
        <IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[5]} />
      }
      offLabel={
        <IconMoonStars size="1rem" stroke={2.5} color={theme.colors.green[5]} />
      }
    />
  );
};

export default ThemeToggler;
