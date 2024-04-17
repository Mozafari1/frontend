import React, { useEffect, useState } from "react";
import "../css/Files.scss";
import getApiUrl, { getToken } from "../../helper/helper";
import axios from "axios";
import AddEditCategory from "./AddEditCategory";
import ProjectFiles from "./ProejctFiles";
import BlogFiles from "./BlogFiles";
import ServiceFiles from "./ServiceFiles";
import InovixFiles from "./InovixFiles";
import UserFiles from "./UserFiles";
import PriceFiles from "./PriceFiles";
import ContactFiles from "./ContactFiles";

interface ICategories {
  id: number;
  name: string;
}

const Files: React.FC = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [state, setState] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ICategories | null>(
    null
  );

  useEffect(() => {
    handleSuccess();
  }, []);

  const handleSuccess = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios
      .get(`${getApiUrl()}/get-connections-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data);
        setSelectedCategory(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleCategoryClick = (category: ICategories) => {
    setSelectedCategory(category);
  };

  const handleCategory = () => {
    setState(true);
  };

  const handleCancel = () => {
    setState(false);
  };

  return (
    <div className="dashboard-container-files">
      <div className="btn-container">
        <button type="submit" onClick={handleCategory}>
          Grupper
        </button>
      </div>

      <div className="dashboard-files-container">
        <div className="category-tabs">
          {categories?.map((category) => (
            <div
              key={category.id}
              className={`category-tab ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
      {selectedCategory?.name === "Prosjekter" && <ProjectFiles />}
      {selectedCategory?.name === "Blogg" && <BlogFiles />}
      {selectedCategory?.name === "Tjenester" && <ServiceFiles />}
      {selectedCategory?.name === "Inovix" && <InovixFiles />}
      {selectedCategory?.name === "Brukere" && <UserFiles />}
      {selectedCategory?.name === "Priser" && <PriceFiles />}
      {selectedCategory?.name === "Kontakter" && <ContactFiles />}

      {state && <AddEditCategory handleCancel={handleCancel} />}
    </div>
  );
};

export default Files;
