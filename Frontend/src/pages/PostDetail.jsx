import React, { useContext, useEffect, useState } from 'react';
import axios from "../setup/axios";
import Container from 'react-bootstrap/Container';
import './PostDetail.scss';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const PostDetail = ({ match }) => {
  const postId = match.params.pid;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [ratingScore, setRatingScore] = useState('9');
  const [lastScore, setLastScore] = useState("");
  const [countrate, setCountRate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ratedUsers, setRatedUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(async() => {
  
    await axios.get(`http://localhost:8080/api/v1/editpost-${postId}`)
      .then((response) => {
        setPost(response.data);
        console.log(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        setError("Not found");
      });
  }, [postId]);

  if (!currentUser) {
    history.push('/login');
  }

  
  useEffect(() => {
    async function getAllComment() {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/comment/showcomment/-${postId}`);
        if (Array.isArray(response.data)) {
          console.log("get comment success");
          console.log(response.data);

         
          const sortedComments = response.data.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
          });

          setComments(sortedComments); 
        } else {
          console.log("Response data is not an array");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllComment();
  }, [postId]);

 
  const commentsPerPage = 5;

 
  const [currentPage, setCurrentPage] = useState(1);


  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(comments.length / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateComment = async () => {
    if (comment === "") {
      toast.error("Hãy nhập bình luận");
      return;
    }

    const content = comment;
    const UserUid = currentUser.uid;
    const BlogpostPid = post.pid;
    try {
      const response = await axios.post("http://localhost:8080/api/v1/comment/creatcomment", { BlogpostPid, UserUid, content });
      if (response.status === 200) {
        console.log("Comment created successfully");
      } else {
        console.error("Failed to create comment");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleRating = async () => {
    if (ratedUsers.includes(currentUser.uid)) {
      alert("Bạn đã đánh giá trước đó.");
      return;
    }
    let postScore = await axios.put("http://localhost:8080/api/v1/post/rating", { pid: post.pid, score: ratingScore });
    console.log(postScore.data.rating);
    const scorebeforefix = postScore.data.rating.toFixed(1)
    setLastScore(scorebeforefix);
    setCountRate(postScore.data.count);
    setRatedUsers((prevRatedUsers) => [...prevRatedUsers, currentUser.uid]);
    setSubmitted(true);
    console.log(ratedUsers);
  };

  return (
    <div className="custom-post-container">
      <div>
        {error ? (
          <div>{error}</div>
        ) : post ? (
          <div>
            <div className='text-center '>
              <h1>{post.name}</h1>
            </div>
            <hr />
            <div className="image">
              {post.image && post.image.length > 0 ? (
                post.image.map((img, imgIndex) => (
                  <img key={imgIndex} src={img.link} alt={`Image ${imgIndex + 1}`} />
                ))
              ) : (
                <img src='' alt='' />
              )}
            </div>
            <div className='body pt-5'>
              <span>Author: {post.post.username}</span>
              <div className='postcontent' dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div>Điểm: {lastScore} /5  Lượt đánh giá:{countrate}
              <div>
                {submitted ? (
                  <div className="text-center">
                    <p>Đã gửi đánh giá.</p>
                  </div>
                ) : (
                  <div>
                    <select
                      className="form-select rating"
                      aria-label="Default select example"
                      value={ratingScore}
                      onChange={(event) => setRatingScore(event.target.value)}
                    >
                      <option selected value="null">
                        Select one Score
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <div className="text-center ratingbutton">
                      <button
                        type="button"
                        className="btn btn-success mt-3 mb-3"
                        onClick={handleRating}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-left">
              <Link to="/post" className="go-back">
                <button className="btn"> Back to post  </button>
              </Link>
            </div>
            <hr />

           
            {currentUser && (
              <div>
                <div>Comment</div>
                <div className='pb-4 comment-top'>
                  <div className=''>
                    <img src={currentUser.image} className='user-avatar'></img>
                    <h6 className='userlaber'>{currentUser.username}</h6>
                    </div>
                  <Form.Control
                    as="textarea"
                    type="text"
                    id="inputText5"
                    aria-describedby="textHelpBlock"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                  
                 
                </div>
                <div className='text-center comment-submit'>
                    <button type="button" className="btn btn-success mt-3 mb-3 commentbutton" onClick={handleCreateComment}>
                      Submit
                    </button>
                  </div>
                <Container>
                  <div className="comment-list">
                    {currentComments.map((comment) => {
                      const currentDate = new Date();
                      const commentCreatedAt = new Date(comment.createdAt);
                      const timeDifference = currentDate - commentCreatedAt;
                      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
                      let timeAgo = "";

                      if (minutesDifference < 1) {
                        timeAgo = "vừa xong";
                      } else if (minutesDifference < 60) {
                        timeAgo = `${minutesDifference} phút trước`;
                      } else if (minutesDifference < 1440) {
                        const hoursDifference = Math.floor(minutesDifference / 60);
                        timeAgo = `${hoursDifference} giờ trước`;
                      } else {
                        const daysDifference = Math.floor(minutesDifference / 1440);
                        timeAgo = `${daysDifference} ngày trước`;
                      }

                      return (
                        <div className="comment" key={comment.id}>
                          <div className='useravatar'>
                            <img src={comment.commentofuser.image} className='user-avatar'></img>
                            <h6>{comment.commentofuser.username} </h6>
                            <h6> {timeAgo}</h6>
                          </div>
                          <div className="comment-content">
                            <p>{comment.content}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pagination">
                    {pageNumbers.map((number) => (
                      <div
                        key={number}
                        className={`page-item ${number === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageClick(number)}
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
            )}
         
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PostDetail;
