import db from '../models/index'
import UserServices, { creatNewUser } from '../services/UserServices'
import LoginRegisterServices from '../services/LoginRegisterServices'




const handleRegister = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.email) {
            return res.status(200).json({
                EM: 'Missing parameters',
                EC: '1',
                DT: ''
            })
        }
     
        let data = await LoginRegisterServices.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
        })



    } catch (e) {
        return res.status(500).json({
            EM: 'Error from sever',
            EC: '-1',
            DT: ''
        })
    }

}

const handleLogin = async (req, res) => {
    try {
        let data = await LoginRegisterServices.handleUserLogin(req.body)
        res.cookie("access_token", data.DT.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true });


        let userdata1 = data.DT.userdata.dataValues
        console.log(userdata1)
        console.log(req.cookies.access_token)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: userdata1
        }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            // EM: 'Error from sever',
            // EC: '-1',
            // DT: ''
        })
    }
}



const handleLogout = async (req, res) => {

    try {
        res.clearCookie("access_token",{
            sameSite: "none",
            secure:true
        })
        res.send("hehe")
    } catch (error) {
        console.log(error)
    }
}  




module.exports = {
    handleRegister,
    handleLogin,
    handleLogout,
}
