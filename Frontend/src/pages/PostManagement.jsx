import React, { useEffect, useState, useContext } from 'react';
import axios from '../setup/axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { updatePostStatus } from '../services/postServices';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthContext } from '../context/authContext';

const Post = () => {
  const [data, setData] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [postStatus, setPostStatus] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  let history = useHistory();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    history.push('/login');
  }

  const radios = [
    { name: 'OK', value: 'OK' },
    { name: 'Waiting', value: 'Waiting' },
    { name: 'Delete', value: 'Delete' },
  ];

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

        const initialStatus = {};
        sortedData.forEach((item) => {
          initialStatus[item.pid] = item.status;
        });
        setPostStatus(initialStatus);

        const initialSelectedStatus = {};
        sortedData.forEach((item) => {
          initialSelectedStatus[item.pid] = item.status;
        });
        setSelectedStatus(initialSelectedStatus);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const formatDate = (dateString) => {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStatusUpdate = (pid, newStatus) => {
    setSelectedStatus((prevSelectedStatus) => ({
      ...prevSelectedStatus,
      [pid]: newStatus,
    }));

    updatePostStatus(pid, newStatus)
      .then((response) => {
        toast.success('Update status success');
        setTimeout(function () {
          window.location.reload();
        }, 3200);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        setSelectedStatus((prevSelectedStatus) => ({
          ...prevSelectedStatus,
          [pid]: postStatus[pid],
        }));
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const MAX_CONTENT_LENGTH = 400;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleData = filteredData.slice(startIndex, endIndex);

  return (
    <Container>
      <div className='box'>
        <div className=''>
          <div className='text-center pb-4'>
            <h1>Post Management</h1>
          </div>
          <hr/>
          <div className='pb-5'>
            <Form inline>
              <Row>
                <Col xs='auto'>
                  <Form.Control
                    type='text'
                    placeholder='Search'
                    className='mr-sm-2'
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Col>
              </Row>
            </Form>
          </div>

          {visibleData.map((item, index) => (
            <Card key={index} className='mb-4 '>
              <Card.Header className='d-flex justify-content-between'>
                <div>{item.status}</div>
                <div>{formatDate(item.createdAt)}</div>
              </Card.Header>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        item.content.length > MAX_CONTENT_LENGTH
                          ? item.content.substring(0, MAX_CONTENT_LENGTH) + '...'
                          : item.content,
                    }}
                  />
                </Card.Text>
                <div className='d-flex justify-content-between'>
                  <Link
                    to={`/postmanagement-${item.pid}`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    <Button variant='secondary'>Read</Button>
                  </Link>
                  <ButtonGroup>
                    {radios.map((radio, idx) => {
                      const isSelected = selectedStatus[item.pid] === radio.value;

                      return (
                        <Button
                          key={idx}
                          variant={
                            isSelected
                              ? (() => {
                                switch (idx) {
                                  case 0:
                                    return 'success';
                                  case 1:
                                    return 'warning';
                                  case 2:
                                    return 'danger';
                                  default:
                                    return 'secondary';
                                }
                              })()
                              : (() => {
                                switch (idx) {
                                  case 0:
                                    return 'outline-success';
                                  case 1:
                                    return 'outline-warning';
                                  case 2:
                                    return 'outline-danger';
                                  default:
                                    return 'outline-secondary';
                                }
                              })()
                          }
                          onClick={() => {
                            handleStatusUpdate(item.pid, radio.value);
                          }}
                          style={{ width: '100px' }}
                        >
                          {radio.name}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div className='pagination '>
          <Pagination>
            {Array.from(
              { length: Math.ceil(filteredData.length / itemsPerPage) },
              (_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </div>
      </div>
    </Container>
  );
};

export default Post;
