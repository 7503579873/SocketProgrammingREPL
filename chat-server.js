
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
const io = require('socket.io')(server);
const port = 3000;
flag = 0
username = "default";
var obj = [{ "username": "john", "balance_check": 3000 }, { "username": "bob", "balance_check": 2500 }]
io.on('connection', (socket) => {
      console.log('connected');
      let evt;
      socket.on('message', (clientMsg) => {
            console.log(`${clientMsg}`)
            evt = clientMsg.replace(/[^\w]/g, '');
            let out = Out(evt)
            if (out) {
                  socket.broadcast.emit('message', `${out}`);

            }
      })
})
io.on('disconnect', (evt) => {
      console.log('disconnected')
})
server.listen(port, () => console.log(`server listening on port: ${port}`))

function Out(evt) {
      let output;
      switch (evt) {
            case "john":
                  console.log("true")
                  flag = 1;
                  username = "john"
                  output = "logged in";
                  console.log("logged in");
                  break;
            case 'bob':
                  flag = 1;
                  username = "bob"
                  output = "logged in";
                  console.log("logged in");

                  break;
            case 'balance_check':
                  if (flag == 1)
                        for (let i in obj) {
                              if (obj.hasOwnProperty(i)) {
                                    if (obj[i].username == username) {
                                          output = obj[i].balance_check;

                                          console.log(obj[i].balance_check);

                                    }
                              }
                        }
                  break;
            case 'withdraw_100':
                  if (flag == 1)
                        for (let i in obj) {
                              if (obj.hasOwnProperty(i)) {
                                    if (obj[i].username == username) {
                                          obj[i].balance_check = obj[i].balance_check - 100;
                                          output = obj[i].balance_check;
                                          console.log(obj[i].balance_check);

                                    }
                              }
                        }
                  break;
            case 'deposite_200':
                  if (flag == 1)
                        for (let i in obj) {
                              if (obj.hasOwnProperty(i)) {
                                    if (obj[i].username == username) {
                                          obj[i].balance_check = obj[i].balance_check + 200;
                                          output = obj[i].balance_check;
                                          console.log(obj[i].balance_check);

                                    }
                              }
                        }
                  break;
            default:
                  output = `Sorry, we are out of ${evt}.`
                  console.log(`Sorry, we are out of ${evt}.`);

      }
      if (output)
            return output;

}