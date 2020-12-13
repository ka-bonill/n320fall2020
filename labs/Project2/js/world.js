 //grabs JSON data
 fetch("data/data.json")
    .then( (text) =>  {return text.json() })
    .then( (jsonData) => { 
        aotData = jsonData; 
        })

//boilerplate code    
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var camera;

var innerDiv = document.createElement("div"); 

var createScene = function () {
    // Create the scene space
    var scene = new BABYLON.Scene(engine);
    
    // Add a camera to the scene and attach it to the canvas
    //camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 10, 60, BABYLON.Vector3.Zero(), scene);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.lowerBetaLimit = 0.1;
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, 1.0), scene);
    
    //creates terrain material that will be used later on for mountains
    var terrain = new BABYLON.TerrainMaterial("terrain", scene); 
    terrain.specularColor = new BABYLON.Color3(0.73, 0.56, 0.41);
    terrain.specularPower = 50; 

    terrain.mixTexture = new BABYLON.Texture("textures/paradis_island1.png", scene); 

    //used for heat map that creates height of terrain
    terrain.diffuseTexture1 = new BABYLON.Texture("textures/rock.png", scene); 
    terrain.diffuseTexture2 = new BABYLON.Texture("textures/dirt.jpg", scene); 
    terrain.diffuseTexture3 = new BABYLON.Texture("textures/grass.jpg", scene); 

    terrain.diffuseTexture1.uScale = terrain.diffuseTexture1.vScale = 5;
    terrain.diffuseTexture2.uScale = terrain.diffuseTexture2.vScale = 5;
    terrain.diffuseTexture3.uScale = terrain.diffuseTexture3.vScale = 5;

    // Add and manipulate meshes in the scene
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/paradis_island3.png", 100, 100, 100, 0, 10, scene, false);
    ground.position.y = -1; 
    ground.material = terrain; 

    //creates sky background
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

    //creates ocean
    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 2048, 2048, 16, scene, false);
	var water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(512, 512));
	water.backFaceCulling = true;
	water.bumpTexture = new BABYLON.Texture("textures/water_bump.jpg", scene);
	water.windForce = -10;
	water.waveHeight = 1.7;
	water.bumpHeight = 0.1;
	water.windDirection = new BABYLON.Vector2(1, 1);
	water.waterColor = new BABYLON.Color3(0, 0, 250 / 255);
	water.colorBlendFactor = 0.0;
	water.addToRenderList(sky);
    waterMesh.material = water;
    waterMesh.position.y = -13; 

    //utilized for GUI purposes in Babylon
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    //used to get character data
    var characterButton = BABYLON.GUI.Button.CreateSimpleButton("character", "Characters");
    characterButton.top = "-250px";
    characterButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT; 
    characterButton.right = "250px;" 
    characterButton.width = "100px"; 
    characterButton.height = "40px";
    characterButton.background = "black";
    characterButton.color = "white";
    advancedTexture.addControl(characterButton); 

    //displays character data in table format 
    var characterTable  = document.getElementById("characterTable");
    characterButton.onPointerClickObservable.add(function () {
        var table = document.createElement("table");

        for( var i = 0; i < aotData.characters.length; i++ ) {

            var chars = aotData.characters[i];
            var row = table.insertRow();
            Object.keys(chars).forEach(function(k) {
              console.log(k);
              var cell = row.insertCell();
              cell.appendChild(document.createTextNode(chars[k]));
            })
          }
          
          document.getElementById('characterTable').appendChild(table);

        document.getElementById('titanTable').appendChild(table);
        if (titanTable.style.display === "none") {
            titanTable.style.display = "block";
        } else {
            titanTable.style.display = "none";
        }
    }); 

    //displays titan data in table format
    var titanButton = BABYLON.GUI.Button.CreateSimpleButton("titan", "Titans");
    titanButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT; 
    titanButton.top = "-300px";
    titanButton.right = "250px;" 
    titanButton.width = "100px"; 
    titanButton.height = "40px";
    titanButton.background = "black";
    titanButton.color = "white";
    advancedTexture.addControl(titanButton); 

    var titanTable  = document.getElementById("titanTable");
    titanButton.onPointerClickObservable.add(function () {
        var table = document.createElement("table");

        for( var i = 0; i < aotData.titans.length; i++ ) {

            var chars = aotData.titans[i];
            var row = table.insertRow();
            Object.keys(chars).forEach(function(k) {
            console.log(k);
            var cell = row.insertCell();
            cell.appendChild(document.createTextNode(chars[k]));
        })
        }
            
        document.getElementById('titanTable').appendChild(table);
        if (titanTable.style.display === "none") {
            titanTable.style.display = "block";
        } else {
            titanTable.style.display = "none";
        }
        
    
    }); 

    //different colors for district orbs
    var material = new BABYLON.StandardMaterial(scene);
    material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

    //each district labeled differently. Click on each orb to see information on the districts
    var shiganshina = BABYLON.MeshBuilder.CreateSphere("shiganshina", {}); 
    shiganshina.material = material;
    shiganshina.position.y = 10;
    shiganshina.position.z = -15;
    var SAshowing = false; 
    shiganshina.actionManager = new BABYLON.ActionManager(scene); 
    shiganshina.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var shiganText = new BABYLON.GUI.TextBlock();      
            if (SAshowing == false)
            {
                shiganText.text = "District Name: " + aotData.districts[0].name + 
                "\n Wall " + aotData.districts[0].wall +
                "\n State of Gate: " + aotData.districts[0].isGate +
                "\n Attacks: " + aotData.districts[0].attacks; 
                shiganText.color = "white";
                shiganText.fontSize = 20; 
                shiganText.background = "black"; 
                advancedTexture.addControl(shiganText);
                SAshowing = true; 
                console.log("Showing is " + SAshowing); 
            }
            else
            {
                advancedTexture.removeControl(shiganText);
            }
    })); 

    var trost = BABYLON.MeshBuilder.CreateSphere("trost", {}); 
    trost.position.y = 10;
    trost.position.z = -12;
    trost.material = material;
    var TRshowing = false; 
    trost.actionManager = new BABYLON.ActionManager(scene); 
    trost.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var trostText = new BABYLON.GUI.TextBlock();      
            if (TRshowing == false)
            {
                trostText.text = "District Name: " + aotData.districts[1].name + 
                "\n Wall " + aotData.districts[1].wall +
                "\n State of Gate: " + aotData.districts[1].isGate +
                "\n Attacks: " + aotData.districts[1].attacks; 
                trostText.color = "white";
                trostText.fontSize = 20; 
                trostText.background = "black"; 
                advancedTexture.addControl(trostText);
                TRshowing = true; 
                console.log("Showing is " + TRshowing); 
            }
            else
            {
                advancedTexture.removeControl(trostText);
            }
    })); 

    var ehrmich = BABYLON.MeshBuilder.CreateSphere("ehrmich", {}); 
    ehrmich.position.y = 10;
    ehrmich.position.z = -9;
    ehrmich.material = material;
    var EHshowing = false; 
    ehrmich.actionManager = new BABYLON.ActionManager(scene); 
    ehrmich.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var ehrmichText = new BABYLON.GUI.TextBlock();      
            if (EHshowing == false)
            {
                ehrmichText.text = "District Name: " + aotData.districts[2].name + 
                "\n Wall " + aotData.districts[2].wall +
                "\n State of Gate: " + aotData.districts[2].isGate +
                "\n Attacks: " + aotData.districts[2].attacks; 
                ehrmichText.color = "white";
                ehrmichText.fontSize = 20; 
                ehrmichText.background = "black"; 
                advancedTexture.addControl(ehrmichText);
                EHshowing = true; 
                console.log("Showing is " + EHshowing); 
            }
            else
            {
                advancedTexture.removeControl(ehrmichText);
            }
    })); 

    var quinta = BABYLON.MeshBuilder.CreateSphere("quinta", {}); 
    quinta.position.x = -24;
    quinta.position.y = 10;
    quinta.position.z = 1;
    quinta.material = material;
    var QTshowing = false; 
    quinta.actionManager = new BABYLON.ActionManager(scene); 
    quinta.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var quintaText = new BABYLON.GUI.TextBlock();      
            if (QTshowing == false)
            {
                quintaText.text = "District Name: " + aotData.districts[3].name + 
                "\n Wall " + aotData.districts[3].wall +
                "\n State of Gate: " + aotData.districts[3].isGate +
                "\n Attacks: " + aotData.districts[3].attacks; 
                quintaText.color = "white";
                quintaText.fontSize = 20; 
                quintaText.background = "black"; 
                advancedTexture.addControl(quintaText);
                QTshowing = true; 
                console.log("Showing is " + QTshowing); 
            }
            else
            {
                advancedTexture.removeControl(quintaText);
            }
    })); 

    var klorva = BABYLON.MeshBuilder.CreateSphere("klorva", {}); 
    klorva.position.x = -19;
    klorva.position.y = 10;
    klorva.position.z = 1;
    klorva.material = material;
    var KLshowing = false; 
    klorva.actionManager = new BABYLON.ActionManager(scene); 
    klorva.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var klorvaText = new BABYLON.GUI.TextBlock();      
            if (KLshowing == false)
            {
                klorvaText.text = "District Name: " + aotData.districts[4].name + 
                "\n Wall " + aotData.districts[4].wall +
                "\n State of Gate: " + aotData.districts[4].isGate +
                "\n Attacks: " + aotData.districts[4].attacks; 
                klorvaText.color = "white";
                klorvaText.fontSize = 20; 
                klorvaText.background = "black"; 
                advancedTexture.addControl(klorvaText);
                KLshowing = true; 
                console.log("Showing is " + KLshowing); 
            }
            else
            {
                advancedTexture.removeControl(klorvaText);
            }
    })); 

    var yarckel = BABYLON.MeshBuilder.CreateSphere("yarckel", {}); 
    yarckel.position.x = -13;
    yarckel.position.y = 10;
    yarckel.position.z = 1;
    yarckel.material = material;
    var YKshowing = false; 
    yarckel.actionManager = new BABYLON.ActionManager(scene); 
    yarckel.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var yarckelText = new BABYLON.GUI.TextBlock();      
            if (YKshowing == false)
            {
                yarckelText.text = "District Name: " + aotData.districts[5].name + 
                "\n Wall " + aotData.districts[5].wall +
                "\n State of Gate: " + aotData.districts[5].isGate +
                "\n Attacks: " + aotData.districts[5].attacks; 
                yarckelText.color = "white";
                yarckelText.fontSize = 20; 
                yarckelText.background = "black"; 
                advancedTexture.addControl(yarckelText);
                YKshowing = true; 
                console.log("Showing is " + QTshowing); 
            }
            else
            {
                advancedTexture.removeControl(yarckelText);
            }
    })); 

    var holst = BABYLON.MeshBuilder.CreateSphere("holst", {}); 
    holst.position.x = 23;
    holst.position.y = 10;
    holst.position.z = 1;
    holst.material = material;
    var HSshowing = false; 
    holst.actionManager = new BABYLON.ActionManager(scene); 
    holst.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var holstText = new BABYLON.GUI.TextBlock();      
            if (HSshowing == false)
            {
                holstText.text = "District Name: " + aotData.districts[6].name + 
                "\n Wall " + aotData.districts[6].wall +
                "\n State of Gate: " + aotData.districts[6].isGate +
                "\n Attacks: " + aotData.districts[6].attacks; 
                holstText.color = "white";
                holstText.fontSize = 20; 
                holstText.background = "black"; 
                advancedTexture.addControl(holstText);
                HSshowing = true; 
                console.log("Showing is " + QTshowing); 
            }
            else
            {
                advancedTexture.removeControl(holstText);
            }
    })); 

    var karanes = BABYLON.MeshBuilder.CreateSphere("karanes", {}); 
    karanes.position.x = 18;
    karanes.position.y = 10;
    karanes.position.z = 1;
    karanes.material = material;
    var KSshowing = false; 
    karanes.actionManager = new BABYLON.ActionManager(scene); 
    karanes.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var karanesText = new BABYLON.GUI.TextBlock();      
            if (KSshowing == false)
            {
                karanesText.text = "District Name: " + aotData.districts[7].name + 
                "\n Wall " + aotData.districts[7].wall +
                "\n State of Gate: " + aotData.districts[7].isGate +
                "\n Attacks: " + aotData.districts[7].attacks; 
                karanesText.color = "white";
                karanesText.fontSize = 20; 
                karanesText.background = "black"; 
                advancedTexture.addControl(karanesText);
                KSshowing = true; 
                console.log("Showing is " + KSshowing); 
            }
            else
            {
                advancedTexture.removeControl(karanesText);
            }
    })); 

    var stohess = BABYLON.MeshBuilder.CreateSphere("stohess", {}); 
    stohess.position.x = 12;
    stohess.position.y = 10;
    stohess.position.z = 1;
    stohess.material = material;
    var STshowing = false;  
    stohess.actionManager = new BABYLON.ActionManager(scene); 
    stohess.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var stohessText = new BABYLON.GUI.TextBlock();      
            if (STshowing == false)
            {
                stohessText.text = "District Name: " + aotData.districts[8].name + 
                "\n Wall " + aotData.districts[8].wall +
                "\n State of Gate: " + aotData.districts[8].isGate +
                "\n Attacks: " + aotData.districts[8].attacks; 
                stohessText.color = "white";
                stohessText.fontSize = 20; 
                stohessText.background = "black"; 
                advancedTexture.addControl(stohessText);
                STshowing = true; 
                console.log("Showing is " + STshowing); 
            }
            else
            {
                advancedTexture.removeControl(stohessText);
            }
    })); 


    var unknown = BABYLON.MeshBuilder.CreateSphere("unknown", {}); 
    unknown.position.x = 0;
    unknown.position.y = 10;
    unknown.position.z = 20;
    unknown.material = material;
    var UKshowing = false; 
    unknown.actionManager = new BABYLON.ActionManager(scene); 
    unknown.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var unknownText = new BABYLON.GUI.TextBlock();      
            if (UKshowing == false)
            {
                unknownText.text = "District Name: " + aotData.districts[9].name + 
                "\n Wall " + aotData.districts[9].wall +
                "\n State of Gate: " + aotData.districts[9].isGate +
                "\n Attacks: " + aotData.districts[9].attacks; 
                unknownText.color = "white";
                unknownText.fontSize = 20; 
                unknownText.background = "black"; 
                advancedTexture.addControl(unknownText);
                UKshowing = true; 
                console.log("Showing is " + UKshowing); 
            }
            else
            {
                advancedTexture.removeControl(unknownText);
            }
    })); 

    var utopia = BABYLON.MeshBuilder.CreateSphere("utopia", {}); 
    utopia.position.x = 0;
    utopia.position.y = 10;
    utopia.position.z = 15;
    utopia.material = material;
    var UTshowing = false; 
    utopia.actionManager = new BABYLON.ActionManager(scene); 
    utopia.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var utopiaText = new BABYLON.GUI.TextBlock();      
            if (UTshowing == false)
            {
                utopiaText.text = "District Name: " + aotData.districts[10].name + 
                "\n Wall " + aotData.districts[10].wall +
                "\n State of Gate: " + aotData.districts[10].isGate +
                "\n Attacks: " + aotData.districts[10].attacks; 
                utopiaText.color = "white";
                utopiaText.fontSize = 20; 
                utopiaText.background = "black"; 
                advancedTexture.addControl(utopiaText);
                UTshowing = true; 
                console.log("Showing is " + UTshowing); 
            }
            else
            {
                advancedTexture.removeControl(utopiaText);
            }
    })); 

    var orvud = BABYLON.MeshBuilder.CreateSphere("orvud", {}); 
    orvud.position.x = 0;
    orvud.position.y = 10;
    orvud.position.z = 10;
    orvud.material = material;
    var OVshowing = false; 
    orvud.actionManager = new BABYLON.ActionManager(scene); 
    orvud.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            var orvudText = new BABYLON.GUI.TextBlock();      
            if (OVshowing == false)
            {
                orvudText.text = "District Name: " + aotData.districts[11].name + 
                "\n Wall " + aotData.districts[11].wall +
                "\n State of Gate: " + aotData.districts[11].isGate +
                "\n Attacks: " + aotData.districts[11].attacks; 
                orvudText.color = "white";
                orvudText.fontSize = 20; 
                orvudText.background = "black"; 
                advancedTexture.addControl(orvudText);
                OVshowing = true; 
                console.log("Showing is " + OVshowing); 
            }
            else
            {
                advancedTexture.removeControl(orvudText);
            }
    })); 


    return scene;
};

var scene = createScene(); 

engine.runRenderLoop(function ()
{
    scene.render(); 
}); 