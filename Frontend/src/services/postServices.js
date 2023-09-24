import axios from "../setup/axios"

const createNewPost = (name,UserUid,content,tagpost) =>{
  return(axios.post("/api/v1/post/createpost", { name ,UserUid , content,tagpost}))   
  }

const updatePost = (name,postId,content,tagpost) =>{
    return(axios.put("/api/v1/post/updatepost", { name ,postId, content,tagpost}))   
    }




const updatePostStatus = (pid,newStatus) => { 
    return(axios.put("/api/v1/post/statusupdate",{pid,newStatus}))
}

export{createNewPost,updatePostStatus,updatePost}