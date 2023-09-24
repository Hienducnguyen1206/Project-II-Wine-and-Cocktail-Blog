import db from '../models/index'

const readWineFunc = async (req, res) => {
    try {
      const data = await db.Wine.findAll();
      console.log(data);  
      return res.send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
};




const createWineFunc = async(rawdwinedata,res) => {
    try {
        const wineData = {
            name: rawdwinedata.body.name,
            describtion: rawdwinedata.body.content,
            image:rawdwinedata.body.imagelink
        };
        const createWine = await db.Wine.create(wineData);

        if (createWine) {
            return res.json({
                EM: "create success",
                EC: "0",
                DT: "", 
            });
        }
    } catch (error) {
        console.log(error);
    }
};



const updateWineFunc = () => {
    return("haha")
}

const deleteWineFunc = () => {
    return("haha")
}

module.exports ={readWineFunc,createWineFunc,updateWineFunc,deleteWineFunc}