import React, { useEffect, useState } from "react";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import axios from "axios";
import AddFile from "./AddFile";
import EditFile from "./EditFile";
interface IFilesProps {
  id: number;
  name: string;
  updated_at: string;
  type: string;
  special_type: string;
  original_name: string;
  file_name: string;
  file_id: number;
}

const InovixFiles: React.FC = () => {
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
      .get(`${getApiUrl()}/get-inovixes-files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFiles(
          response.data.filter((data: IFilesProps) => data.original_name)
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
          options={[]}
          type="Invoix"
          onSuccess={handleSuccess}
          endpoint="inovix"
        />
      )}
      {state === "edit" && (
        <EditFile
          handleCancel={handleCancel}
          options={[]}
          type="Inovix"
          onSuccess={handleSuccess}
          data={selected}
          endpoint="inovix"
        />
      )}
    </>
  );
};

export default InovixFiles;
