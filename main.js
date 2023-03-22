noseX=0;
noseY=0;
leftEyeX=0;
leftEyeY=0;
rightEyeX=0;
rightEyeY=0;
filter=""
function preload() {
    getcatface=loadImage("cat face.jpg.png")
    getmustache=loadImage("Mustache.jpg.png")
}
function setup() {
    canvas = createCanvas (300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();

    poseNet =ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet Is Initialized')
}
function gotPoses(results,error)
{
if(error){
    console.log(error)  
}
else if(results.length> 0){
    console.log(results);
    console.log("leftEye x = "+results[0].pose.leftEye.x)
    console.log("leftEye y = "+results[0].pose.leftEye.y)
    console.log("rightEye x = "+results[0].pose.rightEye.x)
    console.log("rightEye y = "+results[0].pose.rightEye.y)
    console.log("nose x = "+results[0].pose.nose.x)
    console.log("nose y = "+results[0].pose.nose.y)
    noseX=results[0].pose.nose.x
    noseY=results[0].pose.nose.y
    leftEyeX=results[0].pose.leftEye.x
    leftEyeY=results[0].pose.leftEye.y
    rightEyeX=results[0].pose.rightEye.x
    rightEyeY=results[0].pose.rightEye.y
}
}
function draw(){
    image(video, 0, 0, 300, 300);
    
    if(filter=="catface"){
        image(getcatface,leftEyeX-120,leftEyeY-35,200,150) 
    }
    if(filter=="mustache"){
        image(getmustache,noseX-50,noseY+10, 100,10)  
    }
    if(filter=="clown"){
        fill(255,0,0);
        stroke(255,0,0);
        circle(noseX, noseY, 20);
    }
}
function changecatface(){
filter="catface"
}
function changemustache(){
    image(getmustache,noseX,noseY, 50,50)
    filter="mustache"
}
function changeclownface(){
    filter="clown"
    }
function take_snapshot(){
   save('myFilterImage.png');
}