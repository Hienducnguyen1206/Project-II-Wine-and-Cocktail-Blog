import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.scss";
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const CreateCocktail = () => {
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    if (!currentUser) {
        history.push('/login');
    }

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
    
    const handleCreateNewCocktail = async () => {
        if (name === "" || content === "") {
            toast.error('Name and content cannot be empty');
            return;
        }
                
              try {    
               const imagelink = await uploadImage(); 
               if (imagelink === null) {
                toast.error('Hãy thêm ảnh bìa');
               return;
          }                       
               const response = await axios.post("http://localhost:8080/api/v1/cocktail/creatcocktail",{name,imagelink,content});    
               console.log(response);                         
                if (!response.data || response.data.EM !== 'create cocktail success') {
                    toast.error('Failed to create post');
                    return;
                }

          

        

            console.log(response.data);
            toast.success('Bài viết đã được tạo thành công');
            history.push('/home');

        
            
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi khi tạo bài viết');
        }
    };

    return (
        <Container>
            <div className='text-center pb-4'>
                <h1> Create Cocktail</h1>
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
                            placeholder="Start writing..." A
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
                            <button onClick={handleCreateNewCocktail}>Publish</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CreateCocktail;
