import React from 'react';
import '../../style/cooking-app.css';
import { Link } from 'react-router-dom';

function Recipe(recipe){    
    return (
        
        <div className= "pictures" >
            <Link to={ '/recipes/' + recipe.recipe.id }>
                <img  className="recipe-image" src={recipe.recipe.Picture} alt="Recipe"/>
            <div className= "picture-text">
                <p className="recipe-name">{recipe.recipe.RecipeName} </p> 
                <p>Preparation time:{recipe.recipe.PreparationTime}</p>
                <p>Cooking time:{recipe.recipe.CookingTime}</p>
                <p>Serves: {recipe.recipe.Serves}</p>
                <p>Vegetarian: {recipe.recipe.Vegetarian}</p>
                
            </div>
            </Link>
        </div>
        
    )}

        

export default Recipe;