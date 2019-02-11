import React from 'react';
import { PropTypes } from 'prop-types';

const Opportunity = ({
  title, location, duration, programmes, coverPhotoUrl, onClick,
}) => (
  <li className="Opportunity" onClick={() => onClick()}>
    <div className="Opp-header">
      <h2>{title}</h2>
    </div>
    <div className="App-intro">
      <p>{location}</p>
      <p>
        {duration}
        {' weeks'}
      </p>
      <p>{programmes.short_name}</p>
      <p>
        <img src={coverPhotoUrl} alt="" />
      </p>
    </div>
  </li>
);

Opportunity.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  branch: PropTypes.shape({
    organisation: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  programmes: PropTypes.shape({
    id: PropTypes.number.isRequired,
    short_name: PropTypes.string.isRequired,
  }).isRequired,
  coverPhotoUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Opportunity;
