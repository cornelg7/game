/////////////// LOADING RESOURCES AND INITIALIZING FOR THE FIRST TIME ///////////////

      // loads everything, creates world and calls init(0)
    function firstInit() {
      loadEverythingEssential().then(function(response){
        console.log("Loaded everything essential.");
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
      fetch ("res/tree.png").then(function(response){
        texturesMap["tree"] = response;
        texToLoad = formArrayToLoadTextures("cobble", "jpg");
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texToLoad = formArrayToLoadTextures("stone", "jpg");
        return loadTexturesFromArray(texToLoad, texToLoad.length-1);
      }).then(function(response) {
        texturesMap[texToLoad[texToLoad.length-1]["name"]] = response;
        texturesLoaded = true;
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

      // creating resources that are reused each time player dies
    function createWorld() {
      setupCamera();
      setupScene();
      setupLight();
      setupRenderer();
      playerGeometry = new THREE.SphereGeometry( 2, 32, 32 );
    }

      // loads all levels and textures
    function loadEverythingEssential() {
      return loadAllLevels(numberOfLevels-1).then(function (response) {
        return new THREE.TextureLoader().load("res/grass.jpg");
      }).then(function(response){
        texturesMap["grass"] = response;
      });
    }

      // loads all levels; to be called with parameter (numberOfLevels-1); returns a promise
    function loadAllLevels(curr) {
      if (curr == 0)
        return loadLevel(0);
      return loadAllLevels(curr-1).then(function (response) {
        return loadLevel(curr);
      });
    }

      // loads the level numbered (level); returns a promise
    function loadLevel(level) {
      var s = "levels/level" + level.toString() + ".JSON";
      // console.log("loading level " + level + "...")
      return fetch( s ).then( function( response ) {
        return response.json();
      }).then(function(myJson) {
        jsonLevels[level] = myJson;
        // console.log("level " + level + " just loaded");
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
      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
      camera.up = new THREE.Vector3(0,0,1);
    }

          // to be added
    function setupLight() {
      // var ambient = new THREE.AmbientLight(0x404040);
      // scene.add( ambient );

      var light1 = new THREE.DirectionalLight( 0xffffff );
      light1.position.set( 0, 1, 1 ).normalize();
      scene.add(light1);
      var light2 = new THREE.DirectionalLight( 0xffffff );
      light2.position.set( 0, -1, 1 ).normalize();
      scene.add(light2);

      // var directionalLight = new THREE.DirectionalLight( 0xffffff );
			// directionalLight.position.x = Math.random() - 0.5;
			// directionalLight.position.y = Math.random() - 0.5;
			// directionalLight.position.z = Math.random() - 0.5;
			// directionalLight.position.normalize();
			// scene.add( directionalLight );

    // var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    // directionalLight.position.set( 0, 0, 1 ).normalize();
    // scene.add( directionalLight );
    }

      // one time only set up renderer
    function setupRenderer() {
      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setSize( window.innerWidth-20, window.innerHeight-20 );
      renderer.domElement.id = "myCanvas";
      document.body.appendChild(renderer.domElement);
    }
