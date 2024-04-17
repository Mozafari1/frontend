import React, { useEffect, useState } from "react";
import "../css/Prices.scss";
import AddEditPrice from "./AddEditPrice";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import axios from "axios";
interface IPrice {
  id: number;
  package_name: string;
  title: string;
  description: string;
  price: string;
  updated_at: string;
}
const Prices: React.FC = () => {
  const [state, setState] = useState({
    is_edit: false,
    is_open: false,
  });
  const [selectedPrice, setSelectedPrice] = useState<IPrice | null>(null);
  const [prices, setPrices] = useState<IPrice[]>([]);
  const handleSuccess = () => {
    fetch(`${getApiUrl()}/get-prices`)
      .then((response) => response.json())
      .then((data) => {
        setPrices(data);
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
      .delete(`${getApiUrl()}/price-delete/${id}`, {
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
    <div className="dashboard-prices-container-page">
      <div className="dashboard-prices-header">
        <button className="sumbit" onClick={handleAdd}>
          Legg til pris
        </button>
      </div>
      <div className="dashboard-container-prices">
        {prices.map((item, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <div className="name">{item.package_name}</div>
              <div className="sub">{item.title}</div>
              <p>{item.description.slice(0, 100) + "..."}</p>
            </div>
            <div className="card-text">
              <div className="date-updated">
                <div>Sist Oppdatert</div>
                <div className="date">
                  {convertDateToLocale(item.updated_at)}
                </div>
              </div>
              <div className="status">
                <div> Pris</div>
                <div className="desc">{item.price}</div>
              </div>
              <div className="actions">
                <i
                  className="fa-solid fa-edit"
                  onClick={() => {
                    setSelectedPrice(item);
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
        <AddEditPrice
          onSuccess={handleSuccess}
          handleCancel={handleCancel}
          is_edit={state.is_edit}
          data={selectedPrice}
        />
      )}
    </div>
  );
};

export default Prices;
