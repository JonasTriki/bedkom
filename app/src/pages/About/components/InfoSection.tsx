import * as React from "react";
import Icon from "@mdi/react";
import styled from "styled-components";
import { darkBlue } from "../../../colors";

export interface InfoSectionProps {
  icon: string;
  title: string;
  description: string;
}

const MainStyle = styled.div`
  display: grid;
  grid-row-gap: 0.5rem;
  justify-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${darkBlue};
  width: 6rem;
  height: 6rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const Info = styled.div`
  text-align: center;
`;

const InfoSection: React.FC<InfoSectionProps> = props => (
  <MainStyle>
    <IconWrapper>
      <Icon path={props.icon} color="white" size="4rem" />
    </IconWrapper>
    <Title>{props.title}</Title>
    <Info>{props.description}</Info>
  </MainStyle>
);

export default InfoSection;
