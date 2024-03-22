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
import { cilDelete, cilSearch } from '@coreui/icons';
import './Role.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Role = () => {
    const [selectedRole, setSelectedRole] = useState({});
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roles, setRoles] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [statusModal, setStatusModal] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const numberPerPage = 10;

    const numberOfPages = Math.ceil(roles.length / numberPerPage);
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    const displayedRoles = roles.slice(startIndex, endIndex);

    useEffect(() => {
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
        }

        if (accessToken) {
            fetchRole();
        }

        if (success) {
            toast.success('Success');
            setSuccess(false);
        }

        setLoading(false);
    }, [accessToken, loading]);

    const fetchRole = async () => {
        try {
            const list = await loadService.loadRoles({
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (list) {
                setRoles(list);
            }
        } catch (err) {
            if (err.response.status === 403) {
                navigate('/403');
            } else {
                toast.error('Error');
            }
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
        setSelectedRole({});
        setStatusModal('create');
        setError({});
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedRole(null);
        setStatusModal('');
        setError({});
    };

    const handleInputChange = (event, val, pros) => {
        const role = Object.assign({}, selectedRole);
        const err = Object.assign({}, error);
        role[pros] = event.target.value;
        setSelectedRole(role);
        if (event.target.value.trim() === '') {
            err[pros] = `This field cannot be empty`;
            setError(err);
        } else {
            const { [pros]: deletedError, ...restErrors } = err;
            setError(restErrors);
        }
    };

    const handleCreateOrUpdateOrDelete = async () => {
        if (statusModal === 'delete') {
            try {
                const res = await postService.deleteRole(selectedRole.id, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSuccess(true);
                setLoading(true);
            } catch (error) {
                toast.error('Error');
            }
            handleCloseModal();
        }

        if (Object.keys(error).length !== 0) {
            toast.error('Error');
            return;
        }

        if (statusModal === 'create') {
            try {
                var role = {
                    name: selectedRole.name,
                };
                const res = await postService.postRole(role, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSuccess(true);
            } catch (err) {
                toast.error('Error');
            }
            setLoading(true);
            handleCloseModal();
        } else if (statusModal === 'update') {
            try {
                var role = {
                    name: selectedRole.name,
                };
                const res = await postService.updateRole(selectedRole.id, role, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSuccess(true);
            } catch (err) {
                toast.error('Error');
            }
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
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Permissions</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {displayedRoles.map((role, index) => (
                        <CTableRow key={role.id}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{role.name}</CTableDataCell>
                            <CTableDataCell>{role.permissions.map(item => item.name).join(', ')}</CTableDataCell>
                            <CTableDataCell>
                                <CIcon
                                    className="icon-view"
                                    title="View"
                                    icon={cilSearch}
                                    size="xl"
                                    onClick={() => {
                                        setSelectedRole(role);
                                        setVisible(true);
                                        setStatusModal('update');
                                        setError({});
                                    }}
                                ></CIcon>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CIcon
                                    className="icon-delete"
                                    title="Delete"
                                    icon={cilDelete}
                                    size="xl"
                                    onClick={() => {
                                        setSelectedRole(role);
                                        setVisible(true);
                                        setStatusModal('delete');
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
                    <CModalTitle id="LiveDemoExampleLabel">
                        <CModalTitle id="LiveDemoExampleLabel">
                            {statusModal === 'create'
                                ? 'Create New Role'
                                : statusModal === 'update'
                                    ? 'Role Details'
                                    : 'Warning'}
                        </CModalTitle>
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedRole &&
                        (statusModal === 'delete' ? (
                            <p>Are you sure to delete this role information ?</p>
                        ) : (
                            <>
                                <CForm className="row g-3">
                                    <CCol md={12}>
                                        <CFormInput
                                            type="text"
                                            id="name"
                                            label="Name"
                                            value={selectedRole.name}
                                            onChange={(event) => handleInputChange(event, selectedRole.id, 'name')}
                                        />
                                        <span className="error-message">{error.name}</span>
                                    </CCol>
                                </CForm>
                            </>
                        ))}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>
                        {statusModal === 'delete' ? 'No' : 'Close'}
                    </CButton>
                    <CButton onClick={handleCreateOrUpdateOrDelete} color="primary">
                        {statusModal === 'delete' ? 'Yes' : 'Save'}
                    </CButton>
                </CModalFooter>
            </CModal>
            <ToastContainer />
        </>
    );
};

export default Role;
