"use-strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: "YOUR_DYNAMODB_REGION" });

const dynamodb = new AWS.DynamoDB();

const tableName = "td_notes_SDK";

// ? To get the list of dynamodb tables

dynamodb.listTables({}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
});

// ? To get data about a specific table in dynamodb

dynamodb.describeTable(
  {
    TableName: tableName,
  },
  (err, data) => {
    if (err) {
      if (err.code === "ResourceNotFoundException") {
        console.log({
          error: "DynamoDb table does not exist, with the given name",
        });
      } else {
        console.log(err.code);
      }
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  }
);

// ? Create a dynamoDB table
//* HASH --> Partition Key
//* RANGE --> Sort Key

dynamodb.createTable(
  {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: "user_id",
        AttributeType: "S",
      },
      {
        AttributeName: "timestamp",
        AttributeType: "N",
      },
    ],

    KeySchema: [
      {
        AttributeName: "user_id",
        KeyType: "HASH",
      },
      {
        AttributeName: "timestamp",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    }
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
  console.log(JSON.stringify(data, null, 2));
    }
  }
);

// ? Update DynamoDB properties
dynamodb.updateTable(
  {
    TableName: tableName,
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
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

// ? Delete Table in dynamoDB

dynamodb.deleteTable(
  {
    TableName: tableName,
  },
  (err, data) => {
    if (err) {
      if (err.code === "ResourceNotFoundException") {
        console.log({
          error: "DynamoDb table does not exist, with the given name",
        });
      } else {
        console.log(err.code);
      }
    } else {
      console.log(data);
    }
  }
);
