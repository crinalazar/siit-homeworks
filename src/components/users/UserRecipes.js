import React, {useState, useEffect, useContext} from 'react';
import '../../style/cooking-app.css';
import axios from 'axios';
import UserContext from '../auth/UserContext';

import UserRecipeCard from './UserRecipeCard';


function UserRecipes(){ 

    const { userId } = useContext(UserContext);

    let [userRecipes, setUserRecipes] = useState([]);
    const [style, setStyle] = useState({
        'sidebarStyle': 'sidebar',
        'mainStyle': 'main'
    });

    useEffect(() => { 
        getUserRec();
    }, []);

    
    async function getUserRec() {
        try {   
            const rec = await axios.get('http://localhost:5000/UsersRecipes', { params: { userId: userId }}).then(res => res.data);
            
            const promiseArr = rec.map((recipe) => {
                return axios.get('http://localhost:5000/Recipes/' + recipe.recipeId)
                    .then(res => res.data);
            });

            const recipes = await Promise.all(promiseArr);

            setUserRecipes(recipes);
        }
        catch(e) {
            console.warn(e);
        }
    }

    if(userRecipes){                   
    
    return (
        <div className="userRecipesWrapper">

            <div className={style.sidebarStyle} >
                <a href="#" className='closebtn' onClick= { () =>setStyle({ sidebarStyle: "sidebar", mainStyle: "main"}) } >&times;</a>
                {userRecipes.map((recipe,index) => <UserRecipeCard recipe={recipe} key={index}/>)}
            </div>
            <div id={style.mainStyle}>
                <button className='openbtn' onClick= {() =>setStyle({ sidebarStyle: "sidebar-onClick", mainStyle: "main-onClick"})}>&#9776; See Recipes</button>
            </div>
              
        </div>
    )
}
}

        

export default UserRecipes;