import styled from "styled-components";
import { darkBlue, yellow } from "../../colors";
import logo from "../../images/logo.svg";

export const LoadingWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 3rem;
  color: ${yellow}
  background-color: ${darkBlue};
`;

export const Logo = styled.div`
  width: 4rem;
  height: 4rem;
  background: url(${logo}) no-repeat center;
  background-size: contain;
  margin-right: 1rem;
`;

export const FooterDetails = styled.div`
  align-self: flex-end;
  position: absolute;
  font-size: 1rem;
  left: 1rem;
  bottom: 1rem;
`;
