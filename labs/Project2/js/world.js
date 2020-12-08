/* fetch("data/data.json")
    .then( (text) =>  {return text.json() })
    .then( (jsonData) => { 
        aotData = jsonData; 
        
        aotData.forEach( (item, index) => {
            let box = BABYLON.MeshBuilder.CreateBox("box", {}, scene); 
            box.position.x = index * 1.2; 
            box.aotId = index; 
        })
    
    })

window.addEventListener("click", function () {
    var pickResult = scene.pick(scene.pointerX, scene.pointerY); 

    if(pickResult.pickedMesh)
    {
        let aotInfo = aotData[ pickResult.pickedMesh.aotId]
        pickResult.pickedMesh.scaling = new BABYLON.Vector3(1, item.iq, 1);  
    }
}) */

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var camera;

var createScene = function () {
    // Create the scene space
    var scene = new BABYLON.Scene(engine);
    
    // Add a camera to the scene and attach it to the canvas
    camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 10, 60, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, 1.0), scene);
    
    var terrain = new BABYLON.TerrainMaterial("terrain", scene); 
    terrain.specularColor = new BABYLON.Color3(0.73, 0.56, 0.41);
    terrain.specularPower = 50; 

    terrain.mixTexture = new BABYLON.Texture("textures/mixmap.png", scene); 

    terrain.diffuseTexture1 = new BABYLON.Texture("textures/rock.png", scene); 
    terrain.diffuseTexture2 = new BABYLON.Texture("textures/dirt.jpg", scene); 
    terrain.diffuseTexture3 = new BABYLON.Texture("textures/grass.jpg", scene); 

    terrain.diffuseTexture1.uScale = terrain.diffuseTexture1.vScale = 5;
    terrain.diffuseTexture2.uScale = terrain.diffuseTexture2.vScale = 5;
    terrain.diffuseTexture3.uScale = terrain.diffuseTexture3.vScale = 5;

    // Add and manipulate meshes in the scene
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/heightMap.jpg", 100, 100, 100, 0, 10, scene, false);
    ground.position.y = -1; 
    ground.material = terrain; 

    var sky = BABYLON.Mesh.CreateBox("sky", 100.0, scene);
    var skyMaterial = new BABYLON.StandardMaterial("sky", scene);
    skyMaterial.backFaceCulling = false;
    skyMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/TexturesCom_Skies", scene);
    skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE; 
    skyMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0); 
    skyMaterial.specularColor = new BABYLON.Color3(0, 0, 0); 
    skyMaterial.disableLighting = true;
    sky.material = skyMaterial;
    sky.infiniteDistance = true;
    //skyMaterial.disableLighting = true;

    return scene;
};

var scene = createScene(); 

engine.runRenderLoop(function ()
{
    scene.render(); 
}); 