import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/common/IconButton';
import React from 'react';
import {
  Button,
  Card,
  Form,
  FormControl,
  Table
} from 'react-bootstrap';
import SimpleBarReact from 'simplebar-react';


const RecipeIngredients = ({ register, control, errors, useFieldArray }) => {

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredientsData'
  });


  return (
    <Card className="mb-3">
      <Card.Header as="h5">Recipe Ingredients</Card.Header>
      <Card.Body className="bg-light">
        <SimpleBarReact>
          <Table className="bg-white mb-2 dark__bg-1100" bordered>
            <thead>
              <tr className="fs--1">
                <th scope="col">Ingredient</th>
                <th scope="col">Measurement</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="event-ticket-body">
              {fields.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Ingredient"
                      className='border border-0 border-200'
                      {...register(`ingredientsData.${index}.strIngredient`, {
                        required: true
                      })}
                    />
                    {errors?.ingredientsData?.[index]?.strIngredient?.type === 'required' && <p className='fs--2 text-danger'>*Required</p>}
                  </td>
                  <td>
                    <FormControl
                      size="sm"
                      type="text"
                      placeholder="Measurement"
                      className='border border-0 border-200'
                      {...register(`ingredientsData.${index}.strMeasure`, {
                        required: true
                      })}
                    />
                    {errors?.ingredientsData?.[index]?.strMeasure?.type === 'required' && <p className='fs--2 text-danger'>*Required</p>}
                  </td>
                  <td className="text-center align-middle">
                    {index > 0 && <Button variant="link" size="sm" onClick={() => remove(index)}>
                      <FontAwesomeIcon className="text-danger" icon="times-circle" />
                    </Button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </SimpleBarReact>
        <IconButton
          onClick={() => append({ strIngredient: '', strMeasure: '' })}
          variant="falcon-default"
          size="sm"
          icon="plus"
          transform="shrink-3"
        >
          Add Ingredient
        </IconButton>
      </Card.Body>
    </Card>
  );
};


export default RecipeIngredients;
