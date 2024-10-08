import { useEffect, useState } from "react";
import axiosApi from "../../utils/axiosApi";
import MyLayout from "../MyLayout";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import PropTypes from "prop-types";

const ImageGenerator = ({modelPath}) => {
  const [model, setModel] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatedImages, setGeneratedImages] = useState([]);

  useEffect(() => {
    axiosApi
      .get(`/get_model/${modelPath}`)
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
  }, [modelPath]);

  const onGenerate = () => {
    setLoading(true);
    axiosApi
      .post("/generate", { model_name: modelPath })
      .then((response) => {
        setGeneratedImages(response.data.image);
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
    <>
      <MyLayout
        modelName={model?.name}
        modelDescription={model?.description}
        student={student}
      >
        <div className="model-container">
          <div className="model-swiper-container anime-model-swiper">
            {generatedImages?.map((image, index) => (
              <div className="anime-model-card" key={"anime-image" + index}>
                <img className="anime-model-image" src={image} alt="model" />
                <a href={image} download="anime_generated_image.png">
                  <Button
                    className="anime-model-download"
                    type="primary"
                    size="small"
                    icon={<DownloadOutlined />}
                  />
                </a>
              </div>
            ))}
          </div>
          <Button
            className="anime-model-gen-btn"
            type="primary"
            loading={loading}
            size="large"
            style={{
              backgroundColor: "var(--orange)",
              borderColor: "var(--orange)",
            }}
            onClick={onGenerate}
          >
            Generate
          </Button>
        </div>
      </MyLayout>
    </>
  );
};

ImageGenerator.propTypes = {
  modelPath: PropTypes.string,
};

export default ImageGenerator;
