import { IConfig } from "peer"
import { config } from 'dotenv'

config()

export const peerConfig: Partial<IConfig> = {
 alive_timeout: 90000,
 port: 9000,
}