// class Player extends Component {
//     constructor (x, w, y, h, img) {
//         super(x, y, w, h)
//         this.img = img
//     }
// }

// class Player {
//   constructor() {
//     this.x = 220;
//     this.y = 520;
//     this.width = 50;
//     this.height = 80;
//     this.img = "./images/dog_awake.png";
//   }

//   drawPlayer() {
//     const playerImage = new Image();
//     playerImage.src = this.img;
//     ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
//   }

//     moveCar(keyCode){
//       console.log('x', this.x);
//       console.log('y', this.y);
//       ctx.clearRect(this.x, this.y, this.width, this.height);
//       switch(keyCode){
//         case 37:
//         //Making sure car doesn't go off the road
//         if(this.x > 20){
//           this.x -= 10;
//         }
//           break;
//         case 39:
//         //Making sure car doesn't go off the road
//         if (this.x < 430 ){
//           this.x += 10;
//         }
//           break;
//       }
//     }
// }
