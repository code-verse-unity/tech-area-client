import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const MainLayout: FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default MainLayout;
