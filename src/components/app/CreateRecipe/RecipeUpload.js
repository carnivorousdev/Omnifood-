import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Flex from 'components/common/Flex';
import cloudUpload from 'assets/img/icons/cloud-upload.svg';
import CardDropdown from 'components/common/CardDropdown';
import { getSize } from 'helpers/utils';
import { Card, Dropdown } from 'react-bootstrap';

const RecipeUpload = ({ register, setValue }) => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    let newImages = [];
    if (files.length + acceptedFiles.length <= 5) {
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          newImages.push({
            preview: reader.result,
            size: file.size,
            path: file.path,
            type: file.type
          });
          newImages = newImages.filter((newFile) =>
            files.every((file) => file.path !== newFile.path && file.size !== newFile.size)
          );
          setValue('strRecipesImages', [...files, ...newImages])
          setFiles([...files, ...newImages]);
        }
      }
    } else {
      toast.error(`Maximum 5 images can be uploaded`, {
        theme: 'colored'
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop,
    disabled: files.length >= 5,
    required: true
  });

  const handleRemove = path => {
    setValue('strRecipesImages', files.filter(file => file.path !== path))
    setFiles(files.filter(file => file.path !== path));
  };

  return (
    <Card className="mb-3">
      <Card.Header as="h5">Upload Recipe Images</Card.Header>
      <Card.Body className="bg-light">
        <div {...getRootProps({ className: 'dropzone-area py-6' })}>
          <input
            {...register("strRecipesImages")}
            {...getInputProps()}
            className={`${files.length >= 5 ? 'cursor-none' : 'cursor-pointer'}`}
          />
          <Flex justifyContent="center">
            <img src={cloudUpload} alt="" width={25} className="me-2" />
            <p className="fs-0 mb-0 text-700">*Drop your images here (Maximum 5)</p>
          </Flex>
        </div>
        {files.length > 0 && <div>
          {files.map(file => (
            <Flex
              alignItems="center"
              className="py-3 border-bottom btn-reveal-trigger"
              key={file.path}
            >
              <img
                className="rounded"
                width={40}
                height={40}
                src={file.preview}
                alt={file.path}
              />

              <Flex
                justifyContent="between"
                alignItems="center"
                className="ms-3 flex-1"
              >
                <div>
                  <h6>{file.path}</h6>
                  <Flex className="position-relative" alignItems="center">
                    <p className="mb-0 fs--1 text-400 line-height-1">
                      <strong>{getSize(file.size)}</strong>
                    </p>
                  </Flex>
                </div>
              </Flex>
              <CardDropdown>
                <div className="py-2">
                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => handleRemove(file.path)}
                  >
                    Remove
                  </Dropdown.Item>
                </div>
              </CardDropdown>
            </Flex>
          ))}
        </div>}
      </Card.Body>
    </Card>
  );
};


export default RecipeUpload;
