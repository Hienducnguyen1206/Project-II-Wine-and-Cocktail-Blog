import axios from "../setup/axios"


const getAllUser = () => {
    return (axios.get("/api/v1/user/showuser"))
}

const registerNewUser = (username, password, email, gender) => {
return(axios.post("/api/v1/register", { username, password, email, gender }))
}

const loginUser = (valueLogin, passwordLogin) => axios.post("/api/v1/login", { valueLogin, passwordLogin });


const changeRole = (uid,newRole) => {
    return (axios.put("/api/v1/user/changeroleID",{uid,newRole}))
}



export {registerNewUser,loginUser,getAllUser,changeRole}