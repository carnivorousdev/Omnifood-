import React, { useContext } from 'react';
import { Card, Col, Row, Spinner, Dropdown } from 'react-bootstrap';
import Event from './BookMark';
import Flex from 'components/common/Flex';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/common/IconButton';
import AppContext from 'context/Context';
import { useEffect } from 'react';

const InboxFilterDropdownItem = ({ active, children, ...rest }) => (
  <Dropdown.Item
    href="#!"
    as={Flex}
    justifyContent="between"
    className="text-capitalize cursor-pointer"
    {...rest}
  >
    {children.strArea}
    {active && <FontAwesomeIcon icon="check" transform="down-4 shrink-4" />}
  </Dropdown.Item>
);

const AllBookMarksList = () => {
  const [filteredData, setFilteredData] = useState([])
  const [currentFilter, setCurrentFilter] = useState()
  const { showBookMarks, loading } = useContext(AppContext);


  const handleSelect = (filter) => {
    const filteredArray = _.filter(showBookMarks, { 'strArea': filter.strArea });
    if (filteredArray.length > 0) {
      setFilteredData(filteredArray)
    } else {
      toast.info(`No matching items found`, {
        theme: 'colored'
      });
    }
  }

  useEffect(() => {
    document.title = "Omnifood | All Bookmarks";
  }, [])


  return (
    <>
      {loading ? <Row className="g-0 w-100 h-100" >
        <Col xs={12} className='d-flex align-items-center justify-content-center' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <Spinner animation="border" variant="success" size='sm' />
        </Col>
      </Row> :
        <Card>
          <Card.Header
            as={Flex}
            justifyContent="between"
            alignItems="center"
            className="bg-light"
          >
            <h5 className="mb-0">All Bookmarks</h5>
            <Row className="align-items-center">
              <Col as={Flex} className="align-items-center">
                <IconButton
                  variant="falcon-default"
                  size="sm"
                  className="ms-sm-1 text-success"
                  icon="redo"
                  onClick={() => {
                    setFilteredData([]);
                    setCurrentFilter()
                  }}
                />
                <Dropdown className="font-sans-serif">
                  <Dropdown.Toggle
                    variant="falcon-default"
                    size="sm"
                    className="text-600 dropdown-caret-none ms-2 align-center"
                  >
                    <FontAwesomeIcon icon="sliders-h" className='text-warning' />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="py-2" align='start'>
                    {showBookMarks.map(filter => (
                      <InboxFilterDropdownItem
                        active={filter.idMeal === currentFilter}
                        key={filter.idMeal}
                        onClick={() => {
                          setCurrentFilter(filter.idMeal)
                          handleSelect(filter)
                        }}
                      >
                        {filter}
                      </InboxFilterDropdownItem>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

          </Card.Header>
          <Card.Body className="fs--1">
            <Row>
              {filteredData.length > 0 ? filteredData.map((event, index) => (
                <Col key={event.idMeal} md={6} className="h-100">
                  <Event details={event} isLast={index === showBookMarks.length - 1} />
                </Col>
              )) : showBookMarks.map((event, index) => (
                <Col key={event.idMeal} md={6} className="h-100">
                  <Event details={event} isLast={index === showBookMarks.length - 1} />
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      }
    </>
  );
};

export default AllBookMarksList;
