import React from 'react';
import {
  Card,
  Row,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import ProductList from './ProductList';
import usePagination from 'hooks/usePagination';

const Products = ({ ShowCaseData }) => {
  const {
    paginationState: {
      data: paginatedProducts,
      currentPage,
      canNextPage,
      canPreviousPage,
      paginationArray,
    },
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(ShowCaseData);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row
          className='g-4'
        >
          {paginatedProducts.map((product) =>
            <ProductList product={product} key={product.idMeal} />
          )}
        </Row>
      </Card.Body>
      <Card.Footer
        className='d-flex justify-content-center border-top'
      >
        <div>
          <Button
            variant="falcon-default"
            size="sm"
            disabled={!canPreviousPage}
            onClick={prevPage}
            className="me-2"
            trigger="focus"
          >
            <FontAwesomeIcon icon="chevron-left" />
          </Button>
        </div>

        <ul className="pagination mb-0">
          {paginationArray.map(page => (
            <li
              key={page}
              className={classNames({ active: currentPage === page })}
            >
              <Button
                size="sm"
                variant="falcon-default"
                className="page me-2"
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            </li>
          ))}
        </ul>
        <div>
          <Button
            variant="falcon-default"
            size="sm"
            disabled={!canNextPage}
            onClick={nextPage}
            trigger="focus"
          >
            <FontAwesomeIcon icon="chevron-right" />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Products;
