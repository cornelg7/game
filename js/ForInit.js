/////////////// FUNCTIONS CALLED IN init(level) ///////////////

      // builds level (level)
    function buildLevel(level) {
      console.log("Building level " + level.id);

      terrainGroup = new THREE.Group();
      for (var i = 0; i < level.size.x; i++) {
        for (var j = 0; j < level.size.y; j++) {
          if (level.map[i][j] == 1) {
            var mat = new THREE.MeshNormalMaterial();
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

      // update player each time player dies
    function updatePlayer() {
      playerMaterial = new THREE.MeshPhongMaterial( { map: texturesMap["grass"] } );
      player = new THREE.Mesh(playerGeometry, playerMaterial);

      player.position.x = currentLevel.blockSize * currentLevel.spawn.x;
      player.position.y = currentLevel.blockSize * currentLevel.spawn.y;
      player.position.z = playerZInitial;

      scene.add( player );
    }

      // update camera each time player dies
    function updateCamera() {
      rotateCamera = Math.PI;
      camera.position.x = player.position.x + 14 * Math.cos( rotateCamera );
      camera.position.y = player.position.y + 14 * Math.sin( rotateCamera );
      camera.position.z = 14;
      // camera.rotation.z = 270*Math.PI/180;
      // camera.position.y = player.position.y;
      // camera.position.x = player.position.x - 14;
      cameraLookPlayer();
    }
