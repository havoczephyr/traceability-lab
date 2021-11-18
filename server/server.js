const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()



// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
const { appendFile } = require('fs')
var rollbar = new Rollbar({
  accessToken: 'd4d6246e058c4bc88761a2ab81bb4408',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.use(express.json())
app.use(cors())


const port = process.env.PORT || 4545

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/client.html"))
    rollbar.info("HTML file served successfully")
})

app.use('/js', express.static(path.join(__dirname, '../client/client.js')))

const getCompliments = (req, res) => {
    console.log()
        const compliments = ["Gee, you're a cookie",
                       "You're ice cold bruh",
                       "Your Java Scripts are Stellar.",
    ];
  
    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];
  
    res.status(200).send(randomCompliment);
    rollbar.info('compliment recieved')
    
  }

app.get('api/compliment', getCompliments)
app.use(rollbar.errorHandler())


app.listen(port, () => {
    console.log(`We comin' at ya live @ ${port}`)
})