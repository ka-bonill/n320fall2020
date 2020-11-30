//app level stuff
var canvas = document.getElementById("renderCanvas"); 

var engine = new BABYLON.Engine(canvas, true); 

//app variables
var camera, scene, ball, goal, timeoutID, particleSystem; 

//create pretty scene
scene = createScene(); 

//placement of render loop 
engine.runRenderLoop(function () {
    scene.render(); 
})

scene.registerAfterRender(function() {
    if(ball.intersectsMesh(goal, false))
    {
        //move goal
        goal.position.x = (Math.random() * 8) - 4;  

        //particle burst
        particleSystem.manualEmitCount = 21;
        particleSystem.start(); 
        
        //position particles
        particleSystem.minEmitBox = ball.position; 
        particleSystem.minEmitBox = ball.position; 

        //puts ball back in original place
        resetBall();  
    }
})

function createScene(){
    scene = new BABYLON.Scene(engine);
    
    //scene setup
    camera = new BABYLON.UniversalCamera("uc", new BABYLON.Vector3(0, 0, -15), scene); 
    var light = new BABYLON.DirectionalLight("heaven", new BABYLON.Vector3(0, -.2, 0.2), scene); 

    //physics setup
    var gravityVector = BABYLON.Vector3(0, -9.81, 0);  
    var physicsPlugin = new BABYLON.CannonJSPlugin(); 
    scene.enablePhysics(gravityVector, physicsPlugin); 

    ball = BABYLON.MeshBuilder.CreateSphere("boss", {diameter: 1}, scene); 
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: .2}, scene);
    ball.tag = "ball"; 

    //ground setup for ball to bounce on
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 20, width: 20, subdivisions: 4}, scene); 
    ground.position.y = -3; 
    ground.position.z = 9;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, resitution: 0.9}, scene); 

    //make goal
    goal = new BABYLON.MeshBuilder.CreateBox("goal", {height: 5, width: 5}, scene);
    goal.position.z = 20;  
    goal.position.x = Math.random() * 5; 

    //make the particle system
    particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene); 
    particleSystem.emitter = new BABYLON.Vector3(0, 0, 0); 
    particleSystem.minEmitPower = 1; 
    particleSystem.maxEmitPower = 2; 
    particleSystem.addVelocityGradient(0, 2); 
    
    //load particle texture
    particleSystem.particleTexture = new BABYLON.Texture("images/stars.png", scene); 

    return scene; 
}

function resetBall()
{
    //reset position
    ball.position = new BABYLON.Vector3();

    //reset velocity
    ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3()); 
    ball.physicsImpostor.setAngularVelocity(new BABYLON.Vector3()); 

    //clear timeout 
    clearTimeout( timeoutID ); 
}

window.addEventListener("click", function() {
    //get mesh that was clicked
    var pickResult = scene.pick(scene.pointerX, scene.pointerY); 
    var selectedObject = pickResult.pickedMesh; 

    //null checker
    if(selectedObject)
    {
        if(selectedObject.tag == "ball") {
            //get direction opposite from where the user clicked 
            var pushDir = pickResult.getNormal(true); 
            var forceDirection = pushDir.scale(-1000); 

            //kick object
            selectedObject.physicsImpostor.applyForce(
                forceDirection,
                selectedObject.getAbsolutePosition() 
            )

            //reset ball after three seconds
            timeoutID = setTimeout(resetBall, 3000); 
        }
    }
})