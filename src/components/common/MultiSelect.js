import React, { forwardRef } from 'react';
import Select from 'react-select';

const MultiSelect = forwardRef(({ options, placeholder, ...rest }, ref) => {
  return (
    <Select
      ref={ref}
      closeMenuOnSelect={false}
      isMulti
      options={options}
      placeholder={placeholder}
      classNamePrefix="react-select"
      {...rest}
    />
  );
});


export default MultiSelect;
