/////////////// OTHERS ///////////////

    function cameraLookPlayer() {
        // look in front of player
      var toLookAt = new THREE.Vector3(-10*Math.cos(rotateCamera-Math.PI), -10*Math.sin(rotateCamera-Math.PI));
      toLookAt.add(player.position);
      camera.lookAt( toLookAt );
    }

      // grid cords for going from level 0 to 1, 2, 3
    function addCoordsToLevelTransport() {
      levelTransp.push(new THREE.Vector3(0, 0)); // dummy head
      //levelTransp.push(new THREE.Vector3(3, 1));
      levelTransp.push(new THREE.Vector3(0, 4)); // for tests only
      //levelTransp.push(new THREE.Vector3(3, 9));
      levelTransp.push(new THREE.Vector3(0, 6)); // for tests only
      // levelTransp.push(new THREE.Vector3(7, 5));
      levelTransp.push(new THREE.Vector3(-1, 5)); // for tests only
    }

      // for transforming coords to grid and grid to coords
    function coordToGrid(x){ return Math.floor((x+Math.floor(currentLevel.blockSize/2))/currentLevel.blockSize); }
    function gridToCoord(x){ return x*currentLevel.blockSize; }

      // for checking whether the player should fall or not
    function gridOutOfBounds(pgX, pgY) {
      return pgX < 0 || pgX >= currentLevel.size.x || pgY < 0 || pgY >= currentLevel.size.y;
    }

      // function to have margin error for player to fall harder
    function noLandCloseToPlayer(e) {
      var arrayToCheck = [];
      var dd = [{x:-1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1},{x:1,y:0},{x:1,y:-1},{x:0,y:-1}];
      dd.forEach(function(d){
        arrayToCheck.push(new THREE.Vector3(player.position.x + d.x*e, player.position.y + d.y*e));
      })
      return arrayToCheck.every(function(elem){
        var pgX = coordToGrid(elem.x);
        var pgY = coordToGrid(elem.y);
        return playerShouldFall(pgX, pgY);
      });
    }

    function playerShouldFall(pgX, pgY) {
      return gridOutOfBounds(pgX, pgY) || currentLevel.map[pgX][pgY] == 0;
    }

    function getMaterialFromTextures(textureName) {
      if ((textureName + "_map") in texturesMap) {
        var material = new THREE.MeshPhongMaterial( {
          map: texturesMap[textureName + "_map"],
          aoMap: texturesMap[textureName + "_aoMap"],
          // displacementMap: texturesMap[textureName + "_displacementMap"],
          // displacementScale: 0.1,
          normalMap: texturesMap[textureName + "_normalMap"],
          shininess: currentLevel.textureShininess,
          specular: specularLight 
        } );
        return material;
      }
      else {
        return new THREE.MeshNormalMaterial();
      }
    }

    function dressPlayer(textureName) {
      playerMaterial = getMaterialFromTextures(textureName);
      player.material = playerMaterial;
    }

    function dressObject(obj, textureName) {
      obj.material = getMaterialFromTextures(textureName);
    }

    function drawLine(group, pos, material) {
      var mat = material;
      var geo = new THREE.BoxGeometry(2, 0.5, 0.5);
      var mes = new THREE.Mesh( geo, mat );
      toDispose.push(mat);
      toDispose.push(geo);
      mes.position.copy(pos);
      levelNumberGroups[group].add(mes);
    }

    function drawNumbersLevel0() { // @TODO: to change these based on level textures:
      var mat1 = getMaterialFromTextures("cobble");
      var mat2 = getMaterialFromTextures("stone");
      var mat3 = getMaterialFromTextures("metal");

      for (i = 1; i <= 3; i++) levelNumberGroups.push(new THREE.Group());
      drawLine(0, new THREE.Vector3(0, 0, 0), mat1);
      levelNumberGroups[0].position.copy(new THREE.Vector3(12, 4, 1));
      levelNumberGroups[0].rotation.z = Math.PI/2;
      levelNumberGroups[0].rotation.x = Math.PI/2;

      drawLine(1, new THREE.Vector3(0, -0.5, 0), mat2);
      drawLine(1, new THREE.Vector3(0, 0.5, 0), mat2);
      levelNumberGroups[1].position.copy(new THREE.Vector3(12, 36, 1));
      levelNumberGroups[1].rotation.z = Math.PI/2;
      levelNumberGroups[1].rotation.x = Math.PI/2;

      drawLine(2, new THREE.Vector3(0, -1, 0), mat3);
      drawLine(2, new THREE.Vector3(0, 0, 0), mat3);
      drawLine(2, new THREE.Vector3(0, 1, 0), mat3);
      levelNumberGroups[2].position.copy(new THREE.Vector3(28, 20, 1));
      levelNumberGroups[2].rotation.y = Math.PI/2;

      levelNumberGroups.forEach(function(x) {scene.add(x)});
    }

    function showUpLight(x, offset) {
      var l = new THREE.PointLight(0xffffff, 1, 5);
      l.position.copy(x.position);
      l.position.add(offset);
      level0NumberGroupLights.push(l);
      return l;
    }