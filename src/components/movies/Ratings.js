import React from 'react';

function Rating({ film }) {

    return (
        <div>
            <p className="card-text">
                <b> Ratings: </b> { film.Ratings.map((rating,index) => <p key ={index}>{rating.Source} : {rating.Value} </p> ) } 
            </p>
        </div>
    );
}

export default Rating;