import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { AuthContext } from "../context/authContext";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from "axios";
import "./profile.scss"; 
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [userAvatar, setUserAvatar] = useState("");
    const [file, setFile] = useState(null);

    if (!currentUser) {
        history.push('/login');
        localStorage.removeItem('user');
        window.location.reload();
      }
      
    useEffect(() => {
        
        getUserAvatar();
    }, []);

    const getUserAvatar = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/user/get-user-avatar?uid=${currentUser.uid}`);
            setUserAvatar(response.data.image);
        } catch (error) {
            console.error(error);
        }
    };

    const uploadImage = async () => {
        try {
            if (!file) {
               toast.error('Please select an image.');
                return null;
            }

            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post("http://localhost:8080/api/upload", formData);
            return res.data.imagePath;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const changeUserAvatar = async () => {
        try {
            const uid = currentUser.uid;
            const imagelink = await uploadImage();

            if (!imagelink) {
                
                return;
            }

            const changeAvatar = await axios.put("http://localhost:8080/api/v1/user/change-user-avatar", {
                uid: uid,
                imagelink: imagelink,
            });
            toast.success('Avatar changed successfully.');
            getUserAvatar();
        } catch (error) {
            toast.error('An error occurred while changing the avatar.');
        }
    };

    return (
        <Container>
            <div className="text-center pb-4">
                <h1>Profile</h1>
            </div>
            <div className="profile-page">
                <div className="left-column col-md-3">
                    <h2> Avatar </h2>
                    <img src={userAvatar} className="user-profile-avatar" alt="User Avatar" />
                    <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="avatar-button choose-avatar"/>
                    <button onClick={changeUserAvatar} className="avatar-button " >Change Avatar</button>
                </div>
                <div className="right-column col-9">
                    <h2> Your Profile</h2>
                    <div className="userinfo mt-5">
                        <div className="usertab">
                            <label className="haha-2">Username:</label>
                            <span className="infouser">{currentUser.username}</span>
                        </div>
                        <div className="usertab">
                            <label className="haha-2">Email:</label>
                            <span className="infouser">{currentUser.email}</span>
                        </div>
                        <div className="usertab">
                            <label className="haha-2">Gender:</label>
                            <span className="infouser">{currentUser.gender ? "Male" : "Female"}</span>
                        </div>
                        <div className="usertab">
                            <label className="haha-2">Role:</label>
                            <span className="infouser">{currentUser.roleid === 0 ? "Admin" : "Member"}</span>
                        </div>
                        {/* <div className="usertab">
                            <label className="haha-2">Number Post:</label>
                            <span className="infouser">n</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UserProfile;
