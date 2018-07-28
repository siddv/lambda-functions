exports.handler = async (event, context) => {
  
    let min = 75;
    let text = '';
    let error = '';
    let rolledCharacter = {}
  
    /*
     * provide literally any value to a 'text' GET param to do a 'true random' roll,
     * else it'll follow the rules specified here: https://rosettacode.org/wiki/RPG_Attributes_Generator
     * 
     * In the case of Slack usage /[command] [literally anything] will provide a true random roll
     */
    if(event && event.queryStringParameters && event.queryStringParameters.text) {
      text = event.queryStringParameters.text
    }
  
    function rollChar () {
      const randchar = {
        total: 0,
        rolls: [],
        details: '',
        rollDetails: [],
      }
    
      for(let i=0;i<=5;i++) {
        let d6s = [];
        let rollTotal;
        let lowestNumber;
    
        for(let a=0;a<=3;a++) {
          d6s.push(Math.ceil(Math.random() * 6))
        }    
    
        lowestNumber = d6s.sort().splice(0, 1);
        rollTotal = d6s.reduce((a, b) => a + b, 0);
    
        randchar.rollDetails.push({
          total: rollTotal,
          details: `[~${lowestNumber.join()}~, *${d6s.join('*, *')}*] = *${rollTotal}*`
        }) 
        randchar.rolls.push(rollTotal);
        randchar.total += rollTotal;
      }
    
      randchar.rollDetails.sort((a,b) => b.total > a.total);
      randchar.rollDetails.forEach(val => randchar.details += `${val.details}\n`)
  
      return randchar;
    }
    
    if(!error.length) {
      rolledCharacter = rollChar();
    
      if(!text.length) {
        while(rolledCharacter.total <= min || rolledCharacter.rolls.filter(val => val >= 15).length < 2){
          rolledCharacter = rollChar();
        }
      }
    }
  
    return {
      headers: {
        "content-type": "application/json"
      },
      statusCode: 200,
      body: JSON.stringify({
        response_type: "in_channel",
        text: error.length ? '' : `Total: *${rolledCharacter.total}*\nRolls: *${rolledCharacter.rolls.join('*, *')}*`,
        attachments: [
          {
            text: error.length ? '' : `${rolledCharacter.details}`
          },
          {
            text: error
          }
        ]
      })
    };
  
  };