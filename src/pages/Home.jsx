import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllDoctors } from "../apicalls/doctors";
import { showLoader } from "../redux/loaderSlice";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
    try {
      dispatch(showLoader(true));
      const response = await GetAllDoctors();
      if (response.success) {
        setDoctors(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(showLoader(false));
    } catch (error) {
      message.error(error?.message || "An unexpected error occurred.");
      dispatch(showLoader(false));
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      getData();
    }
  }, [user, navigate]);
  const filteredDoctors = doctors.filter((doctor) =>
    (doctor.firstName && doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doctor.lastName && doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (doctor.speciality && doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    user && (
      <div>
        <div className="flex justify-between">
          <div>
            <input 
              placeholder="Search doctors" 
              className="w-400" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          {user?.role !== "doctor" && (
            <button
              className="outlined-btn"
              onClick={() => navigate("/apply-doctor")}
            >
              Apply doctor
            </button>
          )}
        </div>

        <Row gutter={[16, 16]} className="my-1">
          {filteredDoctors.map((doctor) => (
            <Col key={doctor.id} span={8}>
              <div
                className="bg-white p-1 flex flex-col gap-1 cursor-pointer"
                onClick={() => navigate(`/book-appointment/${doctor.id}`)}
              >
                <div className="flex justify-between w-full">
                  <h2 className="uppercase">
                    {doctor.firstName} {doctor.lastName}
                  </h2>
                </div>
                <hr />
                <div className="flex justify-between w-full">
                  <h4><b>Speciality: </b></h4>
                  <h4>{doctor.speciality}</h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4><b>Experience: </b></h4>
                  <h4>{doctor.experience} Years</h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4><b>Email: </b></h4>
                  <h4>{doctor.email}</h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4><b>Phone: </b></h4>
                  <h4>{doctor.phone}</h4>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default Home;
