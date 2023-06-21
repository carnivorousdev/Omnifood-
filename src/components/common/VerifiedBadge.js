import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VerifiedBadge = ({ placement = 'top' }) => {
  return (
    <OverlayTrigger placement={placement} overlay={<Tooltip>Verified</Tooltip>}>
      <span>
        <FontAwesomeIcon
          icon="check-circle"
          transform="shrink-4 down-2"
          className="text-primary"
        />
      </span>
    </OverlayTrigger>
  );
};

export default VerifiedBadge;
