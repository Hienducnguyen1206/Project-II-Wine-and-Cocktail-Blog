import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext, useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { updatePost} from '../services/postServices';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.scss";
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const Postedit = ({ match }) => {
    
    const history = useHistory();
    const postId = match.params.pid;
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);


    const { currentUser } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [tagpost,setTagPost] = useState("")
    
    

    if (!currentUser) {
        history.push('/login');
    }
    console.log(postId)
    
    useEffect( async() => {
       
     let resdata = await   axios.get(`http://localhost:8080/api/v1/editpost-${postId}`)
          .then((response) => {
            if(response!==null){
            setPost(response.data);
            console.log(response.data.content);
            if (response.data.name) {
                setName(response.data.name);
            }
            if (response.data.content) {
                setContent(response.data.content);
            }if (response.data.image[0].link) {
                setPreviewImage(response.data.image[0].link);
            }}

            console.log(response.data.image[0].link)
            console.log(previewImage)

          })
          .catch((error) => {
            console.error("Error fetching post details:", error);
            setError("Not found");
          });
      }, [postId]);
      console.log(post)
      
   

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const uploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("http://localhost:8080/api/upload", formData);
            console.log(res.data);
            return res.data.imagePath; 
        } catch (error) {
            console.log(error);
            return null;
        }
    };

   

    const handleUpdatePost= async () => {
        if (name === "" || content === "") {
            toast.error('Name and content cannot be empty');
            return;
        }
        const UserUid = currentUser.uid;


        const postdata = new FormData();
              postdata.append("content",content)
              postdata.append("name",name)
              postdata.append("UserUid",UserUid)
              
              try {             
               const response = await updatePost(name, postId, content, tagpost);
              


                if (!response.data || response.data.EM !== 'update success') {
                    toast.error('Failed to update post');
                    return;
                }

           
            const imagelink = await uploadImage();

  

            console.log(response.data);
            toast.success('Bài viết đã được cập nhật thành công, hãy chờ admin duyệt bài của bạn');
            history.push('/home');

        
            await axios.put("http://localhost:8080/api/v1/post/updateimage", { postId, imagelink });
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi khi cập nhật bài viết');
        }
    };

  
    
    return (
        <Container>
            <div className='text-center pb-4'>
                <h1> Create post</h1>
            </div>
            <div className="add">
                <div className="content">
                    <input
                        type="text"
                        placeholder="Title"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                       
                    />
                    
                    
                    <div className="editorContainer">
                        <ReactQuill
                            className="editor"
                            theme="snow"
                            placeholder="Start writing..." 
                            modules={{
                                toolbar: {
                                    container: [
                                        [{ header: "1" }, { header: "2" }, { font: [] }],
                                        [{ size: [] }],
                                        ["bold", "italic", "underline", "strike", "blockquote"],
                                        [
                                            { list: "ordered" },
                                            { list: "bullet" },
                                            { indent: "-1" },
                                            { indent: "+1" },
                                        ],
                                        ["link", "image", "video"],
                                        ["code-block"],
                                        ["clean"],
                                    ],
                                },
                                clipboard: {
                                    matchVisual: false,
                                },
                            }}
                            formats={[
                                "header",
                                "font",
                                "size",
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                                "list",
                                "bullet",
                                "indent",
                                "link",
                                "image",
                                "video",
                                "code-block",
                            ]}
                            value={content}
                            onChange={(value) => setContent(value)}
                        />
                    </div>
                </div>

                <div className="menu">
                    <div className="item">
                        <h1>Publish</h1>
                        <div className="hehe">
                         
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    style={{ maxWidth: '100%', height: 'auto' }} 
                                />
                            )}
                        </div>
                        <form action="/profile" method="post" enctype="multipart/form-data">
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleFileChange}
                            />
                        </form>
                        <label className="file" htmlFor="file">
                            Upload Cover Image
                        </label>
                        <div className="buttons">
                            <button onClick={handleUpdatePost}>Publish</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Postedit;
