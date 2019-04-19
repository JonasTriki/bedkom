import styled from "styled-components";
import {darkBlue, grayBorder} from "../colors";

interface InputProps {
  email?: boolean;
  password?: boolean;
}

export const Input = styled.input.attrs(({password, email}: InputProps) => ({

  // Use password type if specified
  type: password ? "password" : (email ? "email" : "text"),
}))<InputProps>`
  padding: .75rem;
  
  font-size: 1.25rem;
  color: ${darkBlue};
  
  border: 1px solid ${grayBorder};
  border-radius: .25rem;
`;