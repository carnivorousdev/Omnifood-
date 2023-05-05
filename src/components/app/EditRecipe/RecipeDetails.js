import TinymceEditor from 'components/common/TinymceEditor';
import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import ReactYoutubePlayer from 'react-player/youtube';

const RecipeDetails = ({ register, watch, errors, control, editorKey }) => {
  const config = {
    youtube: {
      playerVars: {
        modestbranding: 1,
        disableAds: 1,
        origin: window.location.origin
      },
    },
  };

  const opts = {
    playerVars: {
      origin: window.location.origin
    }
  };
  const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

  return (
    <Card className="mb-3">
      <Card.Header as="h5">Recipe Details</Card.Header>
      <Card.Body className="bg-light">
        <Row className="gx-2 gy-3">
          <Col md="12">
            <Form.Group controlId="strMeal">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="strMeal"
                className='border border-0 border-200'
                placeholder="Recipe Title"
                isInvalid={!!errors.strMeal}
                {...register('strMeal', {
                  required: '*Required',
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.strMeal && errors.strMeal.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="12">
            <Form.Group controlId="strSource">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="url"
                name="strSource"
                className='border border-0 border-200'
                placeholder="Provide a youtube URL"
                isInvalid={!!errors.strSource}
                {...register('strSource', {
                  required: '*Required',
                  pattern: {
                    value:
                      /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
                    message: 'URL must be valid'
                  }
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.strSource && errors.strSource.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="12">
            <div className="border-dashed-bottom"></div>
          </Col>
          {youtubeRegex.test(watch('strSource')) ? <ReactYoutubePlayer
            url={watch('strSource')}
            controls={true}
            opts={opts}
            config={config}
            className="react-player mt-3 mb-2 shadow"
          /> : ''}
          <Col md="12">
            <Form.Group controlId="strInstructions">
              <Form.Label>Instructions</Form.Label>
              <div className={`border border-0 border-${watch('strInstructions') ? 200 : 'danger'} cursor-pointer`}>
                <Controller
                  name="strInstructions"
                  control={control}
                  rules={{ required: '*Required' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                      <TinymceEditor
                        key={editorKey}
                        initialValue="<p>Write instructions for the recipe</p>"
                        handleChange={onChange}
                        value={value}
                      />
                      {error && <p className='fs--2 text-danger'>{error.message}</p>}
                    </>
                  )}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};


export default RecipeDetails;
