import { Loading3QuartersOutlined } from "@ant-design/icons";
const ModelLoading = () => {
  return (
    <span className="loading-icon">
      <Loading3QuartersOutlined style={{ fontSize: 99, color: "white" }} spin />
    </span>
  );
};

export default ModelLoading;
