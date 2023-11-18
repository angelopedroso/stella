import { Server } from 'socket.io'
import { configDotenv } from 'dotenv'

configDotenv()

const io = new Server(Number(process.env.PORT) || 8080)

io.on('connection', (ws) => {
  ws.on('error', (error) => {
    console.error(error)
  })

  ws.on('open', function open() {
    ws.send('something')
  })

  ws.on('message', function message(data) {
    console.log('received: %s', data)
  })
})
