import React, { PropsWithChildren, useState } from "react";
import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { theme } from "@/constants/theme";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { CustomFonts } from "@/constants/customFonts";

const Providers = ({ children }: PropsWithChildren) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <Provider store={store}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          theme={{
            ...theme,
            colorScheme,
          }}
        >
          <CustomFonts />
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  );
};

export default Providers;
