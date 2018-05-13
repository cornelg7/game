/////////////// LOADING RESOURCES AND INITIALIZING FOR THE FIRST TIME ///////////////

      // loads everything, creates world and calls init(0)
    function firstInit() {
      loadEverything().then(function(response){
        console.log("Loaded everything.");
        createWorld();
        return "Created world.";
      }).then(function(response){
        console.log(response);
        init(0);
      });
    }

      // creating resources that are reused each time player dies  
    function createWorld() {
      setupCamera();
      setupScene();
      setupRenderer();
      playerGeometry = new THREE.SphereGeometry( 2, 32, 32 );
    }

      // loads all levels and textures
    function loadEverything() {
      return loadAllLevels(numberOfLevels-1).then(function (response) {
        return new THREE.TextureLoader().load( "res/tree.png" );
      }).then(function(response){
        playerMaterial = new THREE.MeshBasicMaterial( { map: response } );
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
    // var ambient = new THREE.AmbientLight( 0x444444 );
    // scene.add( ambient );
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