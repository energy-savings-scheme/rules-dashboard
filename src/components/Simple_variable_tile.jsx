import '../styles/simple_variable_tile.css';

export default function SimpleVariableTile(props) {
  return (
    <div>
      <div className="simple-var-tile-div">
        <div className="simple-var-tile-index-div">
          <span>{props.index}. </span>
        </div>
        <div>
          <p className="simple-var-tile-title">{props.varDescription}</p>
          <p className="simple-var-tile-subtext">{props.varID}</p>
        </div>
      </div>
    </div>
  );
}
