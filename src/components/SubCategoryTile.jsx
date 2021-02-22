
import "../styles/sub-cat-tile.css"

export default function SubCategoryTile(props) {

    var number_variables = 7;

    return (

        <div className="sub-cat-tile-div">
            <div className="title-div">
                {`${props.subRef} - ${props.title}`}
            </div>
            <div className="sub-title">
                <p className="sub-title">{number_variables} variables</p>
            </div>
        </div >

    );

}