import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'; // Nếu bạn cần format ngày tháng
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
    const [selectedHouse, setSelectedHouse] = useState({});
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusModal, setStatusModal] = useState('');
    const [error, setError] = useState({});

    const numberPerPage = 10;

    useEffect(() => {
        const fetchHouses = async () => {
            const result = await loadService.loadHouses();
            if (result) {
                setHouses(result);
            }
        };
        fetchHouses();
    }, []);

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
        const newHouse = { ...selectedHouse, [property]: event.target.value };
        setSelectedHouse(newHouse);
    };

    const handleCreateOrUpdate = async () => {
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
                            {/* Other headers */}
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {displayedHouses.map((house, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{house.id}</CTableDataCell>
                                <CTableDataCell>{house.name}</CTableDataCell>
                                {/* Other cells */}
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
                        />
                        {/* Additional inputs as needed */}
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
        </>
    );
};

export default House;
