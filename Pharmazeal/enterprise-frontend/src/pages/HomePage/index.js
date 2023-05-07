import { React, useEffect, useState } from "react";
import { Space, Divider, Card, Skeleton, Typography } from "antd";


import { useHistory } from 'react-router-dom'

import { getCurrentUser } from "./../../services/auth";
import { getTotalNumberOfSales } from "../../services/saleService";
import { getTotalNumberOfMedicines } from "../../services/inventoryService";
import { getTotalNumberOfCustomers } from "../../services/customerService";

const HomePage = (props) => {
  const [sales, setSales] = useState(0)
  const [medicines, setMedicines] = useState(0)
  const [customers, setCustomers] = useState(0)
  const [loading, setLoading] = useState(false)

  const history = useHistory();
const { Paragraph, Text } = Typography;


  useEffect(() => {
    if (!getCurrentUser()) { return window.location = '/' }
    getAllData();
  }, []);

  const getAllData = async () => {
    setLoading(true)
    const { data: totalNoOfSales } = await getTotalNumberOfSales();
    const { data: totalMedicines } = await getTotalNumberOfMedicines();
    const { data: totalCustomers } = await getTotalNumberOfCustomers();

    setSales(totalNoOfSales.data);
    setMedicines(totalMedicines.data)
    setCustomers(totalCustomers.data)

    setLoading(false)
  }

  const handleSalesClicked = () => { history.push('/dashboard/sales') };
  const handleInventoryClicked = () => { history.push('/dashboard/medicines') };
  const handleCustomersClicked = () => { history.push('/dashboard/customers') };


  const gridStyle = {
    width: '25%',
    textAlign: 'center',
    backgroundColor: '#fafafa',
    cursor: 'pointer'
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "20px", margin: "0 0 25px 0" }}>Home</h1>
      <Paragraph style={{lineHeight: 1.6}}>
        <Text>
        PharmaZeal is a software company that specialises in providing innovative solutions to streamline operations for pharmacies and medical stores 
        in the United Kingdom. It provides following features.
        </Text>
      </Paragraph>
      {loading
        ? (<Skeleton active />)
        : (
          <>
            <Space
              style={{
                width: "100%",
                marginBottom: 24,
                display: "flex",
                justifyContent: "space-around",
              }}
            >

            </Space>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Card.Grid style={gridStyle} onClick={handleSalesClicked}
              >
                Sales Management <br></br> <br></br> 
                 <em style={{ fontSize: '12px' }}>Total Sales</em> <strong>{sales}</strong>
              </Card.Grid>
              <Card.Grid style={gridStyle} onClick={handleInventoryClicked}
              >
                Inventory Management <br></br> <br></br>
                <em style={{ fontSize: '12px' }}>Total Inventory</em>  <strong>{medicines}</strong>
              </Card.Grid>
              <Card.Grid style={gridStyle} onClick={handleCustomersClicked}
              >
                Customer Management <br></br> <br></br>
                <em style={{ fontSize: '12px' }}>Total Customers</em>   <strong>{customers}</strong>
              </Card.Grid>
            </div>
          </>
        )}
    </div>
  );
};

export default HomePage;
