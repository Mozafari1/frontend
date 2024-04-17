import React from "react";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import { IFeedbackProps } from "./Feedbacks";
import axios from "axios";

interface IProps {
  data?: IFeedbackProps[];
  onSucess: () => void;
}
const ApprovedFeebacks: React.FC<IProps> = ({ data, onSucess }) => {
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
              <th>Melding</th>
              <th>Godkjent dato</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data?.map((i, index) => (
              <tr key={index}>
                <td>{i.name}</td>
                <td>{i.role}</td>
                <td>{i.feedback}</td>
                <td>{convertDateToLocale(i.approved_at)}</td>
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

export default ApprovedFeebacks;
