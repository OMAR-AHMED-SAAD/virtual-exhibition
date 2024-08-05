// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axiosApi from "../../utils/axiosApi";
import MyLayout from "../MyLayout";
import { Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const ArabicTextToImage = () => {
  const [text, setText] = useState("");
  const [model, setModel] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatedImage, setGeneratedImage] = useState(null);

  useEffect(() => {
    axiosApi
      .get("/get_model/arabic_text_to_image")
      .then((response) => {
        console.log(response);
        setModel(response.data.model);
        setStudent(response.data.student);
      })
      .catch((error) => {
        console.log(error);
        message.error("Server Error. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onGenerate = () => {
    if (text === "") {
      message.error("Please enter some text to detect.");
      return;
    } 
    setLoading(true);
    axiosApi
      .post("/generate", { model_name: "arabic_text_to_image", text })
      .then((response) => {
        setGeneratedImage("data:image/jpeg;base64," + response.data.image);
      })
      .catch((error) => {
        console.log(error);
        message.error("Model is not Responding. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MyLayout
      modelName={model?.name}
      modelDescription={model?.description}
      student={student}
    >
      <div className="model-container">
        <div className="ent-model-input-container">
          <h1 className="layout-title ent-model-title">Input :</h1>
          <textarea
            className="ent-model-input arabic-text-area"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ادخل وصف الصورة هنا..."
          />

          <Button
            className="anime-model-gen-btn ent-model-btn"
            type="primary"
            loading={loading}
            size="large"
            onClick={onGenerate}
            style={{
              backgroundColor: "var(--orange)",
              borderColor: "var(--orange)",
            }}
          >
            Generate Image
          </Button>
        </div>
        <div className="arabic-ouput-area">
          <h1 className="layout-title ent-model-title">Output : {generatedImage? "Image generated successfully ✨" : "No Image generated yet"}</h1>
          <div className="arabic-img-placeholder">
            {generatedImage && (
              <>
                <img className="arabic-img" src={generatedImage} alt="output" />
                <a href={generatedImage} download="generated_image.png">
                  <Button
                    className="arabic-download"
                    type="primary"
                    icon={<DownloadOutlined />}
                  />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </MyLayout>
  );
};

export default ArabicTextToImage;
