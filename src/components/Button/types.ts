import { PropsWithChildren } from "react";

export interface ButtonProps extends PropsWithChildren {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}
