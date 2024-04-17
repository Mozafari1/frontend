import React, { useEffect, useState } from "react";
import "../css/Projects.scss";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import axios from "axios";
interface IInboxes {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  service_type: string;
  message: string;
  updated_at: string;
  is_responded: boolean;
  is_customer: boolean;
}
const Inboxes: React.FC = () => {
  const [inboxes, setInboxes] = useState<IInboxes[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    "default"
  );
  const [showSortingIcon, setShowSortingIcon] = useState(false);
  const handleSuccess = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios
      .get(`${getApiUrl()}/get-inboxes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setInboxes(response.data);
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
    const sortedinboxes = [...inboxes].sort((a, b) =>
      newSortOrder === "asc"
        ? a.email.localeCompare(b.email)
        : newSortOrder === "desc"
        ? b.email.localeCompare(a.email)
        : 0
    );
    if (newSortOrder === "default") {
      setInboxes(
        inboxes.sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else {
      setInboxes(sortedinboxes);
    }
    setSortOrder(newSortOrder);
    setShowSortingIcon(newSortOrder !== "default");
  };

  const handleDeleteInbox = (id: number) => {
    const token = getToken();
    if (!token || !id) return;
    axios
      .delete(`${getApiUrl()}/delete-inbox/${id}`, {
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

  const handleUpdateInboxStatus = (
    id: number,
    is_customer: boolean,
    is_responded: boolean
  ) => {
    const token = getToken();
    if (!token || !id) return;

    axios
      .put(
        `${getApiUrl()}/update-inbox-status/${id}`,
        {
          is_customer,
          is_responded,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        handleSuccess();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="dashboard-container-projects">
      <div className="inbox-title">Meldinger</div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Navn</th>
              <th onClick={sortByStatus}>
                E-post {""}
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
              <th>Telefon</th>
              <th>Type tjeneste</th>
              <th>Melding</th>
              <th>Opprettet</th>
              <th>Kunde?</th>
              <th>Svart?</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {inboxes?.map((inbox, index) => (
              <tr key={index}>
                <td>{inbox.name}</td>
                <td>{inbox.email}</td>
                <td>{inbox.phone_number}</td>
                <td>{inbox.service_type}</td>
                <td>{inbox.message}</td>
                <td>{convertDateToLocale(inbox.updated_at)}</td>
                <td
                  onClick={() => {
                    handleUpdateInboxStatus(
                      inbox.id,
                      !inbox.is_customer,
                      inbox.is_responded
                    );
                  }}
                >
                  {inbox.is_customer ? "Ja" : "Nei"}
                </td>
                <td
                  onClick={() => {
                    handleUpdateInboxStatus(
                      inbox.id,
                      inbox.is_customer,
                      !inbox.is_responded
                    );
                  }}
                >
                  {inbox.is_responded ? "Ja" : "Nei"}
                </td>
                <td>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => {
                      handleDeleteInbox(inbox.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Inboxes;
