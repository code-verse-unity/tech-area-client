import { ThemeProvider } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "@/constants/theme";

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
  return (
    <QueryClientProvider client={clientQuery}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
