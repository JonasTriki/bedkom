import styled from "styled-components";
import {grayBorder, grayedText} from "../../../../../../colors";

export const ContactPersonInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: .5rem;
  
  .add-btn {
    grid-column: 1/3;
  }
`;

export const EmptyCentered = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${grayedText};
`;

export const ContactPersons = styled.div`
  border: 1px solid ${grayBorder};
  border-radius: .25rem;
  overflow: scroll;
  height: 10rem;
  margin-bottom: .5rem;
  display: flex;
  flex-direction: column;
  
  :last-child {
    border-bottom: unset;
  }
`;