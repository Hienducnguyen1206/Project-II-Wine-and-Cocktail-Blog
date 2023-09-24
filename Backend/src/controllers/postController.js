import db from '../models/index';


// Hàm lấy toàn bộ bài viết từ database
const readPostFunc = async (req, res) => {
    try {
      const data = await db.Blogpost.findAll({
        include: [
          {
            model: db.Blogpost_Image,
            as: 'image', 
            attributes: ['link'], 
          },
          {
            model: db.User,
            as: 'post', 
            attributes: ['username','image','uid'], 
          },  
        ],
      }
    ); 
      return res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
// Hàm lấy ra bài viết theo khóa pid
const getPostByPid = async (req, res) => {
    const { pid } = req.params; 
    try {
      const data = await db.Blogpost.findOne({
        where: { pid }, 
        include: [
          {
            model: db.Blogpost_Image,
            as: 'image', 
            attributes: ['link'], 
          },
          
          {
            model: db.User,
            as: 'post', 
            attributes: ['username'], 
          },      
        ],
      }
    );
      if (!data) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' });
      }
        return res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  };


// Hàm lấy ra id của bài viết cuối cùng trong database
const getLastPostId = async (req, res) => {
    try {
        const lastPost = await db.Blogpost.findOne({
            order: [['createdAt', 'DESC']], 
        });
        if (lastPost) {
            return res.json({ EM: "success", EC: "0", DT: lastPost.pid });
        } else {
            return res.json({ EM: "success", EC: "0", DT: null }); 
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ EM: "error", EC: "500", DT: null });
    }
};

// Hàm tạo 1 bài viết mới trong cơ sở dữ liệu
const createPostFunc = async (rawPostData, res) => {
  console.log(rawPostData.body)
    try {
        const postData = {
            name: rawPostData.body.name,
            content: rawPostData.body.content,
            UserUid: rawPostData.body.UserUid,
            Keyword: rawPostData.body.content,
            rating: 0,
            status: "Waiting", 
        };
        const createdPost = await db.Blogpost.create(postData);
        if (createdPost) {
            const createdPostPid = createdPost.pid; 
            return res.json({
                EM: "create success",
                EC: "0",
                DT: createdPostPid, 
            });
        }
    } catch (error) {
        console.log(error);
    }
};

// Hàm cập nhật trạng thái bài viết
const updatePostStatus = async (rawUpdateData,res) => {
    const updateData = rawUpdateData.body
    try {
        const updatedPost = await db.Blogpost.update(
            { status: updateData.newStatus },
            { where: { pid: updateData.pid } }
        );      
        if (updatedPost[0] === 1) {           
            return res.json({
                EM: "update success",
            });
        } else {         
            return res.status(404).json({
                EM: "post not found",
            });
        }
    } catch (error) {      
        console.error("Error updating post status:", error);
        return res.status(500).json({
            EM: "internal server error",
        });
    }
};
// Hàm tải ảnh lên database 
const uploadPostImage = async (rawPostImage,res) => {
    console.log(rawPostImage)
    try { 
        let newImage = await db.Blogpost_Image.create({
            BlogpostPid:rawPostImage.body.BlogpostPid,
            link : rawPostImage.body.imagelink,
            describtion: "This is img",
            position:"this is position"
        });
        if(newImage){
            return res.status(200).json("Creat success")
        }      
    } catch (error) {
        console.log(error)
    }
}

const updatePostImage = async (rawImageUpdate, res) => {
  console.log(rawImageUpdate.body);
  try {
      const updatedImage = await db.Blogpost_Image.update(
          { link: rawImageUpdate.body.imagelink },
          { where: { BlogpostPid: rawImageUpdate.body.postId } }
      );

      if (updatedImage) {
          return res.status(200).json({
              EM: 'update success',
              EC: '0',
              DT: updatedImage
          });
      } else {
          return res.status(404).json({
              EM: 'Image not found',
              EC: '-1',
              DT: ''
          });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          EM: 'Error from server',
          EC: '-1',
          DT: ''
      });
  }
};

// Hàm cập nhật điểm của bài viết
const ratingUpdate = async (req, res) => {
    const { score, pid } = req.body;
  
    try {
      const blogpost = await db.Blogpost.findOne({ where: { pid: pid } });
      if (!blogpost) {
        return res.status(404).json({ error: "Bài viết không tồn tại" });
      }
      const currentNumber = blogpost.numberrating;
      const currentScore = blogpost.rating;
      const newscore = parseFloat(score);    // Chuyển từ dạng string ra dạng float sử dụng hàm parseFloat
      if (newscore === 9) {
        return res.status(400).send("Vui lòng chọn một điểm số");
      }

      const updatedScore = currentScore + newscore;
      const updatedNumber = currentNumber + 1;
  
          await db.Blogpost.update(
        {
          rating: updatedScore,
          numberrating: updatedNumber
        },
        { where: { pid: pid } }
      );
  
      const lastScore = updatedScore / updatedNumber;
  
      if (lastScore) {
        return res.json({ rating: lastScore,
                          count: updatedNumber });
      }
  
      return res.status(500).json({ error: "Lỗi khi cập nhật điểm số" });
    } catch (error) {
      console.error("Lỗi khi cập nhật điểm số:", error);
      return res.status(500).json({ error: "Lỗi khi cập nhật điểm số" });
    }
  };
  
// Hàm cập nhật nội dung bài viết
const updatePostFunc = async (req, res) => {
  const resdata = req.body;
  try {
      const updatedPost = await db.Blogpost.update(
          {
              name: resdata.name,
              content: resdata.content,
              status: "Waiting"
          },
          {
              where: { pid: resdata.postId }
          }
      );

      if (updatedPost) {
          return res.status(200).json({
              EM: 'update success',
              EC: '0',
              DT: updatedPost
          });
      } else {
          return res.status(404).json({
              EM: 'Post not found',
              EC: '-1',
              DT: ''
          });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          EM: 'Error from server',
          EC: '-1',
          DT: ''
      });
  }
};


// Hàm xóa bài viết 
const deletePostFunc= (req,res) =>{
    try {        
    } catch (error) {
        console.log(error)
        return  res.status(500).json({
            EM: 'error from sever',
            EC: '-1',
            DT:''
        })
    }

}

module.exports = {
    readPostFunc,createPostFunc,
    updatePostFunc,deletePostFunc
    ,getPostByPid,updatePostStatus,
    uploadPostImage,getLastPostId ,
     ratingUpdate,updatePostImage,
}