import React from "react";
import { Link, useParams, useNavigate } from "react-router";
import "./index.css";

const FoodItemDetails = ({ foodMenu }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = React.useState(false);
    
    const FoodDetails = foodMenu?.find(item => item.id === parseInt(id));
    
    React.useEffect(() => {
        // Check if this recipe is already saved
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        const isRecipeSaved = savedRecipes.some(recipe => recipe.id === parseInt(id));
        setIsSaved(isRecipeSaved);
    }, [id]);
    
    if (!FoodDetails) {
        return <div>Food item not found</div>;
    }
    
    const { category, name, description, image, servings, isVeg, ingredients } = FoodDetails;
    
    const handleSaveRecipe = () => {
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        const recipeExists = savedRecipes.some(recipe => recipe.id === FoodDetails.id);
        
        if (!recipeExists) {
            savedRecipes.push(FoodDetails);
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
            setIsSaved(true);
        }
    };
    
    const handleViewSavedRecipes = () => {
        navigate('/saved-recipes');
    };  
    return (
        <div className="food-item-details">
            <div className="food-item-details-header">
                <div className="food-item-details-header-buttons">
                    <Link to="/">
                        <button className="food-item-details-header-button">Back to Menu</button>
                    </Link>
                </div>
                <div className="food-item-details-header-buttons-saved">
                    <button 
                        className="food-item-details-header-button"
                        onClick={handleViewSavedRecipes}
                    >
                        Saved Recipes
                    </button>
                    <button 
                        className={`food-item-details-header-button ${isSaved ? 'saved' : 'notsaved'}`}
                        onClick={handleSaveRecipe}
                    >
                        {isSaved ? '✓ Saved' : 'Save Recipes'}
                    </button>
                </div>
            </div>
            <div className="food-item-details-content">
                <img src={image} alt="food item" className="foodimg" />
                <div className="food-item-details-info">
                    <div className="food-item-details-info-header">
                        <p className="category">{category}</p>
                        {isVeg ? <p className="veg">VEG</p> : <p className="non-veg">NON-VEG</p>}
                    </div>
                    <div className="food-item-details-info-content">
                        <div className="food-item-details-name-row">
                            <h1>{name}</h1>
                        </div>
                        <p>{servings}</p>
                        <p>{description}</p> 
                    </div>  
                </div>
            </div>
            <div className="food-item-details-ingredients">
                <h2 className="Ingredients">Ingredients</h2>
                <ul className="ingredients-list">
                    {ingredients && ingredients.map((ingredient, index) => (
                        <li key={index} className="ingredient-item">
                            <span className="ingredient-name">{ingredient.name}</span>
                            <span className="ingredient-quantity">{ingredient.quantity}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default FoodItemDetails
