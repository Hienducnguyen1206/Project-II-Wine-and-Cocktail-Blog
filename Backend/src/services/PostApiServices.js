import db from '../models/index';

let getAllPost = () =>{
    return new Promise(async(resolve,reject) => {
       try{
            let Users = db.User.findAll({
                raw: true,
            });
            resolve(Users)
       }catch(e){
        reject(e)
       }
    })
}

const createNewPost = () => {

}

const updatePost = () => {

}

const deletePost = () => {

}


module.export = {
    getAllPost,
    createNewPost,
    updatePost,
    deletePost,
}