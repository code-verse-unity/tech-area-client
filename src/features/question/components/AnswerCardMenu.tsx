import { ActionIcon, Center, Menu, createStyles } from "@mantine/core";
import { IconDots, IconEdit, IconReport, IconTrash } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  center: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],
    padding: 5,
    borderRadius: "100%",
  },
}));

interface Props {
  // Props type definition here
}

const AnswerCardMenu: React.FC<Props> = ({}) => {
  const { classes } = useStyles();

  return (
    <Menu shadow="md" radius="md" width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon radius="xl">
          <IconDots />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={
            <Center className={classes.center}>
              <IconEdit size="16" color="blue" />
            </Center>
          }
        >
          Edit
        </Menu.Item>
        <Menu.Item
          icon={
            <Center className={classes.center}>
              <IconTrash size="16" color="red" />
            </Center>
          }
        >
          Delete
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          icon={
            <Center className={classes.center}>
              <IconReport size="16" color="indigo" />
            </Center>
          }
        >
          Report comment
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AnswerCardMenu;
