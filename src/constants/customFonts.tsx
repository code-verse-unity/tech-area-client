import { Global } from "@mantine/core";
import bold from "@/assets/fonts/Poppins-Bold.ttf";
import regular from "@/assets/fonts/Poppins-Regular.ttf";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Poppins",
            src: `url(${regular}) format(ttf)`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
        // {
        //   "@font-face": {
        //     fontFamily: "Poppins",
        //     src: `url(${regular}) format(ttf)`,
        //     fontWeight: 500,
        //     fontStyle: "normal",
        //   },
        // },
      ]}
    />
  );
}
