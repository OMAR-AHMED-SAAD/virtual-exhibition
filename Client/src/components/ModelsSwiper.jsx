import ModelCard from "./ModelCard";
import axiosApi from "../utils/axiosApi";
import { useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const ModelSwiper = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosApi
      .get("/get_models")
      .then((response) => {
        console.log(response);
        setModels(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="model-swiper">
      <h1 className="model-swiper-title">
        Explore Our Currently Hosted Models
      </h1>
      <div className="model-swiper-container">
        {models?.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
      {loading && (
        <span className="loading-icon">
          <Loading3QuartersOutlined
            style={{ fontSize: 99, color: "white" }}
            spin
          />
        </span>
      )}
    </div>
  );
};

export default ModelSwiper;
