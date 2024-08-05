import { useEffect, useState } from "react";
import axiosApi from "../../utils/axiosApi";
import MyLayout from "../MyLayout";
import { Button, message } from "antd";
import EntrepreneurOutput from "../../components/EntrepreneurOutput.jsx";

const EntrepreneurDetection = () => {
  const [model, setModel] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [output, setOutput] = useState([]);

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
        setLoading(false);
      });
  }, []);

  const handleDetect = () => {
    if (text === "") {
      message.error("Please enter some text to detect.");
      return;
    } else if (text.length < 100) {
      message.error("Please enter atleast 100 characters to detect.");
      return;
    }
    setLoading(true);
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
        setLoading(false);
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
            <Button
              className="anime-model-gen-btn ent-model-btn"
              type="primary"
              loading={loading}
              size="large"
              style={{
                backgroundColor: "var(--orange)",
                borderColor: "var(--orange)",
                width: "100%",
              }}
              onClick={handleDetect}
            >
              Detect
            </Button>
          </div>
          <EntrepreneurOutput output={output} />
        </div>
      </MyLayout>
    </>
  );
};

export default EntrepreneurDetection;
