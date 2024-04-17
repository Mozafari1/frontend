import React, { useEffect, useState } from "react";
import "../css/Contacts.scss";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import axios from "axios";
import AddEditContact from "./AddEditContact";
interface IContacts {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  updated_at: Date;
  is_company: boolean;
  company_name: string;
}
const Contacts: React.FC = () => {
  const [state, setState] = useState({
    is_edit: false,
    is_open: false,
  });
  const [contacts, setContacts] = useState<IContacts[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContacts | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    "default"
  );
  const [showSortingIcon, setShowSortingIcon] = useState(false);
  const handleSuccess = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    fetch(`${getApiUrl()}/get-contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
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
    const sortedcontacts = [...contacts].sort((a, b) =>
      newSortOrder === "asc"
        ? a.first_name.localeCompare(b.first_name)
        : newSortOrder === "desc"
        ? b.first_name.localeCompare(a.first_name)
        : 0
    );
    if (newSortOrder === "default") {
      setContacts(
        contacts.sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else {
      setContacts(sortedcontacts);
    }
    setSortOrder(newSortOrder);
    setShowSortingIcon(newSortOrder !== "default");
  };
  const handleAddContact = () => {
    setState({ is_edit: false, is_open: true });
  };
  const handleEditContact = () => {
    setState({ is_edit: true, is_open: true });
  };
  const handleCancel = () => {
    setState({ is_edit: false, is_open: false });
  };

  const handleDeleteContact = (id: number) => {
    const token = getToken();
    if (!token || !id) return;
    axios
      .delete(`${getApiUrl()}/delete-contact/${id}`, {
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
    <div className="dashboard-container-contacts">
      <button type="submit" onClick={handleAddContact}>
        Legg til kontakt
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
              <th>Firmanavn</th>
              <th>E-post</th>
              <th>Telefon</th>
              <th>Sist oppdatert</th>
              <th>Er firma</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact, index) => (
              <tr key={index}>
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.company_name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone_number}</td>
                <td>{convertDateToLocale(contact.updated_at)}</td>
                <td>{contact.is_company ? "Ja" : "Nei"}</td>

                <td>
                  <i
                    className="fa-solid fa-edit"
                    onClick={() => {
                      handleEditContact();
                      setSelectedContact(contact);
                    }}
                  />
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => handleDeleteContact(contact.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {state.is_open && (
          <AddEditContact
            is_edit={state.is_edit}
            data={selectedContact}
            handleCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};
export default Contacts;
