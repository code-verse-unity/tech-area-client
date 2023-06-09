import { useAppSelector } from "@/hooks/redux";
import { selectUserId } from "@/redux/selectors/userSelector";
import { ActionIcon, Center, Menu, createStyles } from "@mantine/core";
import { IconDots, IconEdit, IconReport, IconTrash } from "@tabler/icons-react";
import AnswerFormDrawer from "./AnswerFormDrawer";
import { useDisclosure } from "@mantine/hooks";
import { Answer } from "@/services/types";
import { useState } from "react";

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
  userId: number; // id of the user that post the comment
  questionId: number;
  answer: Answer;
}

const AnswerCardMenu: React.FC<Props> = ({ userId, questionId, answer }) => {
  const { classes } = useStyles();
  const currentUserId = useAppSelector(selectUserId);
  const [editOpened, { close: closeEdit, open: openEdit }] = useDisclosure();

  console.log("menu", answer.content);
  return (
    <>
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
            /**
             * Hide this action when the user is not suppose
             * to be able to update other user answer
             */
            sx={{ display: userId === currentUserId ? "flex" : "none" }}
            onClick={openEdit}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            icon={
              <Center className={classes.center}>
                <IconTrash size="16" color="red" />
              </Center>
            }
            /**
             * Hide this action when the user is not suppose
             * to be able to delete other user answer
             */
            sx={{ display: userId === currentUserId ? "flex" : "none" }}
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

      <AnswerFormDrawer
        opened={editOpened}
        questionId={questionId}
        answer={answer}
        onClose={closeEdit}
        isEditing={true}
      />
    </>
  );
};

export default AnswerCardMenu;
