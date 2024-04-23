import React, { useCallback, useEffect, useState } from "react";
import "../css/AddEditBlog.scss";
import axios from "axios";
import getApiUrl, { getToken } from "../../helper/helper";
const initialForm = {
  file_name: "",
  title: "",
  description: "",
  sub_description: "",
  sub_sub_description: "",
};
interface IAddEditBlogProps {
  data?: any;
  is_edit: boolean;
  handleCancel: () => void;
  onSuccess: () => void;
}

const AddEditBlog: React.FC<IAddEditBlogProps> = ({
  data,
  is_edit,
  handleCancel,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (is_edit && data) {
      setFormData({
        file_name: data.file_name,
        title: data.title,
        description: data.description,
        sub_description: data.sub_description,
        sub_sub_description: data.sub_sub_description,
      });
    }
  }, [is_edit, data]);
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
            title: formData.title,
            description: formData.description,
            sub_description: formData.sub_description,
            sub_sub_description: formData.sub_sub_description,
          };

          const response = await axios.put(
            `${apiUrl}/blog-update/${data.id}`,
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
          // const postData = new FormData();
          // postData.append("title", formData.title);
          // postData.append("description", formData.description);
          // postData.append("sub_description", formData.sub_description);
          // postData.append("sub_sub_description", formData.sub_sub_description);
          // if (image) {
          //   postData.append("image", image);
          // }
          // Send POST request to server
          const response = await axios.post(`${apiUrl}/create-blog`, formData, {
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 201) {
            handleClear();
          }
        }
      } catch (error) {
        // Handle error
        console.error("Error inserting data:", error);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleClear = useCallback(() => {
    setFormData(initialForm);
    setImage(null);
    setStep(1);
    handleCancel();
    onSuccess();
  }, [handleCancel, onSuccess, setFormData, setImage, setStep]);

  useEffect(() => {
    if (data && is_edit && image) {
      const apiUrl = getApiUrl();
      const token = getToken();
      if (!token || !apiUrl) {
        return;
      }
      const postData = new FormData();
      postData.append("type", "blog");
      postData.append("id", data.file_id);
      postData.append("connection_id", data.id);
      postData.append("image", image);

      axios
        .post(`${apiUrl}/upload-image`, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            handleClear();
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  }, [image, is_edit, data, handleClear]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    // accept all image types
    if (file && file.type && file.type.includes("image")) {
      setImage(file);
    } else {
      setImage(null);
      // Handle invalid file type
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            {/* <div className="image-input">
              {is_edit ? (
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              ) : (
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              )}
            </div> */}
            <div>
              <label htmlFor="file_name" className="atom-required">
                Filnavn
              </label>
              <input
                type="text"
                id="file_name"
                name="file_name"
                value={formData.file_name}
                onChange={handleInputChange}
                placeholder="Filnavn..."
                required
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
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Tittel..."
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="atom-required">
                Beskrivelse
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Beskrivelse..."
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div>
              <label htmlFor="sub-description-A">Beskrivelse A </label>
              <textarea
                id="sub-description-A"
                name="sub_description"
                value={formData.sub_description}
                onChange={handleInputChange}
                placeholder="Beskrivelse..."
              />
            </div>
            <div>
              <label htmlFor="sub-description-B">Beskrivelse B</label>
              <textarea
                id="sub-description-B"
                name="sub_sub_description"
                value={formData.sub_sub_description}
                onChange={handleInputChange}
                placeholder="Beskrivelse..."
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
            {is_edit ? "Rediger blogg" : "Legg til blogg"}
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

export default AddEditBlog;
