import React from "react";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import { IFeedbackProps } from "./Feedbacks";
import axios from "axios";

interface IProps {
  data?: IFeedbackProps[];
  onSucess: () => void;
}
const FeedbackSent: React.FC<IProps> = ({ data, onSucess }) => {
  const shortenUrl = (url: string) => {
    const domain = new URL(url).hostname;
    return domain;
  };
  const handleDelete = (id: number) => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios
      .delete(`${getApiUrl()}/delete-feedback/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        onSucess();
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Role</th>
              <th>Link</th>
              <th>Opprettet</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data?.map((i, index) => (
              <tr key={index}>
                <td>{i.name}</td>
                <td>{i.role}</td>
                <td>
                  <a
                    href={i.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {shortenUrl(i.url ? i.url : "")}
                  </a>
                </td>
                <td>{convertDateToLocale(i.created_at)}</td>
                <td>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => {
                      handleDelete(i.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FeedbackSent;
