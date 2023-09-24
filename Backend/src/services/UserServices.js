import bcrypt from 'bcrypt';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);







let creatNewUser = async (data) => {
    return new Promise(async(resolve,reject) => {
        try{
            let hashPasswordfrombcrypt   = await hashUserPassword(data.password)
            await db.User.create({
                username: data.username,
                password: hashPasswordfrombcrypt,
                email: data.email,
                gender: data.gender ,  
                roleID:1,        
              })
              resolve('ok')
        }catch(e){
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async(resolve,reject)=>{
    try { 
        let hashPassword = await bcrypt.hashSync(password,salt);
        resolve(hashPassword);
    }catch(err){
        reject(err)
    }
    })
}

let getAllUser = () =>{
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


module.exports = { 
    creatNewUser : creatNewUser,
    getAllUser  : getAllUser,
  

}