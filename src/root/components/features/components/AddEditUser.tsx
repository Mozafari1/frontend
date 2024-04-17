import React, { useEffect, useState } from "react";
import getApiUrl, { getToken } from "../../helper/helper";
import axios from "axios";
//brew services start postgresql
interface IAddEditUserProps {
  data?: any;
  is_edit: boolean;
  handleCancel: () => void;
  onSuccess: () => void;
}

const AddEditUser: React.FC<IAddEditUserProps> = ({
  data,
  is_edit,
  handleCancel,
  onSuccess,
}) => {
  const initialForm = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    active: false,
    role: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (is_edit && data) {
      setFormData(data);
    }
  }, [is_edit, data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = getApiUrl();
      const token = getToken();
      if (!token || !apiUrl) {
        return;
      }
      if (is_edit && data) {
        const updatedData = {
          ...data,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone_number,
          active: formData.active,
          role: formData.role,
          password: formData.password ? formData.password : null,
        };
        const response = await axios.put(
          `${apiUrl}/update-user/${data.id}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          handleClear();
        }
      } else {
        const response = await axios.post(`${apiUrl}/register-user`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          handleClear();
        }
      }
    } catch (error) {
      console.error("Error insert user");
    }
  };

  const handleClear = () => {
    setFormData(initialForm);
    handleCancel();
    onSuccess();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-edit-project">
      <div className="add-edit-card">
        <div className="card-header">
          <div>{is_edit ? "Rediger bruker" : "Legg til bruker"}</div>
          <i className="fa-solid fa-xmark" onClick={handleCancel} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-divide">
            <div className="input-field">
              <label htmlFor="first_name" className="atom-required">
                Fornavn
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                defaultValue={formData.first_name}
                placeholder="Fornavn..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="last_name" className="atom-required">
                Etternavn
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                defaultValue={formData.last_name}
                placeholder="Etternavn..."
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-divide">
            <div className="input-field">
              <label htmlFor="email" className="atom-required">
                E-post
              </label>
              <input
                type="text"
                id="email"
                name="email"
                defaultValue={formData.email}
                placeholder="E-post..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Passord</label>
              {is_edit ? (
                <input
                  type="password"
                  id="password"
                  name="password"
                  defaultValue={formData.password}
                  placeholder="Passord..."
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  type="password"
                  id="password"
                  name="password"
                  defaultValue={formData.password}
                  placeholder="Passord..."
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>
          </div>
          <div className="form-divide">
            <div className="input-field">
              <label htmlFor="phone_number" className="atom-required">
                Telefon
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                defaultValue={formData.phone_number}
                placeholder="Domenenavn..."
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="role">Rolle</label>
              <input
                type="text"
                id="role"
                name="role"
                defaultValue={formData.role}
                placeholder="Rolle..."
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="checkboxes">
            <div className="checkbox">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    active: e.target.checked,
                  })
                }
              />
              <label htmlFor="active">Aktive</label>
            </div>
          </div>

          <button className="save-btn" type="submit">
            {is_edit ? "Lagre" : "Opprett"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditUser;
