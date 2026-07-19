import { Link } from "react-router-dom";
import "./index.css";

const FoodItem = (props) => {
  const { FoodDetails } = props;
  const { category,name, description, image,servings,isVeg } = FoodDetails;
  const isveg = isVeg ? <p className="food-type-veg">VEG</p> : <p className="food-type-non-veg">NON-VEG</p>;
  return (
    <Link className="link" to={`/food-item/${FoodDetails.id}`}>     
    <div className="food-item">
      <img src={image} alt={name} className="food-image" />
      {isveg}
      <div className="food-details">
        <p className="food-category">{category.toUpperCase()}</p>
        <h2 className="food-name">{name}</h2>
        <p className="food-description">{description}</p>
        <p className="food-servings"> {servings} </p>
     </div>
      
    </div>
    </Link>
  );
};

export default FoodItem;
