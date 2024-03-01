import React from 'react';
import { useState } from 'react';
import './Contract.scss';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';

import WidgetsBrand from '../widgets/WidgetsBrand';
import WidgetsDropdown from '../widgets/WidgetsDropdown';

const Contract = () => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [visible, setVisible] = useState(false);
  const contracts = [
    {
      id: 1,
      type: 'Lease',
      description: 'Apartment rental agreement',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      price: 1200.5,
      filePath: '/contracts/lease_contract_1.pdf',
      userId: 101,
      paymentId: 201,
      houseId: 301,
    },
    {
      id: 2,
      type: 'Sale',
      description: 'House sale agreement',
      startDate: '2024-04-15',
      endDate: '2025-04-14',
      price: 250000.0,
      filePath: '/contracts/sale_contract_1.pdf',
      userId: 102,
      paymentId: 202,
      houseId: 302,
    },
    {
      id: 3,
      type: 'Lease',
      description: 'Commercial space rental agreement',
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      price: 1800.75,
      filePath: '/contracts/lease_contract_2.pdf',
      userId: 103,
      paymentId: 203,
      houseId: 303,
    },
  ];
  const handleContractTypeChange = (event, val) => {
    const contract = contracts.find((item) => item.id == val);
    contract.type = event.target.value;
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
          {contracts.map((contract) => (
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
      <CModal size="lg" visible={visible} onClose={() => setVisible(false)} aria-labelledby="LiveDemoExampleLabel">
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Contract Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedContract && (
            <>
              <CForm className="row g-3">
                <CCol md={2}>
                  <CFormInput type="text" id="contract_id" label="ID" disabled value={selectedContract.id} />
                </CCol>

                <CCol md={2}>
                  <CFormInput
                    type="text"
                    id="contract_type"
                    label="Type"
                    value={selectedContract.type}
                    onChange={(event) => handleContractTypeChange(event, selectedContract.id)}
                  />
                </CCol>
                <CCol md={2}>
                  <CFormInput type="number" id="contract_price" label="Price" />
                </CCol>
                <CCol xs={3}>
                  <CFormInput id="contract_userId" label="User" value={selectedContract.userId} />
                </CCol>
                <CCol xs={3}>
                  <CFormInput id="contract_paymentId" label="Payment ID" value={selectedContract.paymentId} />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    id="contract_start_date"
                    label="Start Date"
                    value={selectedContract.startDate}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput type="date" id="contract_end_date" label="End Date" value={selectedContract.endDate} />
                </CCol>
                <CCol md={2}>
                  <CFormInput type="text" id="contract_houseId" label="House ID" value={selectedContract.houseId} />
                </CCol>
                <CCol md={10}>
                  <CFormInput type="text" id="contract_filePath" label="File Path" value={selectedContract.filePath} />
                </CCol>
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    id="contract_description"
                    label="Description"
                    value={selectedContract.description}
                  />
                </CCol>
                <CCol md={4}>
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
                </CCol>
              </CForm>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Contract;
