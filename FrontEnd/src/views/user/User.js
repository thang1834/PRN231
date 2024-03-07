import React from 'react';
import { useState, useEffect } from 'react';
import * as loadService from '../../ultils/apiServices/loadServices';
import * as postService from '../../ultils/apiServices/postServices';
import {
    CForm,
    CCol,
    CFormInput,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
    CFormCheck,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
import { refreshToken } from 'src/ultils/Authentication';

const User = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [statusModal, setStatusModal] = useState('');
    const [error, setError] = useState({});

    const numberPerPage = 10;

    const numberOfPages = Math.ceil(users.length / numberPerPage);
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    const displayedUsers = users.slice(startIndex, endIndex);

    useEffect(() => {
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
        }

        if (accessToken) {
            fetchUser();
        }

        setLoading(false);
    }, [accessToken, loading]);

    const fetchUser = async () => {
        await refreshToken();
        const list = await loadService.loadUsers({
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (list) {
            setUsers(list);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Hàm xử lý khi nhấn trang tiếp theo
    const handleNextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleCreateNew = () => {
        setVisible(true);
        setSelectedUser({});
        setStatusModal('create');
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedUser(null);
        setStatusModal('');
        setError({});
    };

    const handleInputChange = (event, val, pros) => {
        const user = Object.assign({}, selectedUser);
        const err = Object.assign({}, error);
        user[pros] = event.target.value;
        setSelectedUser(user);

        switch (pros) {
            case 'price': {
                const inputValue = parseFloat(event.target.value);
                if (isNaN(inputValue)) {
                    err[pros] = `Please enter a valid number for ${pros}`;
                    setError(err);
                } else if (inputValue < 0) {
                    err[pros] = `The ${pros} must not be negative`;
                    setError(err);
                } else {
                    const { [pros]: deletedError, ...restErrors } = err;
                    setError(restErrors);
                }
                console.log(error);
                break;
            }
            default: {
                if (event.target.value.trim() === '') {
                    err[pros] = `This field cannot be empty`;
                    setError(err);
                } else {
                    const { [pros]: deletedError, ...restErrors } = err;
                    setError(restErrors);
                }
            }
        }
    };

    const handleCreateOrUpdate = async () => {
        if (Object.keys(error).length !== 0) return;

        if (statusModal === 'create') {
            var user = {
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                email: selectedUser.email,
                phoneNumber: selectedUser.phoneNumber,
                dob: selectedUser.dob,
                identificationNumber: selectedUser.identificationNumber,
                isActive: selectedUser.isActive,
                username: selectedUser.username,
                password: selectedUser.password,
            };
            const res = await postService.postUser(user, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setLoading(true);
            handleCloseModal();
        } else if (statusModal === 'update') {
            var user = {
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                email: selectedUser.email,
                phoneNumber: selectedUser.phoneNumber,
                dob: selectedUser.dob,
                identificationNumber: selectedUser.identificationNumber,
                isActive: selectedUser.isActive,
                username: selectedUser.username,
                password: selectedUser.password,
            };
            const res = await postService.updateUser(selectedUser.id, user, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setLoading(true);
            handleCloseModal();
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                <CButton onClick={handleCreateNew} className="btn-create" color="secondary">
                    Create new
                </CButton>
            </div>
            <CTable striped>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Dob</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Identification Number</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Is Active</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Password</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {displayedUsers.map((user) => (
                        <CTableRow key={user.id}>
                            <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                            <CTableDataCell>{user.firstName}</CTableDataCell>
                            <CTableDataCell>{user.lastName}</CTableDataCell>
                            <CTableDataCell>{user.email}</CTableDataCell>
                            <CTableDataCell>{user.phoneNumber}</CTableDataCell>
                            <CTableDataCell>{user.dob}</CTableDataCell>
                            <CTableDataCell>{user.identificationNumber}</CTableDataCell>
                            <CTableDataCell>{user.isActive ? 'true' : 'false'}</CTableDataCell>
                            <CTableDataCell>{user.password}</CTableDataCell>
                            <CTableDataCell>{user.username}</CTableDataCell>
                            <CTableDataCell>
                                <CIcon
                                    className="icon-view"
                                    title="View"
                                    icon={cilSearch}
                                    size="xl"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setVisible(true);
                                        setStatusModal('update');
                                        setError({});
                                    }}
                                ></CIcon>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            <CPagination align="end" aria-label="Page navigation example">
                <CPaginationItem aria-label="Previous" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                {Array.from({ length: numberOfPages }, (_, index) => (
                    <CPaginationItem
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        active={currentPage === index + 1}
                    >
                        {index + 1}
                    </CPaginationItem>
                ))}
                <CPaginationItem aria-label="Next" onClick={handleNextPage} disabled={currentPage === numberOfPages}>
                    <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
            </CPagination>

            <CModal size="lg" visible={visible} onClose={handleCloseModal} aria-labelledby="LiveDemoExampleLabel">
                <CModalHeader onClose={handleCloseModal}>
                    <CModalTitle id="LiveDemoExampleLabel">Contract Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedUser && (
                        <>
                            <CForm className="row g-3">
                                <CCol md={2}>
                                    <CFormInput type="text" id="user_id" label="ID" disabled value={selectedUser.id} />
                                </CCol>

                                <CCol md={5}>
                                    <CFormInput
                                        type="text"
                                        id="first_name"
                                        label="First Name"
                                        value={selectedUser.firstName}
                                        onChange={(event) => handleInputChange(event, selectedUser.id, 'firstName')}
                                    />
                                    <span className="error-message">{error.firstName}</span>
                                </CCol>
                                <CCol md={5}>
                                    <CFormInput
                                        type="text"
                                        id="last_name"
                                        label="Last Name"
                                        value={selectedUser.lastName}
                                        onChange={(event) => handleInputChange(event, selectedUser.id, 'lastName')}
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput
                                        type="email"
                                        id="email"
                                        label="Email"
                                        value={selectedUser.email}
                                        onChange={(event) => handleInputChange(event, selectedUser.id, 'email')}
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput
                                        type="text"
                                        id="phoneNumber"
                                        label="Phone Number"
                                        value={selectedUser.phoneNumber}
                                        onChange={(event) => handleInputChange(event, selectedUser.id, 'phoneNumber')}
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput
                                        type="datetime"
                                        id="dob"
                                        label="Date Of Birth"
                                        value={selectedUser.dob}
                                        onChange={(event) => handleInputChange(event, selectedUser.id, 'dob')}
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput
                                        type="text"
                                        id="identificationNumber"
                                        label="Identification Number"
                                        value={selectedUser.identificationNumber}
                                        onChange={(event) =>
                                            handleInputChange(event, selectedUser.id, 'identificationNumber')
                                        }
                                    />
                                </CCol>
                                <CCol md={12}>
                                    <label style={{ marginBottom: 10 }}>Is Active</label>
                                    <div>
                                        <CFormCheck
                                            inline
                                            type="radio"
                                            name="isActive"
                                            id="isActive"
                                            value="true"
                                            label="Yes"
                                            checked={selectedUser.isActive === true}
                                            onChange={() => {
                                                const user = Object.assign({}, selectedUser);
                                                user.isActive = true;
                                                setSelectedUser(user);
                                            }}
                                        />
                                        <CFormCheck
                                            inline
                                            type="radio"
                                            name="isActive"
                                            id="isActive"
                                            value="false"
                                            label="No"
                                            checked={selectedUser.isActive === false}
                                            onChange={() => {
                                                const user = Object.assign({}, selectedUser);
                                                user.isActive = false;
                                                setSelectedUser(user);
                                            }}
                                        />
                                    </div>
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput
                                        type="text"
                                        id="password"
                                        label="Password"
                                        value={selectedUser.password}
                                        onChange={(event) => handleInputChange(event, selectedUser.id, 'password')}
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput
                                        type="text"
                                        id="username"
                                        label="Username"
                                        value={selectedUser.username}
                                        onChange={(event) => handleInputChange(event, selectedUser.id, 'username')}
                                    />
                                </CCol>
                            </CForm>
                        </>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleCreateOrUpdate}>
                        Save changes
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default User;
