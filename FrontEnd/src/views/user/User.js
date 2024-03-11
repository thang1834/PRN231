import React from 'react';
import { format } from 'date-fns';
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
    CRow,
    CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
import { refreshToken } from 'src/ultils/Authentication';

const User = () => {
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedRole, setSelectedRoles] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isAddRole, setIsAddRole] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
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
        refreshToken();
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
        }
        if (accessToken) {
            fetchUser();
            fetchRole();
        }

        setLoading(false);
    }, [accessToken, loading]);

    function formatDateString(inputDateString) {
        const inputDate = new Date(inputDateString);
        const formattedDate = format(inputDate, 'yyyy-MM-dd');
        return formattedDate;
    }

    const fetchUser = async () => {
        const list = await loadService.loadUsers({
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (list) {
            list.map((item) => {
                item.dob = formatDateString(item.dob);
                return item;
            });
            setUsers(list);
        }
    };

    const fetchRole = async () => {
        const list = await loadService.loadRoles({
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (list) {
            setRoles(list);
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

    const handleAddRole = () => {
        setIsAddRole(true);
        setSelectedUser({});
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedUser(null);
        setStatusModal('');
        setError({});
    };

    const handleCloseAddRoleModal = () => {
        setIsAddRole(false);
        setSelectedUser(null);
    };

    const handleSelectUser = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleSelectRoles = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedRoles(selectedOptions);
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

        if (statusModal === 'create') {
            const res = await postService.postUser(user, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setLoading(true);
            handleCloseModal();
        } else if (statusModal === 'update') {
            const res = await postService.updateUser(selectedUser.id, user, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setLoading(true);
            handleCloseModal();
        }
    };

    const handleSaveRole = async () => {
        var userRole = {
            userId: selectedUser,
            roleIds: selectedRole,
        };
        const res = await postService.assignRole(userRole, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        setLoading(true);
        handleCloseAddRoleModal();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                <CButton onClick={handleAddRole} className="btn-add_role" color="secondary" style={{ marginRight: 20 }}>
                    Add Role
                </CButton>
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
                                <CCol md={6}>
                                    <CFormInput
                                        type="text"
                                        id="first_name"
                                        label="First Name"
                                        value={selectedUser.firstName}
                                        onChange={(event) => handleInputChange(event, selectedUser.id, 'firstName')}
                                    />
                                    <span className="error-message">{error.firstName}</span>
                                </CCol>
                                <CCol md={6}>
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
                                        type="date"
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
                                                console.log(user.isActive);
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

            <CModal size="lg" visible={isAddRole} onClose={handleCloseAddRoleModal} aria-labelledby="addRole">
                <CModalHeader onClose={handleCloseAddRoleModal}>
                    <CModalTitle id="addRole">Add Role for User</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <>
                        <CForm className="row g-3">
                            <CCol md={6}>
                                <CFormSelect onChange={handleSelectUser} label="Select User">
                                    <option value="">Select User</option>
                                    {users.map((user, index) => (
                                        <option key={index} value={user.id}>
                                            {user.firstName} {user.lastName}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                                <CFormSelect multiple onChange={handleSelectRoles} label="Select Roles">
                                    {roles.map((role, index) => (
                                        <option key={index} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CForm>
                    </>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseAddRoleModal}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleSaveRole}>
                        Save changes
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default User;
