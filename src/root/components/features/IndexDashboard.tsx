import React, { useState } from "react";
import "./css/IndexDashboard.scss";
import MenuList from "./components/MenuList";
import DashboardItems from "./components/DashboardItems";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Prices from "./components/Prices";
import Blogs from "./components/Blogs";
import Contacts from "./components/Contacts";
import Users from "./components/Users";
import { logoutUser } from "../helper/helper";
import Inboxes from "./components/Inboxes";
import Files from "./components/Files";
import Feedbacks from "./components/Feedbacks";

const IndexDashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  return (
    <div className="index-dashboard">
      <div className="dashboard-container">
        <MenuList activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className="main-content">
          <div className="main-content-header">
            <h2>Dashboard</h2>
            <div className="user-actions">
              <i className="fa-solid fa-bell" />
              <button
                type="submit"
                onClick={() => {
                  logoutUser();
                }}
              >
                Logg ut
                <i className="fa-solid fa-right-to-bracket icons-right" />
              </button>
            </div>
          </div>
          <div className="content">
            {activeItem === "Dashboard" && (
              <DashboardItems
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            )}
            {activeItem === "Projects" && <Projects />}
            {activeItem === "Services" && <Services />}
            {activeItem === "Prices" && <Prices />}
            {activeItem === "Blogs" && <Blogs />}
            {activeItem === "Contacts" && <Contacts />}
            {activeItem === "Users" && <Users />}
            {activeItem === "feedback" && <Feedbacks />}
            {activeItem === "Inbox" && <Inboxes />}
            {activeItem === "Files" && <Files />}
            {activeItem === "Feedback" && <Feedbacks />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexDashboard;
