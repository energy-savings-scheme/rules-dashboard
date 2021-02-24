import { useEffect, useState } from 'react';
import '../styles/sub-cat-tile.css';
import VariableTile from './variable_tile.jsx';

export default function SubCategoryTile(props) {
  const [clicked, setClick] = useState(false);

  const handleClick = () => {
    setClick(!clicked);
  };

  useEffect(() => {
    // setNumVar(props.varList.length);
  }, []);

  return (
    <div>
      <div className="sub-cat-tile-div" onClick={handleClick}>
        <div className="title-div">{`${props.subRef} - ${props.title}`}</div>
        <div className="sub-title">
          <p className="sub-title">{props.varLength} variables</p>
        </div>
      </div>
      <div>
        {clicked &&
          props.varList.map((item, index) => {
            return <VariableTile key={item} index={index + 1} varID={item} />;
          })}
      </div>
    </div>
  );
}
