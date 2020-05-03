import React, { useEffect } from 'react';
import {Link}  from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import '../../style/cooking-app.css';


function UserRecipeCard(recipe){ 
    const history = useHistory();
    const url = 'http://localhost:5000/UsersRecipes/';
    
    async function deleteRecipe(){
        await axios.delete('http://localhost:5000/Recipes/' + recipe.recipe.id);
        const res = await  axios.get(url, { params: { recipeId: recipe.recipe.id}});
        await axios.delete(url + res.data[0].id );
    }

    function setLocalRecipe(){
        history.push('?recipe=' + recipe.recipe.id)  
    }
    
    return (      
            <div className= "pictures">
            <a href="#" className='deletebtn' onClick={deleteRecipe}> &#9746; </a>
            <a href="#" className='editbtn' onClick={setLocalRecipe}> &#9998; </a>
               <Link to={ '/recipes/' + recipe.recipe.id }>
                        <img  className="user-recipe-image" src={recipe.recipe.Picture} alt="Recipe"/> 
                        <div className= "user-picture-text">
                            <p className="user-recipe-name">{recipe.recipe.RecipeName} </p> 
                        </div>
                </Link>
            </div>
    )}

        

export default UserRecipeCard;