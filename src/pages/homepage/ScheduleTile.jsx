import React from 'react';

import Card, { CardCopy } from 'nsw-ds-react/card/card';

export default function ScheduleTile(props) {
  const { schedule } = props;

  return (
    <div className="nsw-col nsw-col-md-6">
      <Card headline={schedule.activityName} link={`/schedules/${schedule.activityName}`}>
        <CardCopy>{schedule.description}</CardCopy>
      </Card>
    </div>
  );
}
