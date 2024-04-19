import {io} from '../server/socket'
export default () => {
    const getConnectedClient = async ()=>{
        console.log(io.listenerCount('connection'))
    }
    return {
        getConnectedClient
    }
}