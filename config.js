import dotenv from "dotenv";

dotenv.config();

export default {
  awsAccessConfig : { 
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },

  kendraId: process.env.AWS_KENDRA_INDEX_ID,
  botId: process.env.AWS_LEX_BOT_ID,
  botAliasId: process.env.AWS_LEX_BOT_ALIAS_ID,
  localeId: process.env.AWS_LEX_LOCALE_ID
};

