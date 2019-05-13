import styled from "styled-components";
import {darkBlue, grayBorder} from "../colors";

interface InputProps {
  file?: boolean;
  email?: boolean;
  password?: boolean;
}

export const Input = styled.input.attrs(({password, email, file}: InputProps) => ({

  // Use specific type if specified
  type: password ? "password" : (email ? "email" : (file ? "file": "text")),
}))<InputProps>`
  padding: .75rem;
  
  font-size: 1.25rem;
  color: ${darkBlue};
  
  border: 1px solid ${grayBorder};
  border-radius: .25rem;
`;