import React from 'react';
import { useState } from 'react';
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

const User = () => {
    const users = [
        {
            Id: 1,
            FirstName: 'John',
            LastName: 'Doe',
            Email: 'john@example.com',
            PhoneNumber: '123-456-7890',
            Dob: '1990-05-15T00:00:00.000Z',
            IdentificationNumber: 'ID123456',
            IsActive: true,
            Password: 'password123',
            Username: 'johndoe',
        },
        {
            Id: 2,
            FirstName: 'Jane',
            LastName: 'Smith',
            Email: 'jane@example.com',
            PhoneNumber: '987-654-3210',
            Dob: '1985-08-20T00:00:00.000Z',
            IdentificationNumber: 'ID654321',
            IsActive: false,
            Password: 'qwerty',
            Username: 'janesmith',
        },
        {
            Id: 3,
            FirstName: 'Michael',
            LastName: 'Johnson',
            Email: 'michael@example.com',
            PhoneNumber: '555-123-4567',
            Dob: '1988-11-25T00:00:00.000Z',
            IdentificationNumber: 'ID789012',
            IsActive: true,
            Password: 'pass123',
            Username: 'michaelj',
        },
        {
            Id: 4,
            FirstName: 'Emily',
            LastName: 'Williams',
            Email: 'emily@example.com',
            PhoneNumber: '777-555-1234',
            Dob: '1995-03-10T00:00:00.000Z',
            IdentificationNumber: 'ID456789',
            IsActive: false,
            Password: 'abc123',
            Username: 'emilyw',
        },
        {
            Id: 5,
            FirstName: 'David',
            LastName: 'Brown',
            Email: 'david@example.com',
            PhoneNumber: '333-999-8888',
            Dob: '1980-07-02T00:00:00.000Z',
            IdentificationNumber: 'ID321654',
            IsActive: true,
            Password: 'davidpass',
            Username: 'davidb',
        },
        {
            Id: 6,
            FirstName: 'Emma',
            LastName: 'Jones',
            Email: 'emma@example.com',
            PhoneNumber: '999-888-7777',
            Dob: '1992-04-18T00:00:00.000Z',
            IdentificationNumber: 'ID987654',
            IsActive: false,
            Password: 'emmapass',
            Username: 'emmaj',
        },
        {
            Id: 7,
            FirstName: 'Christopher',
            LastName: 'Wilson',
            Email: 'chris@example.com',
            PhoneNumber: '222-333-4444',
            Dob: '1983-09-30T00:00:00.000Z',
            IdentificationNumber: 'ID012345',
            IsActive: true,
            Password: 'wilsonpass',
            Username: 'chrisw',
        },
        {
            Id: 8,
            FirstName: 'Olivia',
            LastName: 'Martinez',
            Email: 'olivia@example.com',
            PhoneNumber: '888-777-6666',
            Dob: '1998-12-05T00:00:00.000Z',
            IdentificationNumber: 'ID789456',
            IsActive: false,
            Password: 'oliviapass',
            Username: 'oliviam',
        },
        {
            Id: 9,
            FirstName: 'Daniel',
            LastName: 'Taylor',
            Email: 'daniel@example.com',
            PhoneNumber: '111-222-3333',
            Dob: '1975-06-20T00:00:00.000Z',
            IdentificationNumber: 'ID654987',
            IsActive: true,
            Password: 'danielpass',
            Username: 'danieldt',
        },
        {
            Id: 10,
            FirstName: 'Sophia',
            LastName: 'Garcia',
            Email: 'sophia@example.com',
            PhoneNumber: '666-555-4444',
            Dob: '1999-10-15T00:00:00.000Z',
            IdentificationNumber: 'ID456789',
            IsActive: false,
            Password: 'sophiapass',
            Username: 'sophiag',
        },
    ];

    const [selectedContract, setSelectedContract] = useState(null);
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const numberPerPage = 10;

    const numberOfPages = Math.ceil(contracts.length / numberPerPage);
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    const displayedContracts = contracts.slice(startIndex, endIndex);
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

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedContract(null);
    };

    const handleInputChange = (event, val, pros) => {
        const contract = contracts.find((item) => item.id == val);
        contract[pros] = event.target.value;
        setSelectedContract(contract);
    };

    return (
        <>
            <CTable striped>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">User Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Payment Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">House Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">File Path</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {displayedContracts.map((contract) => (
                        <CTableRow key={contract.id}>
                            <CTableHeaderCell scope="row">{contract.id}</CTableHeaderCell>
                            <CTableDataCell>{contract.type}</CTableDataCell>
                            <CTableDataCell>{contract.price}</CTableDataCell>
                            <CTableDataCell>{contract.startDate}</CTableDataCell>
                            <CTableDataCell>{contract.endDate}</CTableDataCell>
                            <CTableDataCell>{contract.userId}</CTableDataCell>
                            <CTableDataCell>{contract.paymentId}</CTableDataCell>
                            <CTableDataCell>{contract.houseId}</CTableDataCell>
                            <CTableDataCell>{contract.filePath}</CTableDataCell>
                            <CTableDataCell>{contract.description}</CTableDataCell>
                            <CTableDataCell>
                                <CIcon
                                    className="icon-view"
                                    title="View"
                                    icon={cilSearch}
                                    size="xl"
                                    onClick={() => {
                                        setSelectedContract(contract);
                                        setVisible(true);
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
                    <CModalTitle id="LiveDemoExampleLabel">Contract Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedContract && (
                        <>
                            <CForm className="row g-3">
                                <CCol md={2}>
                                    <CFormInput
                                        type="text"
                                        id="contract_id"
                                        label="ID"
                                        disabled
                                        value={selectedContract.id}
                                    />
                                </CCol>

                                <CCol md={2}>
                                    <CFormInput
                                        type="text"
                                        id="contract_type"
                                        label="Type"
                                        value={selectedContract.type}
                                        onChange={(event) => handleInputChange(event, selectedContract.id, 'type')}
                                    />
                                </CCol>
                                <CCol md={2}>
                                    <CFormInput
                                        type="number"
                                        id="contract_price"
                                        label="Price"
                                        value={selectedContract.price}
                                        onChange={(event) => handleInputChange(event, selectedContract.id, 'price')}
                                    />
                                </CCol>
                                <CCol xs={3}>
                                    <CFormInput
                                        id="contract_userId"
                                        label="User"
                                        value={selectedContract.userId}
                                        onChange={(event) => handleInputChange(event, selectedContract.id, 'userId')}
                                    />
                                </CCol>
                                <CCol xs={3}>
                                    <CFormInput
                                        id="contract_paymentId"
                                        label="Payment ID"
                                        value={selectedContract.paymentId}
                                        onChange={(event) => handleInputChange(event, selectedContract.id, 'paymentId')}
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput
                                        type="date"
                                        id="contract_start_date"
                                        label="Start Date"
                                        value={selectedContract.startDate}
                                        onChange={(event) => handleInputChange(event, selectedContract.id, 'startDate')}
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormInput
                                        type="date"
                                        id="contract_end_date"
                                        label="End Date"
                                        value={selectedContract.endDate}
                                        onChange={(event) => handleInputChange(event, selectedContract.id, 'endDate')}
                                    />
                                </CCol>
                                <CCol md={2}>
                                    <CFormInput
                                        type="text"
                                        id="contract_houseId"
                                        label="House ID"
                                        value={selectedContract.houseId}
                                        onChange={(event) => handleInputChange(event, selectedContract.id, 'houseId')}
                                    />
                                </CCol>
                                <CCol md={10}>
                                    <CFormInput
                                        type="text"
                                        id="contract_filePath"
                                        label="File Path"
                                        value={selectedContract.filePath}
                                        onChange={(event) => handleInputChange(event, selectedContract.id, 'filePath')}
                                    />
                                </CCol>
                                <CCol md={12}>
                                    <CFormInput
                                        type="text"
                                        id="contract_description"
                                        label="Description"
                                        value={selectedContract.description}
                                        onChange={(event) =>
                                            handleInputChange(event, selectedContract.id, 'description')
                                        }
                                    />
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
                                </CCol>
                                <CCol xs={12}>
                                    <CButton type="submit">Sign in</CButton>
                                </CCol> */}
                            </CForm>
                        </>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>
                        Close
                    </CButton>
                    <CButton color="primary">Save changes</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default User;
