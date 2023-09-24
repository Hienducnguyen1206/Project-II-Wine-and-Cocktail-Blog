import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import axios from '../setup/axios';
import './Wine.scss';
import { AuthContext } from '../context/authContext';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

const Wine = () => {
  const [data, setData] = useState([]);
  const itemsPerRow = 4; 
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/wine/showwine')
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

  
  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  
  const totalFilteredPosts = filteredData.length;
  const totalPages = Math.ceil(totalFilteredPosts / itemsPerPage);

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = filteredData.slice(startIndex, endIndex);

 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  
  const handleShowModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

 
  const handleCloseModal = () => {
    setShowModal(false);
  };

  
  const splitDataIntoRows = (data, itemsPerRow) => {
    const dividedData = [];
    for (let i = 0; i < data.length; i += itemsPerRow) {
      dividedData.push(data.slice(i, i + itemsPerRow));
    }
    return dividedData;
  };

  
  const dividedVisibleData = splitDataIntoRows(visibleData, itemsPerRow);

  return (
    <Container>
      <div className="box">
        <div className="">
          <div className="text-center pb-4">
            <h1>Wine</h1>
          </div>
          <hr />
          <div className=" ml-auto">
            <Form inline>
              <Row>
                <Col xs="12" sm="6" md="4" lg="3">
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
            {currentUser ? (
              <Link to="/createpost" className="creatpost">
                Write now
              </Link>
            ) : null}
            {currentUser && currentUser.roleid === 0 ? (
              <Link to="/createwine" className="creatwine">
                Write Wine
              </Link>
            ) : null}
            {currentUser && currentUser.roleid === 0 ? (
              <Link to="/createcocktail" className="creatcocktail">
                Write Cocktail
              </Link>
            ) : null}
            <div className="vertical-divider"></div>
            <div className="content-wine">
              {dividedVisibleData.map((row, rowIndex) => (
                <Row key={rowIndex} className="mb-3">
                  {row.map((item) => (
                    <Col key={item.wid} xs="12" sm="6" md="4" lg="3">
                      <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Card.Img
                          variant="top"
                          src={item.image}
                          alt={item.name}
                          style={{ flex: '1', objectFit: 'cover' }}
                        />
                        <Card.Body style={{ flex: '0' }}>
                          <Card.Title>{item.name}</Card.Title>
                          <Button variant="primary" onClick={() => handleShowModal(item)}>
                            Read More
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ))}
            </div>
          </div>
          <div className="pagination">
            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
      </div>
      <hr />

      {/* Modal */}
      <Modal size="lg" show={showModal} onHide={handleCloseModal} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost && selectedPost.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <>
              <div>
                <img src={selectedPost.image} alt={selectedPost.name} style={{ maxWidth: '100%' }} />
              </div>
              <div dangerouslySetInnerHTML={{ __html: selectedPost.describtion }} />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Wine;
