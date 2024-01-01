import { PeerServer } from "peer"

import { peerConfig } from "./config"

PeerServer(peerConfig, (server) => {
 console.log("Peer Server Started")
})