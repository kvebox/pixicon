## Pixicon
[Live Demo](http://pix-icon.herokuapp.com/)

### Background and Overview
Pictionary is a browser based drawing game similar to the classic multiplayer game Pictionary. Each player is given a turn as the 'artist', where he/she draws a word which the other players attempt to guess. The correct guess merits the player points, the amount depending on whether other players had previously guessed correctly. The player with the most points at the end of all rounds wins the game.


### Functionality and MVP
- [x] User auth
- [x] Interactability: can draw + chat!
- [ ] Pictionary gameplay
- [ ] Username
- [ ] Saving and sharing of images drawn during game
- [ ] Production README

### Future Features
- [ ] Different rooms/ servers
- [ ] Custom room/ servers

### Wireframe
<img alt='pixicon gameplay wireframe' src='https://66.media.tumblr.com/1bbb383a3a0ceb995f6c6c8797d99ba9/tumblr_pv5ultc5sz1tewbdwo1_r1_1280.png'/>

<img alt='pixicon tool icons'
src='https://66.media.tumblr.com/d241d723638a28d20fcc2a34dd196f44/tumblr_pv5ultc5sz1tewbdwo3_r1_1280.png'/>

### Technologies and Technical Challenges
#### Technologies
- MERN stack
- socket.io

In order to have an actual playable game, it was necessary to have real time updates of both images and messages to any connected clients/players, which was capable through websockets. In order to convert the canvas brush strokes into a form that could be sent using sockets, canvas's built in .toDataURL was used to save and convert the image on the canvas into a string form, saved to the state, and emitted to the server. On mounting, each client then received the broadcast image data, assigned as a new Image(), and drawn to the size of the canvas.

```javascript
    draw(e){
        if (this.state.mode === 'erase') this.setState({strokeStyle: '#fff'});

        if ((this.state.mode ==='erase' || this.state.mode === 'draw') 
        && this.state.isDrawing && this.drawArea.current.contains(e.target)) {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            ctx.strokeStyle = this.state.strokeStyle;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = this.state.lineWidth;
            ctx.beginPath();
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
            this.sendImage();
        }
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.draw);
        document.addEventListener('click', this.eyedropper);

        this.socket.on('sketch update', (image) => {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            var myImg = new Image();
            let imgsrc = image;
            myImg.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(myImg, 0, 0);
            };
            myImg.src = imgsrc;
        });
    }
    
    
    sendImage(){
      let canvas = document.getElementById('canvas');
      var dataURL = canvas.toDataURL();
      this.setState({ saveState: dataURL });

      this.socket.emit('sketch update', this.state.saveState);
    }
```

- CSS modules
- HTML/CSS/JavaScript


#### Technical Challenges
- Realtime image updates as a player draws to canvas
- Message board tracking and matching with the given word to allow players to win the game


### Group Members and Work Breakdown
##### Members: Victoria Joh, Nhat Do
- Victoria - graphics, UX/UI, frontend
- Nhat - frontend, backend
