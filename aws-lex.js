import { 
  LexRuntimeV2Client, 
  RecognizeTextCommand
} from "@aws-sdk/client-lex-runtime-v2";

import generalConfig from "./config.js";

const accessConfig = generalConfig.awsAccessConfig;

async function queryAwsLex(queryText){
  const lexParams = {
    botAliasId: generalConfig.botAliasId,
    botId: generalConfig.botId,
    text: queryText,
    localeId:generalConfig.localeId,
    sessionId:"test-session",
  };

  const client = new LexRuntimeV2Client({credentials: accessConfig});
  const command = new RecognizeTextCommand(lexParams);

  try {
    const response = await client.send(command);

    if(response['$metadata'].httpStatusCode == 200) {
      const messages = response?.messages;

      if(messages && messages.length > 0){
        return {
          status: "000",
          response: messages[0].content
        }
      } else{
        return {
          status: "111",
          response: ""
        }
      }

    }else{
      return {
        status: response['$metadata'],
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

export default queryAwsLex;
