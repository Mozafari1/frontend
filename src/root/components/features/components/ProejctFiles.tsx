import React, { useEffect, useState } from "react";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import axios from "axios";
import AddFile from "./AddFile";
import EditFile from "./EditFile";
interface IProjectFilesProps {
  id: number;
  name: string;
  updated_at: string;
  type: string;
  special_type: string;
  original_name: string;
  file_name: string;
  file_id: number;
}
interface IProjects {
  value: number;
  label: string;
}
const ProjectFiles: React.FC = () => {
  const [options, setOptions] = useState<IProjects[]>([]);
  const [projectFiles, setProjectFiles] = useState<IProjectFilesProps[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<IProjectFilesProps | null>(null);
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
      .get(`${getApiUrl()}/get-projects-files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProjectFiles(
          response.data.filter(
            (project: IProjectFilesProps) => project.original_name
          )
        );

        const uniqueProjects = response.data.filter(
          (project: IProjectFilesProps, index: number) =>
            response.data.findIndex(
              (p: IProjectFilesProps) => p.id === project.id
            ) === index
        );
        setOptions(
          uniqueProjects.map((project: IProjectFilesProps) => ({
            value: project.id,
            label: project.name,
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
              <th>Prosjektnavn</th>
              <th>Filnavn</th>
              <th>Type</th>
              <th>Spesial type</th>
              <th>Oppdatert</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {projectFiles?.map((projectFile, index) => (
              <tr key={index}>
                <td>{projectFile.name}</td>
                <td>{projectFile.original_name}</td>
                <td>{projectFile.type}</td>
                <td>{projectFile.special_type}</td>
                <td>{convertDateToLocale(projectFile.updated_at)}</td>
                <td>
                  <i
                    className="fa-solid fa-edit"
                    onClick={() => {
                      setSelectedProject(projectFile);
                      handleEdit();
                    }}
                  />
                  <i className="fa-solid fa-file-download" />
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => handleDelete(projectFile.file_id)}
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
          type="prosjekt"
          onSuccess={handleSuccess}
          endpoint="project"
        />
      )}
      {state === "edit" && (
        <EditFile
          handleCancel={handleCancel}
          options={options}
          type="prosjekt"
          onSuccess={handleSuccess}
          data={selectedProject}
          endpoint="project"
        />
      )}
    </>
  );
};

export default ProjectFiles;
