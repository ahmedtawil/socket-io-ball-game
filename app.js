
const express = require('express')
const socketio = require('socket.io')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})
const server = app.listen(3000)

const io = socketio(server);
let players = []

io.sockets.on('connection', function (socket) {


    const player = { id: socket.id, x: 0, y: 0 }
    addPlayer(players, player)

    socket.emit('connected', { player, players })
    socket.broadcast.emit('playerConnected', player)


    socket.on('disconnect', function () {
        const p = players.find(p => p.id == socket.id)
        removePlayer(players, player)
        io.emit('playerDisconnected',  player )
    });

    socket.on('movingPlayer', function (player) {
        const playerIndex = players.findIndex(p => p.id == player.id)
        players[playerIndex] = player
        socket.broadcast.emit('detectPlayerPosition', player)
    })
});


const addPlayer = (arr, player) => {
    if (!player) return;
    arr.push(player)
}

const removePlayer = (player) => {
    const index = players.find(p => p.id == player.id)
    players.splice(index, 1)
    console.log(players);
}
