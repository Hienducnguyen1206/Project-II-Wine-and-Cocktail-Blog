import db from '../models/index'
import UserServices, { creatNewUser } from '../services/UserServices'



let getHomePage = async (req, res) => {
  let data = await db.User.findAll()
  console.log(data)
  return res.send({
    data: JSON.stringify(data)
  })
}

let signUp = (req, res) => {
  return res.render('signUp.ejs');
}

let postSignUp = async (req, res) => {
  let message = await UserServices.creatNewUser(req.body);
  console.log(message)
  return res.send('creat success')
}

let displayAllUser = async (req, res) => {
  let data = await UserServices.getAllUser();
  console.log(data)
  return res.render('displayUserList.ejs', {
    tabledata: data
  })
}

let editUserInfo = (req, res) => {
  res.send("hello from edit page")
  console.log(req.query.uid)
}

module.exports = {
  getHomePage: getHomePage,
  signUp: signUp,
  postSignUp: postSignUp,
  displayAllUser: displayAllUser,
  editUserInfo: editUserInfo,
}