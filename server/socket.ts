import { Server, type ServerOptions } from "socket.io";
import type { H3Event } from "h3";
import {prisma} from './db/index'
const getIpUser = async ()=>{
    const screen = await prisma.screen.findMany({
        select:{
            sc_ip: true
        }
    })
    return screen.map(entry => entry.sc_ip)
}
const options: Partial<ServerOptions> = {
    path: '/api/socket.io',
    cors:{
        origin: [],
        methods: ["GET", "POST"]
    },
}
export const io = new Server(options);
export async function initSocket(event: H3Event){
    options.cors = {
        origin: await getIpUser(),
    }
    console.log(options.cors)
    // @ts-ignore
    io.attach(event.node.res.socket?.server)
    io.on('connection', (socket) => { 
        console.log(socket.handshake.headers);
        socket.emit('tes', { message: 'Connection Established!'})
    });
}