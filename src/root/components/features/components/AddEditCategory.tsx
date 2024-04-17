import React, { useEffect, useState } from "react";
import "../css/AddEditCategory.scss";
import getApiUrl, { getToken } from "../../helper/helper";
import axios from "axios";
interface IData {
  id: number;
  name: string;
}
interface IAddEditCategoryProps {
  handleCancel: () => void;
}
const AddEditCategory: React.FC<IAddEditCategoryProps> = ({ handleCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [data, setData] = useState<IData[] | null>([]);
  const [isEdit, setIsEdit] = useState({
    is_edit: false,
    id: 0,
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    const apiUrl = getApiUrl(); // Replace this with your actual API URL
    const token = getToken(); // Hent tokenet fra stedet der det er lagret, for eksempel fra localStorage
    if (!token) {
      return;
    }
    axios
      .get(`${apiUrl}/get-connections-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories");
      });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (id: number) => {
    if (!formData.name) return;
    const apiUrl = getApiUrl(); // Replace this with your actual API URL
    const token = getToken(); // Hent tokenet fra stedet der det er lagret, for eksempel fra localStorage
    if (!token) {
      return;
    }
    axios
      .put(`${apiUrl}/update-connections-type/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsEdit({ is_edit: false, id: 0 });
        setFormData({ name: "" });
        fetchData();
      })
      .catch((error) => {
        console.error("Error update category");
      });
  };
  const handleDelete = (id: number) => {
    if (!id) return;

    const apiUrl = getApiUrl(); // Replace this with your actual API URL
    const token = getToken(); // Hent tokenet fra stedet der det er lagret, for eksempel fra localStorage
    if (!token) {
      return;
    }
    axios
      .delete(`${apiUrl}/delete-connections-type/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error delete category");
      });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    const apiUrl = getApiUrl(); // Replace this with your actual API URL
    const token = getToken(); // Hent tokenet fra stedet der det er lagret, for eksempel fra localStorage
    if (!token) {
      return;
    }
    axios
      .post(`${apiUrl}/create-connections-type`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFormData({ name: "" });
        fetchData();
      })
      .catch((error) => {
        console.error("Error insert category");
      });
  };
  return (
    <div className="add-edit-category">
      <div className="add-edit-card-category">
        <div className="card-header-category">
          <div className="head">Grupper</div>
          <i className="fa-solid fa-xmark" onClick={handleCancel} />
        </div>
        <div className="category-form-container">
          <form onSubmit={handleSubmit} className="form-category">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Navn..."
                required
              />
            </div>
            <div>
              <button type="submit" className="button">
                Opprett
              </button>
            </div>
          </form>
        </div>
        <div className="category-table-container">
          <table>
            <thead>
              <tr>
                <th>Navn</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id}>
                  <td>
                    {isEdit.is_edit && isEdit.id === item.id ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>
                    {isEdit.is_edit && isEdit.id === item.id ? (
                      <i
                        className="fa-regular fa-floppy-disk"
                        onClick={() => handleEdit(item.id)}
                      />
                    ) : (
                      <>
                        <i
                          className="fa-solid fa-edit"
                          onClick={() => {
                            setIsEdit({ is_edit: true, id: item.id });
                            setFormData({ ...formData, name: item.name });
                          }}
                        />
                        <i
                          className="fa-solid fa-trash-can"
                          onClick={() => handleDelete(item.id)}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddEditCategory;
