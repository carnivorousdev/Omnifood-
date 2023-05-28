import React from 'react';
import { useDropzone } from 'react-dropzone';
import Flex from 'components/common/Flex';
import cloudUpload from 'assets/img/illustrations/cloud-upload.svg';
import CardDropdown from 'components/common/CardDropdown';
import { getSize } from 'helpers/utils';
import { Card, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';

const RecipeUpload = ({ register, setValue, watch, errors }) => {

  const onDrop = (acceptedFiles) => {
    let newImages = [];
    if (watch('strRecipesImages').length + acceptedFiles.length <= 4) {
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
            watch('strRecipesImages').every((file) => file.path !== newFile.path && file.size !== newFile.size)
          ).filter(file => file.type.startsWith('image/'));
          setValue('strRecipesImages', [...watch('strRecipesImages'), ...newImages])
        }
      }
    } else {
      toast.error(`Maximum 4 images can be uploaded`, {
        theme: 'colored'
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop,
    disabled: watch('strRecipesImages').length >= 4,
    required: true
  });

  const handleRemove = path => {
    setValue('strRecipesImages', watch('strRecipesImages').filter(file => file.path !== path))
  };

  return (
    <Card>
      <Card.Header as="h5">Upload Recipe Images</Card.Header>
      <Card.Body className="bg-light">
        <div {...getRootProps({ className: 'dropzone-area py-6' })}>
          <input
            {...register("strRecipesImages", { required: '*Required' })}
            {...getInputProps()}
            className={`${watch('strRecipesImages').length >= 4 ? 'cursor-none' : 'cursor-pointer'}`}
          />
          <Flex justifyContent="center">
            <img src={cloudUpload} alt="" width={25} className="me-2" />
            <p className="fs-0 mb-0 text-700">*Drop your images here (Maximum 4)</p>
          </Flex>
        </div>
        {errors.strRecipesImages && <p className='fs--2 text-danger'>{errors.strRecipesImages.message}</p>}

        {watch('strRecipesImages').length > 0 && <div>
          {watch('strRecipesImages').map(file => (
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
