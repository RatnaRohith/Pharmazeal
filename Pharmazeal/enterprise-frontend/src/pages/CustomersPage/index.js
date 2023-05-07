import { React, useEffect, useState } from 'react';
import { Table, Space, Divider, Button, Tooltip, Skeleton } from 'antd';
// import { Res } from "@ant-design/icons";

import SearchInput from './SearchInput';
import DisplayMedicationHistoryModal from './DisplayMedicationHistoryModal';

import { getAllCustomers } from '../../services/customerService';
import { getCurrentUser } from '../../services/auth';
import { SyncOutlined } from '@ant-design/icons';

const CustomersPage = (props) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllCustomer();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      render: (text) => <>{text}</>,
    },
    {
      title: 'Allergies',
      dataIndex: 'allergies',
      key: 'allergies',
      render: (text) => showList(text)
    },

    {
      title: 'Medical Conditions',
      dataIndex: 'medicalConditions',
      key: 'medicalConditions',
      render: (text) => showList(text)
    },
    {
      title: 'Medication History',
      dataIndex: 'medicationHistory',
      key: 'medicationHistory',
      render: (text) => <DisplayMedicationHistoryModal>{text}</DisplayMedicationHistoryModal>
    },
  ];

  const showList = (array) => {
    if (array.length > 0 ) {
      return (
         <>
          <ul>
            {array.map (a => (
              <li key={a}>{a}</li>
            ))}
          </ul>
         </>
      )
    }
    else {
      return (<p>N/A</p>)
    }
  };

  const fetchAllCustomer = async () => {
    setLoading(true);
    const { data } = await getAllCustomers();
    console.log('data: ', data);
    setCustomers(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: '10px 80px' }}>
      <h1
        style={{ fontSize: '25px', margin: '0 0 25px 0', cursor: 'pointer' }}
        onClick={fetchAllCustomer}
      >
        <Tooltip placement="right" title="Refresh Customers List">
          <SyncOutlined /> Customers
        </Tooltip>
      </h1>
      {/* <SearchInput filterByTerminal={filterByTerminal} filterByFlights={filterByFlights} fetchAllFlights={fetchAllFlights} /> */}

      <Divider />
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Space
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            {customers.length > 0 ? (
              <Table columns={columns} dataSource={customers} />
            ) : (
              <>
                <p>There is No Customer</p>
              </>
            )}
          </Space>
        </>
      )}
      <Divider />
      {/* {getCurrentUser().role === 'admin' &&
        <FileUpload flight={true} />} */}
    </div>
  );
};

export default CustomersPage;
