import React from 'react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as loadService from '../../ultils/apiServices/loadServices';
import * as postService from '../../ultils/apiServices/postServices';
import * as getLinkImage from '../../ultils/getLinkImage';
import './Contract.scss';
import Modal from './Modal';

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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilDelete } from '@coreui/icons';

const Contract = () => {
    const [contracts, setContracts] = useState([]);
    const [selectedContract, setSelectedContract] = useState({});
    const [selectedFile, setSelectedFile] = useState();
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusModal, setStatusModal] = useState('');
    const [error, setError] = useState({});
    const [accessToken, setAccessToken] = useState('');
    const [role, setRole] = useState('');
    const numberPerPage = 10;
    useEffect(() => {
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
        }
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setRole(decodedToken.role);
            fetchContractApi();
        }
    }, [accessToken]);

    const fetchContractApi = async () => {
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const decodedToken = jwtDecode(accessToken);
        let result = [];
        if (decodedToken.role === 'Admin') result = await loadService.loadContracts(options);
        else result = await loadService.loadAllContractsByUserId(decodedToken.nameid, options);
        if (result) {
            result.map((item) => {
                item.startDate = formatDateString(item.startDate);
                item.endDate = formatDateString(item.endDate);
                return item;
            });
            setContracts(result);
        }
    };

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
        const today = new Date();
        var contract = {
            startDate: formatDateString(today),
            endDate: formatDateString(today),
        };
        setVisible(true);
        setSelectedContract(contract);
        setStatusModal('create');
        setError({});
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
        console.log(error);
    };

    const handleCreateOrUpdateOrDelete = async () => {
        if (statusModal === 'delete') {
            const res = await postService.deleteContract(selectedContract.id);
            const indexDelete = contracts.findIndex((item) => selectedContract.id == item.id);
            const updatedContracts = [...contracts.slice(0, indexDelete), ...contracts.slice(indexDelete + 1)];
            setContracts(updatedContracts);
            handleCloseModal();
            return;
        }

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
            val = val || '';
            if (typeof val === 'number') {
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
        if (Object.keys(err).length !== 0) return;
        if (statusModal === 'create') {
            // console.log(err);
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
                        <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">User Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Payment Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">House Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Image Contract</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        {role === 'Admin' ? <CTableHeaderCell scope="col"></CTableHeaderCell> : <></>}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {displayedContracts.map((contract, index) => (
                        <CTableRow key={contract.id}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{contract.type}</CTableDataCell>
                            <CTableDataCell>{contract.price}</CTableDataCell>
                            <CTableDataCell>{formatDateString(contract.startDate)}</CTableDataCell>
                            <CTableDataCell>{formatDateString(contract.endDate)}</CTableDataCell>
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
                            {role === 'Admin' ? (
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
                            ) : (
                                <></>
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

            <Modal
                visible={visible}
                selectedContract={selectedContract}
                handleCloseModal={handleCloseModal}
                error={error}
                handleConfirmModal={handleCreateOrUpdateOrDelete}
                handleInputChange={handleInputChange}
                statusModal={statusModal}
                role={role}
            />
        </>
    );
};

export default Contract;
