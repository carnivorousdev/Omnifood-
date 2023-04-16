import React, { useState } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconCloseButton from 'components/common/FalconCloseButton';


const SearchBox = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  return (
    <Dropdown className="search-box">
      <Dropdown.Toggle
        as="div"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
        bsPrefix="toggle"
      >
        <Form className="position-relative">
          <Form.Control
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="rounded-pill search-input"
            value={searchInputValue}
            onChange={({ target }) => setSearchInputValue(target.value)}
            onClick={() => setDropdownOpen(false)}
          />
          <FontAwesomeIcon
            icon="search"
            className="position-absolute text-400 search-box-icon"
          />
          {searchInputValue && (
            <div
              className="search-box-close-btn-container"
            >
              <FalconCloseButton
                size="sm"
                noOutline
                onClick={() => setSearchInputValue('')}
              />
            </div>
          )}
        </Form>
      </Dropdown.Toggle>
    </Dropdown>
  );
};

export default SearchBox;
