class GameView{
    body = document.querySelector("body");

    constructor(){
        const gameModel = new GameModel();
        this.games = gameModel.getAll();
    };


    async displayGames(){
        for (const game of await this.games) {
            let title = this.createElement('p'),
                pimg = this.createElement('p'),
                img = this.createElement('img'),
                description = this.createElement('p');
                title = game.title;
                img.src = game.imageUrl;
                description = game.description;
                pimg.append(img);
                this.body.append(title, pimg, description);
                this.createButtons(game._id);
                }
        this.addnewGame();
        attachEventListeners();   
        };

        createElement(elem){
            return document.createElement(elem);
        }; 

        createButtons(photoID){
            const editBtn = this.createElement('button');
            editBtn.innerHTML = 'Edit';
            editBtn.classList.add('edit-button');
            editBtn.setAttribute('data-photo-id', photoID);

            const deleteBtn = this.createElement('button');
            deleteBtn.innerHTML = 'Delete';
            deleteBtn.classList.add('delete-button');
            deleteBtn.setAttribute('data-photo-id', photoID);

            const openBtn = this.createElement('button');
            openBtn.innerHTML = 'Open';
            openBtn.classList.add('open-button');
            openBtn.setAttribute('data-photo-id', photoID);
            
            const p = this.createElement('p');
            this.body.append(p);
            p.append(editBtn, deleteBtn, openBtn);
        }

        addnewGame(){
            const createBtn = this.createElement('button');
            createBtn.innerHTML = 'Create';
            createBtn.classList.add('create-button');
            createBtn.style.color = 'blue';
            document.querySelector('p').append(createBtn);
        }

        handleOpen(id){
            gameModel.findById(id).then(res=>
                {
                    const wrapper = this.createElement('article');
                
                    const title = this.createElement('p');
                    title.innerHTML = 'Title: ' + res.title;

                    const imageUrl = this.createElement('p');
                    imageUrl.innerHTML = 'Image Url:  ' + res.imageUrl;
                    
                    const image = this.createElement('img'); 
                    image.src =  res.imageUrl;
    
                    const description = this.createElement('p');
                    description.innerHTML = 'Description: ' + res.description;

                    const id = this.createElement('p');
                    id.innerHTML = 'Id: ' + res._id;

                    wrapper.append(title, image, imageUrl,  description, id);
                    window.open().document.body.appendChild(wrapper);
                });              
                   
}
}

    const view = new GameView();
    view.displayGames();
    const gameModel = new GameModel();

    function attachEventListeners() {
        document.addEventListener('click', handleClick);
    
        function handleClick(e) {
            const photoId = e.target.getAttribute('data-photo-id');
            if(e.target.classList.contains('edit-button')) {
                gameModel.handleEdit(photoId);
            } else if(e.target.classList.contains('delete-button')) {
                gameModel.handleDelete(photoId);
            } else if (e.target.classList.contains('create-button')){
                gameModel.handleCreate();
            } else if (e.target.classList.contains('open-button')){
                view.handleOpen(photoId);
            }
    
        }   
}

      
    







