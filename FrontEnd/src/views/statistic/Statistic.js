import React from 'react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import * as loadService from '../../ultils/apiServices/loadServices';
import * as postService from '../../ultils/apiServices/postServices';
import * as getLinkImage from '../../ultils/getLinkImage';

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
    CCard,
    CCardBody,
    CRow,
    CCol,
    CButtonGroup,
    CCardFooter,
    CProgress,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilDelete, cilCloudDownload } from '@coreui/icons';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';

const Statistic = () => {
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
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const progressExample = [
      { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
      { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
      { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
      { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
      { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
    ];
    return (
        <>
            
            <WidgetsDropdown />
      <CCard className="mb-4">
        
        {/*  */}

             
         <CCardBody>    {/* Payment */}
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Payment
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton color="outline-secondary" key={value} className="mx-0" active={value === 'Month'}>
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
       
        <CCardBody>  {/* contract */}
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Contract
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton color="outline-secondary" key={value} className="mx-0" active={value === 'Month'}>
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
          
        </CCardBody>          
            <CCardBody>     {/* User */}
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                User
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton color="outline-secondary" key={value} className="mx-0" active={value === 'Month'}>
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
            
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
        
      </CCard>

      <CRow>
        <CCol xs>
         
        </CCol>
      </CRow>
           

          

            
        </>
    );
};

export default Statistic;