import express from 'express';
import AWS from 'aws-sdk';
import * as url from "url";
import path from 'path';
import { getVorp } from './scraper';
import { aws_key_id, aws_secret } from './AwsKey';

// Express configuration
const app: express.Application = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'build')));

// Dynamo configuration
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-west-2",
  endpoint: "http://192.168.1.67:8000",
  accessKeyId: aws_key_id,
  secretAccessKey: aws_secret
});

// Async function for querying Dynamo
const dynamoQuery = async (s: string): Promise<string[]> => {
  const defRes: string[] = ["Yoenis Cespedes", "13110"];
  try {
    let params = {
      TableName: 'PlayerId_Table',
      ProjectionExpression: 'nm, id',
      KeyConditionExpression: "p = :p and begins_with(nm, :nn)",
      ExpressionAttributeValues: {
        ":p": 1,
        ":nn": s
      }
    };

    // Wait for async response and return first response
    let response = await docClient.query(params).promise();
    if(response.Items){
      console.log("Found " + response.Items[0].nm);
      return [response.Items[0].nm, response.Items[0].id];
    } else {
        console.log("no results found");
        return defRes;
    }
  } catch (err) {
    console.log("Unable to query.  Error: ", JSON.stringify(err, null, 2));
    return ['Yoenis Cespedes', '13110'];
  }
}

// Set up route for query of player's name
app.route('/player').get((req: express.Request, res: express.Response) => {
  // Allow cross origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  let str = "";

  // Get query string from url
  let queryData = url.parse(req.url, true).query;
  str = queryData.str as string

  // Use query string as input for Dynamo query
  // If query returns a value, set response status as 200
  dynamoQuery(str).then(retValue => {
    if (retValue != ["Error"]){
      res.status(200).send({
        message: retValue
      })
    } else {
      res.status(400).send({
        message: "Error"
      })
    }
  });
})

// Set up route for calculating player's VORP over time range
app.route('/scrape').get((req: express.Request, res: express.Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Get query parameters
  let queryData = url.parse(req.url, true).query;
  let id: string = queryData.id as string;
  let startDate: string = queryData.startDate as string;
  let endDate: string = queryData.endDate as string;

  // Pass query parameters to getVorp function and return value
  getVorp(id, startDate, endDate).then((vorp) => {
    if(vorp != "Error") {
      res.status(200).send({message: vorp})
    } else {
      res.status(400).send({message: "Error"})
    }
  });
})

app.listen(5000, () => {
  console.log('Express server listening on port 5000');
})
