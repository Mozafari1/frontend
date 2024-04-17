import React, { useEffect, useState } from "react";
import "../css/Projects.scss";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import AddEditProject from "./AddEditProject";
import axios from "axios";
interface IProjects {
  id: number;
  name: string;
  domain_name: string;
  updated_at: string;
  status: string;
  service_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  renewal_date: string;
}
const Projects: React.FC = () => {
  const [state, setState] = useState({
    is_edit: false,
    is_open: false,
  });
  const [projects, setProjects] = useState<IProjects[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProjects | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    "default"
  );
  const [showSortingIcon, setShowSortingIcon] = useState(false);
  const handleSuccess = () => {
    fetch(`${getApiUrl()}/get-projects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching price data:", error);
      });
  };
  useEffect(() => {
    handleSuccess();
  }, []);
  const sortByStatus = () => {
    let newSortOrder: "asc" | "desc" | "default" = "asc";
    if (sortOrder === "asc") {
      newSortOrder = "desc";
    } else if (sortOrder === "desc") {
      newSortOrder = "default";
    }
    const sortedprojects = [...projects].sort((a, b) =>
      newSortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : newSortOrder === "desc"
        ? b.status.localeCompare(a.status)
        : 0
    );
    if (newSortOrder === "default") {
      setProjects(
        projects.sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else {
      setProjects(sortedprojects);
    }
    setSortOrder(newSortOrder);
    setShowSortingIcon(newSortOrder !== "default");
  };
  const handleAddProject = () => {
    setState({ is_edit: false, is_open: true });
  };
  const handleEditProject = () => {
    setState({ is_edit: true, is_open: true });
  };
  const handleCancel = () => {
    setState({ is_edit: false, is_open: false });
  };

  const handleDeleteProject = (id: number) => {
    const token = getToken();
    if (!token || !id) return;
    axios
      .delete(`${getApiUrl()}/delete-project/${id}`, {
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
    <div className="dashboard-container-projects">
      <button type="submit" onClick={handleAddProject}>
        Legg til prosjekt
      </button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Domene</th>
              <th>Sist oppdatert</th>
              <th onClick={sortByStatus}>
                Status{" "}
                {showSortingIcon && (
                  <span>
                    {sortOrder === "asc" ? (
                      <i className="fa-solid fa-arrow-down" />
                    ) : (
                      <i className="fa-solid fa-arrow-up" />
                    )}
                  </span>
                )}
              </th>
              <th>Type tjeneste</th>
              <th>Kontaktperson</th>
              <th>E-post</th>
              <th>Telefon</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.name}</td>
                <td>{project.domain_name}</td>
                <td>{convertDateToLocale(project.updated_at)}</td>
                <td>{project.status}</td>
                <td>{project.service_type}</td>
                <td>
                  {project.first_name} {project.last_name}
                </td>
                <td>{project.email}</td>
                <td>{project.phone_number}</td>
                <td>
                  <i
                    className="fa-solid fa-edit"
                    onClick={() => {
                      handleEditProject();
                      setSelectedProject(project);
                    }}
                  />
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => handleDeleteProject(project.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {state.is_open && (
          <AddEditProject
            is_edit={state.is_edit}
            data={selectedProject}
            handleCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};
export default Projects;
