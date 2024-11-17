import { message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { GetAllUsers } from "../../apicalls/users";
import {showLoader} from "../../redux/loaderSlice";


{/*redux guuva ki gulam sulam ki saalam */}
function UserList() {
  const [users, setUsers] = React.useState([]);

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoader(true));
      const response = await GetAllUsers();
      dispatch(showLoader(false));
      if (response.success) {
        setUsers(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(showLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render : (role) => role.toUpperCase()
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
}

export default UserList;