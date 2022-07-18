import socketIOClient from "socket.io-client";
import { IMessage, IProject, IUser } from "../types/types";
import config from "../../app.config";

const URL = `http://${config.host}:${config.socket_port}`;

export const socket = socketIOClient(URL, {
  autoConnect: false
});

function Login({ userData, projects }: { userData: IUser; projects: IProject[] }) {
  socket.emit("login", {
    userId: userData.id,
    projects: projects.map((project) => project.id)
  });
}
function Connect() {
  socket.connect();
}
function Disconnect() {
  socket.disconnect();
}

function SendMessage(message: IMessage) {
  socket.emit("MESSAGE:SEND", message);
}

const SOCKET = { Login, Connect, Disconnect, SendMessage };
export default SOCKET;
