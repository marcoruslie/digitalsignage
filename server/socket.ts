import { Server, type ServerOptions } from "socket.io"
import type { H3Event } from "h3"
import { prisma } from "./db/index"

const getIpUser = async () => {
	const screen = await prisma.screen.findMany({
		select: {
			sc_ip: true,
		},
	})
	return screen.map((entry) => entry.sc_ip)
}

const options: Partial<ServerOptions> = {
	path: "/api/socket.io",
	cors: {
		origin: ["http://localhost:3000", "http://localhost:3001"],
		methods: ["GET", "POST"],
	},
}

export const io = new Server(options)

// const updateCorsOptions = async () => {
//   const ipUsers = await getIpUser();
//   io.opts.cors.origin = ipUsers;
//   console.log('Updated CORS options:', io.opts.cors);
// };

// io.use(async (socket, next) => {
//   await updateCorsOptions();
//   next();
// });

export async function initSocket(event: H3Event) {
	// @ts-ignore
	io.attach(event.node.res.socket?.server)
}
