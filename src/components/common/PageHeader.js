import React from 'react';
import classNames from 'classnames';
import { Card, Col, Row } from 'react-bootstrap';
import Background from './Background';
import createMarkup from 'helpers/createMarkup';

const PageHeader = ({
  title,
  preTitle,
  titleTag: TitleTag,
  description,
  image,
  col,
  children,
  ...rest
}) => (
  <Card {...rest}>
    <Background
      image={image}
      className="bg-card"
      style={{
        borderTopRightRadius: '0.375rem',
        borderBottomRightRadius: '0.375rem'
      }}
    />
    <Card.Body className="position-relative">
      <Row>
        <Col {...col}>
          {preTitle && <h6 className="text-600">{preTitle}</h6>}
          <TitleTag className="mb-0">{title}</TitleTag>
          {description && (
            <p
              className={classNames('mt-2', { 'mb-0': !children })}
              dangerouslySetInnerHTML={createMarkup(description)}
            />
          )}
          {children}
        </Col>
      </Row>
    </Card.Body>
  </Card>
);


PageHeader.defaultProps = {
  col: { lg: 8 },
  image: 'https://i.ibb.co/HY5tFg7/corner-4.webp',
  titleTag: 'h3'
};

export default PageHeader;
