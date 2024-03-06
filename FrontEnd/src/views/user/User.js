import React from 'react';
import { useState, useEffect } from 'react';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
import { refreshToken } from 'src/Authentication';

const User = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(true);

    const numberPerPage = 10;

    const numberOfPages = Math.ceil(users.length / numberPerPage);
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    // const displayedUsers = users.slice(startIndex, endIndex);
    const displayedUsers = [];

    useEffect(() => {
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
        }

        if (accessToken) {
            fetchUser();
        }

        setLoading(false);
    }, [accessToken]);

    const fetchUser = async () => {
        await refreshToken();
        try {
            const response = await fetch('https://localhost:7080/api/User', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const object = await response.json();
            console.log('User:', object);
        } catch (error) {
            console.error('Error fetching user:', error);
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

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedUser(null);
    };

    const handleInputChange = (event, val, pros) => {
        const user = users.find((item) => item.id == val);
        user[pros] = event.target.value;
        setSelectedUser(contract);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
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

                                <CCol md={2}>
                                    <CFormInput
                                        type="text"
                                        id="first_name"
                                        label="First Name"
                                        value={selectedUser.firstName}
                                        onChange={(event) => handleInputChange(event, selectedUser.id, 'firstName')}
                                    />
                                </CCol>
                                <CCol md={2}>
                                    <CFormInput
                                        type="text"
                                        id="last_name"
                                        label="Last Name"
                                        value={selectedUser.lastName}
                                        onChange={(event) => handleInputChange(event, selectedUser.id, 'lastName')}
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
                    <CButton color="primary">Save changes</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default User;