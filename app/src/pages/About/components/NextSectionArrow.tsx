import styled from "styled-components";
import * as React from "react";
import { red } from "../../../colors";
import { RouteComponentProps, withRouter } from "react-router";
import { RefObject } from "react";

const Arrow = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  border-right: 0.15rem solid ${red};
  border-bottom: 0.15rem solid ${red};
  transition: 0.3s transform;
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

interface NextSectionArrowProps extends RouteComponentProps {
  sectionRef: RefObject<HTMLDivElement>;
}

const NextSectionArrow: React.FC<NextSectionArrowProps> = props => {
  const goToSection = () => {
    if (!props.sectionRef.current) return;
    window.scrollTo({
      behavior: "smooth",
      top: props.sectionRef.current.offsetTop
    });
  };

  return (
    <Wrapper onClick={goToSection}>
      <Text>{props.children}</Text>
      <Arrow />
    </Wrapper>
  );
};

export default withRouter(NextSectionArrow);
