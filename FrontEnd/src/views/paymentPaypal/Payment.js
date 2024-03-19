import React from 'react';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as loadService from '../../ultils/apiServices/loadServices';
import * as postService from '../../ultils/apiServices/postServices';
import {
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
    CImage,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CCol,
    CRow,
    CFormInput,
    CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import { cilSearch, cilDelete } from '@coreui/icons';
import './Payment.scss';
const Payment = () => {
    const [selectedPayment, setSelectedPayment] = useState({});
    const [payments, setPayments] = useState([]);
    const [statusModal, setStatusModal] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [role, setRole] = useState('Admin');

    const [accessToken, setAccessToken] = useState('');
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState({
        userId: '',
        name: '',
        amount: '',
    });
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
        }
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setRole(decodedToken.role);
            if (decodedToken.role === 'Admin') {
                fetchUser();
            }
            fetchPayment();
        }
    }, [accessToken]);
    const fetchPayment = async () => {
        const options = {
            // headers: {
            //     Authorization: `Bearer ${accessToken}`,
            // },
        };
        const decodedToken = jwtDecode(accessToken);
        try {
            let result = [];
            if (decodedToken.role === 'Admin') result = await loadService.loadPayments(options);
            else result = await loadService.loadPaymentsByUserId(decodedToken.nameid, options);
            if (result) {
                setPayments(result);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error loading data');
        }
    };

    const fetchUser = async () => {
        try {
            const list = await loadService.loadUsers({
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (list) {
                setUsers(list);
            }
        } catch (err) {
            console.log('error');
        }
    };
    const numberPerPage = 10;

    const numberOfPages = Math.ceil(payments.length / numberPerPage);
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    const displayedPayments = payments.slice(startIndex, endIndex);
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
        const today = new Date();
        var payment = {
            amount: 0,
        };
        setVisible(true);
        setSelectedPayment(payment);
        setStatusModal('create');
        setError({});
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedPayment({});
        setStatusModal('');
        setError({});
    };
    const validate = () => {
        let isValid = true;
        let errors = {};

        if (!selectedPayment.name?.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!selectedPayment.userId) {
            errors.userId = 'User is required';
            isValid = false;
        }

        // validate amount
        const inputValue = parseFloat(selectedPayment.amount);
        if (isNaN(inputValue)) {
            errors.amount = `Please enter a valid number for amount`;
        } else if (inputValue < 0) {
            errors.amount = `The amount must not be negative`;
        }
        setError(errors);
        return isValid;
    };
    const handleInputChange = (event, pros) => {
        setSelectedPayment((payment) => ({
            ...payment,
            [pros]: event.target.value,
        }));
    };

    const handleCreateOrUpdateOrDelete = async () => {
        if (statusModal === 'delete') {
            try {
                const res = await postService.deletePayment(selectedPayment.id, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const indexDelete = payments.findIndex((item) => selectedPayment.id == item.id);
                const updatedPayments = [...payments.slice(0, indexDelete), ...payments.slice(indexDelete + 1)];
                setContracts(updatedPayments);
                toast.success('Delete successful');
            } catch (err) {
                toast.error('Error delete');
            }
            handleCloseModal();

            return;
        }
        if (!validate()) return;

        if (statusModal === 'create') {
            try {
                let payment = {
                    userId: selectedPayment.userId,
                    amount: selectedPayment.amount,
                    name: selectedPayment.name,
                    status: 'Pending',
                    dateCreated: new Date().toISOString(),
                };
                const res = await postService.postPayment(payment);
                toast.success('Create successful');
            } catch (err) {
                toast.error('Error create payment');
            }
            handleCloseModal();
        } else if (statusModal === 'update') {
            try {
            } catch (err) {
                toast.error('Error updating');
            }
            handleCloseModal();
        }
    };

    return (
        <>
            {role === 'Admin' ? (
                <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                    <CButton onClick={handleCreateNew} className="btn-create" color="secondary">
                        Create new
                    </CButton>
                </div>
            ) : (
                <></>
            )}
            <CTable striped>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">User</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Invoice</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date Create</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date Complete</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {displayedPayments.map((payment, index) => (
                        <CTableRow key={payment.id}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{payment.userId}</CTableDataCell>
                            <CTableDataCell>{payment.amount}</CTableDataCell>
                            <CTableDataCell>{payment.invoice}</CTableDataCell>
                            <CTableDataCell>{payment.name}</CTableDataCell>
                            <CTableDataCell>{payment.status}</CTableDataCell>
                            <CTableDataCell>{payment.dateCreated}</CTableDataCell>
                            <CTableDataCell>{payment.dateCompleted || 'Unpaid'}</CTableDataCell>
                            <CTableDataCell>
                                <CIcon
                                    className="icon-view"
                                    title="View"
                                    icon={cilSearch}
                                    size="xl"
                                    onClick={() => {
                                        setSelectedPayment(payment);
                                        setVisible(true);
                                        setStatusModal('update');
                                        setError({});
                                    }}
                                ></CIcon>
                            </CTableDataCell>

                            {role === 'Admin' && payment.status != 'Completed' && (
                                <CTableDataCell>
                                    <CIcon
                                        className="icon-delete"
                                        title="Delete"
                                        icon={cilDelete}
                                        size="xl"
                                        onClick={() => {
                                            setSelectedContract(contract);
                                            setVisible(true);
                                            setStatusModal('delete');
                                            setError({});
                                        }}
                                    ></CIcon>
                                </CTableDataCell>
                            )}
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
                        {statusModal === 'create'
                            ? 'Create New payment'
                            : statusModal === 'update'
                            ? 'Payment Details'
                            : 'Warning'}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody style={{ marginTop: '15px' }}>
                    {statusModal === 'delete' ? (
                        <p>Are you sure to delete this payment information ?</p>
                    ) : (
                        <CForm id="1" className="row g-3">
                            {role === 'Admin' && (
                                <CRow>
                                    <CFormSelect
                                        style={{ margin: 10 }}
                                        value={selectedPayment.userId || ''}
                                        disabled={selectedPayment.status == 'Completed'}
                                        onChange={(event) => handleInputChange(event, 'userId')}
                                    >
                                        <option value="">Select User</option>
                                        {users.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {`${u.firstName} ${u.lastName}`}
                                            </option>
                                        ))}
                                    </CFormSelect>

                                    <span className="error-message">{error.userId}</span>
                                </CRow>
                            )}
                            <CRow>
                                <CCol md={5}>
                                    <CFormInput
                                        type="text"
                                        id="payment_name"
                                        label="Name"
                                        value={selectedPayment.name || ''}
                                        disabled={role !== 'Admin' || selectedPayment.status == 'Completed'}
                                        onChange={(event) => handleInputChange(event, 'name')}
                                    />
                                    <span className="error-message">{error.name}</span>
                                </CCol>
                                <CCol md={2}>
                                    <CFormInput
                                        type="number"
                                        id="payment_amount"
                                        label="Amount"
                                        value={selectedPayment.amount}
                                        disabled={role !== 'Admin' || selectedPayment.status == 'Completed'}
                                        onChange={(event) => handleInputChange(event, 'amount')}
                                        required
                                    />
                                    <span className="error-message">{error.amount}</span>
                                </CCol>
                                {statusModal != 'create' && (
                                    <CCol md={3}>
                                        <CFormInput
                                            type="text"
                                            id="payment_invoice"
                                            label="Invoice"
                                            value={selectedPayment.invoice || ''}
                                            disabled
                                            onChange={(event) => handleInputChange(event, 'invoice')}
                                        />
                                        <span className="error-message">{error.invoice}</span>
                                    </CCol>
                                )}
                                {statusModal != 'create' && (
                                    <CCol md={2}>
                                        <CFormInput
                                            id="payment_status"
                                            label="Status"
                                            value={selectedPayment.status || ''}
                                            disabled
                                            onChange={(event) => handleInputChange(event, 'status')}
                                        />
                                        <span className="error-message">{error.status}</span>
                                    </CCol>
                                )}
                            </CRow>
                            {statusModal != 'create' && (
                                <>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            id="payment_created_date"
                                            label="Created Date"
                                            value={selectedPayment.dateCreated}
                                            disabled
                                            onChange={(event) => handleInputChange(event, 'dateCreated')}
                                        />
                                        <span className="error-message">{error.dateCreated}</span>
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            id="payment_completed_date"
                                            label="Completed Date"
                                            value={selectedPayment.dateCompleted}
                                            disabled
                                            onChange={(event) => handleInputChange(event, 'dateCompleted')}
                                        />
                                        <span className="error-message">{error.dateCompleted}</span>
                                    </CCol>
                                </>
                            )}
                        </CForm>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>
                        {statusModal === 'delete' ? 'No' : 'Close'}
                    </CButton>
                    {role === 'Admin' && selectedPayment.status != 'Completed' && (
                        <CButton onClick={handleCreateOrUpdateOrDelete} color="primary">
                            {statusModal === 'delete' ? 'Yes' : 'Save'}
                        </CButton>
                    )}
                </CModalFooter>
            </CModal>
        </>
    );
};

export default Payment;
