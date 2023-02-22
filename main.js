status ="";
video = "";
objects = [];

function preload(){
    video = createCapture(VIDEO);
    video.hide();
    sound = new Audio('ringtone.mp3');
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw() {
    image(video, 0, 0, 480, 380);
    
    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label ='person')
            {
                document.getElementById("baby-status").innerHTML = "Baby Found";
                sound.stop();
            }else{
                document.getElementById("baby-status").innerHTML = "Baby Not Found";
                sound.play();
            }
        }
    }
}


function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
    if (objects = []) {
        sound.play();
    }
}