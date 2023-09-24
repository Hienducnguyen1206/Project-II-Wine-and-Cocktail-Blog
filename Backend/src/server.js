import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import connectDB from './config/connectDB'
import initApiRoutes from './route/api'
import cookieParser from 'cookie-parser'
import multer from "multer"
require('dotenv').config();

let app = express();
let port = process.env.PORT || 6969;

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin',process.env.REACT_URL);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true,parameterLimit:50000 })); 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/DHBK/Frontend/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});


app.use( express.static( "public" ) );

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  if (file) {
    const imagePath = `/uploads/${file.filename}`;
    res.status(200).json({
      message: "Image has been uploadedf",
      imagePath: imagePath,
    });
  } else {
    res.status(400).json({ message: "No file uploaded" });
  }
});

connectDB();
viewEngine(app);
initWebRoutes(app);
initApiRoutes(app);

app.use((req,res)=>{
  return res.send("404 not found")
})

app.listen(port, () => {
  console.log("Backend Nodejs is running on port:" + port);
})
