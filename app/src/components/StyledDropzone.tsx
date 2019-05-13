import * as React from 'react';
import styled from 'styled-components';
import {DropzoneRootProps, DropzoneState, useDropzone} from 'react-dropzone';

interface StyledDropzoneProps {
  accept: string;
  multiple?: boolean;
  onDropAccepted(files: File[]): void;

  placeholder: string;
  showImage?: boolean;
}

const getColor = (props: DropzoneState) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div<DropzoneRootProps & DropzoneState>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  cursor: pointer;
  
  img {
    max-height: 4rem;
    max-width: 15rem;
  }
`;

const StyledDropzone: React.FC<StyledDropzoneProps> = ({placeholder, showImage, ...props}) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({...props});
  const gotImage = showImage && acceptedFiles.length === 1;

  return (
    <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
      <input {...getInputProps()} />
      {gotImage ? (
        <p><img src={URL.createObjectURL(acceptedFiles[0])} alt='Banner'/></p>
      ) : (
        <p>{placeholder}</p>
      )}
    </Container>
  );
};

export default StyledDropzone;