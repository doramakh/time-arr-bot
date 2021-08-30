const express = require('express')
const cors = require('cors')

const { PORT } = require('./config')
const { fetch } = require('./pg')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ 'origin': '*' }))

app.get('/', async (req, res) => {
    
    const arr = []
    
    const weather = async () => {
        const arrW = await fetch(`select weather_message_time from settings where weather = true`);
        arrW.forEach(el => {
            if(!arr.includes(el.weather_message_time)){
                arr.push(el.weather_message_time)
            }
        })
        
        const arrC = await fetch(`select currency_message_time from settings where currency = true`);
        arrC.forEach(el => {
            if(!arr.includes(el.currency_message_time)){
                arr.push(el.currency_message_time)
            }
        })
        
        return arr
    }
    
    const data = (await weather()).sort()
    res.send(data)
})

app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`))