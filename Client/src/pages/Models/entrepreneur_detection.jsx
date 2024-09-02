import { useEffect, useState } from "react";
import axiosApi from "../../utils/axiosApi";
import MyLayout from "../MyLayout";
import { Button, message } from "antd";
import EntrepreneurOutput from "../../components/EntrepreneurOutput.jsx";

const checkValidText = (text) => {
  if (text === "") {
    message.error("Please enter some text to detect.");
    return;
  } else if (text.length < 100) {
    message.error("Please enter atleast 100 characters to detect.");
    return;
  }
};

const EntrepreneurDetection = () => {
  const [model, setModel] = useState(null);
  const [student, setStudent] = useState(null);
  const [loadingDetect, setLoadingDetect] = useState(true);
  const [loadingExplain, setLoadingExplain] = useState(true);
  const [text, setText] = useState("");
  const [output, setOutput] = useState([]);
  const [explanations, setExplanations] = useState(null);

  useEffect(() => {
    axiosApi
      .get("/get_model/entrepreneur_detection")
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
        setLoadingDetect(false);
        setLoadingExplain(false);
      });
  }, []);

  const handleDetect = () => {
    checkValidText(text);
    setLoadingDetect(true);
    axiosApi
      .post("/predict", { modelName: "entrepreneur_detection", text: text })
      .then((response) => {
        setOutput(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        message.error("Model is not Responding. Please try again later.");
      })
      .finally(() => {
        setLoadingDetect(false);
      });
  };

  const handleExplain = () => {
    checkValidText(text);
    setLoadingExplain(true);
    axiosApi
      .post("/explain", { modelName: "entrepreneur_detection", text: text })
      .then((response) => {
        setOutput(response.data.prediction);
        setExplanations(response.data.explanation);
      })
      .catch((error) => {
        console.log(error);
        message.error("Model is not Responding. Please try again later.");
      })
      .finally(() => {
        setLoadingExplain(false);
      });
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <MyLayout
        modelName={model?.name}
        modelDescription={model?.description}
        student={student}
      >
        <div className="model-container">
          <div className="ent-model-input-container">
            <h1 className="layout-title ent-model-title">Input :</h1>
            <textarea
              className="ent-model-input"
              placeholder="Enter text here..."
              value={text}
              onChange={handleTextChange}
            ></textarea>
            <div className="ent-model-btns">
              <Button
                className="anime-model-gen-btn ent-model-btn"
                type="primary"
                loading={loadingDetect}
                disabled={loadingExplain}
                size="large"
                style={{
                  backgroundColor: "var(--orange)",
                  borderColor: "var(--orange)",
                  margin: 0,
                }}
                onClick={handleDetect}
              >
                Detect
              </Button>
              <Button
                className="anime-model-gen-btn ent-model-btn"
                type="primary"
                disabled={loadingDetect}
                loading={loadingExplain}
                size="large"
                style={{
                  backgroundColor: "var(--orange)",
                  borderColor: "var(--orange)",
                  margin: 0,
                }}
                onClick={handleExplain}
              >
                Detect & Explain
              </Button>
            </div>
          </div>
          <EntrepreneurOutput output={output} explanations={explanations} />
        </div>
      </MyLayout>
    </>
  );
};

export default EntrepreneurDetection;
