import React, { Fragment } from 'react';

import Summary from 'components/Summary';
import VariableSearchBar from 'components/searchbar/VariableSearchBar';

import variable_tree from 'services/variable_tree.json';

export default function Homepage(props) {
  const { entities, sortedVar, variables } = props;

  return (
    <Fragment>
      {/* Search section */}
      <div className="nsw-container">
        <div className="nsw-row">
          <div className="nsw-col">
            <h2>Energy Savings Scheme Rule of 2019</h2>
            <h3>
              Search a term below to find more information on related methods and requirements
            </h3>
            <VariableSearchBar variables={variables} />
          </div>
        </div>
      </div>

      <div className="nsw-container">
        <h3>Click below to get more details on each Schedule</h3>

        {variable_tree.map((majorCat) => {
          let subLengthList = Object.values(sortedVar[majorCat.majorLabel]).map(
            (list) => list.length,
          );
          const cumSum = (accumulator, currentValue) => accumulator + currentValue;

          const totalNum = subLengthList.reduce(cumSum);

          return (
            <Summary
              key={majorCat.majorLabel}
              total={totalNum}
              sectionTitle={majorCat.activityName}
              subTitle={majorCat.reference}
              subCategories={majorCat.subCategories}
              majorList={sortedVar[majorCat.majorLabel]}
            />
          );
        })}
      </div>
    </Fragment>
  );
}
