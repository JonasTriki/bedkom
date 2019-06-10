import styled from "styled-components";
import { darkBlue } from "../colors";

export const Link = styled.span`
  cursor: pointer;
  color: ${darkBlue};
  text-decoration: underline;
  transition: color 0.1s ease-in;
  /*place-self: center;
  margin-top: 1rem;*/
`;
