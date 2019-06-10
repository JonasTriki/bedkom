import React, { MouseEventHandler } from "react";
import { darkBlue } from "../colors";
import Icon from "@mdi/react";
import styled from "styled-components";
import { Button, ButtonProps } from "./Button";

interface IconButtonProps extends ButtonProps {
  iconPath: string;
  className?: string;
  onClick?: MouseEventHandler;
}

const IconButtonStyle = styled(Button)`
  svg {
    margin-right: 0.5rem;
  }
`;

export const IconButton: React.FC<IconButtonProps> = ({
  iconPath,
  ...props
}) => {
  return (
    <IconButtonStyle {...props}>
      <Icon
        path={iconPath}
        color={props.theme !== "white" ? "white" : darkBlue}
        size="1rem"
      />
      {props.children}
    </IconButtonStyle>
  );
};
