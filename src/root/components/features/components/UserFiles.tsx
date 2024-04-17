import React, { useEffect, useState } from "react";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import axios from "axios";
import AddFile from "./AddFile";
import EditFile from "./EditFile";
interface IFilesProps {
  id: number;
  first_name: string;
  last_name: string;
  updated_at: string;
  type: string;
  special_type: string;
  original_name: string;
  file_name: string;
  file_id: number;
}
interface IOptions {
  value: number;
  label: string;
}
const UserFiles: React.FC = () => {
  const [options, setOptions] = useState<IOptions[]>([]);
  const [files, setFiles] = useState<IFilesProps[]>([]);
  const [selected, setSelected] = useState<IFilesProps | null>(null);
  const [state, setState] = useState("");
  useEffect(() => {
    handleSuccess();
  }, []);
  const handleSuccess = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios
      .get(`${getApiUrl()}/get-users-files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFiles(
          response.data.filter((data: IFilesProps) => data.original_name)
        );

        const uniquedatas = response.data.filter(
          (data: IFilesProps, index: number) =>
            response.data.findIndex((p: IFilesProps) => p.id === data.id) ===
            index
        );
        setOptions(
          uniquedatas.map((data: IFilesProps) => ({
            value: data.id,
            label: `${data.first_name} ${data.last_name}`,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handleDelete = (id: number) => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios
      .delete(`${getApiUrl()}/delete-file-from-folder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        handleSuccess();
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handleCancel = () => {
    setState("");
  };
  const handleAdd = () => {
    setState("add");
  };
  const handleEdit = () => {
    setState("edit");
  };
  return (
    <>
      <div className="table-container">
        <button type="submit" onClick={handleAdd}>
          <i className="fa-solid fa-file-arrow-up" /> Last opp fil
        </button>

        <table>
          <thead>
            <tr>
              <th>Bruker</th>
              <th>Filnavn</th>
              <th>Type</th>
              <th>Spesial type</th>
              <th>Oppdatert</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {files?.map((file, index) => (
              <tr key={index}>
                <td>
                  {file.first_name} {file.last_name}
                </td>
                <td>{file.original_name}</td>
                <td>{file.type}</td>
                <td>{file.special_type}</td>
                <td>{convertDateToLocale(file.updated_at)}</td>
                <td>
                  <i
                    className="fa-solid fa-edit"
                    onClick={() => {
                      setSelected(file);
                      handleEdit();
                    }}
                  />
                  <i className="fa-solid fa-file-download" />
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => {
                      handleDelete(file.file_id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {state === "add" && (
        <AddFile
          handleCancel={handleCancel}
          options={options}
          type="bruker"
          onSuccess={handleSuccess}
          endpoint="user"
        />
      )}
      {state === "edit" && (
        <EditFile
          handleCancel={handleCancel}
          options={options}
          type="bruker"
          onSuccess={handleSuccess}
          data={selected}
          endpoint="user"
        />
      )}
    </>
  );
};

export default UserFiles;
