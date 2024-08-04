import ModelCard from "./ModelCard";
import axiosApi from "../utils/axiosApi";
import { useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import propTypes from "prop-types";

const ModelSwiper = ({ setModelsUsage }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosApi
      .get("/get_models")
      .then((response) => {
        console.log(response);
        setModels(response.data);
        setModelsUsage(
          response.data
            .map((model) => ({
              name: model.name,
              usage: model.usage,
              path: model.path,
            }))
            .filter((model) => model.usage > 0)
            .sort((a, b) => b.usage - a.usage)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setModelsUsage]);
  return (
    <div className="model-swiper">
      <h1 className="model-swiper-title">
        Explore Our Currently Hosted Models
      </h1>
      <div className="model-swiper-container">
        {models?.map((model) => (
          <ModelCard key={model?.id} model={model} />
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

ModelSwiper.propTypes = {
  setModelsUsage: propTypes.func.isRequired,
};

export default ModelSwiper;
