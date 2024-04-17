import React from "react";
import getApiUrl, { convertDateToLocale, getToken } from "../../helper/helper";
import { IFeedbackProps } from "./Feedbacks";
import axios from "axios";

interface IProps {
  data?: IFeedbackProps[];
  onSucess: () => void;
}
const FeedbackWaitingForApproval: React.FC<IProps> = ({ data, onSucess }) => {
  const handleApproval = async (id: number) => {
    try {
      const apiUrl = getApiUrl();
      const token = getToken();
      if (!token || !apiUrl) {
        return;
      }
      const response = await axios.put(
        `${apiUrl}/approve-feedback/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        onSucess();
      }
    } catch (error) {
      console.error("Error approving feedback:", error);
    }
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
              <th>Opprettet</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data?.map((i, index) => (
              <tr key={index}>
                <td>{i.name}</td>
                <td>{i.role}</td>
                <td>{i.feedback}</td>
                <td>{convertDateToLocale(i.created_at)}</td>
                <td>
                  <i
                    className="fa-solid fa-check"
                    onClick={() => {
                      handleApproval(i.id);
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

export default FeedbackWaitingForApproval;
