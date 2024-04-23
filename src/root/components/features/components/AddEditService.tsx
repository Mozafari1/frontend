import React, { useCallback, useEffect, useState } from "react";
import "../css/AddEditService.scss";
import getApiUrl, { getToken } from "../../helper/helper";
import axios from "axios";

interface IAddEditServiceProps {
  data?: any;
  is_edit: boolean;
  handleCancel: () => void;
  onSuccess: () => void;
}
const initialData = {
  file_name: "",
  title: "",
  less_content: "",
  main_content: "",
  sub_title: "",
  sub_content: "",
  sub_points_title: "",
  sub_point_titleA: "",
  sub_point_contentA: "",
  sub_point_titleB: "",
  sub_point_contentB: "",
  sub_point_titleC: "",
  sub_point_contentC: "",
  sub_point_titleD: "",
  sub_point_contentD: "",
  sub_point_titleE: "",
  sub_point_contentE: "",
  summary_title: "",
  summary_main_content: "",
  summary_sub_content: "",
  summary_sub_sub_content: "",
};
const AddEditService: React.FC<IAddEditServiceProps> = ({
  data,
  is_edit,
  handleCancel,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<File | null>(null);

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (is_edit && data) {
      setFormData({
        file_name: data.file_name,
        title: data.title,
        less_content: data.less_content,
        main_content: data.main_content,
        sub_points_title: data.sub_points_title,
        sub_title: data.sub_title,
        sub_content: data.sub_content,
        sub_point_titleA: data.sub_point_titleA,
        sub_point_contentA: data.sub_point_contentA,
        sub_point_titleB: data.sub_point_titleB,
        sub_point_contentB: data.sub_point_contentB,
        sub_point_titleC: data.sub_point_titleC,
        sub_point_contentC: data.sub_point_contentC,
        sub_point_titleD: data.sub_point_titleD,
        sub_point_contentD: data.sub_point_contentD,
        sub_point_titleE: data.sub_point_titleE,
        sub_point_contentE: data.sub_point_contentE,
        summary_title: data.summary_title,
        summary_main_content: data.summary_main_content,
        summary_sub_content: data.summary_sub_content,
        summary_sub_sub_content: data.summary_sub_sub_content,
      });
    }
  }, [is_edit, data]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //handle textareas
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type && file.type.includes("image")) {
      setImage(file);
    } else {
      setImage(null);
      // Handle invalid file type
    }
  };

  const handleClear = useCallback(() => {
    setFormData(initialData);
    setImage(null);
    setStep(1);
    handleCancel();
    onSuccess();
  }, [setFormData, setImage, setStep, handleCancel, onSuccess]); // Include all dependencies here

  useEffect(() => {
    if (data && is_edit && image) {
      const apiUrl = getApiUrl();
      const token = getToken();
      if (!token || !apiUrl) {
        return;
      }
      const postData = new FormData();
      postData.append("type", "service");
      postData.append("id", data.file_id);
      postData.append("connection_id", data.id);
      postData.append("image", image);

      axios
        .post(`${apiUrl}/upload-image`, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            handleClear();
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  }, [image, is_edit, data, handleClear]); // Now handleClear is stable and won't cause the effect to re-run unnecessarily

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 4) {
      const apiUrl = getApiUrl(); // Replace this with your actual API URL
      const token = getToken(); // Hent tokenet fra stedet der det er lagret, for eksempel fra localStorage
      if (!token) {
        return;
      }
      if (is_edit && data) {
        const updatedData = {
          ...data,
          title: formData.title,
          less_content: formData.less_content,
          main_content: formData.main_content,
          sub_points_title: formData.sub_points_title,
          sub_title: formData.sub_title,
          sub_content: formData.sub_content,
          sub_point_titleA: formData.sub_point_titleA,
          sub_point_contentA: formData.sub_point_contentA,
          sub_point_titleB: formData.sub_point_titleB,
          sub_point_contentB: formData.sub_point_contentB,
          sub_point_titleC: formData.sub_point_titleC,
          sub_point_contentC: formData.sub_point_contentC,
          sub_point_titleD: formData.sub_point_titleD,
          sub_point_contentD: formData.sub_point_contentD,
          sub_point_titleE: formData.sub_point_titleE,
          sub_point_contentE: formData.sub_point_contentE,
          summary_title: formData.summary_title,
          summary_main_content: formData.summary_main_content,
          summary_sub_content: formData.summary_sub_content,
          summary_sub_sub_content: formData.summary_sub_sub_content,
        };

        try {
          const response = await axios.put(
            `${apiUrl}/update-service/${data.id}`,
            updatedData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            handleClear();
          }
        } catch (error) {
          console.error("Error inserting data:", error);
        }
      } else {
        // const postData = new FormData();
        // postData.append("file_name", formData.file_name);
        // postData.append("title", formData.title);
        // postData.append("less_content", formData.less_content);
        // postData.append("main_content", formData.main_content);
        // postData.append("sub_points_title", formData.sub_points_title);
        // postData.append("sub_title", formData.sub_title);
        // postData.append("sub_content", formData.sub_content);
        // postData.append("sub_point_titleA", formData.sub_point_titleA);
        // postData.append("sub_point_contentA", formData.sub_point_contentA);
        // postData.append("sub_point_titleB", formData.sub_point_titleB);
        // postData.append("sub_point_contentB", formData.sub_point_contentB);
        // postData.append("sub_point_titleC", formData.sub_point_titleC);
        // postData.append("sub_point_contentC", formData.sub_point_contentC);
        // postData.append("sub_point_titleD", formData.sub_point_titleD);
        // postData.append("sub_point_contentD", formData.sub_point_contentD);
        // postData.append("sub_point_titleE", formData.sub_point_titleE);
        // postData.append("sub_point_contentE", formData.sub_point_contentE);
        // postData.append("summary_title", formData.summary_title);
        // postData.append("summary_main_content", formData.summary_main_content);
        // postData.append("summary_sub_content", formData.summary_sub_content);
        // postData.append(
        //   "summary_sub_sub_content",
        //   formData.summary_sub_sub_content
        // );
        // if (image) {
        //   postData.append("image", image);
        // }
        try {
          const response = await axios.post(
            `${apiUrl}/create-service`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 201) {
            handleClear();
          }
        } catch (error) {
          console.error("Error inserting data:", error);
        }
      }
      try {
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    } else {
      setStep(step + 1);
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            {/*    <div className="image-input">
            
              {is_edit ? (
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  placeholder="Laste opp nytt bildet..."
                />
              ) : (
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              )} 
            </div>*/}
            <div>
              <label htmlFor="file_name">Filnavn</label>
              <input
                type="text"
                id="file_name"
                name="file_name"
                defaultValue={formData.file_name}
                placeholder="Filnavn..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="title">Hovedtittel</label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={formData.title}
                placeholder="Hovedtittel..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="less_content">Kort beskrivelse</label>
              <textarea
                id="less_content"
                name="less_content"
                required
                defaultValue={formData.less_content}
                placeholder="Kort beskrivelse..."
                onChange={handleTextAreaChange}
              />
            </div>
            <div>
              <label htmlFor="main_content">Hoved beskrivelse</label>
              <textarea
                id="main_content"
                name="main_content"
                required
                defaultValue={formData.main_content}
                placeholder="Beskrivelse..."
                onChange={handleTextAreaChange}
              />
            </div>
            <div>
              <label htmlFor="sub_title">Supplerende tittel </label>
              <input
                type="text"
                id="sub_title"
                name="sub_title"
                defaultValue={formData.sub_title}
                placeholder="Supplerende tittel..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="sub_content">Supplerende beskrivelse</label>
              <textarea
                id="sub_content"
                name="sub_content"
                required
                defaultValue={formData.sub_content}
                placeholder="Supplerende beskrivelse..."
                onChange={handleTextAreaChange}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <>
            <div>
              <label htmlFor="sub_points_title">Hovedpunkt</label>
              <input
                type="text"
                id="sub_points_title"
                name="sub_points_title"
                defaultValue={formData.sub_points_title}
                placeholder="Hovedpunkt tittel..."
                required
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="sub_point_titleA">Punkt A</label>
              <input
                type="text"
                id="sub_point_titleA"
                name="sub_point_titleA"
                defaultValue={formData.sub_point_titleA}
                placeholder="Tittel punkt A..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="sub_point_contentA">Beskrivelse punkt A</label>
              <textarea
                id="sub_point_contentA"
                name="sub_point_contentA"
                required
                defaultValue={formData.sub_point_contentA}
                placeholder="Beskrivelse punkt A..."
                onChange={handleTextAreaChange}
              />
              <div>
                <label htmlFor="sub_point_titleB">Punkt B</label>
                <input
                  type="text"
                  id="sub_point_titleB"
                  name="sub_point_titleB"
                  defaultValue={formData.sub_point_titleB}
                  placeholder="Tittel punkt B"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="sub_point_contentB">Beskrivelse punkt B</label>
                <textarea
                  id="sub_point_contentB"
                  name="sub_point_contentB"
                  required
                  defaultValue={formData.sub_point_contentB}
                  placeholder="Beskrivelse punkt B..."
                  onChange={handleTextAreaChange}
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <div>
            <div>
              <label htmlFor="sub_point_titleC">Punkt C</label>
              <input
                type="text"
                id="sub_point_titleC"
                name="sub_point_titleC"
                defaultValue={formData.sub_point_titleC}
                placeholder="Tittel punkt C"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="sub_point_contentC">Beskrivelse punkt C</label>
              <textarea
                id="sub_point_contentC"
                name="sub_point_contentC"
                required
                defaultValue={formData.sub_point_contentC}
                placeholder="Beskrivelse punkt C..."
                onChange={handleTextAreaChange}
              />
            </div>
            <div>
              <label htmlFor="sub_point_titleD">Punkt D</label>
              <input
                type="text"
                id="sub_point_titleD"
                name="sub_point_titleD"
                defaultValue={formData.sub_point_titleD}
                placeholder="Tittel punkt D"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="sub_point_contentD">Beskrivelse punkt D</label>
              <textarea
                id="sub_point_contentD"
                name="sub_point_contentD"
                required
                defaultValue={formData.sub_point_contentD}
                placeholder="Beskrivelse punkt D..."
                onChange={handleTextAreaChange}
              />
            </div>
            <div>
              <label htmlFor="sub_point_titleE">Punkt E</label>
              <input
                type="text"
                id="sub_point_titleE"
                name="sub_point_titleE"
                defaultValue={formData.sub_point_titleE}
                placeholder="Tittel punkt E"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="sub_point_contentE">Beskrivelse punkt E</label>
              <textarea
                id="sub_point_contentE"
                name="sub_point_contentE"
                required
                defaultValue={formData.sub_point_contentE}
                placeholder="Beskrivelse punkt E..."
                onChange={handleTextAreaChange}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <>
            <div>
              <label htmlFor="summary_title">Oppsummeringstittel</label>
              <input
                type="text"
                id="summary_title"
                name="summary_title"
                defaultValue={formData.summary_title}
                placeholder="Oppsummeringstittel..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="summary_main_content">
                Oppsummerings hovedinnhold
              </label>
              <textarea
                id="summary_main_content"
                name="summary_main_content"
                required
                defaultValue={formData.summary_main_content}
                placeholder="Oppsummerings hovedinnhold..."
                onChange={handleTextAreaChange}
              />
            </div>
            <div>
              <label htmlFor="summary_sub_content">
                Oppsummerings underinnhold
              </label>
              <textarea
                id="summary_sub_content"
                name="summary_sub_content"
                required
                defaultValue={formData.summary_sub_content}
                placeholder="Oppsummerings underinnhold..."
                onChange={handleTextAreaChange}
              />
            </div>
            <div>
              <label htmlFor="summary_sub_sub_content">
                Oppsummerings underunderinnhold
              </label>
              <textarea
                id="summary_sub_sub_content"
                name="summary_sub_sub_content"
                required
                defaultValue={formData.summary_sub_sub_content}
                placeholder="Oppsummerings underunderinnhold.."
                onChange={handleTextAreaChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="add-edit-service">
      <div className="add-edit-card-service">
        <div className="card-header-service">
          <div className="head">
            {is_edit ? "Rediger tjeneste" : "Legg til tjeneste"}
          </div>
          <i className="fa-solid fa-xmark" onClick={handleCancel} />
        </div>
        <form onSubmit={handleSubmit} className="form-service">
          {renderFormStep()}
          {step > 1 && (
            <button
              type="button"
              className="back-button"
              onClick={() => setStep(step - 1)}
            >
              <i className="fa-solid fa-arrow-left" />
              Tilbake
            </button>
          )}
          {step < 4 && (
            <button type="submit" className="next-button">
              Neste <i className="fa-solid fa-arrow-right" />
            </button>
          )}
          {step === 4 && (
            <button type="submit">{is_edit ? "Lagre" : "Opprett"}</button>
          )}
        </form>
      </div>
    </div>
  );
};
export default AddEditService;
