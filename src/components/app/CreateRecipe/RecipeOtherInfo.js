import React, { useEffect, useState, useContext } from 'react';
import MultiSelect from 'components/common/MultiSelect';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import axios from 'axios';
import { RecipeContext } from 'context/ReciepeProvider';
import AppContext from 'context/Context';

const RecipeOtherInfo = ({ control, register, errors, watch }) => {
  const { handleShow } = useContext(RecipeContext);
  const { recipeInfoData } = useContext(AppContext);

  const [LocalAreaData, setLocalAreaData] = useState([])
  const [LocalCategoryData, setLocalCategoryData] = useState([])
  const [LocalTagData, setLocalTagData] = useState([])


  const getCategoryData = () => {
    axios.get(process.env.REACT_APP_BASE_URL + `categories.php`)
      .then(res => {
        if (res.data.categories) {
          let fetchedData = res.data.categories.map((ele) => {
            return {
              value: ele.idCategory,
              label: ele.strCategory
            }
          })
          setLocalCategoryData([...fetchedData, ...recipeInfoData.RecipeInfoData.CategoryData])
        } else {
          setLocalCategoryData([])
        }
        setLocalTagData(recipeInfoData.RecipeInfoData.TagData)
      }).catch(() => {
        setLocalCategoryData([])
      })
  }

  const getAreaData = () => {
    axios.get(process.env.REACT_APP_BASE_URL + `list.php?a=list`)
      .then(res => {
        if (res.data.meals) {
          let fetchedData = res.data.meals.map((ele, index) => {
            return {
              value: index + '-' + ele.strArea,
              label: ele.strArea
            }
          }).filter((ele) => ele.label != 'Unknown')

          setLocalAreaData([...fetchedData, ...recipeInfoData.RecipeInfoData.AreaData])
        } else {
          setLocalAreaData([])
        }
      }).catch(() => {
        setLocalAreaData([])
      })
  }

  useEffect(() => {
    if (Object.keys(recipeInfoData).length > 0) {
      getCategoryData()
      getAreaData()
    }
  }, [recipeInfoData])


  const getRadioColor = (value) => {
    if (watch('mealType') === value) {
      return value === "veg" ? "success" : "danger";
    }
    return "lightgrey";
  };


  return (
    <Card>
      <Card.Header as="h5">Other Info</Card.Header>
      <Card.Body className="bg-light">
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Controller
            name="strCategory"
            rules={{
              required: "*Required",
              validate: value => {
                return value.length <= 5 || "You can select up to 5 options";
              }
            }}
            defaultValue={[]}
            render={({ ref, field, fieldState: { error } }) => (
              <>
                <MultiSelect
                  {...field}
                  ref={ref}
                  closeMenuOnSelect={false}
                  isMulti
                  options={LocalCategoryData}
                  className='border border-0 border-200 cursor-pointer'
                  placeholder="Select Category"
                />
                {error && <p className='fs--2 text-danger'>{error.message}</p>}
              </>

            )}
            control={control}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Area</Form.Label>
          <Controller
            name="strArea"
            rules={{
              required: "*Required",
              validate: value => {
                return value.length <= 5 || "You can select up to 5 options";
              }
            }}
            defaultValue={[]}
            render={({ ref, field, fieldState: { error } }) => (
              <>
                <MultiSelect
                  ref={ref}
                  {...field}
                  closeMenuOnSelect={false}
                  isMulti
                  options={LocalAreaData}
                  className='border border-0 border-200 cursor-pointer'
                  placeholder="Select Area"
                />
                {error && <p className='fs--2 text-danger'>{error.message}</p>}
              </>
            )}
            control={control}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Controller
            name="strTags"
            rules={{
              required: "*Required",
              validate: value => {
                return value.length <= 10 || "You can select up to 10 options";
              }
            }}
            defaultValue={[]}
            render={({ ref, field, fieldState: { error } }) => (
              <>
                <MultiSelect
                  {...field}
                  ref={ref}
                  closeMenuOnSelect={false}
                  isMulti
                  options={LocalTagData}
                  placeholder="Select Tags"
                  className='border border-0 border-200 cursor-pointer'
                />
                {error && <p className='fs--2 text-danger'>{error.message}</p>}
              </>
            )}
            control={control}
          />
        </Form.Group>
        <h6>Type </h6>
        <div className="border-dashed-bottom mb-3"></div>

        <InputGroup className='d-flex align-items-end gap-5'>
          <Form.Check
            type="radio"
            name="mealType"
            id="veg"
            value="veg"
            label="Veg"
            className={`text-${getRadioColor("veg")}`}
            {...register("mealType", { required: true })}
            isInvalid={errors.mealType}

          />
          <Form.Check
            type="radio"
            value="nonVeg"
            label="Non-Veg"
            id="nonVeg"
            className={`text-${getRadioColor("nonVeg")}`}
            isInvalid={errors.mealType}
            {...register("mealType", { required: true })}
          />
          {errors.mealType && <Form.Control.Feedback type="invalid">*Required</Form.Control.Feedback>}
        </InputGroup>
        <div className="border-dashed-bottom mb-3"></div>
        <Button variant="falcon-primary" size="sm" onClick={handleShow}>
          Add <span className="d-none d-sm-inline">new info</span>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RecipeOtherInfo;
