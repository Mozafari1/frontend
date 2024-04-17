import React, { useEffect, useState } from "react";
import "../css/Contacts.scss";
import getApiUrl, { getToken } from "../../helper/helper";
import axios from "axios";
import AddEditUser from "./AddEditUser";
interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  profile_picture?: string;
  phone_number?: string;
  date_of_birth?: Date;
  role?: string;
}

const Users: React.FC = () => {
  const [state, setState] = useState({
    is_edit: false,
    is_open: false,
  });
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    "default"
  );
  const [showSortingIcon, setShowSortingIcon] = useState(false);
  const handleSuccess = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    fetch(`${getApiUrl()}/get-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
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
    const sortedusers = [...users].sort((a, b) =>
      newSortOrder === "asc"
        ? a.first_name.localeCompare(b.first_name)
        : newSortOrder === "desc"
        ? b.first_name.localeCompare(a.first_name)
        : 0
    );
    if (newSortOrder === "default") {
      setUsers(
        users.sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else {
      setUsers(sortedusers);
    }
    setSortOrder(newSortOrder);
    setShowSortingIcon(newSortOrder !== "default");
  };

  const handleAddUser = () => {
    setState({ is_edit: false, is_open: true });
  };
  const handleEditUser = () => {
    setState({ is_edit: true, is_open: true });
  };
  const handleCancel = () => {
    setState({ is_edit: false, is_open: false });
  };

  const handleDeleteUser = (id: number) => {
    const token = getToken();
    if (!token || !id) return;
    axios
      .delete(`${getApiUrl()}/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        handleSuccess();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="dashboard-container-contacts">
      <button type="submit" onClick={handleAddUser}>
        Legg til bruker
      </button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={sortByStatus}>
                Fornavn{" "}
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
              <th>Etternavn</th>
              <th>E-post</th>
              <th>Telefon</th>
              <th>Status</th>
              <th>Rolle</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.active ? "Aktiv" : "Inaktiv"}</td>
                <td>{user.role}</td>
                <td>
                  <i
                    className="fa-solid fa-edit"
                    onClick={() => {
                      handleEditUser();
                      setSelectedUser(user);
                    }}
                  />
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => handleDeleteUser(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {state.is_open && (
          <AddEditUser
            is_edit={state.is_edit}
            data={selectedUser}
            handleCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};
export default Users;
