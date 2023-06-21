import React, { useContext } from 'react';
import { CloseButton } from 'react-bootstrap';
import classNames from 'classnames';
import AppContext from 'context/Context';

const FalconCloseButton = ({
  size,
  onClick,
  noOutline,
  variant,
  className,
  ...rest
}) => {
  const {
    config: { isDark }
  } = useContext(AppContext);
  return (
    <CloseButton
      variant={variant ? variant : isDark ? 'white' : undefined}
      className={classNames(className, {
        [`btn-${size}`]: size,
        'outline-none': noOutline
      })}
      onClick={onClick && onClick}
      {...rest}
    />
  );
};


export default FalconCloseButton;
