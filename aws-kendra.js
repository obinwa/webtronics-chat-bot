import { 
  KendraClient, 
  AssociateEntitiesToExperienceCommand,
  QueryCommand
 } from "@aws-sdk/client-kendra";

import generalConfig from "./config.js";

const accessConfig = generalConfig.awsAccessConfig;

async function queryAwsKendra(queryText){
  const client = new KendraClient(accessConfig);

  const command = new QueryCommand({QueryText:queryText,IndexId:generalConfig.kendraId});

  try {
    const response = await client.send(command);

    if(response['$metadata'].httpStatusCode == 200) {
      const messages = response.ResultItems;

      if(messages && messages.length > 0){
        return {
          status: "000",
          response: messages[0].DocumentExcerpt.Text
        }
      } else{
        return {
          status: "111",
          response: ""
        }
      }

    }else{
      return {
        status: data['$metadata'],
        response: ""
      }
    }
    

  } catch (error) {
    console.log(error);
    return {
      status: "500",
      response: ""
    }
  }
 
}

export default queryAwsKendra;