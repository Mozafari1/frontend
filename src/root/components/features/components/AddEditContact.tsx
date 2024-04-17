import React, { useEffect, useState } from "react";
import getApiUrl, { getToken } from "../../helper/helper";
import axios from "axios";
//brew services start postgresql
interface IAddEditContactProps {
  data?: any;
  is_edit: boolean;
  handleCancel: () => void;
  onSuccess: () => void;
}

const AddEditContact: React.FC<IAddEditContactProps> = ({
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
    is_company: false,
    company_name: "",
    address: "",
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
          is_company: formData.is_company,
          company_name: formData.company_name,
          address: formData.address,
        };
        const response = await axios.put(
          `${apiUrl}/update-contact/${data.id}`,
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
        console.log("formData", formData);
        const response = await axios.post(
          `${apiUrl}/create-contact`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          handleClear();
        }
      }
    } catch (error) {
      console.error("Error insert partner");
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClear = () => {
    setFormData(initialForm);
    handleCancel();
    onSuccess();
  };
  return (
    <div className="add-edit-project">
      <div className="add-edit-card">
        <div className="card-header">
          <div>{is_edit ? "Rediger kontakt" : "Legg til kontakt"}</div>
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
              <label htmlFor="phone_number" className="atom-required">
                Telefon
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                defaultValue={formData.phone_number}
                placeholder="Domenenavn..."
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-divide">
            <div className="input-field">
              <label htmlFor="address">Full adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={formData.address}
                placeholder="Adresse..."
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="company_name">Firmanavn</label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                defaultValue={formData.company_name}
                placeholder="Firmanavn..."
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="checkboxes">
            <div className="checkbox">
              <input
                type="checkbox"
                id="is_company"
                name="is_company"
                checked={formData.is_company}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    is_company: e.target.checked,
                  })
                }
              />
              <label htmlFor="is_company">Er firma</label>
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

export default AddEditContact;
