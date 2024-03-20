import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
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
    const numberPerPage = 10;

    useEffect(() => {
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
            fetchPayments();
        }
    }, [accessToken]);

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
            if (response.success) {
                fetchPayments();
                toast.success('Payment created successfully');
            } else {
                toast.error('Failed to create payment');
            }
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

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedPayment({});
        setStatusModal('');
        setError({});
    };

    return (
        <>
            <CTable striped>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Transaction Code</CTableHeaderCell>
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

                        return (
                            <CTableRow key={payment.id}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell>{payment.name}</CTableDataCell>
                                <CTableDataCell>{formattedAmount}</CTableDataCell>
                                <CTableDataCell>{formattedDate}</CTableDataCell>
                                <CTableDataCell>{payment.description}</CTableDataCell>
                                <CTableDataCell>{payment.isPaid ? "Paid" : "Unpaid"}</CTableDataCell>
                            </CTableRow>
                        );
                    })}
                </CTableBody>
            </CTable>

            <div>
                <CButton onClick={handlePrevPage} disabled={currentPage === 1}>Previous</CButton>
                <span> Page {currentPage} </span>
                <CButton onClick={handleNextPage} disabled={currentPage === Math.ceil(payments.length / numberPerPage)}>Next</CButton>
            </div>

            <Modal
                visible={visible}
                payment={selectedPayment}
                handleCloseModal={handleCloseModal}
                onCreatePayment={handleCreatePayment}
                onUpdatePayment={handleUpdatePayment}
                onDeletePayment={handleDeletePayment}
            />

            <ToastContainer />
        </>
    );
};

export default Payment;
