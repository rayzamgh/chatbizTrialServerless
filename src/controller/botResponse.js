const axios = require('axios');
const twilio = require('twilio');

const {
  SID: accountSid,
  KEY: TwilloAuthToken,
} = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const { getResp } = require('../utils/botDictionary');

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */

class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */

  static async botRoute(event, context) {

  /**
   * @memberof WhatsappBot
   * @description Routes bot actions based on user messages
   * @returns {object} - json response
  */

  const requestBody = event.body;
  const twimlmr = new MessagingResponse();
  const message = requestBody.Body;

  switch (message) {
    case 'json':
      return(await WhatsappBot.jsonResponse(event, context));
    case 'meme':
      return(await WhatsappBot.imageResponse(event, context));
    default:
      twimlmr.message(getResp(message));
      return(twimlmr.toString());
  }

  }

  static async jsonResponse(event, context) {
  
    /**
   * @memberof WhatsappBot
   * @description returns a fake json call
   * @returns {object} - json response
   */

    const twimlmr = new MessagingResponse();

    try {

      const responseAxios = await axios.get('https://jsonplaceholder.typicode.com/posts/1')

      twimlmr.message(responseAxios.data.title);

      return(twimlmr.toString())
    } catch (error) {
      return {
          body: error
      };
    }
  }

  static async imageResponse(event, context) {
  
    /**
   * @memberof WhatsappBot
   * @description returns a meme api from reddit
   * @returns {object} - json response
  */
    const twimlmr = new MessagingResponse();

    try {
      const message = twimlmr.message();

      const responseAxios = await axios.get('https://meme-api.herokuapp.com/gimme/dankmemes')
      
      message.body('Today`s reddit special:');
      message.media(responseAxios.data.url);

      if (!responseAxios.data.nsfw) {
        return(twimlmr.toString());
      }
      throw Error;
    } catch (error) {
      return {
          body: error
      };
    }
  }
}

module.exports = WhatsappBot;
