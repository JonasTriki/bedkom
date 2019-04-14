import styled from 'styled-components';
import {darkBlue} from "../colors";

interface ButtonProps {
  dark?: boolean;
  spanned?: boolean;
}

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  padding: .75rem 1rem;
  width: ${(props: ButtonProps) => props.spanned ? '100%' : 'unset'};
  
  border: none;
  border-radius: .25rem;
  
  text-align: center;
  font-size: 1.25rem;
  
  color: ${(props: ButtonProps) => props.dark ? 'white' : darkBlue};
  background-color: ${(props: ButtonProps) => props.dark ? darkBlue : 'white'};
`;