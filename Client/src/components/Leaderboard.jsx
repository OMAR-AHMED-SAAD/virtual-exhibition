import { Table, Tooltip } from "antd";
import { CrownOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import propTypes from "prop-types";
import formatNumber from "../utils/numericFormat";

const Leaderboard = ({ modelsUsage }) => {
  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      rowScope: "row",
      key: "rank",
      width: 70, // Adjust width to decrease the size
      render: (text, record, index) =>
        index < 3 ? (
          <CrownOutlined
            style={{
              color:
                index === 0
                  ? "gold"
                  : index === 1
                  ? "#BCC6CC"
                  : index === 2
                  ? "#CD7F32"
                  : "black",
              fontSize: "1em", // Decrease the icon size if needed
            }}
          />
        ) : (
          index + 1
        ),
    },
    {
      title: "Model Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Usage Count",
      dataIndex: "usage",
      key: "usage",
        render: (text) => formatNumber(text),
    },
  ];

  return (
    <div className="leaderboard">
      <h1 className="leaderboard-title">
        Models Usage & Leaderboards
        <Tooltip title="Model usage is each time a model is used to generate output">
          <QuestionCircleOutlined
            style={{ marginLeft: "10px", fontSize: "0.75em" }}
          />
        </Tooltip>
      </h1>
      <div className="leaderboard-container">
        <Table
          className="leaderboard-table"
          columns={columns}
          dataSource={modelsUsage.map((model, index) => ({
            ...model,
            key: index,
          }))}
          pagination={false}
          rowKey={(record) => record.name}
          scroll={{ y: 300 }}
        />
      </div>
    </div>
  );
};

Leaderboard.propTypes = {
  modelsUsage: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      usage: propTypes.number,
    })
  ).isRequired,
};

export default Leaderboard;