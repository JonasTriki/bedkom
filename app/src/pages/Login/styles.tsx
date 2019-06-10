import styled from "styled-components";
import { darkBlue, grayBorder, redError } from "../../colors";

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

export const Info = styled.div`
  width: 35rem;
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Form = styled.form`
  width: 20rem;
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 0.75rem;
  }
`;

export const Instructions = styled.div`
  max-width: 80%;
  margin-top: 2rem;
`;
