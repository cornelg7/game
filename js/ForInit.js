/////////////// FUNCTIONS CALLED IN init(level) ///////////////

      // builds level (level)
    function buildLevel(level) {
      console.log("Building level " + level.id);

      terrainGroup = new THREE.Group();
      for (var i = 0; i < level.size.x; i++) {
        for (var j = 0; j < level.size.y; j++) {
          if (level.map[i][j] == 1) {
            var mat = getMaterialFromTextures(level.terrainTextureName);
            var geo = new THREE.BoxGeometry(level.blockSize, level.blockSize, 1);
            var mes = new THREE.Mesh( geo, mat );
            toDispose.push(mat);
            toDispose.push(geo);
            mes.position.x = level.blockSize*i;
            mes.position.y = level.blockSize*j;
            terrainGroup.add( mes );
          }
        }
      }
      scene.add(terrainGroup);
    }

      // background
    function setupSkyBox(name, term) {
      var imagePrefix = name + "-";
      var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
      var skyGeometry = new THREE.CubeGeometry( 1024, 1024, 1024 );

      var materialArray = [];
      for (var i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
          map: texturesMap[imagePrefix + directions[i]],
          side: THREE.BackSide
        }));
      skyBox = new THREE.Mesh( skyGeometry, materialArray );
      toDispose.push(skyGeometry);
      materialArray.forEach(function(x){toDispose.push(x)});
      skyBox.rotation.x = Math.PI/2;
      scene.add( skyBox );
    }

      // update player each time player dies
    function updatePlayer() {
      playerMaterial = getMaterialFromTextures(currentLevel.playerTextureName);
      player = new THREE.Mesh(playerGeometry, playerMaterial);

      player.position.x = currentLevel.blockSize * currentLevel.spawn.x;
      player.position.y = currentLevel.blockSize * currentLevel.spawn.y;
      player.position.z = playerZInitial;

      scene.add( player );
    }

      // update camera each time player dies
    function updateCamera() {
      if (smoothRotate) cameraRotateSpeed = 0.01; else cameraRotateSpeed = Math.PI/2;
      rotateCamera = 0;
      camera.position.x = player.position.x + 14 * Math.cos( rotateCamera - Math.PI);
      camera.position.y = player.position.y + 14 * Math.sin( rotateCamera - Math.PI);
      camera.position.z = 14;
      // camera.rotation.z = 270*Math.PI/180;
      // camera.position.y = player.position.y;
      // camera.position.x = player.position.x - 14;

      cameraLookPlayer();
    }

    function setupLight() {
      aboveLight = new THREE.PointLight(lightColor, 1, lightIntensity);
      scene.add(aboveLight);
    }

    function updateLight() {
      aboveLight.position.copy(player.position);
      aboveLight.position.z += lightDistanceFromPlayer;
    }
