"use-strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = "td_notes_SDK";

// ? Get a specific item from the table

docClient.get(
  {
    TableName: TableName,
    Key: {
      user_id: "ABC",
      timestamp: 1,
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);

// ? Get all the items from the table (searches ALL partition)

docClient.scan({ TableName: TableName }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// ? Get query items from the table (searches single partition)

docClient.query(
  {
    TableName: TableName,
    KeyConditionExpression: "user_id = :uid",
    ExpressionAttributeValues: {
        ":uid": "ABC"
    }
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);

// ? Get filtered items from the table (searches ALL partition)

docClient.scan(
  {
    TableName: TableName,
    FilterExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": 22,
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);

docClient.batchGet(
  {
    RequestItems: {
      "td_notes_SDK": {
        Keys: [
          {
            user_id: "ABC",
            timestamp: 1,
          },
          {
            user_id: "11",
            timestamp: 1,
          },
        ],
      },
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  }
);
