import React, { useEffect, useState } from "react";
import "../css/Files.scss";
import ApprovedFeebacks from "./ApprovedFeedbacks";
import FeedbackWaitingForApproval from "./FeedbackWaitingForApproval";
import FeedbackSent from "./FeedbackSent";
import AddFeedbackLink from "./GenerateFeedbackLink";
import getApiUrl, { getToken } from "../../helper/helper";
import axios from "axios";
export interface IFeedbackProps {
  id: number;
  name: string;
  created_at: string;
  approved_at: string;
  is_approved: boolean;
  feedback?: string;
  role?: string;
  is_waiting: boolean;
  is_sent: boolean;
  url?: string;
}
interface ITabs {
  id: number;
  name: string;
}

const Feedbacks: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [seletedTab, setSelectedTab] = useState<ITabs>({
    id: 1,
    name: "Fullførte tilbakemeldinger",
  });
  const tabs = [
    {
      id: 1,
      name: "Fullførte tilbakemeldinger",
    },
    {
      id: 2,
      name: "Avventende tilbakemeldinger",
    },
    {
      id: 3,
      name: "Søkte tilbakemeldinger",
    },
  ];
  const [feedbacks, setFeedbacks] = useState<IFeedbackProps[]>([]);

  useEffect(() => {
    handleSuccess();
  }, []);

  const handleSuccess = () => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios
      .get(`${getApiUrl()}/get-all-feedbacks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const handleClickTab = (tab: ITabs) => {
    setSelectedTab(tab);
  };

  const handleGenerateLink = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="dashboard-container-files">
      <div className="btn-container">
        <button type="submit" onClick={handleGenerateLink}>
          Generer link
        </button>
      </div>
      <div className="dashboard-files-container">
        <div className="category-tabs">
          {tabs?.map((tab) => (
            <div
              key={tab.id}
              className={`category-tab ${
                seletedTab?.id === tab.id ? "active" : ""
              }`}
              onClick={() => handleClickTab(tab)}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
      {seletedTab?.id === 1 && (
        <ApprovedFeebacks
          data={feedbacks.filter((i: IFeedbackProps) => i.is_approved === true)}
          onSucess={handleSuccess}
        />
      )}
      {seletedTab?.id === 2 && (
        <FeedbackWaitingForApproval
          data={feedbacks.filter((i: IFeedbackProps) => i.is_waiting === true)}
          onSucess={handleSuccess}
        />
      )}
      {seletedTab?.id === 3 && (
        <FeedbackSent
          data={feedbacks.filter((i: IFeedbackProps) => i.is_sent === true)}
          onSucess={handleSuccess}
        />
      )}
      {open && (
        <AddFeedbackLink
          onSuccess={handleSuccess}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Feedbacks;
