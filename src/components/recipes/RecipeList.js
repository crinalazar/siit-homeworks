import React, { useState, useEffect } from 'react';
import axios from 'axios';


import Recipe from './Recipe.js';
import '../../style/cooking-app.css';



function RecipeList() {
let [recipes, setRecipes] = useState([]);
let [firstIng, setFirstIng] = useState('');
let [secondIng, setSecondIng] = useState('');

useEffect(() => {
    getRecipes();
 }, []);


async function getRecipes(firstIng){
        const res = await axios('http://localhost:5000/Recipes');
        setRecipes(res.data);   
}

function handleChangeFirstIng(e){
        setFirstIng(e.currentTarget.value);
};
function handleChangeSecondIng(e){
        setSecondIng(e.currentTarget.value);
};



return (
<div>
        <div className="filter">
                <p>Filter by ingredients: </p>
                <input id="search1" className="searchbar" onChange={handleChangeFirstIng} value={firstIng} type="text"  placeholder="Type Ingredient"/>
                <input id="search2" className="searchbar" onChange={handleChangeSecondIng} value={secondIng} type="text" placeholder="Type Ingredient"/>
        </div>
        {(firstIng ?
        <div className="recipeList">
                {console.log(firstIng)}
                {recipes.map((recipe,index) => {
                const firstIngredient = recipe.Ingredients.filter(ing => {
                        return (ing.type.includes(firstIng)) 
                })
                console.log(firstIng);
                const secondIngredient = recipe.Ingredients.filter(ing => {
                        return (ing.type.toLowerCase().includes(secondIng)) 
                })
                if (firstIngredient.length > 0 && secondIngredient.length > 0){
                        return  <Recipe recipe={recipe} key={index}/>
                }
                })      
                }           
        </div>
        :
        <div className="recipeList">
                {recipes.map((recipe,index) => <Recipe recipe={recipe} key={index}/>)}
        </div>
        )}
</div>
)
}

export default RecipeList;