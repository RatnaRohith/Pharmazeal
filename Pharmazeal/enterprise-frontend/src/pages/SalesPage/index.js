import { React, useEffect, useState } from 'react';
import {
  Table,
  Space,
  Divider,
  Tooltip,
  message,
  Skeleton,
  Alert,
  Button,
} from 'antd';
import {
  getAllSales,
  processSale,
  checkLowQuantity,
} from '../../services/saleService';
import { SyncOutlined } from '@ant-design/icons';
import CustomerInfoModal from './CustomerInfoModal';
import MedicineInfoModal from './MedicineInfoModal';

import SearchInput from '../InventoryPage/SearchInput';

const stores = ['All', 'Stoke', 'Fenton', 'Tunstall', 'Hanley', 'Longton'];

const SalesPage = (props) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [lowquantity, setLowQuantity] = useState();
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    checkQuantity();
  }, []);

  const checkQuantity = async () => {
    const { data } = await checkLowQuantity();
    setLowQuantity(data);
    console.log('Low quantity: ', data);
  };

  const fetchSales = async () => {
    setLoading(true);
    const { data } = await getAllSales();
    setSales(data);
    setFilteredSales(data)
    setLoading(false);
  };

  const columns = [
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Store',
      dataIndex: 'medicine',
      key: 'store',
      render: (text) => <> {text.store} </>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text) => <CustomerInfoModal> {text} </CustomerInfoModal>,
    },
    {
      title: 'Medicine',
      dataIndex: 'medicine',
      key: 'medicine',
      render: (text) => <MedicineInfoModal medicine={[text]} />,
    },
    {
      title: 'Action',
      dataIndex: 'processed',
      key: 'processed',
      render: (text, row, index) => renderProcess(text, row, index),
    },
  ];

  const renderProcess = (text, row, index) => {
    if (row.processed) {
      return <p>Processed</p>;
    } else {
      return (
        <button
          onClick={() => handleProcessSale(row)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgb(24, 144, 255)',
          }}
        >
          {' '}
          {'Process Sale'}{' '}
        </button>
      );
    }
  };

  const handleProcessSale = async (row) => {
    messageApi.open({
      key: 'OK',
      type: 'loading',
      content: 'Loading...',
      duration: 3,
    });

    const { data, status } = await processSale({
      customerId: row.customer._id,
      medicineId: row.medicine._id,
    });
    if (status == 201) {
      setTimeout(() => {
        messageApi.open({
          key: 'OK',
          type: 'success',
          content: 'Sale processed successfully.',
          duration: 4,
        });
      }, 3000);
    } else if (status == 200) {
      setTimeout(() => {
        messageApi.open({
          key: 'OK',
          type: 'error',
          content: data.message,
          duration: 4,
        });
      }, 3000);
    }

    const { data: sales } = await getAllSales();
    setFilteredSales(sales);
  };

  const filterByStore = (storename) => {
    setLoading(true);
    if (storename == 'All') {
      setFilteredSales(sales);
    } else {
      const updatedInventory = sales.filter(
        (p) => p.medicine.store.toLowerCase() === storename.toLowerCase()
      );
      setFilteredSales(updatedInventory);
    }
    setLoading(false);
  };

  const filterByName = (name) => {
    setLoading(true);
    const updatedInventory = sales.filter(
      (p) => p.medicine.name.toLowerCase() === name.toLowerCase()
    );
    setFilteredSales(updatedInventory);
    setLoading(false);
    return updatedInventory;
  };

  return (
    <div style={{ padding: '40px 80px' }}>
      {contextHolder}
      <>
        {lowquantity && lowquantity.data.length > 0 && (
          <Alert
            message="Low Stock Alert"
            showIcon
            description={lowquantity.message}
            type="error"
            action={
              <MedicineInfoModal medicine={lowquantity.data}>
                {' '}
                Open{' '}
              </MedicineInfoModal>
            }
            closable
          />
        )}
      </>

      <h1
        style={{
          fontSize: '25px',
          margin: '0 0 25px 0',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={fetchSales}
      >
        <Tooltip placement="right" title="Refresh Sales List">
          <SyncOutlined /> Sales
        </Tooltip>
      </h1>

      <SearchInput
        filterByStore={filterByStore}
        filterByName={filterByName}
        stores={stores}
      />
      <Divider />

      {loading ? (
        <Skeleton active />
      ) : (
        <>
          {/* <SearchInput  /> */}
          <Divider />
          <Space
            style={{
              width: '100%',
              marginBottom: 24,
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            {filteredSales.length > 0 ? (
              <Table columns={columns} dataSource={filteredSales} />
            ) : (
              <>
              <p>There are No Sales</p>
              </>
            )}
          </Space>
        </>
      )}
    </div>
  );
};

export default SalesPage;
