import styled from 'styled-components';
import {darkBlue, grayBorder} from "../../colors";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  width: 75%;
  display: flex;
  flex-direction: column;
  
  > * {
    margin-bottom: .75rem;
  }
`;

interface InputProps {
  password?: boolean;
}

export const Input = styled.input.attrs(({password}: InputProps) => ({

  // Use password type if specified
  type: password ? "password" : "text",

}))<InputProps>`
  padding: .75rem;
  
  font-size: 1.25rem;
  color: ${darkBlue};
  
  border: 1px solid ${grayBorder};
  border-radius: .25rem;
`;

export const Link = styled.span`
  cursor: pointer;
  color: ${darkBlue};
  text-decoration: underline;
  transition: color .1s ease-in;
  place-self: center;
  margin-top: 1rem;
`;

export const Instructions = styled.div`
  max-width: 80%;
  margin-top: 2rem;
  
  span.emphasis {
    font-weight: 600;
  }
`;