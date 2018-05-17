/////////////// LOADING RESOURCES AND INITIALIZING FOR THE FIRST TIME ///////////////

      // loads everything, creates world and calls init(0)
    function firstInit() {
      loadEverythingEssential().then(function(response){
        console.log("Loaded everything essential.");
        everythingLoaded = false;
        createWorld();
        return "Created world.";
      }).then(function(response){
        console.log(response);
        loadEverythingElse();
        init(0);
        animate(); // start animating
      });
    }

      // loads things not essential for level 0
    function loadEverythingElse() {
      var texToLoad;
      loadAllLevels(numberOfLevels-1).then(function(response){
        //texturesMap["tree"] = response;
        console.log("LOADED ALL LEVELS");
        texToLoad = formArrayToLoadTextures("cobble", "jpg");
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadTextures("stone", "jpg");
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadSkyboxTextures("autumn", "png");
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texturesLoaded = true;
        everythingLoaded = true;
        console.log("Loaded everything else.")
      });
    }

      // loads all textures in the parameter array
    function loadTexturesFromArray(texturesToLoad, curr) {
      if (curr == 0){
        return fetch(texturesToLoad[curr]["url"]).then(function(response){
          return new THREE.TextureLoader().load(response.url);
        });
      }
      return loadTexturesFromArray(texturesToLoad, curr-1).then(function (response) {
        texturesMap[texturesToLoad[curr-1]["name"]] = response;
        return new THREE.TextureLoader().load(texturesToLoad[curr]["url"]);
      });
    }

      // forms an array with texture urls
    function formArrayToLoadTextures(name, term) {
      var toR = [];
      var len = 4; for (i = 0; i < len; i++) toR.push({});
      toR[0]["name"] = name + "_aoMap";
      toR[0]["url"] = "res/" + name + "/" + name + "_aoMap." + term;
      toR[1]["name"] = name + "_displacementMap";
      toR[1]["url"] = "res/" + name + "/" + name + "_displacementMap." + term
      toR[2]["name"] = name + "_map";
      toR[2]["url"] = "res/" + name + "/" + name + "_map." + term;
      toR[3]["name"] = name + "_normalMap";
      toR[3]["url"] = "res/" + name + "/" + name + "_normalMap." + term;
      return toR;
    }

    function formArrayToLoadSkyboxTextures(name, term) {
      var toR = [];
      var len = 6;
      var imagePrefix = "res/" + name + "/"+ name + "-";
      var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
      var imageSuffix = "." + term;
      directions.forEach(function(x){
        toR.push({"name": (name + "-" + x), "url": (imagePrefix + x + imageSuffix)})
      });
      return toR;
    }

      // creating resources that are reused each time player dies
    function createWorld() {
      setupCamera();
      setupScene();
      setupLight();
      setupRenderer();
      addCoordsToLevelTransport();
      levelSpecificsInit(0);
      playerGeometry = new THREE.SphereGeometry( 2, 32, 32 );
    }

      // loads all levels and textures
    function loadEverythingEssential() {
      return loadLevel(0).then(function (response) {
        return new THREE.TextureLoader().load("res/grass.jpg");
      }).then(function(response){
        texturesMap["grass"] = response;
      });
    }

      // loads all levels; to be called with parameter (numberOfLevels-1); returns a promise
    function loadAllLevels(curr) {
      if (curr == 1) {
        console.log("Loading levels...");
        return loadLevel(1);
      }
      return loadAllLevels(curr-1).then(function (response) {
        return loadLevel(curr);
      });
    }

      // loads the level numbered (level); returns a promise
    function loadLevel(level) {
      var s = "levels/level" + level.toString() + ".JSON";
      //console.log("loading level " + level + "...")
      return fetch( s ).then( function( response ) {
        //console.log("Fetched level " + level);
        return response.json();
      }).then(function(myJson) {
        //console.log("processed .json of " + level);
        jsonLevels[level] = myJson;
        //console.log("level " + level + " just loaded");
      }).catch( function( err ) {
        console.log("couldn't load level " + level + " ; " + err);
      });
    }

      // one time only set up scene
    function setupScene() {
      time = new THREE.Clock(true);
      time.start();
      console.log(time.getElapsedTime() + ": clock started");
      scene = new THREE.Scene();
    }

      // one time only set up camera
    function setupCamera() {
      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1024 );
      camera.up = new THREE.Vector3(0,0,1);
    }

      // light
    function setupLight() {
      // aboveLight = new THREE.Group();
      // var l = new THREE.PointLight(0xffaa22, 1, lightIntensity);
      // var aux = new THREE.BoxGeometry(1, 1, 1);
      // var aux2 = new THREE.MeshBasicMaterial({color: 0xff0000});
      // var aux3 = new THREE.Mesh(aux, aux2);
      // aboveLight.add(l);
      // aboveLight.add(aux3);
      aboveLight = new THREE.PointLight(lightColor, 1, lightIntensity);
      scene.add(aboveLight);
    }

      // one time only set up renderer
    function setupRenderer() {
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setSize( window.innerWidth-20, window.innerHeight-20 );
      renderer.domElement.id = "myCanvas";
      document.body.appendChild(renderer.domElement);
    }
