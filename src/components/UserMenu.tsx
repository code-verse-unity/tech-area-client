import { forwardRef } from "react";
import {
  IconChevronRight,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { Group, Avatar, Text, Menu, UnstyledButton, Flex } from "@mantine/core";
import ThemeToggler from "./ThemeToggler";
import { useAppSelector } from "@/hooks/redux";
import { selectUser } from "@/redux/selectors/userSelector";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  )
);

export default function UserMenu() {
  const currentUser = useAppSelector(selectUser);

  return (
    <Group position="center">
      <Menu
        withArrow
        transitionProps={{ transition: "rotate-right", duration: 150 }}
      >
        <Menu.Target>
          <UserButton
            image={currentUser.imageUrl ?? ""}
            name={currentUser.name.full}
            email={currentUser.email}
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} />}>Profile</Menu.Item>
          <Menu.Item
            icon={<IconSearch size={14} />}
            rightSection={
              <Text size="xs" color="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>

          <Menu.Item closeMenuOnClick={false}>
            <Flex justify="space-between" align="center">
              Theme
              <ThemeToggler />
            </Flex>
          </Menu.Item>

          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item color="red" icon={<IconTrash size={14} />}>
            Delete my account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
