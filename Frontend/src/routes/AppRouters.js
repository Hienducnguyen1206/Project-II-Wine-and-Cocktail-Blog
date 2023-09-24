import {
    BrowserRouter as Router,Switch, Route,
} from "react-router-dom";
import Users from "../pages/Users";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Post from "../pages/Post";
import PostDetail from "../pages/PostDetail";
import CreatePost from "../pages/CreatePost";
import PostManagement from "../pages/PostManagement"
import Postadmindetail from "../pages/Postadmindetail";
import UserProfile from "../pages/Profile";
import CreateWine from "../pages/CreateWine";
import CreateCocktail from "../pages/CreateCocktail";
import Wine from "../pages/Wine"
import Cocktail from "../pages/Cocktail";
import Postedit from "../pages/Postedit";




const AppRoutes = (props) => {
    return (
        <>
            <Switch>
                <Route path='/home'> <Post /> </Route>
                <Route path='/post'>    <Post /></Route>
                <Route path='/login'>    <Login /> </Route>
                <Route path='/register'>  <Register /></Route>
                <Route path='/usersmanagement'>    <Users /></Route>
                <Route path="/post-:pid" component={PostDetail} />
                <Route path="/postmanagement-:pid" component={Postadmindetail} />
                <Route path='/createpost'> <CreatePost />   </Route>
                <Route path='/PostManagement'> <PostManagement />   </Route>
                <Route path='/Profile'> <UserProfile />   </Route>
                <Route path='/createwine'> <CreateWine/> </Route>
                <Route path='/createcocktail'> <CreateCocktail/></Route>
                <Route path='/wine'> <Wine/> </Route>
                <Route path='/cocktail'> <Cocktail/> </Route>
                <Route path='/editpost-:pid' component={Postedit}/>


            </Switch>

        </>
    )
}

export default AppRoutes;