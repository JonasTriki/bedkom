import styled from "styled-components";
import * as React from "react";
import {darkBlue85, red, yellow} from "../../../colors";

const Arrow = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  border-right: .15rem solid ${red};
  border-bottom: .15rem solid ${red};
  transition: .3s transform;
  transform: rotate(45deg);
`;

const Wrapper = styled.div`
  cursor: pointer;
  margin: auto 0 2rem 0;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  
  :hover ${Arrow} {
    transform: rotate(45deg) translate(15%, 15%);
  }
`;

const Text = styled.div`
  font-size: 1.1rem;
`;

const NextSectionArrow: React.FC = (props) => (
  <Wrapper>
    <Text>{props.children}</Text>
    <Arrow/>
  </Wrapper>
);

export default NextSectionArrow;