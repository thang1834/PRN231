import React from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';

const Modal = ({ visible, payment, handleCloseModal, onCreatePayment, onUpdatePayment, onDeletePayment }) => {
    const handleCreate = () => {
        onCreatePayment(payment);
        handleCloseModal();
    };

    const handleUpdate = () => {
        onUpdatePayment(payment);
        handleCloseModal();
    };

    const handleDelete = () => {
        onDeletePayment(payment.id);
        handleCloseModal();
    };

    return (
        <CModal size="lg" visible={visible} onClose={handleCloseModal}>
            <CModalHeader closeButton>
                <CModalTitle>{payment ? 'Edit Payment' : 'Create Payment'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {payment ? (
                    <div>
                        <p>Amount: {payment.amount}</p>
                        <p>Date: {payment.date}</p>
                        <p>Description: {payment.description}</p>
                    </div>
                ) : (
                    <p>Form for creating new payment goes here</p>
                )}
            </CModalBody>
            <CModalFooter>
                {payment ? (
                    <>
                        <CButton color="danger" onClick={handleDelete}>Delete</CButton>
                        <CButton color="secondary" onClick={handleCloseModal}>Cancel</CButton>
                        <CButton color="primary" onClick={handleUpdate}>Update</CButton>
                    </>
                ) : (
                    <>
                        <CButton color="secondary" onClick={handleCloseModal}>Cancel</CButton>
                        <CButton color="primary" onClick={handleCreate}>Create</CButton>
                    </>
                )}
            </CModalFooter>
        </CModal>
    );
};

export default Modal;
