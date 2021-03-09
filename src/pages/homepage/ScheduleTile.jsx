import React from 'react';
import { Link } from 'react-router-dom';

export default function ScheduleTile(props) {
  const { schedule } = props;
  return (
    <div className="nsw-col nsw-col-md-6">
      <div className="nsw-card ">
        <div className="nsw-card__content">
          <h2 className="nsw-card__title">
            <Link to={`schedules/${schedule.activityName}`} className="nsw-card__link">
              {schedule.activityName}
            </Link>
          </h2>
          <p className="nsw-card__copy">{schedule.description}</p>
          <svg className="nsw-icon nsw-card__icon" focusable="false" aria-hidden="true">
            <use xlinkHref="#arrow"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}
