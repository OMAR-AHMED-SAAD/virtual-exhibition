import { useEffect, useState } from "react";
import axiosApi from "../../utils/axiosApi";
import MyLayout from "../MyLayout";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

const AnimeImageGenerator = () => {
  const [model, setModel] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatedImages, setGeneratedImages] = useState([]);

  useEffect(() => {
    axiosApi
      .get("/get_model/anime_image_generator")
      .then((response) => {
        console.log(response);
        setModel(response.data.model);
        setStudent(response.data.student);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDownload = (base64String) => {
    const link = document.createElement("a");
    link.href = base64String;
    link.download = "anime generated image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onGenerate = () => {
    setLoading(true);
    axiosApi
      .post("/generate", { model_name: "anime_image_generator" })
      .then((response) => {
        setGeneratedImages(response.data.image);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <MyLayout
        modelName={model?.name}
        modelDescription={model?.description}
        student={student}
      >
        <div className="anime-model-container">
          <div className="model-swiper-container anime-model-swiper">
            {generatedImages?.map((image, index) => (
              <div className="model-card" key={"anime-image" + index}>
                <img className="anime-model-image" src={image} alt="model" />
                <Button
                  className="anime-model-download"
                  type="primary"
                  size="small"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(image)}
                />
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

export default AnimeImageGenerator;
