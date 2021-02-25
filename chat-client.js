var socket = require('socket.io-client')('http://localhost:3000');
const repl = require('repl')
const chalk = require('chalk');
socket.on('disconnect', function () {
    socket.emit('disconnect')
});
socket.on('connect', () => {
    console.log(chalk.red('=== start chatting ==='))
})
socket.on('message', (data) => {
    var username = data
    console.log(chalk.green(username));
    // console.log(chalk.green(username + ': ' + cmd.split('\n')[0]));


})
repl.start({
    prompt: '',
    eval: (username) => {
        socket.send(username)
    }
})

