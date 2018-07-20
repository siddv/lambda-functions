exports.handler = async (event, context) => {
  
    let min = 18;
    let error = '';
    let rolledCharacter = {}
  
    if(event && event.queryStringParameters && event.queryStringParameters.text) {
      const userMin = parseInt(event.queryStringParameters.text)
  
      if(!isNaN(userMin) && userMin >= 18 && userMin <= 90) {
        min = userMin;
      } else {
        error = 'Please specify a number between 18 and 90 (until I figure out a better solution) e.g. `/randchar 75`'
      }
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
    
      while(rolledCharacter.total <= min){
        rolledCharacter = rollChar();
      }
  
    }
  
    return {
      headers: {
        "content-type": "application/json"
      },
      statusCode: 200,
      body: JSON.stringify({
        response_type: "in_channel",
        text: error.length ? '' : `Total: *${rolledCharacter.total}*\nRolls: *${rolledCharacter.rolls.sort((a,b) => b>a).join('*, *')}*`,
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