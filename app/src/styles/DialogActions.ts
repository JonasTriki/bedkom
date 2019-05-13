import styled from "styled-components";
import {grayBorder} from "../colors";

export const DialogActions = styled.div`
  padding: 1rem;
  margin: 0;
  border-top: 1px solid ${grayBorder};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  > button {
    margin-left: .5rem;
  }
`;