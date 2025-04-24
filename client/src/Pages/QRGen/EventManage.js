import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import SideBar from "../../component/SideBar";
import axios from "axios";
import QrReader from 'react-qr-reader';
import jwt_decode from 'jwt-decode';

const EventManage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? 200 : 0;
  const rightSidebarWidth = 250;

  const [studentData, setStudentData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [formData, setFormData] = useState({
    student_id: "",
    event_id: "",
  });




  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get("/api/v1/student/getStudents");
        return res.data.data?.Students || [];
      } catch (error) {
        console.error("Error fetching student data:", error);
        return [];
      }
    };

    const fetchEventData = async () => {
      try {
        const res = await axios.get("/api/v1/event/getEvents");
        return res.data.data?.Events || [];
      } catch (error) {
        console.error("Error fetching event data:", error);
        return [];
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const [students, events] = await Promise.all([
          fetchStudentData(),
          fetchEventData(),
        ]);
        setStudentData(students);
        setEventData(events);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerate = async () => {
    try {
      const res = await axios.post("/api/v1/qr/qrGenrate/", formData);
      if (res.status === 200) {
        setSuccessMessage("QR Code generated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert("Failed to generate QR Code. Please try again.");
      }
    } catch (error) {
      console.error("Error generating QR Code:", error);
      alert("An error occurred while generating the QR Code.");
    }
  };


  

  return (
    <Container
      fluid
      style={{
        display: "flex",
        width: "100vw",
        overflow: "hidden",
        padding: 0,
      }}
    >
      {isSidebarOpen && (
        <SideBar key="sidebar" sx={{ width: sidebarWidth, flexShrink: 0 }} />
      )}

      <div
        style={{
          flexGrow: 1,
          padding: "16px",
          marginTop: "55px",
          width: `calc(100vw - ${sidebarWidth + rightSidebarWidth}px)`,
          minHeight: "calc(100vh - 60px)",
          height: "100%",
          background: "white",
          overflowX: "auto",
          transition: "width 0.3s ease",
        }}
      >
        <Row className="mt-2" style={headerStyle}>
          <Col className="d-flex align-items-center">
            <h3 className="mb-0" style={headerTextStyle}>
              Event-management
            </h3>
          </Col>
        </Row>

        <div className="mt-2 px-3 py-1" style={{ background: "#e9ecefa1" }}>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" size="sm" /> Loading...
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              <Form>
                <Row>
                  <Col xs={12} sm={6} className="mb-3">
                    <Form.Group controlId="eventId">
                      <Form.Label style={labelStyle}>Event</Form.Label>
                      <Form.Select
                        value={formData.event_id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            event_id: e.target.value,
                          }))
                        }
                        style={inputStyle}
                      >
                        <option value="">Select Event</option>
                        {eventData.map((event, index) => (
                          <option key={index} value={event.event_id}>
                            {event.event_name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6} className="mb-3">
                    <Form.Group controlId="studentId">
                      <Form.Label style={labelStyle}>Students</Form.Label>
                      <Form.Select
                        value={formData.student_id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            student_id: e.target.value,
                          }))
                        }
                        style={inputStyle}
                      >
                        <option value="">Select Student</option>
                        {studentData.map((student, index) => (
                          <option key={index} value={student.student_id}>
                            {student.fullName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      onClick={handleGenerate}
                      style={{ fontSize: "12px", padding: "4px 12px" }}
                      disabled={!formData.student_id || !formData.event_id}
                    >
                      Generate
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </div>
      </div>



      <div>

      </div>
    </Container>
  );
};

export default EventManage;

// Styles
const headerStyle = {
  height: "50px",
  backgroundColor: "#e9ecef",
  borderBottom: "2px solid #ced4da",
  margin: "0px",
};

const headerTextStyle = {
  fontSize: "14px",
  textTransform: "uppercase",
  fontWeight: "600",
  color: "#003c78",
};

const labelStyle = {
  fontSize: "11px",
  fontWeight: "500",
  color: "#333",
};

const inputStyle = {
  height: "32px",
  fontSize: "12px",
  borderRadius: "4px",
};
