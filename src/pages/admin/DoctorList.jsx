import { message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllDoctors, UpdateDoctor } from "../../apicalls/doctors";
import {showLoader} from "../../redux/loaderSlice";

function DoctorList() {
  const [doctors, setDoctors] = React.useState([]);

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoader(true));
      const response = await GetAllDoctors();
      dispatch(showLoader(false));
      if (response.success) {
        setDoctors(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(showLoader(false));
      message.error(error.message);
    }
  };

  const changeStatus = async (payload) => {
    try {
      dispatch(showLoader(true));
      const response = await UpdateDoctor(payload);
      dispatch(showLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(showLoader(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Speciality",
      dataIndex: "speciality",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return text.toUpperCase();
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        if (record.status === "pending") {
          return (
            <div className="flex gap-1">
              <span
                className="underline cursor-pointer"
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: "rejected",
                  })
                }
              >
                Reject
              </span>
              <span
                className="underline cursor-pointer"
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: "approved",
                  })
                }
              >
                Approve
              </span>
            </div>
          );
        }

        if (record.status === "approved") {
          return (
            <div className="flex gap-1">
              <span
                className="underline cursor-pointer"
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: "blocked",
                  })
                }
              >
                Block
              </span>
            </div>
          );
        }

        if (record.status === "blocked") {
          return (
            <div className="flex gap-1">
              <span
                className="underline cursor-pointer"
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: "approved",
                  })
                }
              >
                Unblock
              </span>
            </div>
          );
        }
      },
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={doctors} />
    </div>
  );
}

export default DoctorList;
