import { initSocket, io } from "~~/server/socket";
import { createRouter, useBase } from "h3";
let listSocket: any = [];
io.on("connection", async (socket) => {
  // @ts-ignore
  if(socket.handshake.headers.origin!=null){
      listSocket.push({
        socket_id: socket.id,
        socket_ip: socket.handshake.headers.origin,
      });
  }
  io.to("server").emit("userConnect", {
    message: "User Connected",
    ip: socket.handshake.headers.origin,
    id: socket.id,
    size: io.engine.clientsCount,
    siezeArray: listSocket.length,
  });
  // 1. EVENT FROM CLIENT
  socket.on("clientType", async (clientType) => {
    if ((await io.in(clientType).fetchSockets()).length > 0){
      io.socketsLeave(clientType);
    }
    socket.join(clientType);
  });
  
  
  // 1. CLIENT (SERVER) -> SERVER -> CLIENT
  // event request data playlist
  socket.on("reqDataPlaylist",(data)=>{
    io.to(data.ip).emit("reqDataPlaylist");
  })
  // event change template
  socket.on("changeTemplate",(data)=>{
    io.to(data.ip).emit("changeTemplate", { template: data.template });
  })
  // event change bgm
  socket.on("changeBgm",(data)=>{
    io.to(data.ip).emit("changeBgm", { bgm: data.bgm });
  })

  // 2. CLIENT -> SERVER -> CLIENT (SERVER)
  // event response data playlist
  socket.on("resDataPlaylist",(data)=>{
    io.to("server").emit("resDataPlaylist", { data: data });
  })

  
  // 3. EVENT TO CLIENT ('RASPBERRY')
  socket.emit("tes", { message: "Connection Established!" });
  setInterval(() => {
    socket.emit("playMusic", { message: "Connection Established!" });
  }, 10000);
  socket.on("disconnect", () => {
    const index = listSocket.findIndex(
      (item: any) => item.socket_ip === socket.handshake.headers.origin
    );
    if (index !== -1) {
      listSocket.splice(index, 1);
      console.log(socket.handshake.headers.origin);
      console.log(`User disconnected : {IP = ${socket.handshake.headers.origin}, ID = ${socket.id}}`);
      io.to("server").emit("userDisconnect", {
        message: "User disconnected ",
        ip: socket.handshake.headers.origin,
        id: socket.id,
        size: io.engine.clientsCount,
        sizeArray: listSocket.length,
      });
    }
  });
});
const router = createRouter();
router.get(
  "/socket.io",
  defineEventHandler((event) => initSocket(event))
);
router.get(
  "/refreshClient",
  defineEventHandler((event) => {
    io.emit("refresh");
  })
);
router.post(
  "/sendMessage",
  defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
      io.to(body.ip).emit("sendMessage", { message: body.message });
      return true;
    } catch (err) {
      return {
        error: err,
        data: body,
      };
    }
  })
);
router.get(
  "/getConnectedClient",
  defineEventHandler(async (event) => {
    try {
      return listSocket;
    } catch (err) {
      return err;
    }
  })
);
router.post(
  "/sendData",
  defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
      io.to(body.ip).emit(body.dataType, { data: body });
      return true;
    } catch (err) {
      return {
        error: err,
        data: body,
      };
    }
  })
);

export default useBase("/api", router.handler);
