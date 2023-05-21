import { Tag } from "./types";

export const tagsToMultiselectValues = (tags: Tag[]) =>
  tags.map((tag) => ({ value: tag.id, label: tag.name }));

export const multiselectValuesToTags = (
  values: { value: string; label: string }[]
) =>
  values.map((value) => ({
    id: value.value,
    name: value.label,
    color: "",
    url: "",
  }));
