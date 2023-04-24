import React, { useState } from 'react';
import { Card, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import defaultBanner from 'assets/img/illustrations/meal-1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Controller } from 'react-hook-form';
import { getStorage, ref, uploadString } from "firebase/storage";

const RecipeBanner = ({ control, setValue }) => {
  const [selectedImage, setSelectedImage] = useState('')
  const [avatarLoader, setAvatarLoader] = useState(false)

  const storage = getStorage();

  return (
    <Card className="cover-image">
      <Image src={selectedImage ? selectedImage : defaultBanner} alt="..." className="card-img-top" />
      <Controller
        name="strMealThumb"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur } }) => (
          <div>
            {avatarLoader ? <Row className="g-0 w-100 h-100" >
              <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Spinner animation="border" variant="success" size='sm' />
              </Col>
            </Row> : <Form.Group controlId="formFile">
              <Form.Label className="cover-image-file-input">
                <FontAwesomeIcon icon="camera" className="me-2" />
                <span>*Provide image for recipe</span>
              </Form.Label>
              <Form.Control type="file" className="d-none"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const SignedInEmail = JSON.parse(localStorage.getItem('SignedInEmail'))
                    const userProfileAvatar = ref(storage, SignedInEmail + '/' + 'Added_Recipes_Images/' + file.name);
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      uploadString(userProfileAvatar, reader.result, 'data_url').then(() => {
                        setAvatarLoader(false)
                        onChange(reader.result);
                        setValue('fileName', file.name);
                        setSelectedImage(reader.result);
                      })
                    };
                  } else {
                    onChange("");
                  }
                }}
                onBlur={onBlur}
                accept="image/*"
              />
            </Form.Group>}
          </div>
        )}
      />
    </Card>
  );
};

export default RecipeBanner;
