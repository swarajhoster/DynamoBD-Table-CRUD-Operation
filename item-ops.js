"use-strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = "td_notes_SDK";

// ? Create Item in DynamoDB

docClient.put(
  {
    TableName: TableName,
    Item: {
      user_id: "22",
      timestamp: 2,
      title: "title 22",
      content: "content 22",
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

// ? Update Item in DynamoDB

docClient.update(
  {
    TableName: TableName,
    Key: {
      user_id: "bb",
      timestamp: 1,
    },
    UpdateExpression: "set #t = :t",
    ExpressionAttributeNames: {
      "#t": "title",
    },
    ExpressionAttributeValues: {
      ":t": "updated title 2",
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

// ? Delete Item in DynamoDB

docClient.delete(
  {
    TableName: TableName,
    Key: {
      user_id: "bb",
      timestamp: 2,
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

// ? PUT || DELETE multiple Item in DynamoDB

docClient.batchWrite(
  {
    RequestItems: {
      td_notes_SDK: [
        {
          DeleteRequest: {
            Key: {
              user_id: "22",
              timestamp: 2,

            }
          },
        },
        {
          PutRequest: {
            Item: {
              user_id: "11",
              timestamp: 1,
              title: "title 11",
              content: "content 11",
            },
          },
       
        },
      ],
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