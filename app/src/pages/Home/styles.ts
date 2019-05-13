import styled from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-areas: "next-presentation" "news";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;

export const NextPresentation = styled.div`
  grid-template: "next-presentation";
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const News = styled.div`
  grid-template: "news";
`;

export const Articles = styled.div`
  padding: 1rem;
  
  > div {
    margin-bottom: .5rem;
  }
`;

export const Title = styled.div`
  margin: 2rem;
  text-align: center;
  font-size: 1.25rem;
`;

export const Banner = styled.div`
  display: flex;
  margin: 2rem 0;
  
  img {
    height: 5rem;
  }
`;

export const Subtitle = styled.div`
  text-align: center;
  font-weight: 600;
  padding: 1rem;
  font-size: 1.1rem;
`;

export const Description = styled.div`
  height: 7rem;
  min-width: 0;
  margin: 0 4rem 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PresentationInfo = styled.div`
  margin-top: 2rem;
`;