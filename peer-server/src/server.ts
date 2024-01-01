import { PeerServer } from "peer"

import { peerConfig } from "./config"

PeerServer(peerConfig, (server) => {
 console.log("Peer Server Started")

 server.on("connection", (client) => {
  console.log(`Client connected`)
 })

 server.on("disconnect", (client) => {
  console.log(`Client disconnected`)
 })
})