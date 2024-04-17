import React, { useRef } from "react";
import getApiUrl, {
  getToken,
  getUserDetailsFromToken,
} from "../../helper/helper";

interface IMenuListProps {
  activeItem: string;
  setActiveItem: (itemName: string) => void;
}

const MenuList: React.FC<IMenuListProps> = ({ activeItem, setActiveItem }) => {
  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const token = getToken();
      if (token) {
        fetch(`${getApiUrl()}/upload-profile-image`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  };
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };
  const data = getUserDetailsFromToken();
  return (
    <div className="sidebar">
      <div className="inner-sidebar">
        <div className="user-profile">
          <div className="avatar">
            {data?.userProfilePictureId ? (
              <img
                src={`${getApiUrl()}/images/${data.userProfilePictureName}`}
                alt="profile"
              />
            ) : (
              <div className="profile-img">
                <i className="fa-solid fa-camera" onClick={handleIconClick} />
              </div>
            )}
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <h3>
            {data?.userFirstName} {data?.userLastName}
          </h3>
          <div className="role">{data?.userRole}</div>
          <div className="email">{data?.userEmail}</div>
        </div>

        <ul>
          <li
            className={activeItem === "Dashboard" ? "active-item" : ""}
            onClick={() => handleItemClick("Dashboard")}
          >
            <i className="fa-solid fa-sliders icons-left" />
            Dashboard
          </li>
          <li
            className={activeItem === "Contacts" ? "active-item" : ""}
            onClick={() => handleItemClick("Contacts")}
          >
            <i className="fa-solid fa-solid fa-address-book icons-left" />
            Kontakter
          </li>
          <li
            className={activeItem === "Projects" ? "active-item" : ""}
            onClick={() => handleItemClick("Projects")}
          >
            <i className="fa-solid fa-diagram-project icons-left" />
            Prosjekter
          </li>
          <li
            className={activeItem === "Services" ? "active-item" : ""}
            onClick={() => handleItemClick("Services")}
          >
            <i className="fa-solid fa-hand-holding-heart icons-left" />
            Tjenester
          </li>
          <li
            className={activeItem === "Prices" ? "active-item" : ""}
            onClick={() => handleItemClick("Prices")}
          >
            <i className="fa-solid fa-tags icons-left" />
            Priser
          </li>

          <li
            className={activeItem === "Blogs" ? "active-item" : ""}
            onClick={() => handleItemClick("Blogs")}
          >
            <i className="fa-solid fa-blog icons-left" /> Blogg
          </li>
          <li
            className={activeItem === "Files" ? "active-item" : ""}
            onClick={() => handleItemClick("Files")}
          >
            <i className="fa-solid fa-folder-open icons-left" />
            Filmappe
          </li>
          <li
            className={activeItem === "Feedback" ? "active-item" : ""}
            onClick={() => handleItemClick("Feedback")}
          >
            <i className="fa-solid fa-quote-right icons-left" />
            Tilbakemelding
          </li>
          <li
            className={activeItem === "Inbox" ? "active-item" : ""}
            onClick={() => handleItemClick("Inbox")}
          >
            <i className="fa-solid fa-inbox icons-left" /> Meldinger
          </li>
          <li
            className={activeItem === "Users" ? "active-item" : ""}
            onClick={() => handleItemClick("Users")}
          >
            <i className="fa-solid fa-users icons-left" /> Brukere
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuList;
