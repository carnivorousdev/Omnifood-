import React from 'react';
import Flex from 'components/common/Flex';
import MultiSelect from 'components/common/MultiSelect';
import { Card, Form, Button } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

const RecipeOtherInfo = ({ control }) => {
  const organizerOptions = [
    { value: '1', label: ' Massachusetts Institute of Technology' },
    { value: '2', label: 'University of Chicago' },
    { value: '3', label: 'GSAS Open Labs At Harvard' },
    { value: '4', label: 'California Institute of Technology' }
  ];
  const sponsorsOptions = [
    { value: '1', label: 'Microsoft Corporation' },
    { value: '2', label: 'Technext Limited' },
    { value: '3', label: ' Hewlett-Packard' }
  ];

  return (
    <Card>
      <Card.Header as="h5">Other Info</Card.Header>
      <Card.Body className="bg-light">
        <Form.Group>
          <Flex className="flex-between-center">
            <Form.Label>Category</Form.Label>
            <Button size="sm" variant="link" className="p-0">
              Add new
            </Button>
          </Flex>
          <Controller
            name="strCategory"
            render={({ ref, field }) => (
              <MultiSelect
                {...field}
                ref={ref}
                closeMenuOnSelect={false}
                isMulti
                options={organizerOptions}
                className='border border-0 border-200 cursor-pointer'
                placeholder="Select Category"
              />
            )}
            control={control}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Flex className="flex-between-center">
            <Form.Label>Area</Form.Label>
            <Button size="sm" className="p-0" variant="link">
              Add new
            </Button>
          </Flex>
          <Controller
            name="strArea"
            render={({ ref, field }) => (
              <MultiSelect
                ref={ref}
                {...field}
                closeMenuOnSelect={false}
                isMulti
                options={sponsorsOptions}
                className='border border-0 border-200 cursor-pointer'
                placeholder="Select Area"
              />
            )}
            control={control}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default RecipeOtherInfo;
