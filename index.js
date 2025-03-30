//board
let board;
let boardwidth = 360;
let boardheight = 640;
let context;

//bird
let birdwidth = 34;
let birdheight = 24
let birdX = boardwidth/8
let birdY = boardheight/2

let bird ={
    x :birdX,
    y :birdY,
    width : birdwidth,
    height : birdheight
}

//pipes
let pipeArray = []
let pipewidth = 64;//width ratio = 384 /3072 = 1 /8
let pipeheight = 512
let pipex = boardwidth
let pipey = 0

let toppipeimg;
let bottompipeimg;
let score = 0

//physics
let velocityx = -2//pipes moving  left speed
let velocityy = 0;//bird jump speed
let gravity = 0.4;
 let gameover =  false


window.onload = function(){
    board = document.getElementById("board")
    board.height = boardheight
    board.width = boardwidth
    context = board.getContext("2d")//used for drawing on the board

    //draw flppy bird
    // context.fillStyle = "green"
    // context.fillRect(bird.x,bird.y,bird.width,bird.height)

    // /load imgs
    birdImg = new Image();
    birdImg.src ="./flappybird.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }
    toppipeimg = new Image()
    toppipeimg.src = "./toppipe.png"

    bottompipeimg  = new Image()
    bottompipeimg.src ="./bottompipe.png"
    
    requestAnimationFrame(update)
    setInterval(placepipe,1500)// every 1.5 sec
    document.addEventListener("keydown",movebird);
}


function update(){
    requestAnimationFrame(update);
    if(gameover){
        return;
    }
    context.clearRect(0 , 0, board.width, board.height)

    //bird
    velocityy += gravity;
    // bird.y += velocityy;
    bird.y = Math.max(bird.y + velocityy,0)//apply gravity tocurrent bird.y,limiting the bird to top of the canves
    context.drawImage(birdImg ,bird.x ,bird.y ,bird.width ,bird.height )

    if(bird.y > board.height){
        gameover = true
    }
    //pipes
    for(let i = 0; i  < pipeArray.length; i++){
        let pipe = pipeArray[i]
        pipe.x += velocityx;
        context.drawImage(pipe.img , pipe.x ,pipe.y ,pipe.width ,pipe.height)

        if(!pipe.passed  &&bird.x > pipe.x + pipe.width){
            score += 0.5;
            pipe.passed = true;
        }
        if(deletecollision(bird,pipe)){
            gameover = true;
        }
    }
    //clear pipes
    while(pipeArray.length > 0 && pipeArray[0].x < -pipewidth){
        pipeArray.shift()//removes firts element from the array
    }


    context.fillStyle = "White";
    context.font = "45px sans-serif";
    context.fillText(score ,5 ,45)

    if(gameover){
        context.fillText("GAME OVER",5 ,90)
        context.fillText("To Restart Click",4 ,400)
        context.fillText("Spacebar",4 ,450)


    }
}

function placepipe(){
    if(gameover){
        return
    }
    let randompipey = pipey - pipeheight/4 -Math.random()*(pipeheight/2);
    let openingspace = board.height/4;


     let toppipe = {
        img : toppipeimg,
        x : pipex,
        y : randompipey,
        width : pipewidth,
        height : pipeheight,
        passed : false
     }
     pipeArray.push(toppipe)

     let bottompipe = {
        img : bottompipeimg,
        x : pipex,
        y : randompipey + pipeheight + openingspace,
        width : pipewidth,
        height : pipeheight,
        passed : false
     }
     pipeArray.push(bottompipe)
}
 function movebird(e){
    if(e.code == "Space" || e.code == "ArrowUp" || e.code == "keyX"){
        //jump
        velocityy = -6;

        //reset game
        if(gameover){
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameover = false;
        }
    }
 }

 function deletecollision(a,b){
    return  a.x < b.x + b.width &&
            a.x + a.width>b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}

















// let container = document.getElementById("container")
// async function getmusic(){
//     const url = 'https://spotify23.p.rapidapi.com/albums/?ids=3IBcauSj5M2A6lTeffJzdv';
//     const options = {
//         method: 'GET',
//         headers: {
//             'x-rapidapi-key': '71f16d608emsh484957d92940a11p121f99jsn1c9c01cdce82',
//             'x-rapidapi-host': 'spotify23.p.rapidapi.com'
//         }
//     };
    
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//         displaymusic(result.albums)
//     } catch (error) {
//         console.error(error);
//     }
// }
// function displaymusic(albums){
//     let container = document.getElementById("container")
//     albums.forEach(album => {
//         let item = document.createElement("div")
//         item.className = "item"
//         console.log(album)
//         item.innerHTML = `
//         <p>${album.album_type}</p>
//         <p>${album.artists.external_urls.id}</p>
//         <audio controls><source src='${album.artists.external_urls[0]}'></source></audio>
//         <audio controls><source src='${album.track.item[o]?.preview_url || ""}'></source></audio>
//         `
//         container.appendChild(item)
//      })    
//     };
// getmusic()