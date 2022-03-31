img="";
status="";
objects=[];
function preload() {
    img=loadImage('village.jpg');
}

function setup() {
    canvas=createCanvas(790,570);
    canvas.center();
//cordinates for canvas.position(x,y);'
objectDetector=ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("status").innerHTML="Status: Dectecing Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    //change status
    status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error , results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects=results;
    }
}

function draw() {
 //placing  image in canvas
 image(img,0 , 0 , 790 , 570);
 if (status != "") {
     for ( i = 0; i < objects.length; i++) {
         noFill()
        fill('#000000');
        pc=Math.floor(objects[i].confidence * 100);
        text(objects[i].label + " " + pc + "%" , objects[i].x + 5 ,objects[i].y + 13);  
        noFill();
        stroke('#0080ff');
        square(objects[i].x , objects[i].y ,objects[i].width ,objects[i].height);
        document.getElementById("status").innerHTML="Status: Objects Detected";      
    
     
     }
 }
}

function back() {
    window.location="index.html";
}