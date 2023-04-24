import React, { useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import RecipeHeader from './RecipeHeader';
import RecipeBanner from './RecipeBanner';
import RecipeDetails from './RecipeDetails';
import RecipeOtherInfo from './RecipeOtherInfo';
import RecipeIngredients from './RecipeIngredients';

const CreateRecipe = () => {
  const { register, handleSubmit, setValue, formState: { errors }, control, reset, watch } = useForm({
    defaultValues: {
      strMeal: '',
      strSource: '',
      strMealThumb: '',
      strInstructions: '',
      strArea: null,
      strCategory: null,
    },
  });

  const onSubmit = data => {
    console.log(data);
    reset({});
  };

  useEffect(() => {
    document.title = "Omnifood | Create Recipe";
  }, [])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="g-3">
        <Col xs={12}>
          <RecipeHeader />
        </Col>
        <Col xs={12}>
          <RecipeBanner control={control} errors={errors} setValue={setValue} />
        </Col>
        <Col lg={8}>
          <RecipeDetails register={register} setValue={setValue} watch={watch} errors={errors} control={control} />
          <RecipeIngredients
            register={register}
            control={control}
            setValue={setValue}
            errors={errors}
            watch={watch}
          />
        </Col>
        <Col lg={4}>
          <div className="sticky-sidebar">
            <RecipeOtherInfo register={register} control={control} errors={errors} />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateRecipe;
