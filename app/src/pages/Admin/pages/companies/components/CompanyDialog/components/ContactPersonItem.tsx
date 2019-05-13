import {ContactPerson} from "../../../../../../../models/Company";
import * as React from "react";
import styled from "styled-components";
import {darkBlue, grayBorder,} from "../../../../../../../colors";
import Icon from "@mdi/react";
import {mdiDelete} from "@mdi/js";
import {IconButton} from "@material-ui/core";

const Style = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 4rem;
  grid-gap: .25rem;
  border-bottom: 1px solid ${grayBorder};
  padding: .5rem;
  
  > div {
    padding: .5rem;
  }
`;

const RemoveIcon = styled.div`
  grid-row: 1/3;
  grid-column: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ContactPersonItemProps {
  index: number;
  contactPerson: ContactPerson;
  onRemove: (index: number) => void;
}

export const ContactPersonItem: React.FC<ContactPersonItemProps> = ({contactPerson, onRemove, index}) => (
  <Style>
    <div>{contactPerson.name}</div>
    <div>{contactPerson.position}</div>
    <div>{contactPerson.phone}</div>
    <div>{contactPerson.email}</div>
    <RemoveIcon>
      <IconButton aria-label='Close' onClick={() => onRemove(index)}>
        <Icon path={mdiDelete} color={darkBlue} size='2rem'/>
      </IconButton>
    </RemoveIcon>
  </Style>
);