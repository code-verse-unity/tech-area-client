export const transformTagIds = (tags: string[]) => {
  if (tags.length === 0) return "";

  return "tags[in]=" + tags.join(",");
};
