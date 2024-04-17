import {initSocket, io} from '~~/server/socket'
import { createRouter, useBase } from 'h3';

const router = createRouter();
    router.get(
        '/socket.io', 
        defineEventHandler((event) => initSocket(event))
    )
    router.get('/refresh', defineEventHandler((event) => {
        io.emit('refresh')
    }))

export default useBase('/api', router.handler);