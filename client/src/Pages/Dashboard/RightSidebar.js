import React from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';

const RightSidebar = () => {
  return (
    <div>
      <div
        style={{
          background: "#FFB0B0",
          height: "250px",
          marginTop: "10px",
          width: "100%",
           borderRadius: "6px"
        }}
      >
        card
      </div>
      <div style={{ background: "#D1E9F6", height: "100%", width: "100%", marginTop: "15px", borderRadius: "6px" }}>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
            paddingTop: "15px",
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <ContactMailIcon sx={{ color: "#FF5722" }} /> {/* Color for email */}
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ padding: "0px 5px", fontSize: "13px" }}>vendor e-mail received at</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <LocationOnIcon sx={{ color: "#3F51B5" }} /> {/* Color for location */}
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ padding: "0px 5px", fontSize: "13px" }}>picked at vendor location</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <InventoryIcon sx={{ color: "#4CAF50" }} /> {/* Color for inventory */}
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ padding: "0px 5px", fontSize: "13px" }}>received at OWM cross-dock</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <LocalShippingIcon sx={{ color: "#FF9800" }} /> {/* Color for shipping */}
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ padding: "0px 5px", fontSize: "13px" }}>dispatched from OWM cross-dock</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <FactoryIcon sx={{ color: "#9C27B0" }} /> {/* Color for factory */}
            </TimelineSeparator>
            <TimelineContent sx={{ padding: "0px 5px", fontSize: "13px" }}>delivered at Tata Steel</TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
};

export default RightSidebar;
