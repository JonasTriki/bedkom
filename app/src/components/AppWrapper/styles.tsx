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
  align-items: center;
`;

export const Buttons = styled.div`
  display: flex;
  margin-left: 1rem;
`;

interface ButtonProps {
  active?: boolean;
}

export const Button = styled.div<ButtonProps>`
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 3rem;
  margin: 0 .5rem;
  color: ${(props: ButtonProps) => props.active ? yellow : 'white'};
  transition: color .15s ease-in;
  
  // Make the text unselectable
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
    
  :hover {
    color: ${yellow};
  }
`;

export const FloatRight = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

export const Divider = styled.div`
  width: 1px;
  height: 2rem;
  background: white;
  margin: 0 1rem;
`;

export const ProfileButton = styled(Button)`
  display: flex;
  align-items: center;
  
  .thumb {
    margin-right: 1rem;
  }
`;

export const Content = styled.div`
  flex: 1;
  min-height: calc(100% - 5rem);
  display: flex;
`;

export const Footer = styled(Bar)`
`;