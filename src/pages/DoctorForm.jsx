import { Form, Row, Col, message } from "antd";
import React from "react";
import { showLoader } from "../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { AddDoctor } from "../apicalls/docters";
import { useNavigate } from "react-router-dom";

function DoctorForm() {
  const [days, setDays] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
const userId = user.id || null;

const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));
      const payload = {
        ...values,   
        days,      
        userId    
      };
  
      const response = await AddDoctor(payload);
  
      if (response.success) {
        message.success(response.message);
        navigate('/profile');
      } else {
        message.error(response.message);
      }
  
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(showLoader(false));
    }
  };
  return (
    <div className="bg-white p-2">
      <h3 className="uppercase my-1">Apply For a Doctor!</h3>
      <hr />

      <Form
        layout="vertical"
        className="my-1"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[16, 16]}>
          {/* Personal Information */}
          <Col span={24}>
            <h3 className="uppercase">
              <b>Personal Information</b>
            </h3>
          </Col>
          <Col span={8}>
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                { required: true, message: "Required Field" },
                { pattern: /^[a-zA-Z]+$/, message: "Only letters are allowed" },
              ]}
            >
              <input type="text" placeholder="Enter your first name" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                { required: true, message: "Required Field" },
                { pattern: /^[a-zA-Z]+$/, message: "Only letters are allowed" },
              ]}
            >
              <input type="text" placeholder="Enter your last name" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Required Field" },
                { type: "email", message: "Enter a valid email address" },
              ]}
            >
              <input type="email" placeholder="Enter your email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Required Field" },
                { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
              ]}
            >
              <input type="number" placeholder="Enter your phone number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Website"
              name="website"
              rules={[
                { required: true, message: "Required Field" },
                { type: "url", message: "Enter a valid URL" },
              ]}
            >
              <input type="text" placeholder="Enter your website" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Required Field" },
              ]}
            >
              <textarea
                type="text"
                placeholder="Enter your address"
                rows={3}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <hr />
          </Col>

          {/* Professional Information */}
          <Col span={24}>
            <h3 className="uppercase">
              <b>Professional Information</b>
            </h3>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[
                { required: true, message: "Required Field" },
              ]}
            >
              <select>
                <option value="">Select Specialization</option>
                <option value="general">General</option>
                <option value="dental">Dental</option>
                <option value="cardiologist">Cardiologist</option>
                <option value="neurologist">Neurologist</option>
                <option value="surgeon">Surgeon</option>
                <option value="pediatrician">Pediatrician</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="gynecologist">Gynecologist</option>
                <option value="orthopedic">Orthopedic</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Experience (in years)"
              name="experience"
              rules={[
                { required: true, message: "Required Field" },
           
              ]}
            >
              <input type="number" placeholder="Enter years of experience" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Qualification"
              name="qualification"
              rules={[
                { required: true, message: "Required Field" },
              ]}
            >
              <select>
                <option value="">Select Qualification</option>
                <option value="mbbs">MBBS</option>
                <option value="mds">MDS</option>
                <option value="md">MD</option>
                <option value="ms">MS</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <hr />
          </Col>

          {/* Work Hours */}
          <Col span={24}>
            <h3 className="uppercase">
              <b>Work Hours</b>
            </h3>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[
                { required: true, message: "Required Field" },
              ]}
            >
              <input type="time" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="End Time"
              name="endTime"
              rules={[
                { required: true, message: "Required Field" },
              ]}
            >
              <input type="time" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Fee (in USD)"
              name="fee"
              rules={[
                { required: true, message: "Required Field" },
              
              ]}
            >
              <input type="number" placeholder="Enter consultation fee" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className="flex gap-2">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <div className="flex items-center" key={index}>
                  <input
                    type="checkbox"
                    name={day}
                    value={day}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDays([...days, e.target.value]);
                      } else {
                        setDays(days.filter((item) => item !== e.target.value));
                      }
                    }}
                  />
                  <label>{day}</label>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <div className="flex justify-end gap-2">
          <button className="outlined-btn" type="button">
            CANCEL
          </button>
          <button className="contained-btn" type="submit">
            SUBMIT
          </button>
        </div>
      </Form>
    </div>
  );
}

export default DoctorForm;
