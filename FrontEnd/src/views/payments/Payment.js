import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CFormSelect } from '@coreui/react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CForm, CFormInput, CModalFooter, CRow } from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import * as loadService from '../../ultils/apiServices/loadServices';
import * as postService from '../../ultils/apiServices/postServices';

const Payment = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState({});
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusModal, setStatusModal] = useState('');
    const [error, setError] = useState({});
    const [accessToken, setAccessToken] = useState('');
    const [users, setUsers] = useState([]);
    const numberPerPage = 10;

    useEffect(() => {
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
            fetchPayments();
        }

        // Load users
        if (accessToken) {
            fetchUser();
        }
    }, [accessToken]);

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

    const fetchPayments = async () => {
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const result = await loadService.loadPayments(options);
            if (result) {
                setPayments(result);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error loading payments');
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(payments.length / numberPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleViewPayment = (payment) => {
        setSelectedPayment(payment);
        setVisible(true);
        setStatusModal('view');
        setError({});
    };

    const handleCreatePayment = async (newPayment) => {
        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(newPayment),
            };
            const response = await postService.createPayment(newPayment, options);
            setPayments([...payments, response]);

        } catch (error) {
            console.error(error);
            toast.error('Error creating payment');
        }
    };

    const handleUpdatePayment = async (updatedPayment) => {
        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(updatedPayment),
            };
            const response = await postService.updatePayment(updatedPayment.id, updatedPayment, options);
            if (response.success) {
                fetchPayments();
                toast.success('Payment updated successfully');
            } else {
                toast.error('Failed to update payment');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating payment');
        }
    };

    const handleDeletePayment = async (paymentId) => {
        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                method: 'DELETE',
            };
            const response = await postService.deletePayment(paymentId, options);
            if (response.success) {
                fetchPayments();
                toast.success('Payment deleted successfully');
            } else {
                toast.error('Failed to delete payment');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error deleting payment');
        }
    };

    // Add state for newPayment
    const [newPayment, setNewPayment] = useState({
        name: '',
        amount: 0,
        description: '',
        userId: 0, // Assuming you have a way to set this, e.g., from current user session
    });

    // Modified or additional code
    const handleCreateNew = () => {
        setStatusModal('create');
        setNewPayment({ name: '', amount: 0, description: '', userId: 0 }); // Reset new payment state or set to default user
        setVisible(true);
    };

    const handleInputChange = (e, fieldName) => {
        let value = e.target.value;
        if (fieldName === 'userId') {
            value = parseInt(value, 10) || '';
        }
        if (statusModal === 'create') {
            setNewPayment(prevState => ({ ...prevState, [fieldName]: value }));
        } else {
            setSelectedPayment(prevState => ({ ...prevState, [fieldName]: value }));
        }
    };


    const handleCreateOrUpdate = () => {
        if (statusModal === 'create') {
            handleCreatePayment(newPayment);
        } else {
            handleUpdatePayment(selectedPayment);
        }
        setVisible(false); // Close modal after action
    };

    // Adjust the modal to collect payment information
    const handleCloseModal = () => setVisible(false);



    return (
        <>
            <CRow>
                <CButton onClick={handleCreateNew}>Create New Payment</CButton>
            </CRow>
            <CTable striped>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Transaction Code</CTableHeaderCell>
                        <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {payments.map((payment, index) => {
                        const paymentDate = payment.when ? new Date(payment.when) : null;
                        const formattedDate = paymentDate ? format(paymentDate, 'dd/MM/yyyy HH:mm') : 'Invalid Date';
                        const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payment.amount);

                        const user = users.find(user => user.id === payment.userId);
                        const userName = user ? `${user.firstName} ${user.lastName}` : 'Unknown';
                        return (
                            <CTableRow key={payment.id}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell>{payment.name}</CTableDataCell>
                                <CTableDataCell>{userName}</CTableDataCell>
                                <CTableDataCell>{formattedAmount}</CTableDataCell>
                                <CTableDataCell>{formattedDate}</CTableDataCell>
                                <CTableDataCell>{payment.description}</CTableDataCell>
                                <CTableDataCell>{payment.isPaid ? "Paid" : "Unpaid"}</CTableDataCell>
                            </CTableRow>
                        );
                    })}
                </CTableBody>
            </CTable>

            <CModal visible={visible} onClose={handleCloseModal}>
                <CModalHeader>
                    <CModalTitle>{statusModal === 'create' ? 'Create New Payment' : 'Update Payment'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        {/* Adjust input fields as per the newPayment state structure */}
                        <CFormInput
                            type="text"
                            value={statusModal === 'create' ? newPayment.name : selectedPayment.name}
                            onChange={(e) => handleInputChange(e, 'name')}
                            placeholder="Name"
                        />
                        <CFormInput
                            type="number"
                            value={statusModal === 'create' ? newPayment.amount : selectedPayment.amount}
                            onChange={(e) => handleInputChange(e, 'amount')}
                            placeholder="Amount"
                        />
                        <CFormInput
                            type="text"
                            value={statusModal === 'create' ? newPayment.description : selectedPayment.description}
                            onChange={(e) => handleInputChange(e, 'description')}
                            placeholder="Description"
                        />
                        <CFormSelect
                            style={{ margin: 10 }}
                            value={statusModal === 'create' ? newPayment.userId : selectedPayment.userId}
                            onChange={(e) => handleInputChange(e, 'userId')}
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {`${user.firstName} ${user.lastName}`}
                                </option>
                            ))}
                        </CFormSelect>

                        {/* Optionally handle userId if needed, e.g., via a select input for admin interfaces */}
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>Cancel</CButton>
                    <CButton color="primary" onClick={handleCreateOrUpdate}>{statusModal === 'create' ? 'Create' : 'Update'}</CButton>
                </CModalFooter>
            </CModal>



            <div>
                <CButton onClick={handlePrevPage} disabled={currentPage === 1}>Previous</CButton>
                <span> Page {currentPage} </span>
                <CButton onClick={handleNextPage} disabled={currentPage === Math.ceil(payments.length / numberPerPage)}>Next</CButton>
            </div>


            <ToastContainer />
        </>
    );
};

export default Payment;
