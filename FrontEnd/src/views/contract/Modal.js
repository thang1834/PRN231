
import * as getLinkImage from '../../ultils/getLinkImage';
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
    role,
    houses,
    users,
    payments
}) => {
    return (
        <CModal size="lg" visible={visible} onClose={handleCloseModal} aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader onClose={handleCloseModal}>
                <CModalTitle id="LiveDemoExampleLabel">
                    {statusModal === 'create'
                        ? 'Create New Contract'
                        : statusModal === 'update'
                            ? 'Contract Details'
                            : 'Warning'}
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                {statusModal === 'delete' ? (
                    <p>Are you sure to delete this contract information ?</p>
                ) : (
                    <CForm id="1" className="row g-3">
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                id="contract_type"
                                label="Type"
                                value={selectedContract.type}
                                disabled={role !== 'Admin'}
                                onChange={(event) => handleInputChange(event, 'type')}
                            />
                            <span className="error-message">{error.type}</span>
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="number"
                                id="contract_price"
                                label="Price"
                                value={selectedContract.price}
                                disabled={role !== 'Admin'}
                                onChange={(event) => handleInputChange(event, 'price')}
                                required
                            />
                            <span className="error-message">{error.price}</span>
                        </CCol>
                        <CCol md={2}>
                        </CCol>
                        <CRow>
                            {role === 'Admin' && (
                                <>
                                    <CFormSelect
                                        style={{ margin: 10 }}
                                        value={selectedContract.userId || ''}
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
                                </>
                            )}
                        </CRow>
                        <CRow>
                            <CFormSelect
                                style={{ margin: 10 }}
                                value={selectedContract.houseId || ''}
                                disabled={role !== 'Admin'}
                                onChange={(event) => handleInputChange(event, 'houseId')}
                            >
                                <option value="">Select House</option>
                                {houses.map((h) => (
                                    <option key={h.id} value={h.id}>
                                        {h.name}
                                    </option>
                                ))}
                            </CFormSelect>
                            <span className="error-message">{error.houseId}</span>
                        </CRow>
                        <CRow>
                            <CFormSelect
                                style={{ margin: 10 }}
                                value={selectedContract.paymentId || ''}
                                disabled={role !== 'Admin'}
                                onChange={(event) => handleInputChange(event, 'paymentId')}
                            >
                                <option value="">Select Payment</option>
                                {payments.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </CFormSelect>
                            <span className="error-message">{error.paymentId}</span>
                        </CRow>
                        <CCol md={6}>
                            <CFormInput
                                type="date"
                                id="contract_start_date"
                                label="Start Date"
                                value={selectedContract.startDate}
                                disabled={role !== 'Admin'}
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
                                disabled={role !== 'Admin'}
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
                        {role === 'Admin' ? (
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
                        ) : (
                            <></>
                        )}

                        <CCol md={12}>
                            <CFormInput
                                type="text"
                                id="contract_description"
                                label="Description"
                                value={selectedContract.description}
                                disabled={role !== 'Admin'}
                                onChange={(event) => handleInputChange(event, 'description')}
                            />
                            <span className="error-message">{error.description}</span>
                        </CCol>
                    </CForm>
                )}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={handleCloseModal}>
                    {statusModal === 'delete' ? 'No' : 'Close'}
                </CButton>
                {role === 'Admin' ? (
                    <CButton onClick={handleConfirmModal} color="primary">
                        {statusModal === 'delete' ? 'Yes' : 'Save'}
                    </CButton>
                ) : (
                    <></>
                )}
            </CModalFooter>
        </CModal>
    );
};

export default Modal;
