import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import * as loadService from '../../ultils/apiServices/loadServices';
import * as postService from '../../ultils/apiServices/postServices';
import './House.scss';
import {
    CRow,
    CForm,
    CFormSelect,
    CFormCheck,
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

const House = () => {
    const [houses, setHouses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState({});
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusModal, setStatusModal] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [houseToDelete, setHouseToDelete] = useState(null);
    const [users, setUsers] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [error, setError] = useState({
        name: '',
        categoryId: '',
        price: '',
        description: '',
        userId: '',
    });

    const numberPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            const availableToken = localStorage.getItem('accessToken');
            if (availableToken) {
                setAccessToken(availableToken);
            }
            // Load houses
            const housesResult = await loadService.loadHouses();
            if (housesResult) {
                setHouses(housesResult);
            }

            // Load categories
            const categoriesResult = await loadService.loadCategories();
            if (categoriesResult) {
                setCategories(categoriesResult);
            }

            // Load users
            if (accessToken) {
                fetchUser();
            }
        };
        fetchData();
    }, [accessToken]);

    const findCategoryName = (categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.name : 'Unknown';
    };

    const findUserName = (userId) => {
        const user = users.find((u) => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
    };

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

    function formatDateString(inputDateString) {
        const inputDate = new Date(inputDateString);
        const formattedDate = format(inputDate, 'yyyy-MM-dd');
        return formattedDate;
    }

    const numberOfPages = Math.ceil(houses.length / numberPerPage);
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    const displayedHouses = houses.slice(startIndex, endIndex);

    const handlePrevPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    const handleNextPage = () => setCurrentPage(currentPage < numberOfPages ? currentPage + 1 : currentPage);

    const handlePageClick = (page) => setCurrentPage(page);

    const handleCreateNew = () => {
        setVisible(true);
        setSelectedHouse({});
        setStatusModal('create');
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedHouse({});
        setStatusModal('');
        setError({});
    };

    const handleInputChange = (event, property) => {
        let value = event.target.value;
        if (property === 'categoryId' || property === 'price' || property === 'userId') {
            value = value ? parseInt(value, 10) : '';
        }

        setSelectedHouse((prevSelectedHouse) => ({
            ...prevSelectedHouse,
            [property]: value,
        }));
    };

    const handleCreateOrUpdate = async () => {
        if (!validate()) return;
        if (Object.keys(error).length !== 0) return;

        if (statusModal === 'create') {
            const response = await postService.postHouse(selectedHouse);
            if (response) {
                // Check response for success
                setHouses([...houses, response]);
                handleCloseModal();
            }
        } else if (statusModal === 'update') {
            const response = await postService.updateHouse(selectedHouse.id, selectedHouse);
            if (response) {
                // Check response for success
                const updatedHouses = houses.map((house) => (house.id === selectedHouse.id ? selectedHouse : house));
                setHouses(updatedHouses);
                handleCloseModal();
            }
        }
    };

    const handleConfirmDelete = async () => {
        if (houseToDelete) {
            await postService.deleteHouse(houseToDelete.id);
            setHouses(houses.filter((house) => house.id !== houseToDelete.id));
            setShowDeleteConfirm(false);
            setHouseToDelete(null);
        }
    };

    const handleDelete = (house) => {
        setHouseToDelete(house);
        setShowDeleteConfirm(true);
    };

    const handleUpdate = (house) => {
        setVisible(true);
        setSelectedHouse(house);
        setStatusModal('update');
    };

    const validate = () => {
        let isValid = true;
        let errors = {};

        if (!selectedHouse.name) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!selectedHouse.categoryId) {
            errors.categoryId = 'Category is required';
            isValid = false;
        }

        if (!selectedHouse.price) {
            errors.price = 'Price is required';
            isValid = false;
        }

        if (!selectedHouse.description) {
            errors.description = 'Description is required';
            isValid = false;
        }

        if (!selectedHouse.userId) {
            errors.userId = 'User is required';
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    // Render Pagination
    const renderPagination = () => {
        let items = [];
        for (let number = 1; number <= numberOfPages; number++) {
            items.push(
                <CPaginationItem onClick={() => handlePageClick(number)} active={number === currentPage} key={number}>
                    {number}
                </CPaginationItem>,
            );
        }
        return (
            <CPagination aria-label="Page navigation example">
                <CPaginationItem onClick={handlePrevPage}>Previous</CPaginationItem>
                {items}
                <CPaginationItem onClick={handleNextPage}>Next</CPaginationItem>
            </CPagination>
        );
    };

    return (
        <>
            <CRow>
                {/* Your UI components here */}
                <CButton onClick={handleCreateNew}>Create New House</CButton>
            </CRow>
            <CRow>
                {/* Table to display houses */}
                <CTable striped hover>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>ID</CTableHeaderCell>
                            <CTableHeaderCell>Name</CTableHeaderCell>
                            <CTableHeaderCell>Price</CTableHeaderCell>
                            <CTableHeaderCell>Category</CTableHeaderCell>
                            <CTableHeaderCell>Description</CTableHeaderCell>
                            <CTableHeaderCell>Is Tenanted?</CTableHeaderCell>
                            <CTableHeaderCell>Tenant</CTableHeaderCell>
                            <CTableHeaderCell></CTableHeaderCell>
                            <CTableHeaderCell></CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {displayedHouses.map((house, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{index + 1}</CTableDataCell>
                                <CTableDataCell>{house.name}</CTableDataCell>
                                <CTableDataCell>{house.price}</CTableDataCell>
                                <CTableDataCell>{findCategoryName(house.categoryId)}</CTableDataCell>
                                <CTableDataCell>{house.description}</CTableDataCell>
                                <CTableDataCell>{house.isTenanted ? 'Yes' : 'No'}</CTableDataCell>
                                <CTableDataCell>{house.userId ? findUserName(house.userId) : 'N/A'}</CTableDataCell>

                                <CTableDataCell>
                                    <CButton color="primary" onClick={() => handleUpdate(house)}>
                                        Update
                                    </CButton>
                                    <CButton color="danger" onClick={() => handleDelete(house)}>
                                        Delete
                                    </CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CRow>
            <CRow>{renderPagination()}</CRow>
            {/* Modal for creating/updating house */}
            <CModal visible={visible} onClose={handleCloseModal}>
                <CModalHeader onClose={handleCloseModal}>
                    <CModalTitle>{statusModal === 'create' ? 'Create House' : 'Update House'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {/* Modal content for house details input */}
                    <CForm>
                        {/* Form inputs for house properties */}
                        <CFormInput
                            value={selectedHouse.name || ''}
                            onChange={(e) => handleInputChange(e, 'name')}
                            placeholder="Name"
                            style={{ margin: 10 }}
                        />
                        {error.name && <span className="error-message">{error.name}</span>}
                        <CFormSelect
                            style={{ margin: 10 }}
                            value={selectedHouse.categoryId || ''}
                            onChange={(e) => handleInputChange(e, 'categoryId')}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </CFormSelect>
                        {error.categoryId && <span className="error-message">{error.categoryId}</span>}
                        <CFormInput
                            style={{ margin: 10 }}
                            value={selectedHouse.price || ''}
                            onChange={(e) => handleInputChange(e, 'price')}
                            placeholder="Price"
                            type="number"
                        />
                        {error.price && <span className="error-message">{error.price}</span>}
                        <CFormInput
                            style={{ margin: 10 }}
                            value={selectedHouse.description || ''}
                            onChange={(e) => handleInputChange(e, 'description')}
                            placeholder="Description"
                        />
                        {error.description && <span className="error-message">{error.description}</span>}
                        <CFormSelect
                            style={{ margin: 10 }}
                            value={selectedHouse.userId || ''}
                            onChange={(e) => handleInputChange(e, 'userId')}
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {`${user.firstName} ${user.lastName}`}
                                </option>
                            ))}
                        </CFormSelect>
                        {error.userId && <span className="error-message">{error.userId}</span>}
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleCreateOrUpdate}>
                        {statusModal === 'create' ? 'Create' : 'Update'}
                    </CButton>
                </CModalFooter>
            </CModal>
            {/* Modal for delete house */}
            {/* Modal xác nhận xóa */}
            <CModal visible={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
                <CModalHeader>
                    <CModalTitle>Xác nhận xóa</CModalTitle>
                </CModalHeader>
                <CModalBody>Bạn có chắc chắn muốn xóa ngôi nhà này không?</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowDeleteConfirm(false)}>
                        Hủy bỏ
                    </CButton>
                    <CButton color="danger" onClick={handleConfirmDelete}>
                        Xác nhận xóa
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default House;
