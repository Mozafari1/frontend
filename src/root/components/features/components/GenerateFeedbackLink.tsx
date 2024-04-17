import React, { useEffect, useState } from "react";
import "../css/AddEditProject.scss";
import Select from "react-select";
import getApiUrl, { getToken, getUrl } from "../../helper/helper";
import axios from "axios";

interface IAddFeedbackLinkProps {
  handleCancel: () => void;
  onSuccess: () => void;
}

const AddFeedbackLink: React.FC<IAddFeedbackLinkProps> = ({
  handleCancel,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    contact_id: 0,
    name: "",
    domain: getUrl(),
  });
  const [contactOptions, setContactOptions] = useState([
    { value: null, label: "Ingen kontakt", name: "" },
  ]);

  useEffect(() => {
    const token = getToken();
    const apiUrl = getApiUrl();
    if (!token || !apiUrl) {
      return;
    }
    axios
      .get(`${apiUrl}/get-contact-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const contacts = response.data.map((contact: any) => ({
          value: contact.id,
          label: `${contact.first_name} ${contact.last_name} - ${contact.email}`,
          name: `${contact.first_name} ${contact.last_name}`,
        }));
        setContactOptions(contacts);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = getApiUrl();
      const token = getToken();
      if (!token || !apiUrl) {
        return;
      }
      const response = await axios.post(`${apiUrl}/create-feedback`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        handleClear();
      }
    } catch (error) {
      console.error("Error insert partner");
    }
  };
  const handleClear = () => {
    handleCancel();
    onSuccess();
  };
  return (
    <div className="add-edit-project">
      <div className="add-edit-card">
        <div className="card-header">
          <div>Generer link</div>
          <i className="fa-solid fa-xmark" onClick={handleCancel} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="project-contact">
            <label htmlFor="contact">Velg kontakt</label>
            <Select
              className="select-options"
              id="contact"
              name="contact"
              options={contactOptions}
              required
              placeholder="Velg kontakt..."
              value={contactOptions.find(
                (option) => option.value === formData.contact_id
              )}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  contact_id: selectedOption?.value || 0,
                  name: selectedOption?.name || "",
                })
              }
            />
          </div>

          <button className="save-btn" type="submit">
            Generer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFeedbackLink;
