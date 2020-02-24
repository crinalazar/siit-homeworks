
    async function displayGames(){
    const getElem = getElements()
    .then((data) => {
       data.map(function(game){
           let p = createElement('p'),
               title = createElement('p'),
               pimg = createElement('p'),
               img = createElement('img'),
               description = createElement('p');
               const body = document.querySelector("body");

               title = game.title;
               img.src = game.imageUrl;
               description = game.description;
            
               append(body,p);
               append(p, title);
               append(pimg, img);
               append(p, pimg);
               append(p, description);
               
            })
    })   
    };

    async function getElements(){
        return fetch('https://games-world.herokuapp.com/games',{
        method: 'GET'
        })
            .then((res) => res.json())
    }

    async function getSomeId(x){
        return getIds()
            .then(r => r[x]);
    }

    async function getIds(){
        const ids = await getElements();
        return ids.map(id => id._id);    
    }
    // getSomeId(1).then(r => console.log(r));


    function createElement(elem){
        return document.createElement(elem);
     }
     
     function append(parent, elem){
         return parent.append(elem);
     }

    displayGames();
    
     


     async function editElement(id, newData){
        fetch(('https://games-world.herokuapp.com/games/' + id),{
            method: 'PUT',
            Payload:{
                title: newData
            },
            headers: {
                'Content-type' : 'application/json'
            }

        })  
    };

    async function deleteElement(id){
        fetch(('https://games-world.herokuapp.com/games/'+ id),{
            method: 'DELETE'
    })
    };

    //  deleteElement('5e5416fa998d09002054672b');

    // 2- Dishonored 2
    
//    let x = getSomeId(1).then(res);
    // editElement('5e4b059b908d7a0024286887', "New Title");
    
    // console.log(x);

    async function createGame(){
        fetch(('https://games-world.herokuapp.com/games/' ),{
            method: 'POST',
            Payload: JSON.stringify({
                title: 'Call of Duty®: WWII Returned xxx',
                releaseDate: 1333929600,
                genre: 'First Person Shooter',
                publisher: 'Activision',
                imageUrl: 'https://psmedia.playstation.com/is/image/psmedia/call-of-duty-wwii-two-column-01-ps4-eu-19apr17?$TwoColumn_Image$',
                description: "Return to the 20th century’s most iconic armed conflict and the dramatic backdrop which first inspired the  hugely-popular Call of Duty series – now redefined for a new gaming generation.",
            }),
            headers:  {
                'Content-type' : 'application/json'
            }           
    });
    }

    // createGame();



