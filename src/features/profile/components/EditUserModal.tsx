import { ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

interface Props {
  // Props type definition here
}

const EditUserModal: React.FC<Props> = ({}) => {
  return (
    <>
      <ActionIcon>
        <IconEdit />
      </ActionIcon>
    </>
  );
};

export default EditUserModal;
