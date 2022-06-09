const socket = io("/");
let player = null
socket.on('connected', (data) => {
    console.log('connected');
    player = data.player
    displayPlayers(data.players)
})
socket.on('playerConnected', (p) => {
    console.log('playerConnected' + ' ' + p.id);
    createNewPlayer(p)
})
socket.on('playerDisconnected', (p) => {
    console.log('playerDisconnected');
    removePlayer(p)
})

socket.on('detectPlayerPosition', (p) => {
    movePlayer(p)
})


const createNewPlayer = (p) => {

    console.log(p.id);
    var circle = document.createElement('div');
    circle.id = p.id
    circle.classList.add("dot");
    circle.style.position = 'absolute';
    circle.style.left = p.x;
    circle.style.top = p.y;
    document.body.appendChild(circle);
}


const removePlayer = (p) => {
    document.getElementById(p.id).remove();
}


const movePlayer = (p) => {
    const playerElement = document.getElementById(p.id)
    playerElement.style.left = p.x
    playerElement.style.top = p.y

}




const displayPlayers = (ps) => {
    ps.forEach(p => {
        createNewPlayer(p)
    });
}

let moveBy = 30;

window.addEventListener('keyup', (e) => {
    const circle = document.getElementById(player.id)

    switch (e.key) {
        case 'ArrowLeft':
            circle.style.left = parseInt(circle.style.left) - moveBy + 'px';
            break;
        case 'ArrowRight':
            circle.style.left = parseInt(circle.style.left) + moveBy + 'px';
            break;
        case 'ArrowUp':
            circle.style.top = parseInt(circle.style.top) - moveBy + 'px';
            break;
        case 'ArrowDown':
            circle.style.top = parseInt(circle.style.top) + moveBy + 'px';
            break;


    }
    player.x = circle.style.left
    player.y = circle.style.top

    socket.emit('movingPlayer', player)

})



