import queryAwsLex from "./aws-lex.js";
import queryAwsKendra from "./aws-kendra.js";

export const handler = async function (event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  let responseBody;

  try {
    switch (event.httpMethod) {
      case "POST":
        responseBody = await queryChatBot(event);
        break;
      default:
        throw new Error(`Unsupported route: "${event.httpMethod}"`);  
    }


    return {
      statusCode: 200,
      body: responseBody
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: responseBody
    };
  }
};

const queryChatBot = async (event) => {
  try {
    console.log(`queryChatBot function. event : "${event}"`);

    const requestBody = event.body;

    const awsLexResponse = await queryAwsLex(requestBody.message);
    if(awsLexResponse.status === 200) {
      return awsLexResponse.response
    }else{
      const awsKendraResponse = await queryAwsKendra(requestBody.message);
      if(awsKendraResponse.status === 200) return awsKendraResponse.response
      else return "Can't find an answer to that"
    }
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};
