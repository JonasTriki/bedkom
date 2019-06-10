import { darkBlue, redError } from "../colors";
import styled from "styled-components";

export type ButtonTheme = "red" | "white" | "normal";

export interface ButtonProps {
  theme?: ButtonTheme;
  spanned?: boolean;
}

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  padding: 0.75rem 1rem;
  width: ${(props: ButtonProps) => (props.spanned ? "100%" : "unset")};

  border: none;
  border-radius: 0.25rem;

  text-align: center;
  font-size: 1.25rem;

  color: ${(props: ButtonProps) =>
    props.theme !== "white" ? "white" : darkBlue};
  background-color: ${(props: ButtonProps) => {
    if (props.theme === "red") {
      return redError;
    } else if (props.theme === "white") {
      return "white";
    }
    return darkBlue;
  }};
`;
