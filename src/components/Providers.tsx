import React, { PropsWithChildren, useState } from "react";
import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "@/constants/theme";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

const clientQuery = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
    },
    mutations: {
      networkMode: "offlineFirst",
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <QueryClientProvider client={clientQuery}>
      <Provider store={store}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              ...theme,
              colorScheme,
            }}
          >
            {children}
          </MantineProvider>
        </ColorSchemeProvider>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
