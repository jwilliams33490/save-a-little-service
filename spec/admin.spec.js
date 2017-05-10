var frisby = require('frisby');


  frisby.create('Put Game State')
  .put('http://localhost:3000/admin',{
      targetWord:'tanya'
  },{json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    "targetWord": "tanya",
    "maskedWord": "-----",
    "incorrectLetters": [],
    "correctLetters": [],
    "hangManScore": 0,
    "isGameOver": false,
    "isGameWon": false
  })
  .toss()

frisby.create('Get Game State')
  .get('http://localhost:3000/admin')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    "targetWord": "tanya",
    "maskedWord": "-----",
    "incorrectLetters": [],
    "correctLetters": [],
    "hangManScore": 0,
    "isGameOver": false,
    "isGameWon": false
  })
  .toss()
