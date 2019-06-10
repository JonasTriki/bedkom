import styled from "styled-components";

interface SectionProps {
  excludeMenu?: boolean;
}

const Section = styled.div<SectionProps>`
  min-height: ${(props: SectionProps) =>
    props.excludeMenu ? "calc(100vh - 5rem)" : "100vh"};
  display: flex;
  flex-direction: column;
`;

export default Section;
