import { Tooltip } from "antd";
import PropTypes from "prop-types";
import Explanation from "./Explanation";

const EntrepreneurOutput = ({ output, explanations }) => {
  const EntrepreneurVsNon = {
    Entrepreneur: {
      className:
        "ent-model-button ent-model-button-large ent-model-button-entrepreneur",
      disabled: !output?.includes("Entrepreneur"),
      toolTip: "Congratulations! You are an Entrepreneur :)",
    },
    "Non-Entrepreneur": {
      className:
        "ent-model-button ent-model-button-large ent-model-button-entrepreneur",
      disabled: !output?.includes("Non-Entrepreneur"),
      toolTip: "You are not an Entrepreneur :(",
    },
  };

  const MBTI = {
    Introversion: {
      className: "ent-model-button ent-model-button-medium ent-model-button-IE",
      disabled: !output?.includes("Introversion"),
    },
    Extroversion: {
      className: "ent-model-button ent-model-button-medium ent-model-button-IE",
      disabled: !output?.includes("Extroversion"),
    },
    Intuition: {
      className: "ent-model-button ent-model-button-medium ent-model-button-NS",
      disabled: !output?.includes("Intuition"),
    },
    Sensing: {
      className: "ent-model-button ent-model-button-medium ent-model-button-NS",
      disabled: !output?.includes("Sensing"),
    },
    Thinking: {
      className: "ent-model-button ent-model-button-medium ent-model-button-TF",
      disabled: !output?.includes("Thinking"),
    },
    Feeling: {
      className: "ent-model-button ent-model-button-medium ent-model-button-TF",
      disabled: !output?.includes("Feeling"),
    },
    Judging: {
      className: "ent-model-button ent-model-button-medium ent-model-button-JP",
      disabled: !output?.includes("Judging"),
    },
    Perceiving: {
      className: "ent-model-button ent-model-button-medium ent-model-button-JP",
      disabled: !output?.includes("Perceiving"),
    },
  };

  return (
    <div className="ent-model-buttons-container">
      <h1 className="layout-title ent-model-title">Outputs : {output[5]}</h1>
      <div className="ent-model-button-top">
        {Object.entries(EntrepreneurVsNon).map(([key, value]) => (
          <Tooltip
            title={value.disabled ? null : value.toolTip}
            key={key}
            placement="top"
          >
            <button className={value.className} disabled={value.disabled}>
              {key}
            </button>
          </Tooltip>
        ))}
      </div>
      <h1
        className="layout-title ent-model-title"
        style={{ fontSize: "1.5rem" }}
      >
        Traits : {output[0]}
      </h1>
      <div className="ent-model-button-grid">
        {Object.entries(MBTI).map(([key, value]) => (
          <button
            className={value.className}
            disabled={value.disabled}
            key={key}
          >
            {key}
          </button>
        ))}
      </div>
      <h1
        className="layout-title ent-model-title"
        style={{ fontSize: "1.5rem" }}
      >
        Explanations : {!explanations ? "Try explaining the model output" : ""}
      </h1>
      {explanations && <Explanation explanations={explanations} />}
    </div>
  );
};

EntrepreneurOutput.propTypes = {
  output: PropTypes.array.isRequired,
  explanations: PropTypes.object.isRequired,
};

export default EntrepreneurOutput;
