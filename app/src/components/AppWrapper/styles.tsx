import * as React from 'react';
import styled from "styled-components";
import {darkBlue, lightBlueBg, yellow} from "../../colors";

export const Wrapper = styled.div`
  height: 100%;
  background-color: ${lightBlueBg};
`;

export const Logo = styled.img`
  width: 3rem;
  height: 3rem;
`;

export const Bar = styled.div`
  height: 3rem;
  color: white;
  padding: 1rem;
  background-color: ${darkBlue};
`;

export const Menu = styled(Bar)`
  display: flex;
  
  > div {
    flex: 1;
  }
`;

export const Buttons = styled.div`
  flex: 1;
  display: flex;
  margin-left: 1rem;
`;

interface ButtonProps {
  active?: boolean;
}

export const Button = styled.div<ButtonProps>`
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 3rem;
  margin: 0 .5rem;
  color: ${(props: ButtonProps) => props.active ? yellow : 'white'};
  transition: color .15s ease-in;
  
  :hover {
    color: ${yellow};
  }
`;

export const Content = styled.div`
  flex: 1;
  min-height: calc(100% - 5rem);
`;

export const Footer = styled(Bar)`
  display: flex;
`;