import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
 
} from "react-bootstrap";
import SideBar from "../../component/SideBar";


const VehicleType = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Number of rows per page
  const sidebarWidth = isSidebarOpen ? 200 : 0;
  const rightSidebarWidth = 250;

  



  
 


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
                <Form.Group controlId="vehicleTypeId">
                  <Form.Label style={labelStyle}>Event</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose Event"
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Group controlId="vehicleType">
                  <Form.Label style={labelStyle}>Select Student</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose Student"
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="d-flex gap-2">
              
            </Row>
          </Form>
        </div>
       
      </div>
    </Container>
  );
};

export default VehicleType;

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
