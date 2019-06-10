import * as React from "react";
import styled from "styled-components";

interface DialogInputProps {
  label: string;
}

const InputWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const Label = styled.div`
  font-weight: 600;
`;

export const InputWrapper: React.FC<DialogInputProps> = ({
  label,
  children
}) => (
  <InputWrapperStyle>
    <Label>{label}</Label>
    {children}
  </InputWrapperStyle>
);
