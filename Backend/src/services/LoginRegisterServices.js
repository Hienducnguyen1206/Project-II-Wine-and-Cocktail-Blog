import db from '../models/index';
import bcrypt from 'bcrypt';
import { Op, or } from 'sequelize';
import { createJWT, verifyJWT } from '../middleware/JWTAction';

const salt = bcrypt.genSaltSync(10);

const checkUserNameExist = async (userName) => {
    try {
        const user = await db.User.findOne({
            where: { username: userName }
        });
        return user !== null;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

let hashUserPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}


const registerNewUser = async (rawUserData) => {
    try {
        let isUsernameExist = await checkUserNameExist(rawUserData.username);
        if (isUsernameExist) {
            return {
                EM: 'The Username already exists',
                EC: '1'
            };
        }

        let hashPasswordOfUser = hashUserPassword(rawUserData.password);

        await db.User.create({
            username: rawUserData.username,
            password: hashPasswordOfUser,
            email: rawUserData.email,
            gender: rawUserData.gender,
            image: "/uploads/Anh-Meme-Cheems.jpg",
            roleid: 1,

        });

        return {
            EM: 'A user created successfully',
            EC: '0'
        };
    } catch (e) {
        console.error(e);
        return {
            EM: 'Something went wrong',
            EC: '-2'
        };
    }
}









const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword)
}






const handleUserLogin = async (rawData) => {
    try {

        let user = await db.User.findOne(
            {
                where: {
                    [Op.or]: [
                        { username: rawData.valueLogin },
                    ]
                }
            }
        )

        // console.log("check user:", user.get({ plain: true }))
        console.log(rawData.passwordLogin)


        if (user) {
            let isCorrectPassword = checkPassword(rawData.passwordLogin, user.password)
            
           

            if (isCorrectPassword === true) {
                console.log(" Founded user with username")
                let userdata = await db.User.findOne(
                    {
                        where: {
                            [Op.or]: [
                                { username: rawData.valueLogin },
                            ]
                        },
                        attributes: ["uid", 'username', "roleid", "email", "gender", "image"]
                    }
                )
             
             
                let payload = {
                    username: userdata.username,
                    uid: userdata.uid,
                    roleid: userdata.roleid,
                    email: userdata.email,
                    gender: userdata.gender,
                    
                }
                let token = createJWT(payload)


                return {
                    EM: 'OK',
                    EC: '0',
                    DT: {
                        token: token,
                        userdata: userdata                      
                    }
                }

            }
        }


        console.log("Not found user with username")
        return {
            EM: 'Not found username or password',
            EC: '-2',
            DT: {
                token: null,
                userdata: null
            }
        }





    } catch (error) {
        console.error(error);
        return {
            EM: 'Not found username or password',
            EC: '-2'
        }

    }
}
module.exports = {
    registerNewUser,
    handleUserLogin,
}
