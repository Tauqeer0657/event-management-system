import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import SideBar from "../../component/SideBar";
import axios from "axios";

const EventManage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? 200 : 0;
  const rightSidebarWidth = 250;

  const [studentData, setStudentData] = useState([]);
  const [formData, setFormData] = useState({
    student_id: "",
    event_id: ""
  });

  console.log(formData);
  


  const events = [
    {
      id: "EVT001",
      name: "Tech Conference 2025",
      description: "A global conference bringing together tech enthusiasts, developers, and innovators.",
      date: "2025-05-15",
      time: "10:00 AM",
      location: "Silicon Valley Convention Center, California",
      organizer: "TechWorld Inc.",
      capacity: 500,
      registered: 320,
      tags: ["technology", "conference", "networking"],
      isPaid: true,
      price: 49.99,
      status: "upcoming"
    },
    {
      id: "EVT002",
      name: "Startup Pitch Night",
      description: "An evening where startups pitch their ideas to potential investors.",
      date: "2025-06-01",
      time: "06:30 PM",
      location: "WeWork Hall, New York",
      organizer: "Startup Hub NYC",
      capacity: 200,
      registered: 200,
      tags: ["startup", "pitch", "investment"],
      isPaid: false,
      price: 0.00,
      status: "full"
    },
    {
      id: "EVT003",
      name: "Digital Marketing Masterclass",
      description: "Hands-on workshop for mastering social media and digital advertising.",
      date: "2025-04-28",
      time: "09:00 AM",
      location: "Online (Zoom)",
      organizer: "Marketer's Club",
      capacity: 100,
      registered: 76,
      tags: ["marketing", "online", "workshop"],
      isPaid: true,
      price: 19.99,
      status: "upcoming"
    },
    {
      id: "EVT004",
      name: "Annual Charity Gala",
      description: "A formal gala to raise funds for children’s education.",
      date: "2025-05-20",
      time: "07:00 PM",
      location: "Grand Ballroom, Hotel Royal, London",
      organizer: "Helping Hands Foundation",
      capacity: 150,
      registered: 115,
      tags: ["charity", "fundraiser", "gala"],
      isPaid: true,
      price: 100.00,
      status: "upcoming"
    }
  ];

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get('/api/v1/student/getStudents');
        setStudentData(res.data.data?.Students || []);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  const handleGenerate = async () => {
    try {
      const res = await axios.post('/api/v1/qr/qrGenrate/', formData);
      if (res.data.success) {
        alert("QR Code generated successfully!");
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
      {isSidebarOpen && <SideBar sx={{ width: sidebarWidth, flexShrink: 0 }} />}

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
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
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
                >
                  Generate
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
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
