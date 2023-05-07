import { React, useEffect, useState } from "react";
import { Table, Space, Divider, Tooltip, Skeleton } from "antd";
import { getCurrentUser } from "../../services/auth";
import { getAllUsers } from "../../services/userService";
import { SyncOutlined } from "@ant-design/icons";

import AddAccount from "./AddAccount";

const AccountsPage = (props) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!getCurrentUser()) { return window.location = '/' }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true)
    const { data } = await getAllUsers();
    console.log('d: ', data)
    setUsers(data);
    setLoading(false)
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    }
  ];

  return (
    <div style={{ padding: "40px 80px" }}>

      <h1 style={{ fontSize: "25px", margin: "0 0 25px 0", cursor: 'pointer' }} onClick={fetchUsers}>
        <Tooltip placement="right" title="Refresh Account List">
          <SyncOutlined /> Accounts
        </Tooltip>
      </h1>

      <AddAccount />
      
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          {/* <SearchInput  /> */}
          <Divider />
          <Space
            style={{
              width: "100%",
              marginBottom: 24,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {users.length > 0 && <Table columns={columns} dataSource={users} />}
          </Space>
        </>
      )}

    </div>
  );
};

export default AccountsPage;
