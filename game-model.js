class GameModel{

    constructor(){
    this.url = 'http://games-world.herokuapp.com/games';
    }
    
    getAll() {
        return fetch(this.url).then(res => res.json());
    };

    findById(id){
        return fetch(`${this.url}/${id}`).then(res => res.json());
    }


    handleEdit(id) {
        fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'title=new title'
        });
    };

    handleDelete(id) {
        fetch(`${this.url}/${id}`, {
            method: 'DELETE'
        });
    };

    handleCreate(){
        fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'title=Watch_Dogs 2&imageUrl=https://psmedia.playstation.com/is/image/psmedia/watch-dogs-2-two-column-01-ps4-eu-09jun16?$TwoColumn_Image$ &description=Take an extended tour of San Francisco and test your skills in a range of high-risk additional missions and contracts with the Watch_Dogs 2 Season Pass.Take T-Bone s custom car-flipping truck for a spin in a special mission included in the first DLC pack, embark on three hour-long story missions with Lenni and Jordan in the second DLC pack, Human Conditions, and explore the city s seedy sex trade in the final DLC pack, No Compromises.'
        })
    }
}



