let capture;
let posenet;
let singlePose, skeleton;
let actor_img;

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO);
    capture.hide();
    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
    actor_img=loadImage('image/amir.jpeg');
}

function receivedPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log("Model has been loaded");
}

function draw() {
    image(capture, 0, 0);
    fill(255, 0, 0);
    if (singlePose) {
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            let keypoint = singlePose.keypoints[i];
            ellipse(keypoint.position.x, keypoint.position.y, 10);
        }
        stroke(255, 255, 255);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
        image(actor_img,singlePose.nose.x-45,singlePose.nose.y-60,200,200);
    }
}
