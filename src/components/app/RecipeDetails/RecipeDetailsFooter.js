import React from 'react';
import { Tab, Nav, Row, Col, Table } from 'react-bootstrap';
import createMarkup from 'helpers/createMarkup';
import ReactYoutubePlayer from 'react-player/youtube';

const RecipeDetailsFooter = ({ CreatedRecipe:{
  strInstructions,
  ingredientsData,
  strSource
} }) => {

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
  return (
    <div className="overflow-hidden mt-4">
      <Tab.Container defaultActiveKey="instruction">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link
              eventKey="instruction"
              className="ps-0 cursor-pointer outline-none"
            >
              Instructions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="ingredientsData"
              className="px-2 px-md-3 cursor-pointer outline-none"
            >
              Ingredients
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="source"
              className="px-2 px-md-3 cursor-pointer outline-none"
            >
              Source
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="instruction">
            <div
              className="mt-3"
              dangerouslySetInnerHTML={createMarkup(strInstructions)}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="ingredientsData">
            <Table className="fs--1 mt-3" striped bordered >
              <tbody>
                {ingredientsData.map((ingredient, index) => (
                  <tr key={index}>
                    <td className="text-capitalize" style={{ width: '30%' }}>
                      {ingredient.strIngredient}
                    </td>
                    <td className='text-capitalize'>{ingredient.strMeasure}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab.Pane>
          <Tab.Pane eventKey="source">
            <Row className="mt-3">
              <Col lg={12} >
                <ReactYoutubePlayer
                  url={strSource}
                  opts={opts}
                  config={config}
                  controls={true}
                  className="react-player mt-3"
                />
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default RecipeDetailsFooter;
