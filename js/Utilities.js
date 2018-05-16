/////////////// OTHERS ///////////////

      // for transforming coords to grid and grid to coords
    function coordToGrid(x){ return Math.floor((x+Math.floor(currentLevel.blockSize/2))/currentLevel.blockSize); }
    function gridToCoord(x){ return x*currentLevel.blockSize; }

      // for checking whether the player should fall or not
    function gridOutOfBounds(pgX, pgY) {
      return pgX < 0 || pgX >= currentLevel.size.x || pgY < 0 || pgY >= currentLevel.size.y;
    }

    function getMaterialFromTextures(textureName) {
      var material = new THREE.MeshPhongMaterial( {
        map: texturesMap[textureName + "_map"],
        aoMap: texturesMap[textureName + "_aoMap"],
        displacementMap: texturesMap[textureName + "_displacementMap"],
        displacementScale: 0.2,
        normalMap: texturesMap[textureName + "_normalMap"],
      } );
      return material;
    }

    function dressPlayer(textureName) {
      playerMaterial = getMaterialFromTextures(textureName);
      player.material = playerMaterial;
    }

    function dressObject(obj, textureName) {
      obj.material = getMaterialFromTextures(textureName);
    }

    function drawLine(group, pos) {
      var mat = new THREE.MeshNormalMaterial();
      var geo = new THREE.BoxGeometry(2, 0.5, 0.5);
      var mes = new THREE.Mesh( geo, mat );
      toDispose.push(mat);
      toDispose.push(geo);
      mes.position.copy(pos);
      console.log(mes.position);
      levelNumberGroups[group].add(mes);
    }

    function drawNumbersLevel0() {
      for (i = 1; i <= 4; i++) levelNumberGroups.push(new THREE.Group());
      drawLine(1, new THREE.Vector3(0, 0, 0), 1);
      levelNumberGroups[1].position.copy(new THREE.Vector3(12, 4, 1));
      levelNumberGroups[1].rotation.z = Math.PI/2;
      levelNumberGroups[1].rotation.x = Math.PI/2;

      drawLine(2, new THREE.Vector3(0, -0.5, 0), 1);
      drawLine(2, new THREE.Vector3(0, 0.5, 0), 1);
      levelNumberGroups[2].position.copy(new THREE.Vector3(12, 36, 1));
      levelNumberGroups[2].rotation.z = Math.PI/2;
      levelNumberGroups[2].rotation.x = Math.PI/2;

      drawLine(3, new THREE.Vector3(0, -1, 0), 1);
      drawLine(3, new THREE.Vector3(0, 0, 0), 1);
      drawLine(3, new THREE.Vector3(0, 1, 0), 1);
      levelNumberGroups[3].position.copy(new THREE.Vector3(28, 20, 1));
      levelNumberGroups[3].rotation.y = Math.PI/2;
      levelNumberGroups.forEach(function(x){
        scene.add(x);
      });
    }