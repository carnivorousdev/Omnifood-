import React, { useEffect, useState, useContext } from 'react';
import { Form, Dropdown, Badge, Row, Col, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Avatar from 'components/common/Avatar';
import Flex from 'components/common/Flex';
import FalconCloseButton from 'components/common/FalconCloseButton';
import axios from 'axios';
import AppContext from 'context/Context';

const MediaSearchContent = ({ item }) => {
  const DefaultMeal = 'https://i.ibb.co/NZZ2pVN/gallery-6.webp'
  return (
    <Dropdown.Item className="px-card py-2" as={Link} to={`/mealdetails/${item.idMeal}`}>
      <Row>
        <Col sm={2}>
          {item.strMealThumb ? (
            <Avatar src={item.strMealThumb} size="2xl" />
          ) : (
            <Avatar src={DefaultMeal} size="2xl" />
          )}
        </Col>
        <Col sm={10}>
          <div>
            <OverlayTrigger
              key='top'
              placement='top'
              overlay={
                <Tooltip id={item.idMeal}>
                  {item.strMeal}
                </Tooltip>
              }
            >
              <h6 className='mb-1 text-truncate'>{item.strMeal}</h6>
            </OverlayTrigger>
            <div>
              <Badge pill bg="info" className="me-2">
                {item.strCategory}
              </Badge>

              {item.strArea.toString().toLowerCase() != 'unknown' &&
                <Badge pill bg="success">
                  {item.strArea}
                </Badge>
              }
            </div>
          </div>
        </Col>
      </Row>

    </Dropdown.Item>
  );
};

const SearchBox = () => {
  const {
    loading
  } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [resultItem, setResultItem] = useState([]);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const [autoCompleteData, setAutoCompleteData] = useState([])
  const [autoCompleteDataLoading, setAutoCompleteDataLoading] = useState(false)


  const makeid = (length) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  useEffect(() => {
    if (searchInputValue.length > 0) {
      return
    } else {
      getFetchedAutoSuggestedData()
    }
  }, [dropdownOpen])

  const getFetchedAutoSuggestedData = () => {
    setResultItem([])
    setAutoCompleteDataLoading(true)
    axios.get(process.env.REACT_APP_BASE_URL + `search.php?f=${makeid(1)}`)
      .then(res => {
        if (res.data.meals.length > 0) {
          setAutoCompleteData(res.data.meals)
          setAutoCompleteDataLoading(false)
        } else {
          setAutoCompleteDataLoading(false)
          getFetchedAutoSuggestedData()
        }
      }).catch(() => {
        setAutoCompleteDataLoading(false)
        setDropdownOpen(!dropdownOpen);
      })
  }
  useEffect(() => {
    if (searchInputValue.length > 0) {
      setAutoCompleteData([])
      setAutoCompleteDataLoading(true)
      axios.get(process.env.REACT_APP_BASE_URL + `search.php?s=${searchInputValue}`)
        .then(res => {
          if (res.data.meals) {
            setResultItem(res.data.meals)
            setAutoCompleteDataLoading(false)
          } else {
            setResultItem([])
            setAutoCompleteDataLoading(false)
          }
        }).catch(() => {
          setAutoCompleteDataLoading(false)
        })
    } else if (searchInputValue.length == 0) {
      getFetchedAutoSuggestedData()
    }
    else return
  }, [searchInputValue])

  return (
    <Dropdown onToggle={toggle} className="search-box">
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
            disabled={loading}
            aria-label="Search"
            className="rounded-pill search-input"
            value={searchInputValue}
            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
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
      <Dropdown.Menu>
        {autoCompleteDataLoading ? <Row className="g-0">
          <Col xs={12} className="w-100 h-100 my-3">
            <Flex className="align-items-center justify-content-center">
              <Spinner animation="border" variant="warning" size="sm" />
            </Flex>
          </Col>
        </Row> : <div className="scrollbar py-3" style={{ maxHeight: '24rem' }}>
          {resultItem.length > 0 && searchInputValue.length > 0 ? <Dropdown.Header as="h6" className="px-card pt-0 pb-2 fw-medium">
            <span as="h6" className="text-warning fw-medium">{resultItem.length}</span> meals found
          </Dropdown.Header> : ''}
          {resultItem.length > 0 ? resultItem.map(item => (
            <MediaSearchContent item={item} key={item.idMeal} />
          )) : autoCompleteData.map(item => (
            <MediaSearchContent item={item} key={item.idMeal} />
          ))}
          {resultItem.length === 0 && searchInputValue.length > 0 && (
            <p className="fs-1 fw-bold text-center mb-0">No Result Found.</p>
          )}
        </div>}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchBox;
