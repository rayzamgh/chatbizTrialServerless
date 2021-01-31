const WhatsappBot = require('../controller/botResponse')

module.exports.receiveMessage= async (event, context) => {
  
  let result = await WhatsappBot.botRoute(event, context);
  
  return{result};
}
