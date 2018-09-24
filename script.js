$(function(){

var svg = Pablo('#ground').svg({ //create svg with height and width
          width: 1100,
          height: 700
      });

var tankX=550;
var tankY=600;

//part3
var ballNumber=5;
var ballNumberCopy=5;
var ballArray=new Array();
var eternity=100;//for immortality

var ballX;
var ballY;
var ballR;
var ballSpeed;
var ballDirection;
var ballObj;
//console.log(ballArray);

var fireinterval;

//part3
function ballsBuilder(){
    for (var i = 0; i < ballNumber; i++) {

      ballX=Math.floor(Math.random() * 1060) + 20;
      ballY=Math.floor(Math.random() * 660) + 20;
      ballR=Math.floor(Math.random() * 10) + 10;
      ballSpeed=20-ballR;
      ballDirection=Math.floor(Math.random() * 4) + 1;
      ballObj=ballBuilder(ballX,ballY,ballR)

        var ballObject={
          ballX:ballX,
          ballY:ballY,
          ballR:ballR,
          ballSpeed:ballSpeed,
          ballDirection:ballDirection,
          ballObj:ballObj
        }

        ballArray.push(ballObject);
    }
}

ballsBuilder();

var body;
var sideLeft;
var sideRight;
var hood;
var gun;

//part2
var fire=svg.rect({
 x:-1000,
 y:-1000,
 width:4, height:4,
 fill: '#c0392b',
});
var direction="up";
var fireFlag=1;

//part3
setInterval(function(){

//next level
  if(ballNumber==0){
    ballNumberCopy=ballNumberCopy+1;
    ballNumber=ballNumberCopy;
    ballsBuilder();
    eternity=100;
  }

  for (var i = 0; i < ballNumber; i++) {
      ballArray[i].ballObj.remove();
      eternity=eternity-1;
      //console.log(ballArray[i].ballX);

     if(ballArray[i].ballDirection==1){

        ballArray[i].ballX=ballArray[i].ballX+ballArray[i].ballSpeed;
        ballArray[i].ballY=ballArray[i].ballY-ballArray[i].ballSpeed;

        ballArray[i].ballObj=ballBuilder(ballArray[i].ballX,ballArray[i].ballY,ballArray[i].ballR);

      }

      if(ballArray[i].ballDirection==2){

        ballArray[i].ballX=ballArray[i].ballX+ballArray[i].ballSpeed;
        ballArray[i].ballY=ballArray[i].ballY+ballArray[i].ballSpeed;

        ballArray[i].ballObj=ballBuilder(ballArray[i].ballX,ballArray[i].ballY,ballArray[i].ballR);

      }
      if(ballArray[i].ballDirection==3){

        ballArray[i].ballX=ballArray[i].ballX-ballArray[i].ballSpeed;
        ballArray[i].ballY=ballArray[i].ballY+ballArray[i].ballSpeed;

        ballArray[i].ballObj=ballBuilder(ballArray[i].ballX,ballArray[i].ballY,ballArray[i].ballR);

      }

      if(ballArray[i].ballDirection==4){

        ballArray[i].ballX=ballArray[i].ballX-ballArray[i].ballSpeed;
        ballArray[i].ballY=ballArray[i].ballY-ballArray[i].ballSpeed;

        ballArray[i].ballObj=ballBuilder(ballArray[i].ballX,ballArray[i].ballY,ballArray[i].ballR);

      }


      if (ballArray[i].ballY<10) {
          if(ballArray[i].ballDirection==1){
            ballArray[i].ballDirection=2;
          }
          if(ballArray[i].ballDirection==4){
            ballArray[i].ballDirection=3;
          }
      }

      if (ballArray[i].ballY>690) {
          if(ballArray[i].ballDirection==2){
            ballArray[i].ballDirection=1;
          }
          if(ballArray[i].ballDirection==3){
            ballArray[i].ballDirection=4;
          }
      }

      if (ballArray[i].ballX<10) {
          if(ballArray[i].ballDirection==4){
            ballArray[i].ballDirection=1;
          }
          if(ballArray[i].ballDirection==3){
            ballArray[i].ballDirection=2;
          }
      }
      if (ballArray[i].ballX>1080) {
          if(ballArray[i].ballDirection==1){
            ballArray[i].ballDirection=4;
          }
          if(ballArray[i].ballDirection==2){
            ballArray[i].ballDirection=3;
          }
      }

      //hitting the tank
      if ((eternity<0)&&(tankX-25<ballArray[i].ballX+ballArray[i].ballR && tankX+25>ballArray[i].ballX-ballArray[i].ballR && tankY-25<ballArray[i].ballY+ballArray[i].ballR && tankY+25>ballArray[i].ballY-ballArray[i].ballR)) {

        if (confirm('Would you like to play again')) {
               window.location.reload(false)
            } else {

            }
      }


  }

}, 100);


  tankBuilder(tankX,tankY,"up");
  //tankBuilder(100,100,"up");
//  tankBuilder(200,100,"down");
  //tankBuilder(300,100,"left");
  //tankBuilder(400,100,"right");





  $(document).keydown(function(event){
  //37 left  - 38  up - 39  right - 40  down

     var code =  event.which;


     console.log(code);
     if(code==37){

       body.remove();
       sideLeft.remove();
       sideRight.remove();
       hood.remove();
       gun.remove();
       tankX=tankX-3;
       tankBuilder(tankX,tankY,"left");
       //part2
       direction="left";

     }
     if(code==38){

       body.remove();
       sideLeft.remove();
       sideRight.remove();
       hood.remove();
       gun.remove();
       tankY=tankY-3;
       tankBuilder(tankX,tankY,"up");
       //part2
       direction="up";
     }
     if(code==39){

       body.remove();
       sideLeft.remove();
       sideRight.remove();
       hood.remove();
       gun.remove();
       tankX=tankX+3;
       tankBuilder(tankX,tankY,"right");
       //part2
       direction="right";
     }
     if(code==40){

       body.remove();
       sideLeft.remove();
       sideRight.remove();
       hood.remove();
       gun.remove();
       tankY=tankY+3;
       tankBuilder(tankX,tankY,"down");
       //part2
       direction="down";
     }

//part2
//32-space
     if(code==32){

       console.log(direction,tankX,tankY);

       if(fireFlag==1){

         fireBuilder(direction,tankX,tankY);
         fireFlag=0;
       }



     }


  });


function tankBuilder(x,y,direction){

if(direction=="up"){

  body=svg.rect({
    x:x-20,
    y:y-20,
    width:40, height:40,
    fill: '#6ab04c',
  });

  sideLeft=svg.rect({
    x:x-28,
    y:y-25,
    width:8, height:50,
    fill: '#2c3e50',
  });


  sideRight=svg.rect({
    x:x+20,
    y:y-25,
    width:8, height:50,
    fill: '#2c3e50',
  });

  hood=svg.circle({
    cx: x,
    cy: y,
    r: 10,
    fill:  '#2c3e50'
   });

   gun=svg.rect({
     x:x-2,
     y:y-30,
     width:4, height:25,
     fill: '#2c3e50',
   });
}

if(direction=="down"){
   body=svg.rect({
    x:x-20,
    y:y-20,
    width:40, height:40,
    fill: '#6ab04c',
  });

  sideLeft=svg.rect({
    x:x-28,
    y:y-25,
    width:8, height:50,
    fill: '#2c3e50',
  });


  sideRight=svg.rect({
    x:x+20,
    y:y-25,
    width:8, height:50,
    fill: '#2c3e50',
  });

   hood=svg.circle({
    cx: x,
    cy: y,
    r: 10,
    fill:  '#2c3e50'
   });

    gun=svg.rect({
     x:x-2,
     y:y+5,
     width:4, height:25,
     fill: '#2c3e50',
   });
}
if(direction=="left"){

  body=svg.rect({
   x:x-20,
   y:y-20,
   width:40, height:40,
   fill: '#6ab04c',
 });

 sideLeft=svg.rect({
   x:x-25,
   y:y-28,
   width:50, height:8,
   fill: '#2c3e50',
 });


 sideRight=svg.rect({
   x:x-25,
   y:y+20,
   width:50, height:8,
   fill: '#2c3e50',
 });

  hood=svg.circle({
   cx: x,
   cy: y,
   r: 10,
   fill:  '#2c3e50'
  });

   gun=svg.rect({
    x:x-26,
    y:y-2,
    width:25, height:4,
    fill: '#2c3e50',
  });
}
if(direction=="right"){

  body=svg.rect({
   x:x-20,
   y:y-20,
   width:40, height:40,
   fill: '#6ab04c',
 });

 sideLeft=svg.rect({
   x:x-25,
   y:y-28,
   width:50, height:8,
   fill: '#2c3e50',
 });


 sideRight=svg.rect({
   x:x-25,
   y:y+20,
   width:50, height:8,
   fill: '#2c3e50',
 });

  hood=svg.circle({
   cx: x,
   cy: y,
   r: 10,
   fill:  '#2c3e50'
  });

   gun=svg.rect({
    x:x,
    y:y-2,
    width:25, height:4,
    fill: '#2c3e50',
  });

}

}


function fireBuilder(direction,x,y){

  if(direction=="up"){

    fireinterval=setInterval(function(){

      fire.remove();
      fire=svg.rect({
       x:x-2,
       y:y,
       width:4, height:10,
       fill: '#c0392b',
     });

     y=y-5;

     ballShot(x,y);

     if(y<=0){
       clearInterval(fireinterval);
       fire.remove();
       fireFlag=1;
     }
   }, 10);

  }
  if(direction=="down"){

    fireinterval=setInterval(function(){

      fire.remove();
      fire=svg.rect({
       x:x-2,
       y:y,
       width:4, height:10,
       fill: '#c0392b',
     });

     y=y+5;

    ballShot(x,y);

     if(y>=700){
       clearInterval(fireinterval);
       fire.remove();
       fireFlag=1;
     }
   }, 10);

  }
  if(direction=="left"){

    fireinterval=setInterval(function(){

      fire.remove();
      fire=svg.rect({
       x:x,
       y:y-2,
       width:10, height:4,
       fill: '#c0392b',
     });

     x=x-5;

     ballShot(x,y);

     if(x<=0){
       clearInterval(fireinterval);
       fire.remove();
       fireFlag=1;
     }
   }, 10);

  }
  if(direction=="right"){

    fireinterval=setInterval(function(){

      fire.remove();
      fire=svg.rect({
       x:x,
       y:y-2,
       width:10, height:4,
       fill: '#c0392b',
     });

     x=x+5;

     ballShot(x,y);


     if(x>=1100){
       clearInterval(fireinterval);
       fire.remove();
       fireFlag=1;
     }
   }, 10);

  }


}

//part3
function ballBuilder(x,y,r){
  return svg.circle({
   cx: x,
   cy: y,
   r: r,
   fill:  '#5758BB'
  });
}

//hitting the ball
function ballShot(x,y){
  for (var i = 0; i < ballNumber; i++) {

    if (x>ballArray[i].ballX-ballArray[i].ballR&&x<ballArray[i].ballX+ballArray[i].ballR&&y>ballArray[i].ballY-ballArray[i].ballR&&y<ballArray[i].ballY+ballArray[i].ballR) {

      ballArray[i].ballObj.remove();
      ballArray.splice(i,1);//delete element
      ballNumber=ballNumber-1;
      clearInterval(fireinterval);//stop the movement of the bullet.
      fire.remove();
      fireFlag=1;//tank can fire
    }

  }
}


});
