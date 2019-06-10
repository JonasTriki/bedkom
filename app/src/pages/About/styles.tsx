import styled from "styled-components";
import topInfoBg from "./images/top-info-bg.png";
import { darkBlue, darkBlue85, grayBorder } from "../../colors";

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
  background: linear-gradient(${darkBlue85}, ${darkBlue85}),
    url(${topInfoBg}) center;
  background-size: cover;
  color: white;
  padding: 2rem 4rem;
  min-height: 15rem;
`;

export const Title = styled.div`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

export const Description = styled.div`
  font-size: 1.25rem;
  font-weight: 300;
`;

export const InfoSections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5rem;
  padding: 2rem 5rem;
`;

export const LongDescription = styled.div`
  padding: 3rem 4rem 2rem 4rem;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

export const FormWrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-row-gap: 1rem;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${grayBorder};
  margin: 2rem 2rem;
`;

export const CenteredTitle = styled.div`
  font-size: 1.25rem;
  text-align: center;
`;

export const Members = styled.div`
  display: grid;
  grid-row-gap: 0.5rem;
`;
