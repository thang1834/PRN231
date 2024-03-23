import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import * as loadService from '../../ultils/apiServices/loadServices';
import * as postService from '../../ultils/apiServices/postServices';
import './Note.scss';
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

const Note = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState({});
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusModal, setStatusModal] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [houses, setHouses] = useState([]);
    const [apiMessage, setApiMessage] = useState('');
    const [showApiMessage, setShowApiMessage] = useState(false);
    const [error, setError] = useState({
        note1: '',
        description: '',
    });

    const numberPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            const notesResult = await loadService.loadNotes();
            if (notesResult) {
                setNotes(notesResult);
            }
            // Load houses
            const housesResult = await loadService.loadHouses();
            if (housesResult) {
                setHouses(housesResult);
            }
        };
        fetchData();
    }, []);

    const numberOfPages = Math.ceil(notes.length / numberPerPage);
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    const displayedNotes = notes.slice(startIndex, endIndex);

    function formatDateString(inputDateString) {
        const inputDate = new Date(inputDateString);
        const formattedDate = format(inputDate, 'yyyy-MM-dd');
        return formattedDate;
    }

    const handlePrevPage = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    const handleNextPage = () => setCurrentPage(currentPage < numberOfPages ? currentPage + 1 : currentPage);

    const handlePageClick = (page) => setCurrentPage(page);

    const handleCreateNew = () => {
        setVisible(true);
        setSelectedNote({});
        setStatusModal('create');
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedNote({});
        setStatusModal('');
        setError({});
        setApiMessage('');
    };

    const handleInputChange = (event, property) => {
        let value = event.target.value;
        if (property === 'houseId') {
            value = value ? parseInt(value, 10) : '';
        }
        setSelectedNote((prevSelectedNote) => ({
            ...prevSelectedNote,
            [property]: value,
        }));
    };


    const handleCreateOrUpdate = async () => {
        if (!validate()) return;
        if (Object.keys(error).length !== 0) return;

        if (statusModal === 'create') {
            const response = await postService.postNote(selectedNote);
            if (response) {
                setNotes([...notes, response]);
                const message = statusModal === 'create' ? 'Note created successfully.' : 'Note updated successfully.';
                setApiMessage(message);
                handleCloseModal();
            } else {
                handleCloseModal();
                setApiMessage('An error occurred. Please try again.');
            }
        } else if (statusModal === 'update') {
            const response = await postService.updateNote(selectedNote.id, selectedNote);
            if (response) {
                const updatedNotes = notes.map((note) => (note.id === selectedNote.id ? selectedNote : note));
                setNotes(updatedNotes);
                const message = statusModal === 'create' ? 'Note created successfully.' : 'Note updated successfully.';
                setApiMessage(message);
                handleCloseModal();
            } else {
                handleCloseModal();
                setApiMessage('An error occurred. Please try again.');
            }
        }
    };

    const handleConfirmDelete = async () => {
        if (noteToDelete) {
            console.log("XXX noteToDelete", noteToDelete);
            await postService.deleteNote(noteToDelete.id)
                .then(() => {
                    setNotes(notes.filter((note) => note.id !== noteToDelete.id));
                    setShowDeleteConfirm(false);
                    setNoteToDelete(null);
                    setApiMessage('Note deleted successfully.');
                })
                .catch(() => {
                    setApiMessage('An error occurred. Please try again.');
                });
        }
    };

    const handleDelete = (note) => {
        setNoteToDelete(note);
        setShowDeleteConfirm(true);
    };

    const handleUpdate = (note) => {
        setVisible(true);
        setSelectedNote(note);
        setStatusModal('update');
    };

    const validate = () => {
        let isValid = true;
        let errors = {};

        if (!selectedNote.note1) {
            errors.note1 = 'Note content is required';
            isValid = false;
        }

        if (!selectedNote.description) {
            errors.description = 'Description is required';
            isValid = false;
        }

        if (!selectedNote.houseId) {
            errors.houseId = 'House is required';
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
            {showApiMessage && (
                <CRow>
                    <CCol>
                        <div className="api-message">{apiMessage}</div>
                    </CCol>
                </CRow>
            )}
            <CRow>
                <CButton onClick={handleCreateNew}>Create New Note</CButton>
            </CRow>
            <CRow>
                <CTable striped hover>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>ID</CTableHeaderCell>
                            <CTableHeaderCell>House Name</CTableHeaderCell>
                            <CTableHeaderCell>Note</CTableHeaderCell>
                            <CTableHeaderCell>Description</CTableHeaderCell>
                            <CTableHeaderCell>Create Date</CTableHeaderCell>
                            <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {notes.map((note, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{note.id}</CTableDataCell>
                                <CTableDataCell>{houses.find(house => house.id === note.houseId)?.name || 'N/A'}</CTableDataCell>
                                <CTableDataCell>{note.note1}</CTableDataCell>
                                <CTableDataCell>{note.description}</CTableDataCell>
                                <CTableDataCell>{formatDateString(note.createDate)}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="primary" onClick={() => handleUpdate(note)}>
                                        Update
                                    </CButton>
                                    <CButton color="danger" onClick={() => handleDelete(note)}>
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

            {/* Unified Modal for Creating/Updating Note */}
            <CModal visible={visible} onClose={handleCloseModal}>
                <CModalHeader>
                    <CModalTitle>{statusModal === 'create' ? 'Create New Note' : 'Update Note'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormSelect
                            value={selectedNote.houseId || ''}
                            onChange={(e) => handleInputChange(e, 'houseId')}
                            aria-label="Select house">
                            <option value="">Select a house</option>
                            {houses.map((house) => (
                                <option key={house.id} value={house.id}>
                                    {house.name}
                                </option>
                            ))}
                        </CFormSelect>
                        {error.houseId && <span className="error-message">{error.houseId}</span>}
                        <CFormInput
                            type="text"
                            id="noteTitle"
                            value={selectedNote.note1 || ''}
                            onChange={(e) => handleInputChange(e, 'note1')}
                            placeholder="Note Title"
                        />
                        {error.note1 && <span className="error-message">{error.note1}</span>}
                        <CFormInput
                            type="text"
                            id="description"
                            value={selectedNote.description || ''}
                            onChange={(e) => handleInputChange(e, 'description')}
                            placeholder="Description"
                        />
                        {error.description && <span className="error-message">{error.description}</span>}
                        {/* Add more fields as necessary */}
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={handleCreateOrUpdate}>
                        {statusModal === 'create' ? 'create' : 'update'}
                    </CButton>
                </CModalFooter>
            </CModal>

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

export default Note;
