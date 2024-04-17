import React, { useState } from "react";
import "../css/AddFile.scss";
import Select from "react-select";
import axios from "axios";
import getApiUrl, { getToken } from "../../helper/helper";

interface IEditFileProps {
  handleCancel: () => void;
  type: string;
  options: any[];
  onSuccess: () => void;
  data: any;
  endpoint: string;
}

const EditFile: React.FC<IEditFileProps> = ({
  handleCancel,
  type,
  options,
  onSuccess,
  data,
  endpoint,
}) => {
  const [state, setState] = useState({
    name: data.original_name,
    special_type: data.special_type,
  });

  const [selectedOption, setSelectedOption] = useState({
    value: data.id,
    label: data.name,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = getApiUrl();
    const token = getToken();
    if (!token || !apiUrl || !state.name) {
      return;
    }
    if (endpoint === "inovix") {
      if (!state.special_type) return;
      axios
        .put(
          `${apiUrl}/update-${endpoint}-file/${data.file_id}`,
          {
            [`${endpoint}_id`]: selectedOption.value,
            name: state.name,
            special_type: state.special_type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          onSuccess();
          handleCancel();
        })
        .catch((error) => {
          console.error("Error updating file:", error);
        });
    } else {
      if (!selectedOption.value) return;
      axios
        .put(
          `${apiUrl}/update-${endpoint}-file/${data.file_id}`,
          {
            [`${endpoint}_id`]: selectedOption.value,
            name: state.name,
            special_type: state.special_type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          onSuccess();
          handleCancel();
        })
        .catch((error) => {
          console.error("Error updating file:", error);
        });
    }
  };

  return (
    <div className="add-edit-file">
      <div className="add-edit-card-file">
        <div className="card-header-file">
          <div className="head">Rediger fil i {type}</div>
          <i className="fa-solid fa-xmark" onClick={handleCancel} />
        </div>
        <div className="image-show">
          <img
            src={`${getApiUrl()}/images/${data.file_name}`}
            alt={data.original_name}
          />
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
          <div className="special-type-input file-name">
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={state.name}
              required
              placeholder="Navn på fil..."
              onChange={(e) => {
                setState({ ...state, name: e.target.value });
              }}
            />
          </div>
          <div className="special-type-input">
            {endpoint !== "inovix" && (
              <input
                type="text"
                id="special_type"
                name="special_type"
                defaultValue={state.special_type}
                placeholder="Spesiell type f.eks. logo... valgfritt"
                onChange={(e) => {
                  setState({ ...state, special_type: e.target.value });
                }}
              />
            )}
            {endpoint === "inovix" && (
              <input
                type="text"
                id="special_type"
                name="special_type"
                defaultValue={state.special_type}
                placeholder="Spesiell type f.eks. logo..."
                onChange={(e) => {
                  setState({ ...state, special_type: e.target.value });
                }}
                required
              />
            )}
          </div>
          <button type="submit">Lagre</button>
        </form>
      </div>
    </div>
  );
};

export default EditFile;
