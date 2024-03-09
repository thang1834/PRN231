import React from 'react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import * as loadService from '../../ultils/apiServices/loadServices';
import * as postService from '../../ultils/apiServices/postServices';
import * as getLinkImage from '../../ultils/getLinkImage';
import './Contract.scss';
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
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
    CImage,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';

const Contract = () => {
    const [contracts, setContracts] = useState([]);
    const [selectedContract, setSelectedContract] = useState({});
    const [selectedFile, setSelectedFile] = useState();
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusModal, setStatusModal] = useState('');
    const [error, setError] = useState({});

    const numberPerPage = 10;

    useEffect(() => {
        const fetchApi = async () => {
            const result = await loadService.loadContracts();
            if (result) {
                result.map((item) => {
                    item.startDate = formatDateString(item.startDate);
                    item.endDate = formatDateString(item.endDate);
                    return item;
                });
                setContracts(result);
            }
        };
        fetchApi();
    }, []);
    // const contracts = [
    //     {
    //         id: 1,
    //         type: 'Lease',
    //         description: 'Apartment rental agreement',
    //         startDate: '2024-03-01',
    //         endDate: '2025-02-28',
    //         price: 1200.5,
    //         filePath: '/contracts/lease_contract_1.pdf',
    //         userId: 101,
    //         paymentId: 201,
    //         houseId: 301,
    //     },
    //     {
    //         id: 2,
    //         type: 'Sale',
    //         description: 'House sale agreement',
    //         startDate: '2024-04-15',
    //         endDate: '2025-04-14',
    //         price: 250000.0,
    //         filePath: '/contracts/sale_contract_1.pdf',
    //         userId: 102,
    //         paymentId: 202,
    //         houseId: 302,
    //     },
    //     {
    //         id: 3,
    //         type: 'Lease',
    //         description: 'Commercial space rental agreement',
    //         startDate: '2024-06-01',
    //         endDate: '2025-05-31',
    //         price: 1800.75,
    //         filePath: '/contracts/lease_contract_2.pdf',
    //         userId: 103,
    //         paymentId: 203,
    //         houseId: 303,
    //     },
    // ];

    const numberOfPages = Math.ceil(contracts.length / numberPerPage);
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    const displayedContracts = contracts.slice(startIndex, endIndex);

    function formatDateString(inputDateString) {
        const inputDate = new Date(inputDateString);
        const formattedDate = format(inputDate, 'yyyy-MM-dd');
        return formattedDate;
    }
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
        setVisible(true);
        const today = new Date();
        var contract = {
            startDate: formatDateString(today),
            endDate: formatDateString(today),
        };
        setSelectedContract(contract);
        setStatusModal('create');
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedContract({});
        setStatusModal('');
        setError({});
    };

    const handleInputChange = (event, pros) => {
        const contract = Object.assign({}, selectedContract);
        const err = Object.assign({}, error);
        if (pros != 'filePath') contract[pros] = event.target.value;
        setSelectedContract(contract);
        switch (pros) {
            case 'price': {
                const inputValue = parseFloat(event.target.value);
                if (isNaN(inputValue)) {
                    err[pros] = `Please enter a valid number for ${pros}`;
                    setError(err);
                } else if (inputValue < 0) {
                    err[pros] = `The ${pros} must not be negative`;
                    setError(err);
                } else {
                    const { [pros]: deletedError, ...restErrors } = err;
                    setError(restErrors);
                }
                break;
            }

            case 'filePath':
                const file = event.target.files[0]; // Get the first selected file
                setSelectedFile(file);
                if (!file) {
                    if (statusModal == 'create') {
                        err[pros] = 'Please choose a file';
                        setError(err);
                    }
                } else {
                    const allowedExtensions = ['jpg', 'jpeg', 'png'];
                    const fileExtension = file.name.split('.').pop().toLowerCase();

                    if (!allowedExtensions.includes(fileExtension)) {
                        err[pros] = 'Please choose a file with a valid extension (jpg, jpeg, png)';
                        setError(err);
                    } else {
                        const { [pros]: deletedError, ...restErrors } = err;
                        setError(restErrors);
                    }
                }
                break;
            default: {
                if (event.target.value.trim() === '') {
                    err[pros] = `This field cannot be empty`;
                    setError(err);
                } else {
                    const { [pros]: deletedError, ...restErrors } = err;
                    setError(restErrors);
                }
            }
        }
    };

    const handleCreateOrUpdate = async () => {
        var contract = {
            type: selectedContract.type,
            description: selectedContract.description,
            startDate: selectedContract.startDate,
            endDate: selectedContract.endDate,
            price: selectedContract.price,
            filePath: selectedContract.filePath,
            userId: selectedContract.userId,
            paymentId: selectedContract.paymentId,
            houseId: selectedContract.houseId,
        };
        const err = Object.assign({}, error);

        for (var key in contract) {
            let val = contract[key];

            // Convert non-string values to string
            if (typeof val !== 'string') {
                val = String(val);
            }
            switch (key) {
                case 'price': {
                    const inputValue = parseFloat(val);
                    if (isNaN(inputValue)) {
                        err[key] = `Please enter a valid number for ${key}`;
                        setError(err);
                    } else if (inputValue < 0) {
                        err[key] = `The ${key} must not be negative`;
                        setError(err);
                    } else {
                        const { [key]: deletedError, ...restErrors } = err;
                        setError(restErrors);
                    }
                    break;
                }
                case 'filePath':
                    const file = selectedFile; // Get the first selected file
                    if (!file) {
                        if (statusModal == 'create') {
                            err[key] = 'Please choose a file';
                            setError(err);
                        }
                    } else {
                        const allowedExtensions = ['jpg', 'jpeg', 'png'];
                        const fileExtension = file.name.split('.').pop().toLowerCase();

                        if (!allowedExtensions.includes(fileExtension)) {
                            err[key] = 'Please choose a file with a valid extension (jpg, jpeg, png)';
                            setError(err);
                        } else {
                            const { [key]: deletedError, ...restErrors } = err;
                            setError(restErrors);
                        }
                    }
                    break;
                default: {
                    //console.log(typeof val);
                    if (val.trim() === '') {
                        err[key] = `This field cannot be empty`;
                        setError(err);
                    } else {
                        const { [key]: deletedError, ...restErrors } = err;
                        setError(restErrors);
                    }
                }
            }
        }

        if (Object.keys(error).length !== 0) return;

        if (statusModal === 'create') {
            const formData = new FormData();
            for (var key in contract) {
                if (key != 'filePath') formData.append(key, contract[key]);
            }
            formData.append('ImageUpload', selectedFile);
            const res = await postService.postContract(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const { user: usernull, payment: paymentnull, house: housenull, ...rest } = res;
            setContracts([...contracts, rest]);
            handleCloseModal();
        } else if (statusModal === 'update') {
            const formData = new FormData();
            for (var key in contract) {
                formData.append(key, contract[key]);
            }
            formData.append('imageUpload', selectedFile);
            const res = await postService.updateContract(selectedContract.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const updatedContract = await loadService.loadContractById(selectedContract.id);
            const indexUpdate = contracts.findIndex((item) => selectedContract.id == item.id);
            contracts[indexUpdate] = updatedContract;
            setContracts(contracts);
            handleCloseModal();
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                <CButton onClick={handleCreateNew} className="btn-create" color="secondary">
                    Create new
                </CButton>
            </div>

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
                    {displayedContracts.map((contract, index) => (
                        <CTableRow key={contract.id}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{contract.type}</CTableDataCell>
                            <CTableDataCell>{contract.price}</CTableDataCell>
                            <CTableDataCell>{contract.startDate}</CTableDataCell>
                            <CTableDataCell>{contract.endDate}</CTableDataCell>
                            <CTableDataCell>{contract.userId}</CTableDataCell>
                            <CTableDataCell>{contract.paymentId}</CTableDataCell>
                            <CTableDataCell>{contract.houseId}</CTableDataCell>
                            <CTableDataCell>
                                <CImage
                                    className="img_contract"
                                    src={getLinkImage.getLinkImage(contract.filePath)}
                                ></CImage>
                            </CTableDataCell>
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
                                        setStatusModal('update');
                                        setError({});
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
                                        <CImage
                                            height={40}
                                            src={getLinkImage.getLinkImage(selectedContract.filePath)}
                                        ></CImage>
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
                        </>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>
                        Close
                    </CButton>
                    <CButton onClick={handleCreateOrUpdate} color="primary">
                        Save
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default Contract;
