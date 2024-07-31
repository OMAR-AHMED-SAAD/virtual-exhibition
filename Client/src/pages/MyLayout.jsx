import { useState } from "react";
import {
  FloatButton,
  Modal,
  Layout,
  Descriptions,
  Typography,
  Tooltip,
} from "antd";
import PropTypes from "prop-types";
import {
  QuestionCircleOutlined,
  UserOutlined,
  GithubOutlined,
  FileTextOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import ParticlesBg from "particles-bg";

const { Link, Paragraph } = Typography;

const MyLayout = (props) => {
  const { student, modelName, modelDescription } = props;
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const showAuthorModal = () => {
    setIsAuthorModalOpen(true);
  };
  const showDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  };

  return (
    <>
      <Layout className="layout">
        <ParticlesBg
          type="cobweb"
          color="#f0f0f0"
          bg={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
        />
        <Content className="layout-content">
          <header className="layout-header">
            <h1 className="layout-title">{modelName}</h1>
          </header>
          {props.children}
        </Content>
        <Modal
          title={<div className="modal-title-centered">Author Details</div>}
          open={isAuthorModalOpen}
          onCancel={() => setIsAuthorModalOpen(false)}
          footer={null}
          centered
        >
          <Descriptions bordered column={1} className="student-descriptions">
            <Descriptions.Item
              label="Model Author"
              className="student-description-item"
            >
              {student?.name ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label="Github"
              className="student-description-item"
            >
              {student?.links?.github ? (
                <Link
                  href={student.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubOutlined />
                </Link>
              ) : (
                "N/A"
              )}
            </Descriptions.Item>
            <Descriptions.Item
              label="LinkedIn"
              className="student-description-item"
            >
              {student?.links?.linkedin ? (
                <Link
                  href={student.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinFilled />
                </Link>
              ) : (
                "N/A"
              )}
            </Descriptions.Item>
            <Descriptions.Item
              label="Supervisors"
              className="student-description-item"
            >
              {student?.supervisors?.length
                ? student.supervisors.join(", ")
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label="Thesis Link"
              className="student-description-item"
            >
              {student?.thesisLink ? (
                <Link
                  href={student.thesisLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Thesis
                </Link>
              ) : (
                "N/A"
              )}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
        <Modal
          title={<div className="modal-title-centered">Model Description</div>}
          open={isDescriptionModalOpen}
          onCancel={() => setIsDescriptionModalOpen(false)}
          footer={null}
          centered
          className="model-description-modal"
        >
          <Paragraph className="model-description-text">
            {modelDescription ?? "No description available."}
          </Paragraph>
        </Modal>
        <FloatButton.Group
          trigger="hover"
          style={{
            insetInlineEnd: 50,
          }}
          icon={<QuestionCircleOutlined />}
        >
          <Tooltip title="View Model Description" placement="left">
            <FloatButton
              onClick={showDescriptionModal}
              icon={<FileTextOutlined />}
            />
          </Tooltip>
          <Tooltip title="View Author Details" placement="left">
            <FloatButton onClick={showAuthorModal} icon={<UserOutlined />} />
          </Tooltip>
        </FloatButton.Group>
      </Layout>
    </>
  );
};

MyLayout.propTypes = {
  children: PropTypes.node.isRequired,
  student: PropTypes.object.isRequired,
  modelName: PropTypes.string.isRequired,
  modelDescription: PropTypes.string.isRequired,
};

export default MyLayout;
