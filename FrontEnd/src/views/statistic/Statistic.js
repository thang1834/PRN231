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
  CCardHeader,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilDelete, cilCloudDownload } from '@coreui/icons';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import { CChartLine, CChartPie } from '@coreui/react-chartjs';
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
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [month, setMonth] = useState([])

  useEffect(() => {
    const availableToken = localStorage.getItem('accessToken');
    if (availableToken) {
      setAccessToken(availableToken);
    }
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setRole(decodedToken.role);
      const fetchContractApi = async () => {
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const decodedToken = jwtDecode(accessToken);
        let result = [];
        if (decodedToken.role === 'Admin') {
          result = await loadService.loadContracts(options);
          const recordsByMonth = Array(12).fill(0);
          const contractsData = await loadService.loadContracts(options);

          contractsData.forEach(contract => {
            contractsData.map((item) => {
              item.startDate = formatDateString(item.startDate);
            });
            const date = new Date(contract.startDate);
            const monthIndex = date.getMonth();
            recordsByMonth[monthIndex]++;
            setMonth(recordsByMonth)
          });

          setChartData({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
              {
                label: 'Number of Contracts',
                backgroundColor: hexToRgba('#3498db', 10),
                borderColor: '#3498db',
                pointHoverBackgroundColor: '#3498db',
                borderWidth: 2,
                data: recordsByMonth,
                fill: true,
              },
            ],
          })
        }
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
      fetchContractApi();
    }

  }, [accessToken]);

  const numberOfPages = Math.ceil(contracts.length / numberPerPage);
  const startIndex = (currentPage - 1) * numberPerPage;
  const endIndex = startIndex + numberPerPage;
  const displayedContracts = contracts.slice(startIndex, endIndex);

  function formatDateString(inputDateString) {
    const inputDate = new Date(inputDateString);
    const formattedDate = format(inputDate, 'yyyy-MM-dd');
    return formattedDate;
  }

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
        <CCardBody>    {/* Contract */}
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Contract
              </h4>
              <div className="small text-medium-emphasis">January - December</div>
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
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    ...month.map((item) => {
                      console.log(item);
                      return item;
                    })
                  ],
                  fill: true,
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

        <CCardBody>  {/* Payment */}
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

        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader >House</CCardHeader>
            <CCardBody>
              <CChartPie
                data={{
                  labels: ['1st', '2nd', '3rd'],
                  datasets: [
                    {
                      data: [300, 50, 100],
                      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

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
