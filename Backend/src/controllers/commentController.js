import db from '../models/index'


// Hàm tạo comment
const createCommentFunc = async(rawCommentdata,res) => {
    try { const commentdata = {
        
        BlogpostPid: rawCommentdata.body.BlogpostPid,
        UserUid: rawCommentdata.body.UserUid,
        content: rawCommentdata.body.content
       
    }   
       const createComment = await db.Comment.create(commentdata)
       console.log(rawCommentdata)
       if(createComment){
        return res.json({
            EM: "create comment success",
            EC: 0,
            DT: " " 
        });
    }
    
    } catch (error) {
            return res.json({
                EM: "create comment fail",
                EC: -1,
                DT: " " 
            });
        
    }
   
}


// Hàm lấy tất cả comment trong database
const readCommentFunc = async (req, res) => {
    try {
      const comments = await db.Comment.findAll({
        where: {
          BlogpostPid: req.params.pid,
        },
        include: [
          {
            model: db.User,
            as: 'commentofuser', 
            attributes: ['username','image'], 
          },
        ],
      }); 
      console.log(comments);
      console.log(req.params);
      return res.json(comments);
    } catch (error) {
      return res.status(500).json({
        EM: "get comments fail",
        EC: -1,
        DT: " ",
      });
    }
  };
  
  

// Hàm cập nhật comment
const updateCommentFunc = () => {
    return ("hehe");
}

// Hàm xóa comment
const deleteCommentFunc = () => {
    return ("hehe");
}


module.exports = {createCommentFunc,readCommentFunc,updateCommentFunc,deleteCommentFunc}