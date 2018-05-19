/////////////// LOADING RESOURCES AND INITIALIZING FOR THE FIRST TIME ///////////////

      // loads everything, creates world and calls init(0)
    function firstInit() {
      console.log("Waiting for essential stuff...");
      loadEverythingEssential().then(function(response){
        console.log("Loaded everything essential.");
        everythingLoaded = false;
        createWorld();
        return "Created world.";
      }).then(function(response){
        console.log(response);
        currentLevel = jsonLevels[0];
        loadEverythingElse();
        tutorialMessage();
        init(0);
        animate(); // start animating
      });
    }

      // loads things not essential for level 0
    function loadEverythingElse() {
      var texToLoad;
      loadAllLevels(numberOfLevels-1).then(function(response){
        texToLoad = formArrayToLoadSkyboxTextures("autumn", "png"); // level 1
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadSkyboxTextures("sahara", "png"); // level 2
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadSkyboxTextures("winter", "png"); // level 3
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadSkyboxTextures("volcano", "png"); // level 4
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) { // load for shaders from lv4
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = [{}, {}, {}];
        texToLoad[0]["name"] = "cloud";
        texToLoad[0]["url"] = "res/shaders/cloud.png";
        texToLoad[1]["name"] = "lava";
        texToLoad[1]["url"] = "res/shaders/lava.jpg";
        texToLoad[2]["name"] = "water";
        texToLoad[2]["url"] = "res/shaders/water.jpg";
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        return loadFont("gentilis_bold.typeface");
      }).then(function(response){
        loadedFonts["gentilis_bold.typeface"] = response;
        texturesLoaded = true;
        everythingLoaded = true;
        console.log("Loaded everything else.");
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

      // loads the font (font); returns a promise
    function loadFont(name) {
      var s = "res/fonts/" + name + ".json";
      return fetch( s ).then( function( response ) {
        return response.json();
      }).catch( function( err ) {
        console.log("couldn't load level " + level + " ; " + err);
      });
    }

      // forms an array with texture urls
    function formArrayToLoadTextures(name, term) {
      var toR = [];
      var len = 3; for (i = 0; i < len; i++) toR.push({});
      toR[0]["name"] = name + "_aoMap";
      toR[0]["url"] = "res/" + name + "/" + name + "_aoMap." + term;
      toR[1]["name"] = name + "_map";
      toR[1]["url"] = "res/" + name + "/" + name + "_map." + term;
      toR[2]["name"] = name + "_normalMap";
      toR[2]["url"] = "res/" + name + "/" + name + "_normalMap." + term;
      // toR[3]["name"] = name + "_displacementMap";
      // toR[3]["url"] = "res/" + name + "/" + name + "_displacementMap." + term
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
      setupRenderer();
      addCoordsToLevelTransport();
      playerGeometry = new THREE.SphereGeometry( 2, 32, 32 );
    }

      // loads all levels and textures that are needed for level0
    function loadEverythingEssential() {
      var texToLoad;
      return loadLevel(0).then(function (response) {
        texToLoad = formArrayToLoadTextures("metal", "jpg");    // for lv0
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadSkyboxTextures("nebula", "png"); // for lv0
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadTextures("stone", "jpg");     // for lv1
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadTextures("sand", "png");      // for lv2
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadTextures("ice", "png");      // for lv3
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadTextures("snow", "png");      // for lv3
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        return loadFont("gentilis_regular.typeface");   // font
      }).then(function(response){
        loadedFonts["gentilis_regular.typeface"] = response;
      });
    }

      // loads all levels; to be called with parameter (numberOfLevels-1); returns a promise
    function loadAllLevels(curr) {
      if (curr == 1) {
        // console.log("Loading levels...");
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

        // music
      var listener = new THREE.AudioListener();
      camera.add( listener );

      var sound = new THREE.Audio( listener );

      var audioLoader = new THREE.AudioLoader();
      audioLoader.load('res/sounds/Perspectives.mp3', function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
      });
    }

      // light
    //function setupLight() {
      // aboveLight = new THREE.Group();
      // var l = new THREE.PointLight(0xffaa22, 1, lightIntensity);
      // var aux = new THREE.BoxGeometry(1, 1, 1);
      // var aux2 = new THREE.MeshBasicMaterial({color: 0xff0000});
      // var aux3 = new THREE.Mesh(aux, aux2);
      // aboveLight.add(l);
      // aboveLight.add(aux3);
     // aboveLight = new THREE.PointLight(lightColor, 1, lightIntensity);
     // scene.add(aboveLight);
    //}

      // one time only set up renderer
    function setupRenderer() {
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.domElement.id = "myCanvas";
      document.body.appendChild(renderer.domElement);
    }

      // auto resize
    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
