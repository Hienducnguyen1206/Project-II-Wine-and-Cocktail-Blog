import express from "express";
import LoginRegisterController from "../controllers/LoginRegisterController"
import postController from "../controllers/postController"
import userController from "../controllers/userController"
import wineController from "../controllers/wineController"
import {checkUserJWT} from "../middleware/JWTAction"
import commentController from "../controllers/commentController"
import cocktailController from "../controllers/cocktailController"
let router = express.Router();


 
      

let initApiRoutes = (app) => {
   


    // LOGIN - REGISTER
    router.post('/register', LoginRegisterController.handleRegister)
    router.post('/login', LoginRegisterController.handleLogin)




   
  
    router.post("/logout",LoginRegisterController.handleLogout)

    // USER CRUD
    router.get('/user/showuser',userController.readUserFunc)
    router.post('/user/createuser', userController.createUserFunc)
    router.put('/user/updateuser', userController.updateUserFunc)
    router.delete('/user/deleteuser', userController.deleteUserFunc)

    //Other User API
    //Change roleid of user
    router.put('/user/changeroleID', userController.changeroleID)
    router.put('/user/change-user-avatar',userController.changeUserAvatar)
    router.get('/user/get-user-avatar',userController.getUserAvatar)




    // POST CRUD

    router.get('/post/showpost', postController.readPostFunc)
    router.post('/post/createpost',checkUserJWT,postController.createPostFunc)
    router.put('/post/updatepost',checkUserJWT, postController.updatePostFunc)
    router.delete('/post/deletepost',checkUserJWT, postController.deletePostFunc)

    // - Add a new route to fetch a specific post by pid
    router.get('/post-:pid',checkUserJWT, postController.getPostByPid);

    router.get('/editpost-:pid',  postController.getPostByPid);

    router.get('/postmanagement-:pid',checkUserJWT, postController.getPostByPid);

    // Other post API
    //  - Change post status
    router.get("/post/getlastpostid", postController.getLastPostId)
    router.put('/post/statusupdate', postController.updatePostStatus)
    router.post('/post/uploadimage',postController.uploadPostImage)
    router.put('/post/updateimage',postController.updatePostImage)
    router.put('/post/rating',postController.ratingUpdate)

    //Update & Get rating 
   // router.put('/post/ratingupdate', postController.updatePostRating)  


    // WINE CRUD
    router.get('/wine/showwine',wineController.readWineFunc)
    router.post('/wine/creatwine',wineController.createWineFunc)
    router.put('/wine/updatewine',wineController.updateWineFunc)
    router.delete('/wine/detelewine',wineController.deleteWineFunc)


    // COCKTAIL CRUD
    router.get('/cocktail/showcocktail',cocktailController.readCocktailFunc)
    router.post('/cocktail/creatcocktail',cocktailController.createCocktailFunc)
    router.put('/cocktail/updatecocktail',cocktailController.updateCocktailFunc)
    router.delete('/cocktail/detelecocktail',cocktailController.deleteCocktailFunc)

    // COMMENT CRUD

    router.get('/comment/showcomment/-:pid',commentController.readCommentFunc)
    router.post('/comment/creatcomment',commentController.createCommentFunc)
    router.put('/comment/updatecomment',commentController.updateCommentFunc)
    router.delete('/comment/detelecomment',commentController.deleteCommentFunc)

    return app.use('/api/v1/', router);
}

module.exports = initApiRoutes;