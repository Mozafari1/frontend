import React, { useState } from "react";
import "../css/AddFile.scss";
import Select from "react-select";
import axios from "axios";
import getApiUrl, { getToken } from "../../helper/helper";

interface IAddFileProps {
  handleCancel: () => void;
  type: string;
  options: any[];
  onSuccess: () => void;
  endpoint: string;
}

const AddFile: React.FC<IAddFileProps> = ({
  handleCancel,
  type,
  options,
  onSuccess,
  endpoint,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type && file.type.includes("image")) {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = getApiUrl();
    const token = getToken();
    if (!image || !token) return;
    if (endpoint === "inovix") {
      if (!input) return;
      const formData = new FormData();
      formData.append("file", image as Blob);
      formData.append("special_type", input);
      axios
        .post(`${apiUrl}/add-${endpoint}-file`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          onSuccess();
          handleCancel();
        })
        .catch((error) => {
          console.error("Error adding file:", error);
        });
    } else {
      if (!selectedOption.value) return;

      const formData = new FormData();
      formData.append("file", image as Blob);
      formData.append("id", selectedOption.value);
      formData.append("special_type", input);
      axios
        .post(`${apiUrl}/add-${endpoint}-file`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          onSuccess();
          handleCancel();
        })
        .catch((error) => {
          console.error("Error adding file:", error);
        });
    }
  };
  return (
    <div className="add-edit-file">
      <div className="add-edit-card-file">
        <div className="card-header-file">
          <div className="head">Legg til fil i {type}</div>
          <i className="fa-solid fa-xmark" onClick={handleCancel} />
        </div>
        <form onSubmit={handleSubmit} className="form-file">
          {endpoint !== "inovix" && (
            <Select
              className="select-options"
              id="option"
              name="option"
              options={options}
              required
              placeholder="Velg riktig kategori..."
              value={
                options.find(
                  (option) => option.value === selectedOption.value
                ) || null
              }
              onChange={(selectedOption: any) =>
                setSelectedOption(selectedOption)
              }
            />
          )}
          <div className="file">
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="special-type-input">
            {endpoint !== "inovix" && (
              <input
                type="text"
                id="special_type"
                name="special_type"
                defaultValue={input}
                placeholder="Spesiell type f.eks. logo... valgfritt"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            )}
            {endpoint === "inovix" && (
              <input
                type="text"
                id="special_type"
                name="special_type"
                defaultValue={input}
                placeholder="Spesiell type f.eks. logo..."
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                required
              />
            )}
          </div>
          <button type="submit">Last opp fil</button>
        </form>
      </div>
    </div>
  );
};

export default AddFile;
