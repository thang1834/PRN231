import { useState, useEffect } from 'react';
import * as getLinkImage from '../../ultils/getLinkImage';
import {
    CSpinner,
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
    CImage,
} from '@coreui/react';

const Modal = ({
    selectedContract,
    statusModal,
    visible,
    handleCloseModal,
    error,
    handleConfirmModal,
    handleInputChange,
}) => {
    return (
        <CModal size="lg" visible={visible} onClose={handleCloseModal} aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader onClose={handleCloseModal}>
                <CModalTitle id="LiveDemoExampleLabel">
                    {statusModal === 'update' || statusModal === 'create' ? 'Contract Details' : 'Warning'}
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                {statusModal === 'delete' ? (
                    <p>Are you sure to delete this contract information ?</p>
                ) : (
                    <CForm id="1" className="row g-3">
                        <CCol md={2}>
                            <CFormInput
                                type="text"
                                id="contract_type"
                                label="Type"
                                value={selectedContract.type}
                                onChange={(event) => handleInputChange(event, 'type')}
                            />
                            <span className="error-message">{error.type}</span>
                        </CCol>
                        <CCol md={2}>
                            <CFormInput
                                type="number"
                                id="contract_price"
                                label="Price"
                                value={selectedContract.price}
                                onChange={(event) => handleInputChange(event, 'price')}
                                required
                            />
                            <span className="error-message">{error.price}</span>
                        </CCol>
                        <CCol md={3}>
                            <CFormInput
                                id="contract_userId"
                                label="User"
                                value={selectedContract.userId}
                                onChange={(event) => handleInputChange(event, 'userId')}
                            />
                            <span className="error-message">{error.userId}</span>
                        </CCol>
                        <CCol md={3}>
                            <CFormInput
                                id="contract_paymentId"
                                label="Payment ID"
                                value={selectedContract.paymentId}
                                onChange={(event) => handleInputChange(event, 'paymentId')}
                            />
                            <span className="error-message">{error.paymentId}</span>
                        </CCol>
                        <CCol md={2}>
                            <CFormInput
                                type="text"
                                id="contract_houseId"
                                label="House ID"
                                value={selectedContract.houseId}
                                onChange={(event) => handleInputChange(event, 'houseId')}
                            />
                            <span className="error-message">{error.houseId}</span>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="date"
                                id="contract_start_date"
                                label="Start Date"
                                value={selectedContract.startDate}
                                onChange={(event) => handleInputChange(event, 'startDate')}
                            />
                            <span className="error-message">{error.startDate}</span>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="date"
                                id="contract_end_date"
                                label="End Date"
                                value={selectedContract.endDate}
                                onChange={(event) => handleInputChange(event, 'endDate')}
                            />
                            <span className="error-message">{error.endDate}</span>
                        </CCol>
                        {statusModal === 'update' ? (
                            <CCol md={2}>
                                <CImage height={40} src={getLinkImage.getLinkImage(selectedContract.filePath)}></CImage>
                            </CCol>
                        ) : (
                            <></>
                        )}
                        <CCol md={4}>
                            <CFormInput
                                type="file"
                                id="contract_filePath"
                                label="File Path"
                                // value={selectedContract.filePath}
                                onChange={(event) => handleInputChange(event, 'filePath')}
                            />
                            <span className="error-message">{error.filePath}</span>
                        </CCol>

                        <CCol md={12}>
                            <CFormInput
                                type="text"
                                id="contract_description"
                                label="Description"
                                value={selectedContract.description}
                                onChange={(event) => handleInputChange(event, 'description')}
                            />
                            <span className="error-message">{error.description}</span>
                        </CCol>
                        {/* <CCol md={4}>
                        <CFormSelect id="inputState" label="State">
                            <option>Choose...</option>
                            <option>...</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md={2}>
                        <CFormInput id="inputZip" label="Zip" />
                    </CCol>
                    <CCol xs={12}>
                        <CFormCheck type="checkbox" id="gridCheck" label="Check me out" />
                    </CCol> */}
                        {/* <CCol xs={12}>
                        <CButton type="submit">Sign in</CButton>
                    </CCol> */}
                    </CForm>
                )}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={handleCloseModal}>
                    {statusModal === 'delete' ? 'No' : 'Close'}
                </CButton>
                <CButton onClick={handleConfirmModal} color="primary">
                    {statusModal === 'delete' ? 'Yes' : 'Save'}
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

export default Modal;
