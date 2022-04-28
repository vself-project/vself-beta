/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface FileImageComponentProps {
  file: File;
  height?: number;
  width?: number;
  className?: string;
}
const FileImageComponent: React.FC<FileImageComponentProps> = ({ file, height, width, className }) => {
  return <img src={URL.createObjectURL(file)} alt="" height={height} width={width} className={className} />;
};

export default FileImageComponent;
