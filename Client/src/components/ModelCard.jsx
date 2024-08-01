import PropTypes from "prop-types";
import { Button } from "antd";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import { ClientBaseURL } from "../utils/axiosApi";
const { Meta } = Card;
import AvatarImage from "../assets/images/avatar.png";

const ModelCard = ({ model }) => {
  return (
    <Card
      key={"card" + model?.id}
      style={{
        width: 300,
      }}
      cover={
        <img
          className="model-cover-image"
          alt="model-image"
          src={ClientBaseURL+model?.image}
        />
      }
      actions={[
        <Link to={`/models/${model?.path}`} key="try-model">
          <Button
            type="primary"
            style={{
              backgroundColor: " #fb5513", // Orange color
              borderColor: " #fb5513", // Matching border color
              borderRadius: "5px", // Rounded corners
            }}
          >
            Try Model
          </Button>
        </Link>,
      ]}
    >
      <Meta
        style={{ minHeight: "100px" }}
        avatar={<Avatar src={AvatarImage} />}
        title={<span className="title-wrap">{model?.name}</span>}
        description={model?.shortDescription}
      />
    </Card>
  );
};

ModelCard.propTypes = {
  model: PropTypes.object.isRequired,
};

export default ModelCard;
