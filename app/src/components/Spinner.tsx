import * as React from 'react';
import styled from "styled-components";
import loading from '../images/loading.svg';

interface SpinnerProps {
  size: string;
}

const StyledImg = styled.img<SpinnerProps>`
  width: ${(props: SpinnerProps) => props.size};
  height: ${(props: SpinnerProps) => props.size};
`;

export const Spinner: React.FC<SpinnerProps> = (props) => (
  <StyledImg src={loading} {...props} />
);