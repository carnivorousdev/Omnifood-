import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/common/IconButton';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Form,
  FormControl,
  Table
} from 'react-bootstrap';
import SimpleBarReact from 'simplebar-react';

const IngredientRow = ({
  strIngredient,
  strMeasure,
  id,
  handleChange,
  handleRemove
}) => {
  return (
    <tr>
      <td>
        <Form.Control
          size="sm"
          type="text"
          placeholder="Ingredient"
          value={strIngredient}
          className='border border-0 border-200'
          onChange={({ target }) => handleChange(id, 'strIngredient', target.value)}
        />
      </td>
      <td>
        <FormControl
          size="sm"
          type="text"
          placeholder="Measurement"
          value={strMeasure}
          className='border border-0 border-200'
          onChange={({ target }) => handleChange(id, 'strMeasure', target.value)}
        />
      </td>
      <td className="text-center align-middle">
        {id > 2 && <Button variant="link" size="sm" onClick={() => handleRemove(id)}>
          <FontAwesomeIcon className="text-danger" icon="times-circle" />
        </Button>}
      </td>
    </tr>
  );
};

const RecipeIngredients = () => {
  const [ingredientsData, setIngredientsData] = useState([
    { strIngredient: '', strMeasure: '' },
    { strIngredient: '', strMeasure: '' },
    { strIngredient: '', strMeasure: '' },
  ]);

  const handleChange = (id, name, value) => {
    const updatedIngredient = { ...ingredientsData[id], [name]: value };
    setIngredientsData([
      ...ingredientsData.slice(0, id),
      updatedIngredient,
      ...ingredientsData.slice(id + 1)
    ]);
  };

  const handleRemove = id =>
    setIngredientsData([...ingredientsData.slice(0, id), ...ingredientsData.slice(id + 1)]);

  const handleAdd = () => {
    setIngredientsData([...ingredientsData, { strIngredient: '', strMeasure: '' }]);
  };

  return (
    <Card>
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
              {ingredientsData.map((item, index) => (
                <IngredientRow
                  {...item}
                  id={index}
                  key={index}
                  handleChange={handleChange}
                  handleRemove={handleRemove}
                />
              ))}
            </tbody>
          </Table>
        </SimpleBarReact>
        <IconButton
          onClick={handleAdd}
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
