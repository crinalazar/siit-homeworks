import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import  { useLocation } from 'react-router-dom';
import UserContext from '../auth/UserContext';

import AuthContext from '../auth/AuthContext';
import '../../style/cooking-app.css';
import Recipe from '../recipes/Recipe.js';
import UserRecipes from './UserRecipes';
import { useHistory } from 'react-router-dom';


function User(){ 

    const url = 'http://localhost:5000/Recipes/';
    const history = useHistory();

    const { token} = useContext(AuthContext);
    const { userId } = useContext(UserContext);

    const [isDirty, setDirty] = useState(false);
    const [user, setUser] = useState(null);
    const [isSuccessfull, setSuccessfull] = useState(false);
    const [formDataRecipe, setFormDataRecipe] = useState({
        "RecipeName": "",
        "PreparationTime": "",
        "CookingTime": "",
        "Serves": "",
        "Vegetarian": "",
        "Description": "",
        "Picture": "",
        "Method": ""
    });
    const [formDataIngredients, setFormDataIngredients] = useState([{
        'type': '',
        'quantity': ''
    }]);

    const query = useQuery();
    const recipeId = query.get('recipe');
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    useEffect(() => {
        getRecipe();
    }, [recipeId]);
    
    async function getRecipe() {
        if(recipeId){
        const rec =  await axios(url + recipeId).then(res => res.data);
        rec.Picture = '';
        setFormDataRecipe(rec);
        setFormDataIngredients(rec.Ingredients);
    }
    };

    async function getUser() {
        if(!userId) {
            return;
        }
        try {
            const user = axios.get('http://localhost:5000/Users/' + userId).then(res => setUser(res.data));
        } catch(e) {
            console.warn(e);
        }
    }

    useEffect(() => { 
        getUser(); 
        relateUserRecipe();
    }, [userId, isSuccessfull]);


    function postRecipe(e){
        const ingredients = formDataIngredients.map((val,i) => ({
            "id": i+1,
            "type": val.type,
            "quantity": val.quantity,
          }));
        e.preventDefault();
        setDirty(false);
        try {
            const res = axios(url, {
                method: 'POST',
                data: ({
                "RecipeName": formDataRecipe.RecipeName,
                "PreparationTime": formDataRecipe.PreparationTime,
                "CookingTime": formDataRecipe.CookingTime,
                "Serves": formDataRecipe.Serves,
                "Vegetarian": formDataRecipe.Vegetarian,
                "Description": formDataRecipe.Description,
                "Picture": formDataRecipe.Picture,
                "Ingredients": [ingredients],
                "Method": formDataRecipe.Method
              }),
            });
            setSuccessfull(true);
            relateUserRecipe();
            clearForm();
        } catch(e) {
            console.warn(e);
        }
    }

    function editRecipe(e){
        const ingredients = formDataIngredients.map((val, i) => ({
            "id": i+1,
            "type": val.type,
            "quantity": val.quantity
          }));
        e.preventDefault();
        setDirty(false);
        try {
            const res = axios(url + recipeId, {
                method: 'PUT',
                data: ({
                "RecipeName": formDataRecipe.RecipeName,
                "PreparationTime": formDataRecipe.PreparationTime,
                "CookingTime": formDataRecipe.CookingTime,
                "Serves": formDataRecipe.Serves,
                "Vegetarian": formDataRecipe.Vegetarian,
                "Description": formDataRecipe.Description,
                "Picture": formDataRecipe.Picture,
                "Ingredients": ingredients,
                "Method": formDataRecipe.Method
              }),
            });
            clearForm();
        } catch(e) {
            console.warn(e);
        }
    }

    function relateUserRecipe(){
        if(isSuccessfull == true){
            try {
                axios.get(url).then(res => {
                    const id = res.data.length + 1;
                    const postUserRecipe= axios('http://localhost:5000/UsersRecipes/', {
                    method: 'POST',
                    data: ({
                        "userId": userId,
                        "recipeId": id,
                    }),
                })
                });
            } catch(e) {
                console.warn(e);
            }
        }
    }
                    

    function handleInputChange(e) {
        setDirty(true);

        setFormDataRecipe({
            ...formDataRecipe,
            [e.currentTarget.id]: e.currentTarget.value
        });
    }


    function handleAddIngredients() {
        const ingredientInputs = [...formDataIngredients];
        ingredientInputs.push({
            'type': '',
            'quantity': '',
        });
        setFormDataIngredients(ingredientInputs);
    }

    function handleIngredientChange(e){
        const  newIngredients = [...formDataIngredients];

        newIngredients[e.currentTarget.getAttribute('data-index')][e.currentTarget.name] = e.currentTarget.value;
        setFormDataIngredients(newIngredients);
    }

    function clearForm(){
        setFormDataRecipe({
            "RecipeName": "",
            "PreparationTime": "",
            "CookingTime": "",
            "Serves": "",
            "Vegetarian": "",
            "Description": "",
            "Picture": "",
            "Method": ""
        });
        setFormDataIngredients([{
            'type': '',
            'quantity': ''
        }]);

        history.push('?recipe=')  
    };

    if(user) {
        return(
            <div className="wrapper-user">
                <div className="postRecipe">
                    <p className= "postNewRecipe">Post new recipe</p>
                    <form className = "addRecipeForm" onSubmit={postRecipe}>

                        <div className="formFieldUserProfile"> 
                            <label htmlFor="rname">Recipe Name:</label>
                            <input onChange= { handleInputChange } value={formDataRecipe.RecipeName} type="text" id="RecipeName" />
                        </div>
                        <div className="formFieldUserProfile">
                            <label htmlFor="preparation">Preparation Time:</label>
                            <input onChange= { handleInputChange } type="text" id="PreparationTime" name="preparation" value={formDataRecipe.PreparationTime}/>
                        </div>
                        <div className="formFieldUserProfile">
                            <label htmlFor="cooking">Cooking Time:</label>
                            <input onChange= { handleInputChange } type="text" id="CookingTime" name="cooking" value={formDataRecipe.CookingTime}/>
                        </div>
                        <div className="formFieldUserProfile">
                            <label htmlFor="serves">Serves:</label>
                            <input onChange= { handleInputChange } type="text" id="Serves" name="serves" value={formDataRecipe.Serves}/>
                        </div>
                        <div className="formFieldUserProfile">
                            <label htmlFor="vegan">Vegetarian:</label>
                            <input onChange= { handleInputChange } type="text" id="Vegetarian" name="vegan" value={formDataRecipe.Vegetarian}/>
                        </div>
                        <div className="formFieldUserProfile">
                            <label htmlFor="description">Description:</label>
                            <textarea onChange= { handleInputChange } type="text" rows="5" cols="22" id="Description" name="description" value={formDataRecipe.Description}/>
                        </div>
                        
                        <div className="formFieldUserProfile">
                            <label htmlFor="picture">Picture:</label>
                            <input onChange= { handleInputChange } type="file" id="Picture" name="picture" value={formDataRecipe.Picture}/>
                        </div>
                        
                        <div >
                        <div className="formFieldUserProfile">
                            <p className="ingredients">Ingredients</p>
                        </div>
                            { formDataIngredients.map((val,i) => (
                                <div key={i}>
                                    <div className="formFieldUserProfile">
                                        <label htmlFor={"quantity" + i}>Quantity:</label>
                                        <input onChange= { handleIngredientChange } data-index= {i} type="text" id={"quantity" + i} name="quantity" value={val.quantity}/>
                                    </div>
                                    <div className="formFieldUserProfile">
                                        <label htmlFor={"type" + i}>Type:</label>
                                        <input onChange= { handleIngredientChange } data-index= {i} type="text" id={"type" + i} name="type" value={val.type}/>
                                    </div>
                                </div>
                            )) }
                           <button className="profileFormButtons" type="button" onClick={ handleAddIngredients }>More ingredients</button>
                        </div>
    
                        <div className="formFieldUserProfile">
                            <label htmlFor="method">Method:</label>
                            <textarea onChange= { handleInputChange } rows="12" cols="35" type="text" id="Method" name="method" value={formDataRecipe.Method}/>
                        </div>
                        <input className="profileFormButtons" type="submit" disabled={ !isDirty } value="Add Recipe"/>
                        <input className="profileFormButtons" type="button" onClick={editRecipe} value="Update Recipe"/>
                        <button className="profileFormButtons" type="button" disabled = {!recipeId} onClick={ clearForm }>Clear</button>
                    </form>
                </div> 
                { (user.Photo? 
                <div className = "userImg">
                    <img src={user.Photo} alt="User Photo"/>
                </div> 
                :
                <div className = "userImg userDetails">
                <label htmlFor="picture">Profile Photo:</label>
                <input type="file" id="Picture" name="picture"/>
                </div>
                 )}
                <div className="userDetails">
                    <p>Name: {user.LastName}</p>
                    <p>Surname: {user.FirstName}</p>
                    <p>Age: {user.Age}</p>
                </div>
               
                
                <div className = "userRecipes">
                    <UserRecipes  />
                </div>
            </div>
        );
    }

    return <h1>Loading ...</h1>;
}

export default User;