import { React, useEffect, useState } from 'react';
import { Table, Space, Divider, Tooltip, Skeleton, Tag, Alert } from 'antd';
import SearchInput from './SearchInput';
import { getAllMedicines } from '../../services/inventoryService';
import { checkLowQuantity } from '../../services/saleService';
import { getCurrentUser } from '../../services/auth';
import { SyncOutlined } from '@ant-design/icons';
import AddInventory from './AddInventory';

import MedicineInfoModal from '../SalesPage/MedicineInfoModal';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Expiry Date',
    dataIndex: 'expiry_date',
    key: 'expiry_date',
  },
  {
    title: 'Store',
    dataIndex: 'store',
    key: 'store',
  },
  {
    title: 'Requires ID Verification',
    dataIndex: 'requiresIdVerification',
    key: 'requiresIdVerification',
    render: (text) => <> {text.toString()} </>
  },
];

const stores = ['All', 'Stoke', 'Fenton', 'Tunstall', 'Hanley', 'Longton'];

const PassangersPage = () => {
  const [invetory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lowquantity, setLowQuantity] = useState();

  useEffect(() => {
    fetchAllInventory();
    checkQuantity();
  }, []);

  const fetchAllInventory = async () => {
    setLoading(true);
    const { data } = await getAllMedicines();
    console.log('in: ', data)
    setInventory(data);
    setLoading(false);
  };

  const checkQuantity = async () => {
    const { data } = await checkLowQuantity();
    setLowQuantity(data);
    console.log('Low quantity: ', data);
  };

  const filterByStore = (storename) => {
    setLoading(true);
    if (storename == 'All') {
      setFilteredInventory(invetory);
    } else {
      const updatedInventory = invetory.filter(
        (p) => p.store.toLowerCase() === storename.toLowerCase()
      );
      setFilteredInventory(updatedInventory);
    }
    setLoading(false);
  };

  const filterByName = (name) => {
    setLoading(true);
    const updatedInventory = invetory.filter(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    setFilteredInventory(updatedInventory);
    setLoading(false);
    return updatedInventory;
  };

  return (
    <div style={{ padding: '20px' }}>
       <div style={{ marginBottom: '2x' }}>
        {lowquantity && lowquantity.data.length > 0 && (
          <Alert
            message="Low Stock Alert"
            showIcon
            description={lowquantity.message}
            type="error"
            action={
              <MedicineInfoModal medicine = {lowquantity.data}> Open </MedicineInfoModal>
            }
            closable
          />
        )}
      </div>
      <h1
        style={{ fontSize: '25px', margin: '0 0 25px 0', cursor: 'pointer' }}
        onClick={fetchAllInventory}
      >
        <Tooltip placement="right" title="Refresh Passenger List">
          <SyncOutlined /> Inventory
        </Tooltip>
      </h1>
      <SearchInput filterByStore={filterByStore} filterByName={filterByName}  stores={stores} />
      <Divider />

      <AddInventory />

      {loading ? (
        <Skeleton active />
      ) : (
        <Space
          style={{
            width: '100%',
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          {filteredInventory.length > 0 ? (
            <Table columns={columns} dataSource={filteredInventory} />
          ) : (
            <>
              {' '}
              {invetory.length > 0 ? (
                <Table columns={columns} dataSource={invetory} />
              ) : (
                <>
                  <p>There is No Inventory</p>
                </>
              )}
            </>
          )}
        </Space>
      )}

    </div>
  );
};

export default PassangersPage;
