import { IConfig } from "peer"
import { config } from 'dotenv'

config()

export const peerConfig: Partial<IConfig> = {
 port: 9000,
}