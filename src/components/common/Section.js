import React from 'react';
import classNames from 'classnames';
import Background from './Background';
import { Container } from 'react-bootstrap';

const Section = ({
  fluid,
  bg,
  image,
  overlay,
  position,
  video,
  bgClassName,
  className,
  children,
  ...rest
}) => {
  const bgProps = { image, overlay, position, video };
  bgClassName && (bgProps.className = bgClassName);

  return (
    <section className={classNames({ [`bg-${bg}`]: bg }, className)} {...rest}>
      {image && <Background {...bgProps} />}
      <Container fluid={fluid}>{children}</Container>
    </section>
  );
};
Section.defaultProps = {
  fluid: false
};

export default Section;
