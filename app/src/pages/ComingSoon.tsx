import * as React from "react";
import styled from "styled-components";
import { yellow, darkBlue } from "../colors";

const CenteredText = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 3rem;
  color: ${yellow}
  background-color: ${darkBlue};
`;

function ComingSoon() {
  return <CenteredText>Kommer snart...</CenteredText>;
}

export default ComingSoon;
