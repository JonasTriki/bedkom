import styled from "styled-components";
import {darkBlue, darkBlue85, grayBorder} from "../../colors";
import topInfoBg from "./images/top-info-bg.png";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(${darkBlue85}, ${darkBlue85}), url(${topInfoBg}) center;
  background-size: cover;
  color: white;
  padding: 2rem 4rem;
  min-height: 15rem;
`;

export const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const FormWrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-row-gap: 1rem;
  margin: 2rem 0;
`;

export const CenteredTitle = styled.div`
  font-size: 1.25rem;
  text-align: center;
`;

export const MultiInput = styled.textarea`
  padding: .75rem;
  max-width: 100%;
  min-height: 15rem;
  box-sizing: border-box;
  
  font-size: 1.25rem;
  color: ${darkBlue};
  
  border: 1px solid ${grayBorder};
  border-radius: .25rem;
`;