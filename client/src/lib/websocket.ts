import { io } from 'socket.io-client'

export const server = io('http://localhost:3000')
