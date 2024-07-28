import { Button } from "antd";
import { Avatar, Card } from "antd";
const { Meta } = Card;

import PropTypes from "prop-types";

const ModelCard = ({ model }) => {
  return (
    <Card
      style={{
        width: 300,
      }}
      cover={<img alt="model-image" src={model?.image} />}
      actions={[
        <Button
          type="primary"
          style={{
            backgroundColor: " #fb5513", // Orange color
            borderColor: " #fb5513", // Matching border color
            borderRadius: "5px", // Rounded corners
          }}
          key="try-model"
        >
          Try Model
        </Button>,
      ]}
    >
      <Meta
        style={{ minHeight: "100px" }}
        avatar={<Avatar src={model?.avatar} />}
        title={model?.name}
        description={model?.description}
      />
    </Card>
  );
};

ModelCard.propTypes = {
  model: PropTypes.object.isRequired,
};

export default ModelCard;
