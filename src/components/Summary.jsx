import { useState } from 'react';
import '../styles/Summary.css';
import SubCategoryTile from './SubCategoryTile';

export default function Summary(props) {
  const [clicked, setClick] = useState(true);

  function handleClick() {
    setClick(!clicked);
  }

  return (
    <div>
      <div className={clicked ? 'summary-div expanded' : 'summary-div'} onClick={handleClick}>
        <p className="summary-subtitle">{props.subTitle}</p>

        <h3 className="summary-title">{props.sectionTitle}</h3>
        <p>
          <span className="summaryValue">{props.variableNumber} variables</span>{' '}
        </p>
      </div>

      <div className="summary-expansion-div">
        {clicked &&
          props.subCategories.map((subCat, index) => {
            return (
              <SubCategoryTile key={index} subRef={subCat.subLabel} title={subCat.activityName} />
            );
          })}
      </div>
    </div>
  );
}
