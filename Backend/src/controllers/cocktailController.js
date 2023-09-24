import db from '../models/index'

// Hàm lấy tất cả các bài cocktail
const readCocktailFunc = async (req, res) => {
    try {
      const data = await db.Cocktail.findAll();
      console.log(data);  
      return res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
};



// Hàm tạo bài về cocktail
const createCocktailFunc = async(rawdCocktaildata,res) => {
    console.log(rawdCocktaildata)
    try {
        const CocktailData = {
            name: rawdCocktaildata.body.name,
            describtion: rawdCocktaildata.body.content,
            image:rawdCocktaildata.body.imagelink
        };
        const createCocktail = await db.Cocktail.create(CocktailData);
        if (createCocktail) {
            return res.json({
                EM: "create cocktail success",
                EC: "0",
                DT: "", 
            });
        }
    } catch (error) {
        console.log(error);
    }
};


// Hàm cập nhật bài cocktail
const updateCocktailFunc = () => {
    return("haha")
}

// Hàm xóa bài cocktail
const deleteCocktailFunc = () => {
    return("haha")
}


module.exports ={readCocktailFunc,createCocktailFunc,updateCocktailFunc,deleteCocktailFunc}