import styled from "styled-components";

interface FormProps {
  fixedWidth?: string | number;
}

export const Form = styled.form<FormProps>`
  width: ${(props: FormProps) => props.fixedWidth || 'unset'};
  display: flex;
  flex-direction: column;
  
  > * {
    margin-bottom: .75rem;
  }
`;