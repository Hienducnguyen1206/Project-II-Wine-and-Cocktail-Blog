import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import axios from '../setup/axios';
import './Post.scss';
import { AuthContext } from '../context/authContext';
import { updatePostStatus } from '../services/postServices';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  const [data, setData] = useState([]);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    axios
      .get('/api/v1/post/showpost')
      .then((response) => {
        const rawData = response.data;
        const sortedData = rawData.sort((a, b) => {
          const createdAtA = new Date(a.createdAt);
          const createdAtB = new Date(b.createdAt);
          return createdAtB - createdAtA;
        });
        setData(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const okPosts = data.filter((item) => item.status === 'OK');

  const filteredPosts = okPosts.filter((item) => (
    (item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.post.username.toLowerCase().includes(searchTerm.toLowerCase()))
  ));




  const totalFilteredPosts = filteredPosts.length;

  const visibleData = filteredPosts.slice(startIndex, endIndex);

  const deletePost = async (postId, ) => {
    let pid = postId
    let newStatus = "Delete"
    try {
      let deleteresponse = await updatePostStatus(pid, newStatus)
    
      toast.success('Delete success')
      setTimeout(function () {
        window.location.reload();
      }, 2200);
    } catch (error) {

    }
  }


  return (
    <Container>
      <div className="box">
        <div className="">
          <div className="text-center pb-4">
            <h1>Post</h1>
          </div>
          <hr />
          <div className=" ml-auto">
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Col>
              </Row>
            </Form>
          </div>
          <div className="home">
            <div className="contentleft col-2">
              {(currentUser) ? <Link to="/createpost" className="creatpost">Write now</Link> : null}
            </div>
            <div className="contentleft col-2">
              {(currentUser && currentUser.roleid === 0) ? <Link to="/createwine" className="creatwine">Write Wine</Link> : null}
            </div>
            <div className="contentleft col-2">
              {(currentUser && currentUser.roleid === 0) ? <Link to="/createcocktail" className="creatcocktail">Write Cocktail</Link> : null}
            </div>

                     
            <div className="vertical-divider"></div>         
           <div className='contentright col-10'>
              <div className='card-content'>
               
                {visibleData.map((item, index) => (

                  <div className='card-user' >
                    <div className="card-top">
                      {item.image.map((img, imgIndex) => (

                        <img src={img.link} alt="" className="card-avatar" />

                      ))}
                    </div>
                    <div className='card-info'>
                      <div className='card-title'>
                        <h6>{item.name}</h6>
                      </div>
                      <hr />
                      <div className='card-user-top'>
                        <img className='user-avatar' src={item.post.image}></img>
                        <h6 className='card-username'>{item.post.username}</h6>

                      </div>
                      <hr />
                      <div className='card-footer'>
                        {(currentUser) && (currentUser.uid === item.post.uid) ? <Link to={`/editpost-${item.pid}`}><img src="/uploads/edit-icons.png" className='delete-button'></img>
                        </Link> : null}


                        <Link to={`/post-${item.pid}`} className="card-button">
                          Read More
                        </Link>
                        {currentUser && currentUser.uid === item.post.uid ? (
                          <Link onClick={() => deletePost(item.pid)}>
                            <img src="/uploads/x-icons.png" className='delete-button' alt="Delete" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>


          </div>



          <div className="pagination">
            <Pagination>
              {Array.from(
                { length: Math.ceil(totalFilteredPosts / itemsPerPage) },
                (_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                )
              )}
            </Pagination>
          </div>
        </div>
      </div>
      <hr />
    </Container>
  );
};

export default Post;
