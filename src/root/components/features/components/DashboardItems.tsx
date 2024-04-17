import React, { useEffect, useState } from "react";
import "../css/DashboardItems.scss";
import getApiUrl, { getToken } from "../../helper/helper";
interface Category {
  total_count: number;
  last_7_days_count: number;
  title: string;
  icon: string;
  name: string;
}

interface State {
  [key: string]: Category;
}
interface IMenu {
  activeItem: string;
  setActiveItem: (itemName: string) => void;
}
const DashboardItems: React.FC<IMenu> = ({ activeItem, setActiveItem }) => {
  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };
  const [state, setState] = useState<State>({
    contacts: {
      total_count: 0,
      last_7_days_count: 0,
      title: "Kontakter",
      icon: "fa-solid fa-address-book",
      name: "Contacts",
    },
    projects: {
      total_count: 0,
      last_7_days_count: 0,
      title: "Prosjekter",
      icon: "fa-solid fa-diagram-project",
      name: "Projects",
    },
    services: {
      total_count: 0,
      last_7_days_count: 0,
      title: "Tjenester",
      icon: "fa-solid fa-hand-holding-heart",
      name: "Services",
    },
    prices: {
      total_count: 0,
      last_7_days_count: 0,
      title: "Priser",
      icon: "fa-solid fa-tags",
      name: "Prices",
    },
    blogs: {
      total_count: 0,
      last_7_days_count: 0,
      title: "Blogg",
      icon: "fa-solid fa-blog",
      name: "Blogs",
    },
    files: {
      total_count: 0,
      last_7_days_count: 0,
      title: "Filmappe",
      icon: "fa-solid fa-folder-open",
      name: "Files",
    },
    feedbacks: {
      total_count: 0,
      last_7_days_count: 0,
      title: "Tilbakemelding",
      icon: "fa-solid fa-quote-right",
      name: "Feedback",
    },
    inboxes: {
      total_count: 0,
      last_7_days_count: 0,
      title: "Meldinger",
      icon: "fa-solid fa-inbox",
      name: "Inbox",
    },
    users: {
      total_count: 0,
      last_7_days_count: 0,
      title: "Brukere",
      icon: "fa-solid fa-users",
      name: "Users",
    },
  });

  const items = Object.values(state);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetch(`${getApiUrl()}/get-counted-and-new-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setState((prevState) => {
          const newState = { ...prevState };

          Object.keys(data).forEach((key) => {
            if (newState[key]) {
              newState[key] = { ...newState[key], ...data[key] };
            }
          });
          return newState;
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="dashboard-container-items">
      {items.map((item, index) => (
        <div
          key={index}
          className="card"
          onClick={() => handleItemClick(item.name)}
        >
          <div className="card-header">
            <i className={item.icon} />
            <div>{item.title}</div>
          </div>
          <div className="card-text">
            <div className="count">
              <span className="count-text">Antall:</span>
              <span className="count-number">{item.total_count}</span>
            </div>
            <div className="new">
              <span className="new-text">Nye:</span>
              <span className="new-number">{item.last_7_days_count}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardItems;
