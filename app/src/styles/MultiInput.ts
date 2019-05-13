import styled from "styled-components";
import {darkBlue, grayBorder} from "../colors";

interface MultiInputProps {
  minHeight?: string;
}

export const MultiInput = styled.textarea<MultiInputProps>`
  padding: .75rem;
  max-width: 100%;
  min-height: ${(props) => props.minHeight || '15rem'};
  box-sizing: border-box;
  
  font-size: 1.25rem;
  color: ${darkBlue};
  
  border: 1px solid ${grayBorder};
  border-radius: .25rem;
`;