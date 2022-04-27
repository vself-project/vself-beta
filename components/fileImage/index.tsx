/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface FileImageComponentProps {
  file: File;
  height?: number;
  width?: number;
}
const FileImageComponent: React.FC<FileImageComponentProps> = ({ file, height, width }) => {
  return <img src={URL.createObjectURL(file)} alt="" height={height} width={width} />;
};

export default FileImageComponent;
