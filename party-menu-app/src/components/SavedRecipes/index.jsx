import React from 'react';
import { Link, useNavigate } from 'react-router';
import './index.css';

const SavedRecipes = () => {
    const navigate = useNavigate();
    const [savedRecipes, setSavedRecipes] = React.useState([]);

    React.useEffect(() => {
        const recipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        setSavedRecipes(recipes);
    }, []);

    const handleRemoveRecipe = (recipeId) => {
        const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
        localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
        setSavedRecipes(updatedRecipes);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="saved-recipes-container">
            <div className="saved-recipes-header">
                <div>
                    <h1 className="saved-recipes-title">Saved Recipes</h1>
                </div>
                <button 
                    className="saved-recipes-back-button"
                    onClick={handleGoHome}
                >
                    Back to Menu
                </button>
            </div>

            {savedRecipes.length === 0 ? (
                <div className="no-saved-recipes">
                    <h2>No saved recipes yet</h2>
                    <p>Start saving your favorite recipes!</p>
                    <button 
                        className="saved-recipes-back-button"
                        onClick={handleGoHome}
                    >
                        Browse Recipes
                    </button>
                </div>
            ) : (
                <div className="saved-recipes-list">
                    {savedRecipes.map((recipe) => (
                        <div key={recipe.id} className="saved-recipe-card">
                            <img src={recipe.image} alt={recipe.name} className="saved-recipe-image" />
                            <div className="saved-recipe-info">
                                <div className="saved-recipe-header">
                                    <h3>{recipe.name}</h3>
                                    {recipe.isVeg ? (
                                        <p className="veg-badge">VEG</p>
                                    ) : (
                                        <p className="non-veg-badge">NON-VEG</p>
                                    )}
                                </div>
                                <p className="saved-recipe-category">{recipe.category}</p>
                                <p className="saved-recipe-description">{recipe.description}</p>
                                <div className="saved-recipe-actions">
                                    <button 
                                        className="saved-recipe-remove-button"
                                        onClick={() => handleRemoveRecipe(recipe.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedRecipes;
