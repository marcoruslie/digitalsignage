import { initSocket, io } from "~~/server/socket";
import { createRouter, useBase } from "h3";
import path from "path";
import fs from "fs";
let listSocket: any = [];
let listMusicClient: any = [];
let listReminderClient: any = [];
io.on("connection", async (socket) => {
  // @ts-ignore
  const getSocketRooms = (socketId) => {
    let socketRooms = "";
    listSocket.forEach((item: any) => {
      if (item.socket_id === socketId) {
        socketRooms = item.socket_ip;
      }
    });
    return socketRooms;
  };
  io.to("server").emit("userConnect", {
    message: "User Connected",
    ip: socket.handshake.headers.origin,
    id: socket.id,
    size: io.engine.clientsCount,
    siezeArray: listSocket.length,
  });
  // 1. EVENT FROM CLIENT
  socket.on("clientType", async (clientType) => {
    if (socket.handshake.headers.origin != null || clientType == "server") {
      if ((await io.in(clientType).fetchSockets()).length > 0) {
        io.socketsLeave(clientType);
      }

      socket.join(clientType);
      console.log(`User connected : {IP = ${clientType}, ID = ${socket.id}}`);
      if (clientType != "server") {
        listSocket.push({
          socket_id: socket.id,
          socket_ip: clientType,
        });
      }
    }
  });
  socket.on("musicId", async (musicId) => {
    if (socket.handshake.headers.origin != null) {
      const apiKey = "AIzaSyAgnyIHF_beLeYFv8XDCPz62vnCxm8TcPA";
      const searchUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${musicId}&key=${apiKey}`;
      let title = "null";
      try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        title = data.items[0].snippet.title;
      } catch (error) {
        console.error("Error:", error);
      }
      const index = listMusicClient.findIndex(
        (item: any) => item.socket_ip === getSocketRooms(socket.id)
      );
      // if old music id is same with new music id, then do nothing
      if (index !== -1 && listMusicClient[index].musicId === musicId) {
        listMusicClient.splice(index, 1);
      } else if (index !== -1) {
        listMusicClient.splice(index, 1);
        io.to("server").emit(
          "success",
          "Music successfully changed to " + title
        );
      }
      listMusicClient.push({
        socket_ip: getSocketRooms(socket.id),
        title: title,
        musicId: musicId,
      });
    }
  });
  socket.on("resDataReminder", async (data) => {
    console.log("REMINDER", data);
    if (socket.handshake.headers.origin != null) {
      const index = listReminderClient.findIndex(
        (item: any) => item.socket_ip === getSocketRooms(socket.id)
      );
      if (index !== -1) {
        listReminderClient.splice(index, 1);
      }
      listReminderClient.push({
        socket_ip: getSocketRooms(socket.id),
        reminder: data,
      });
    }
  });
  socket.on("success", async (data) => {
    console.log(data);
    io.to("server").emit("notif", data);
  });
  // 1. CLIENT (SERVER) -> SERVER -> CLIENT
  // event request data playlist
  socket.on("reqDataPlaylist", (data) => {
    io.to(data.ip).emit("reqDataPlaylist");
  });
  // event change template
  socket.on("changeTemplate", (data) => {
    io.to(data.ip).emit("changeTemplate", { template: data.template });
  });
  // event change bgm
  socket.on("changeBgm", (data) => {
    io.to(data.ip).emit("changeBgm", { bgm: data.bgm });
  });
  // event to send file to client
  socket.on("sendFile", (data) => {
    const fileData: any = [];
    data.selectedItems.forEach(async (item: any) => {
      item.announcement_in_list.forEach(async (ann: any) => {
        const fileUrl = ann.announcement.an_url;

        const fullPath = path.join(
          process.cwd(),
          fileUrl.replace("\\_nuxt", "")
        );

        const data = fs.readFileSync(fullPath);
        const annData = {
          an_id: ann.announcement.an_id,
          kategori: item.category.cat_name.replace(" ", ""),
          an_type: ann.announcement.an_type,
          an_fileName: ann.announcement.an_url.split("\\").pop(),
          fileData: data.toString("base64"),
        };
        fileData.push(annData);
      });
    });
    for (let i = 0; i < data.screen.length; i++) {
      io.to(data.screen[i].ip).emit("receiveFiles", {
        files: fileData,
        date: data.screen[i].date,
        jsonData: data.jsonData,
      });
    }
  });
  // event to send reminder to client
  socket.on("sendReminder", (data) => {
    if (data.ip == "") {
      io.emit("receiveReminder", { reminder: data.reminder });
    } else {
      io.to(data.ip).emit("receiveReminder", { reminder: data.reminder });
    }
  });
  // 2. CLIENT -> SERVER -> CLIENT (SERVER)
  // event response data playlist
  socket.on("resDataPlaylist", (data) => {
    io.to("server").emit("resDataPlaylist", { data: data });
  });

  // 3. EVENT TO CLIENT ('RASPBERRY')
  socket.emit("tes", { message: "Connection Established!" });

  socket.on("disconnect", () => {
    const index = listSocket.findIndex(
      (item: any) => item.socket_id === socket.id
    );
    const indexMusic = listMusicClient.findIndex(
      (item: any) => item.socket_ip === getSocketRooms(socket.id)
    );
    const indexReminder = listReminderClient.findIndex(
      (item: any) => item.socket_ip === getSocketRooms(socket.id)
    );
    if (index !== -1) {
      console.log(
        `User disconnected : {IP = ${getSocketRooms(socket.id)}, ID = ${
          socket.id
        }}`
      );
      listSocket.splice(index, 1);
      if (indexMusic !== -1) {
        listMusicClient.splice(indexMusic, 1);
      }
      if (indexReminder !== -1) {
        listReminderClient.splice(indexReminder, 1);
      }
      console.log(listSocket);
      io.to("server").emit("userDisconnect", {
        message: "User disconnected ",
        ip: getSocketRooms(socket.id),
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
// get connected client
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
// get connected client music id
router.get(
  "/getConnectedClientMusicId",
  defineEventHandler(async (event) => {
    try {
      return listMusicClient;
    } catch (err) {
      return err;
    }
  })
);
// get connected client reminder
router.get(
  "/getConnectedClientReminder",
  defineEventHandler(async (event) => {
    try {
      return listReminderClient;
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
