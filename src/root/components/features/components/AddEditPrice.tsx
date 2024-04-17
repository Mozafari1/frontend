import React, { useEffect, useState } from "react";
import "../css/AddEditPrice.scss";
import getApiUrl, { getToken } from "../../helper/helper";
import axios from "axios";

interface IAddEditPriceProps {
  data?: any;
  is_edit: boolean;
  handleCancel: () => void;
  onSuccess: () => void;
}

const AddEditPrice: React.FC<IAddEditPriceProps> = ({
  data,
  is_edit,
  handleCancel,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const initialData = {
    package_name: "",
    title: "",
    description: "",
    price: "",
    pointA: "",
    pointB: "",
    pointC: "",
    pointD: "",
    pointE: "",
  };

  const [formData, setFormData] = useState(initialData);
  useEffect(() => {
    if (is_edit && data) {
      setFormData({
        package_name: data.package_name,
        title: data.title,
        description: data.description,
        price: data.price,
        pointA: data.pointA,
        pointB: data.pointB,
        pointC: data.pointC,
        pointD: data.pointD,
        pointE: data.pointE,
      });
    }
  }, [is_edit, data]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      try {
        const apiUrl = getApiUrl(); // Replace this with your actual API URL
        const token = getToken(); // Hent tokenet fra stedet der det er lagret, for eksempel fra localStorage
        if (!token) {
          return;
        }
        if (is_edit && data) {
          const updatedData = {
            ...data,
            package_name: formData.package_name,
            title: formData.title,
            description: formData.description,
            price: formData.price,
            pointA: formData.pointA,
            pointB: formData.pointB,
            pointC: formData.pointC,
            pointD: formData.pointD,
            pointE: formData.pointE,
          };
          const response = await axios.put(
            `${apiUrl}/price-update/${data.id}`,
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
          const postData = {
            package_name: formData.package_name,
            title: formData.title,
            description: formData.description,
            price: formData.price,
            pointA: formData.pointA,
            pointB: formData.pointB,
            pointC: formData.pointC,
            pointD: formData.pointD,
            pointE: formData.pointE,
          };
          const response = await axios.post(
            `${apiUrl}/create-price`,
            postData,
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
        console.error("Error fetching blog data:", error);
      }
    } else {
      setStep(step + 1);
    }
  };
  const handleClear = () => {
    setFormData(initialData);
    setStep(1);
    handleCancel();
    onSuccess();
  };
  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <div>
              <label htmlFor="package_name" className="atom-required">
                Pakkenavn
              </label>
              <input
                type="text"
                id="package_name"
                name="package_name"
                defaultValue={formData.package_name}
                placeholder="Pakkenavn..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="title" className="atom-required">
                Tittel
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={formData.title}
                placeholder="Tittel..."
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="price" className="atom-required">
                Pris
              </label>
              <input
                type="text"
                id="price"
                name="price"
                required
                defaultValue={formData.price}
                placeholder="Pris..."
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div>
              <label htmlFor="description" className="atom-required">
                Beskrivelse
              </label>
              <textarea
                id="description"
                name="description"
                required
                defaultValue={formData.description}
                placeholder="Beskrivelse..."
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="pointA" className="atom-required">
                Punkter
              </label>
            </div>
            <div>
              <input
                type="text"
                id="pointA"
                name="pointA"
                defaultValue={formData.pointA}
                placeholder="Punkt A..."
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="pointB"
                name="pointB"
                defaultValue={formData.pointB}
                placeholder="Punkt B..."
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="pointC"
                name="pointC"
                defaultValue={formData.pointC}
                placeholder="Punkt C..."
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="pointD"
                name="pointD"
                defaultValue={formData.pointD}
                placeholder="Punkt D..."
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="pointE"
                name="pointE"
                defaultValue={formData.pointE}
                placeholder="Punkt E..."
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="add-edit-price">
      <div className="add-edit-card-price">
        <div className="card-header-price">
          <div className="head">
            {is_edit ? "Rediger pris" : "Legg til pris"}
          </div>
          <i className="fa-solid fa-xmark" onClick={handleCancel} />
        </div>
        <form onSubmit={handleSubmit} className="form-price">
          {renderFormStep()}
          {step > 1 && (
            <button
              type="button"
              className="back-button"
              onClick={() => setStep(step - 1)}
            >
              <i className="fa-solid fa-arrow-left" />
              Tilbake
            </button>
          )}
          {step < 2 && (
            <button type="submit" className="next-button">
              Neste <i className="fa-solid fa-arrow-right" />
            </button>
          )}
          {step === 2 && (
            <button type="submit">{is_edit ? "Lagre" : "Opprett"}</button>
          )}
        </form>
      </div>
    </div>
  );
};
export default AddEditPrice;
