"use-strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = "td_notes_SDK";

docClient.put(
  {
    TableName: TableName,
    Item: {
      user_id: "ABC",
      timestamp: 1,
      title: "new initial title",
      content: "new initial content",
    },
    ConditionExpression: "#t <> :t",
    ExpressionAttributeNames: {
      "#t": "timestamp",
    },
    ExpressionAttributeValues: {
      ":t": 1,
    },
  },
  (err, data) => {
    if (err) {
      if (err.code === "ConditionalCheckFailedException") {
        console.log({
          error: "Condition check failed!",
        });
      } else {
        console.log(err);
      }
    } else {
      console.log(data);
    }
  }
);