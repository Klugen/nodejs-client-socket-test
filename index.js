import { v4 as uuidv4 } from 'uuid';

console.log(token)
const channel = process.argv[2];
const client_name = process.argv[3];

const socket = require("socket.io-client")("http://localhost:9000/s1",{
    transports: ['websocket'],
    query: {
        channel: channel,
    },

});
socket.on("connect", (client) => {
    console.log("connected",client);
} );

socket.on("connect_error", (err) => {
    console.log("connect_error",err);
    socket.io.opts.transports = ["polling", "websocket"];
});

socket.on("message", (data) => {
    console.log("message",data);
});

socket.on("disconnect", (reason) => {
    console.log("disconnect",reason);
    socket.connect();
});


socket.send(client_name,":",uuidv4().trim());
