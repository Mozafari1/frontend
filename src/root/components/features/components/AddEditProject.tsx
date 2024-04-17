import React, { useEffect, useState } from "react";
import "../css/AddEditProject.scss";
import Select from "react-select";
import getApiUrl, { getToken } from "../../helper/helper";
import axios from "axios";
//brew services start postgresql
interface IAddEditProjectProps {
  data?: any;
  is_edit: boolean;
  handleCancel: () => void;
  onSuccess: () => void;
}

const AddEditProject: React.FC<IAddEditProjectProps> = ({
  data,
  is_edit,
  handleCancel,
  onSuccess,
}) => {
  const initialForm = {
    name: "",
    domain_name: "",
    contact_id: 0,
    status: "",
    service_type: "",
  };
  const [formData, setFormData] = useState(initialForm);
  useEffect(() => {
    if (is_edit && data) {
      setFormData(data);
    }
  }, [is_edit, data]);

  const statusOptions = [
    { value: "Aktiv", label: "Aktiv" },
    { value: "Inaktiv", label: "Inaktiv" },
    { value: "Opprettet", label: "Opprettet" },
  ];
  const [contactOptions, setContactOptions] = useState([
    { value: null, label: "Ingen kontakt" },
  ]);
  const [serviceOptions, setServiceOptions] = useState([
    { value: "0", label: "Ingen tjeneste" },
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
        }));
        setContactOptions(contacts);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  useEffect(() => {
    const token = getToken();
    const apiUrl = getApiUrl();
    if (!token || !apiUrl) {
      return;
    }
    axios
      .get(`${apiUrl}/get-service-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const services = response.data.map((s: any) => ({
          value: s.title,
          label: `${s.title}`,
        }));
        setServiceOptions(services);
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
      if (is_edit && data) {
        const updatedData = {
          ...data,
          name: formData.name,
          domain_name: formData.domain_name,
          status: formData.status,
          service_type: formData.service_type,
          contact_id: formData.contact_id,
        };
        const response = await axios.put(
          `${apiUrl}/update-project/${data.id}`,
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
        const response = await axios.post(
          `${apiUrl}/create-project`,
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
  const handleClear = () => {
    setFormData(initialForm);
    handleCancel();
    onSuccess();
  };
  return (
    <div className="add-edit-project">
      <div className="add-edit-card">
        <div className="card-header">
          <div>{is_edit ? "Rediger prosjekt" : "Legg til prosjekt"}</div>
          <i className="fa-solid fa-xmark" onClick={handleCancel} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-divide">
            <div className="input-field">
              <label htmlFor="name" className="atom-required">
                Navn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={formData.name}
                placeholder="Navn..."
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input-field">
              <label htmlFor="domain_name" className="atom-required">
                Domenenavn
              </label>
              <input
                type="text"
                id="domain_name"
                name="domain_name"
                defaultValue={formData.domain_name}
                placeholder="Domenenavn..."
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    domain_name: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="form-divide">
            <div className="input-field">
              <label htmlFor="status" className="atom-required">
                Velg status
              </label>
              <Select
                className="select-options"
                id="status"
                name="status"
                options={statusOptions}
                required
                placeholder="Velg status..."
                value={statusOptions.find(
                  (option) => option.value === formData.status
                )}
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    status: selectedOption?.value || "",
                  })
                }
              />
            </div>
            <div className="input-field">
              <label htmlFor="service" className="atom-required">
                Velg tjeneste
              </label>
              <Select
                className="select-options"
                id="service"
                name="service"
                options={serviceOptions}
                required
                placeholder="Velg tjeneste..."
                value={serviceOptions.find(
                  (option) => option.value === formData.service_type
                )}
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    service_type: selectedOption?.value || "",
                  })
                }
              />
            </div>
          </div>

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
                  contact_id: selectedOption?.value || 1,
                })
              }
            />
          </div>

          <button className="save-btn" type="submit">
            {is_edit ? "Lagre" : "Opprett"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditProject;
