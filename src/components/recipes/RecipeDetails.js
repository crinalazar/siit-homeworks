import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../auth/UserContext';
import AuthContext from '../auth/AuthContext';
import '../../style/cooking-app.css';

function RecipeDetails(){  
    
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState(null);

    const { userId } = useContext(UserContext);
    const { token } = useContext(AuthContext);

    async function getRecipeById() {
        try {
            const res = await axios('http://localhost:5000/Recipes/' + recipeId);
            setRecipe(res.data);
            setIngredients(res.data.Ingredients);
        } catch(e) {
            console.warn(e);
        }
 
    }
    
    useEffect(() => { 
        getRecipeById(recipeId); 
    }, [recipeId]);
   

    if(recipe, ingredients) {

    return (
       
        <div className= "recipeDetailsWrapper">
            <p className="recipe-name details-name">{recipe.RecipeName} </p>
            <p className = "recipe-author">Recipe added by: {localStorage.getItem('name')} {localStorage.getItem('surname')} </p>
            <div className= "recipeDetails">
                <div className="firstDet"> 
                    <p><span className= "text-det">Preparation time:</span>{recipe.PreparationTime}</p>
                    <p><span className= "text-det">Cooking time:</span>{recipe.CookingTime}</p>
                    <p><span className= "text-det">Serves: </span>{recipe.Serves}</p>
                    <p><span className= "text-det">Vegetarian: </span>{recipe.Vegetarian}</p>
                </div>
                <img  className="details-picture" src={recipe.Picture} alt="Recipe"/>
                <div className="details-rest">
                    <p className= "text-det"> Ingredients:  </p>
                    
                    {ingredients.map((ing, index) => <p key={index}>{ing.quantity} - {ing.type}</p>)}
                </div>
            </div>
        </div>
         
        
    )} else {
        return <h1>Loading ...</h1>; 
    } 
}  

export default RecipeDetails;