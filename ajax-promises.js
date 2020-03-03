const body = document.querySelector("body");

(async function displayGames(){
    fetch('https://games-world.herokuapp.com/games',{
        method: 'GET'
}).then((res) => res.json()).then((data) => {
       data.map(function(game){
           let title = createElement('p'),
               pimg = createElement('p'),
               img = createElement('img'),
               description = createElement('p');
               title = game.title;
               img.src = game.imageUrl;
               description = game.description;
               pimg.append(img);
               body.append(title, pimg, description);
               createButtons(game._id);
            })
    })
    addnewGame();
    attachEventListeners();   
    })();
    

    function createElement(elem){
        return document.createElement(elem);
     }    

    function createButtons(photoID){
        const editBtn = createElement('button');
        editBtn.innerHTML = 'Edit';
        editBtn.classList.add('edit-button');
        editBtn.setAttribute('data-photo-id', photoID);

        const deleteBtn = createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.classList.add('delete-button');
        deleteBtn.setAttribute('data-photo-id', photoID);

        const p = createElement('p');
        body.append(p);
        p.append(editBtn, deleteBtn);
    }

    function addnewGame(){
        const createBtn = createElement('button');
        createBtn.innerHTML = 'Create';
        createBtn.classList.add('create-button');
        createBtn.style.color = 'blue';
        document.querySelector('p').append(createBtn);
    }

    function attachEventListeners(){
        document.addEventListener('click', handleClick);
    
        function handleClick(e) {
            const photoId = e.target.getAttribute('data-photo-id');
            if(e.target.classList.contains('edit-button')) {
                handleEdit(photoId);
            } else if(e.target.classList.contains('delete-button')) {
                handleDelete(photoId);
            } else if (e.target.classList.contains('create-button')){
                handleCreate();
            }

        };
    };

    function handleEdit(id) {
        fetch(`http://games-world.herokuapp.com/games/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'title=new title'
        })
    };

    function handleDelete(id) {
        fetch(`http://games-world.herokuapp.com/games/${id}`, {
            method: 'DELETE'
        })

    };

    function handleCreate(){
        fetch('http://games-world.herokuapp.com/games/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'title=Watch_Dogs 2&imageUrl=https://psmedia.playstation.com/is/image/psmedia/watch-dogs-2-two-column-01-ps4-eu-09jun16?$TwoColumn_Image$ &description=Take an extended tour of San Francisco and test your skills in a range of high-risk additional missions and contracts with the Watch_Dogs 2 Season Pass.Take T-Bone s custom car-flipping truck for a spin in a special mission included in the first DLC pack, embark on three hour-long story missions with Lenni and Jordan in the second DLC pack, Human Conditions, and explore the city s seedy sex trade in the final DLC pack, No Compromises.'
        })
    };

    

    
