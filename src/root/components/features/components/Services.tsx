import React, { useEffect, useState } from "react";
import "../css/Services.scss";
import AddEditService from "./AddEditService";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import axios from "axios";

interface IService {
  id: number;
  title: string;
  updated_at: string;
  less_content: string;
  file_type: string;
  file_name: string;
  file_id: number;
}
const Services: React.FC = () => {
  const [state, setState] = useState({
    is_edit: false,
    is_open: false,
  });
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [services, setServices] = useState<IService[]>([]);
  const handleSuccess = () => {
    fetch(`${getApiUrl()}/get-services`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error("Error fetching price data:", error);
      });
  };
  useEffect(() => {
    handleSuccess();
  }, []);
  const handleEdit = () => {
    setState({ is_edit: true, is_open: true });
  };
  const handleCancel = () => {
    setState({ is_edit: false, is_open: false });
  };
  const handleAdd = () => {
    setState({ is_open: true, is_edit: false });
  };
  const handleDelete = (id: number) => {
    const token = getToken();
    if (!token || !id) return;
    axios
      .delete(`${getApiUrl()}/delete-service/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        handleSuccess();
      })
      .catch((error) => {
        console.error("Error deleting price:", error);
      });
  };
  return (
    <div className="dashboard-services-container-page">
      <div className="dashboard-services-header">
        <button className="sumbit" onClick={handleAdd}>
          Legg til tjeneste
        </button>
      </div>
      <div className="dashboard-container-services">
        {services.map((item, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <object
                type={item.file_type}
                data={`${getApiUrl()}/images/${item.file_name}`}
                aria-label={item.title}
                className="image"
              />
              <div>{item.title}</div>
              <p>{item.less_content}</p>
            </div>
            <div className="card-text">
              <div className="date-updated">
                <div>Sist Oppdatert</div>
                <div className="date">
                  {convertDateToLocale(item.updated_at)}
                </div>
              </div>
              <div className="status">
                <div> Status</div>
                <div className="desc">Ok</div>
              </div>
              <div className="actions">
                <i
                  className="fa-solid fa-edit"
                  onClick={() => {
                    setSelectedService(item);
                    handleEdit();
                  }}
                />
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {state.is_open && (
        <AddEditService
          onSuccess={handleSuccess}
          handleCancel={handleCancel}
          is_edit={state.is_edit}
          data={selectedService}
        />
      )}
    </div>
  );
};

export default Services;
