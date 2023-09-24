import React, { useEffect, useState, useContext } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './User.scss';
import Table from 'react-bootstrap/Table';
import { getAllUser } from "../services/userServices";
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Users = (props) => {

    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalUsers, setTotalUsers] = useState(0);
    const usersPerPage = 20;


    let history = useHistory();
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        history.push('/login')
    }



    const handleGetAllUser = async () => {
        try {
            const response = await getAllUser();
            console.log(response.data);
            const sortedUserData = response.data.sort((a, b) => a.roleID - b.roleID);

            setUserData(sortedUserData);
            setTotalUsers(sortedUserData.length);
            const initialSelectedRoles = {};
            sortedUserData.forEach((user) => {
                initialSelectedRoles[user.uid] = user.roleid;
            });
            setSelectedRoles(initialSelectedRoles);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }



    };

    useEffect(() => {
        handleGetAllUser();

    }, []);

    const getGender = (gender) => {
        return gender ? "Male" : "Female";
    };

    const getRole = (role) => {
        if (role === 0) {
            return "Admin"
        } else if (role === 1) {
            return "Member"
        } else {
            return "undefined"
        }
    };


    const totalPages = Math.ceil(totalUsers / usersPerPage);


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const filteredUserData = userData.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentUsers = filteredUserData.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const [selectedRoles, setSelectedRoles] = useState({});

    const handleRoleChange = (uid, newRole) => {
      
        const updatedRoles = { ...selectedRoles, [uid]: newRole };
        setSelectedRoles(updatedRoles);

      
        axios.put("http://localhost:8080/api/v1/user/changeroleID", {
            uid: uid,
            roleID: newRole,
        })
            .then((response) => {
                toast.success("Cập nhật vai trò thành công:");
            })
            .catch((error) => {
                toast.error("Lỗi khi cập nhật vai trò:");
            });
    };










    return (
        <div>
            <Container>
                <div className='text-center pb-4'>
                    <h1>User Management</h1>
                </div>
                <div className="pb-5">
                    <Form inline>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search by Username"
                                    className="mr-sm-2"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Table bordered hover className="box">
                    <thead>
                        <tr>
                            <th>Uid</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>RoleID</th>
                            <th>Set Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.uid}>
                                <td>{user.uid}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{getGender(user.gender)}</td>
                                <td>{getRole(user.roleid)}</td>
                                <td className="checkboxrole">
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={selectedRoles[user.uid] === 0}
                                            onChange={() => handleRoleChange(user.uid, 0)}
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span className="checkbox-label">Admin</span>
                                    </label>
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={selectedRoles[user.uid] === 1}
                                            onChange={() => handleRoleChange(user.uid, 1)}
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span className="checkbox-label">Member</span>
                                    </label>



                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item
                            key={i}
                            active={i + 1 === currentPage}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Container>
        </div>
    )
}

export default Users;
