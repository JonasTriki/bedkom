import * as React from "react";
import styled from "styled-components";
import {darkBlue, grayBorder} from "../colors";
import {IconButton} from "@material-ui/core";
import Icon from "@mdi/react";
import {mdiClose} from "@mdi/js";

const Style = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: .5rem .75rem .5rem 1rem;
  border-bottom: 1px solid ${grayBorder};
`;

const Title = styled.span`
  font-size: 1.25rem;
  flex: 1;
`;

interface DialogTitleProps {
  onClose?: () => void;
}

const DialogTitle: React.FC<DialogTitleProps> = ({onClose, children}) => (
  <Style>
    <Title>{children}</Title>
    {onClose ? (
      <IconButton aria-label='Close' onClick={onClose}>
        <Icon path={mdiClose} color={darkBlue} size='2rem'/>
      </IconButton>
    ) : null}
  </Style>
);

export default DialogTitle;