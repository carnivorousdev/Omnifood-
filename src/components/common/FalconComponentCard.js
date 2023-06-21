import React from 'react';
import { Card, Tab, Row, Col} from 'react-bootstrap';
import classNames from 'classnames';
import Flex from './Flex';
import { camelize } from '../../helpers/utils';

const FalconComponentCardHeader = ({
  light,
  className,
  title,
  children,
}) => {

  return (
    <Card.Header className={classNames({ 'bg-light': light }, className)}>
      <Row className="align-items-end g-2">
        <Col>
          {title && (
            <Flex>
              <h5 className="mb-0 hover-actions-trigger" id={camelize(title)}>
              </h5>
            </Flex>
          )}
          {children}
        </Col>
      </Row>
    </Card.Header>
  );
};

const FalconComponentCard = ({
  children,
  multiSections,
  noGuttersBottom,
  ...rest
}) => {
  return (
    <Card className={classNames({ 'mb-3': !noGuttersBottom })} {...rest}>
      {multiSections ? (
        <>{children}</>
      ) : (
        <Tab.Container defaultActiveKey="preview">{children}</Tab.Container>
      )}
    </Card>
  );
};

FalconComponentCard.Header = FalconComponentCardHeader;


export default FalconComponentCard;
