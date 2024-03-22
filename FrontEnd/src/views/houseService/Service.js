import React from 'react';
import { useState, useEffect } from 'react';
import * as loadService from '../../ultils/apiServices/loadServices';
import * as postService from '../../ultils/apiServices/postServices';
import {
    CForm,
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
    CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilDelete, cilSearch } from '@coreui/icons';
import './Service.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Service = () => {
    const [selectedService, setSelectedService] = useState({});
    const [visible, setVisible] = useState(false);
    const [visibleManageService, setVisibleManageService] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [Services, setServices] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [statusModal, setStatusModal] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);
    const [houses, setHouses] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(0);
    const [selectedServices, setSelectedServices] = useState([]);
    const navigate = useNavigate();

    const numberPerPage = 10;

    const numberOfPages = Math.ceil(Services.length / numberPerPage);
    const startIndex = (currentPage - 1) * numberPerPage;
    const endIndex = startIndex + numberPerPage;
    const displayedServices = Services.slice(startIndex, endIndex);

    useEffect(() => {
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
        }

        if (accessToken) {
            fetchService();
            fetchHouse();
        }

        if (success) {
            toast.success('Success');
            setSuccess(false);
        }

        setLoading(false);
    }, [accessToken, loading]);
    const fetchHouse = async () => {
        const housesResult = await loadService.loadHouses();
        if (housesResult) {
            setHouses(housesResult);
        }
    };
    const fetchService = async () => {
        try {
            const list = await loadService.loadServices({
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (list) {
                setServices(list);
            }
        } catch (err) {
            if (err.response.status === 403) {
                navigate('/403');
            } else {
                toast.error('Error');
            }
        }
    };
    useEffect(() => {
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
        }

        if (accessToken) {
            const fetchServiceByHouseId = async (id) => {
                try {
                    if (!id) setSelectedServices([]);
                    else {
                        const list = await loadService.loadServicesByHouseId(id, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        });
                        if (list) {
                            var newList = list.map((item) => item.id);
                            setSelectedServices(newList);
                            console.log(newList);
                        }
                    }
                } catch (err) {
                    if (err.response.status === 403) {
                        navigate('/403');
                    } else {
                        toast.error('Error');
                    }
                }
            };
            fetchServiceByHouseId(selectedHouse);
        }
    }, [selectedHouse]);

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
        setSelectedService({});
        setStatusModal('create');
        setError({});
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedService({});
        setStatusModal('');
        setError({});
    };

    const handleOpenModalManageService = () => {
        setVisibleManageService(true);
    };
    const handleCloseModalManageService = () => {
        setVisibleManageService(false);
        setSelectedServices([]);
        setSelectedHouse(0);
    };
    const handleHouseSelect = (e) => {
        setSelectedHouse(e.target.value);
    };
    const handleSelectServices = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        console.log(selectedOptions);
        setSelectedServices(selectedOptions);
    };
    const handleSaveService = async () => {
        var houseService = {
            houseId: selectedHouse,
            listServicesId: selectedServices,
        };
        try {
            const res = await postService.postServiceForHouse(houseService, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setSuccess(true);
        } catch (err) {
            toast.error('Error');
        }
        setLoading(true);
        handleCloseModalManageService();
    };
    const handleInputChange = (event, pros) => {
        const Service = Object.assign({}, selectedService);
        const err = Object.assign({}, error);
        Service[pros] = event.target.value;
        setSelectedService(Service);
        if (event.target.value.trim() === '') {
            err[pros] = `This field cannot be empty`;
            setError(err);
        } else {
            const { [pros]: deletedError, ...restErrors } = err;
            setError(restErrors);
        }
    };

    const handleCreateOrUpdateOrDelete = async () => {
        if (statusModal === 'delete') {
            try {
                const res = await postService.deleteService(selectedService.id, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSuccess(true);
                setLoading(true);
            } catch (error) {
                toast.error('Error');
            }
            handleCloseModal();
        }

        if (Object.keys(error).length !== 0) {
            toast.error('Error');
            return;
        }

        if (statusModal === 'create') {
            try {
                var Service = {
                    name: selectedService.name,
                    description: selectedService.description,
                };
                const res = await postService.postService(Service, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSuccess(true);
            } catch (err) {
                toast.error('Error');
            }
            setLoading(true);
            handleCloseModal();
        } else if (statusModal === 'update') {
            try {
                var Service = {
                    name: selectedService.name,
                    description: selectedService.description,
                };
                const res = await postService.updateService(selectedService.id, Service, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSuccess(true);
            } catch (err) {
                toast.error('Error');
            }
            setLoading(true);
            handleCloseModal();
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
                <CButton
                    style={{ marginRight: '10px' }}
                    onClick={handleOpenModalManageService}
                    className="btn-create"
                    color="secondary"
                >
                    Manage Service Of House
                </CButton>
                <CButton onClick={handleCreateNew} className="btn-create" color="secondary">
                    Create new
                </CButton>
            </div>
            <CTable striped>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {displayedServices.map((Service, index) => (
                        <CTableRow key={Service.id}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{Service.name}</CTableDataCell>
                            <CTableDataCell>{Service.description}</CTableDataCell>
                            <CTableDataCell>
                                <CIcon
                                    className="icon-view"
                                    title="View"
                                    icon={cilSearch}
                                    size="xl"
                                    onClick={() => {
                                        setSelectedService(Service);
                                        setVisible(true);
                                        setStatusModal('update');
                                        setError({});
                                    }}
                                ></CIcon>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CIcon
                                    className="icon-delete"
                                    title="Delete"
                                    icon={cilDelete}
                                    size="xl"
                                    onClick={() => {
                                        setSelectedService(Service);
                                        setVisible(true);
                                        setStatusModal('delete');
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
                    <CModalTitle id="LiveDemoExampleLabel">
                        <CModalTitle id="LiveDemoExampleLabel">
                            {statusModal === 'create'
                                ? 'Create New Service'
                                : statusModal === 'update'
                                    ? 'Service Details'
                                    : 'Warning'}
                        </CModalTitle>
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedService &&
                        (statusModal === 'delete' ? (
                            <p>Are you sure to delete this Service information ?</p>
                        ) : (
                            <>
                                <CForm className="row g-3">
                                    <CCol md={12}>
                                        <CFormInput
                                            type="text"
                                            id="name"
                                            label="Name"
                                            value={selectedService.name}
                                            onChange={(event) => handleInputChange(event, 'name')}
                                        />
                                        <span className="error-message">{error.name}</span>
                                    </CCol>
                                    <CCol md={12}>
                                        <CFormInput
                                            type="text"
                                            id="description"
                                            label="Description"
                                            value={selectedService.description}
                                            onChange={(event) => handleInputChange(event, 'description')}
                                        />
                                        <span className="error-message">{error.description}</span>
                                    </CCol>
                                </CForm>
                            </>
                        ))}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>
                        {statusModal === 'delete' ? 'No' : 'Close'}
                    </CButton>
                    <CButton onClick={handleCreateOrUpdateOrDelete} color="primary">
                        {statusModal === 'delete' ? 'Yes' : 'Save'}
                    </CButton>
                </CModalFooter>
            </CModal>

            <CModal
                size="lg"
                visible={visibleManageService}
                onClose={handleCloseModalManageService}
                aria-labelledby="addService"
            >
                <CModalHeader onClose={handleCloseModalManageService}>
                    <CModalTitle id="addService">Add Service For House</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <>
                        <CForm className="row g-3">
                            <CCol md={6}>
                                <CFormSelect onChange={handleHouseSelect} label="Select House">
                                    <option value="0">Select House</option>
                                    {houses.map((house, index) => (
                                        <option key={index} value={house.id}>
                                            {house.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                                <CFormSelect
                                    value={selectedServices}
                                    multiple
                                    onChange={handleSelectServices}
                                    label="Select Services"
                                >
                                    {Services.map((s, index) => (
                                        <option key={index} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CForm>
                    </>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModalManageService}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleSaveService}>
                        Save changes
                    </CButton>
                </CModalFooter>
            </CModal>

            <ToastContainer />
        </>
    );
};

export default Service;
