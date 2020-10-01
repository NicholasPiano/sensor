import React, { FunctionComponent, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

import { TSensor } from '../../types';
import StyledDropzone from './Dropzone.style';

interface IDropzoneProps {
  onAppendData: (data: TSensor[]) => void;
}

const Dropzone: FunctionComponent<IDropzoneProps> = ({
  onAppendData,
}) => {
  const onDrop = useCallback(acceptedFiles => {
    if (!isEmpty(acceptedFiles)) {
      acceptedFiles.forEach(
        (file: File) => {
          const reader = new FileReader()

          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');
          reader.onload = () => {
            const getResult = () => {
              const { result } = reader;

              if (!result || !isString(result)) {
                return null;
              }

              return result;
            };
            const result = getResult();

            if (result) {
              const data = JSON.parse(result);

              onAppendData(data);
            }
          }
          reader.readAsText(file);
        },
      );
    }
  }, [onAppendData]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/json',
  });

  return (
    <StyledDropzone {...getRootProps()}>
      <input {...getInputProps()} />
      {(
        isDragActive
          ? 'Drop files here...'
          : 'Drag and drop or click to select files'
      )}
    </StyledDropzone>
  );
};

export default Dropzone;
