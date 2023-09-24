import db from '../models/index';

const readUserFunc = async (req, res) => {
    console.log(req.user)
    try {
        let data = await db.User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        console.log(data);
        return res.send(data);
    } catch (error) {
        console.log(error);
    }
}


const createUserFunc = async () => {
    try {
    } catch (error) {

    }
};



const updateUserFunc = (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }
}

const deleteUserFunc = (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT: ''
        })
    }

}

const changeroleID = async (rawData, res) => {
    console.log("request data", rawData.body);
    const updateData = rawData.body; // Sửa đổi tại đây

    try {
        const updatedUser = await db.User.update(
            { roleid: updateData.roleID }, // Sửa đổi tại đây
            { where: { uid: updateData.uid } }
        );

        if (updatedUser[0] === 1) {
            return res.json({
                EM: "Update success",
            });
        } else {
            return res.status(404).json({
                EM: "User not found",
            });
        }
    } catch (error) {
        console.error("Error updating user role:", error);
        return res.status(500).json({
            EM: "Internal server error",
        });
    }
};


const changeUserAvatar = async (req, res) => {
    const updatedata = req.body;

    try {
        
        const affectedRows= await db.User.update(
            { image: updatedata.imagelink },
            {
                where: { uid: updatedata.uid }
            }
        );

        if (affectedRows !== 0) {
            return res.json({ message: "change avatar success" });
        } else {
            return res.status(404).json({ message: "Không tìm thấy avatar cho uid này." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi thay avatar." });
    }
};
   
const getUserAvatar = async (req, res) => {
    try {
        const { uid } = req.query; 
        console.log("hehehehe", uid);

        const user = await db.User.findOne({
            where: {
                uid: uid
            }
        });

        if (user) {
            
            res.json({ image: user.image });
        } else {
            res.status(404).json({ message: "Không tìm thấy avatar cho uid này." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Có lỗi xảy ra khi lấy avatar." });
    }
};



   


module.exports = {
    readUserFunc, createUserFunc, updateUserFunc, deleteUserFunc, changeroleID,changeUserAvatar,getUserAvatar
}