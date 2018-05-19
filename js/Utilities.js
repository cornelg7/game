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
      levelTransp.push(new THREE.Vector3(3, 1));
      // levelTransp.push(new THREE.Vector3(0, 4)); // for tests only
      levelTransp.push(new THREE.Vector3(3, 9));
      // levelTransp.push(new THREE.Vector3(0, 6)); // for tests only
      levelTransp.push(new THREE.Vector3(7, 5));
      // levelTransp.push(new THREE.Vector3(-1, 5)); // for tests only
      levelTransp.push(new THREE.Vector3(16, 5));
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

    function playerWonLevel(level, pgX, pgY) {
      return level.finish.x == pgX && level.finish.y == pgY;
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
          // transparent: true,
          // opacity: 0.5,
          specular: specularLight
        } );
        return material;
      }
      else if (currentLevel.id == 4) {
        return level4Materials[textureName];
      }
      else {
        return new THREE.MeshNormalMaterial();
      }
    }

    function dressPlayerFromMaterial(mat) {
      playerMaterial = mat;
      player.material = playerMaterial;
    }

    function dressObjectFromMaterial(obj, mat) {
      obj.material = mat;
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
      if (group >= 0 && group <= 2)
        levelNumberGroups[group].add(mes);
      else
        behindNumbersGroup.add(mes);
    }

    function drawNumbersLevel0Behind() {
      var mat = [];
      var color = [];
      for (i = 1; i <= 3; i++) if (canPlayerWinLevel[i]) color[i] = 0xff0000; else color[i] = 0x00ff00;
      for (i = 1; i <= 3; i++) mat[i] = new THREE.MeshPhongMaterial({color: color[i]});
      behindNumbersGroup = new THREE.Group();
      
      drawLine(4, new THREE.Vector3(0, 16, 0), mat[1]);
      drawLine(4, new THREE.Vector3(0, 23.5, 0), mat[2]);
      drawLine(4, new THREE.Vector3(0, 24.5, 0), mat[2]);
      drawLine(4, new THREE.Vector3(0, 19, 0), mat[3]);
      drawLine(4, new THREE.Vector3(0, 20, 0), mat[3]);
      drawLine(4, new THREE.Vector3(0, 21, 0), mat[3]);
      
      behindNumbersGroup.position.copy(new THREE.Vector3(-5, 0, 5));
      behindNumbersGroup.rotation.y = Math.PI/2;
      scene.add(behindNumbersGroup);
    }

    function drawNumbersLevel0() {
      var mat1 = getMaterialFromTextures("stone");
      var mat2 = getMaterialFromTextures("sand");
      var mat3 = getMaterialFromTextures("snow");

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

    function showUpLight(x, offset, colour) {
      var l = new THREE.PointLight(colour, 1, 5);
      l.position.copy(x.position);
      l.position.add(offset);
      level0NumberGroupLights.push(l);
      return l;
    }

    function addTextOnScreen(msg, pos, fontSize, textFont, materialF, materialB, h, bs, be) {
      var materialFront = materialF;
      var materialSide = materialB;
      var materialArray = [ materialFront, materialSide ];
      var textGeom = new THREE.TextGeometry( msg, 
      {
        size: fontSize, height: h, curveSegments: 3,
        font: textFont, style: "normal",
        bevelThickness: 1, bevelSize: bs, bevelEnabled: be,
        material: 0, extrudeMaterial: 1
      });
      var textMesh = new THREE.Mesh(textGeom, materialArray);
      
      toDispose.push(textGeom);
      toDispose.push(materialFront);
      toDispose.push(materialSide);

      textGeom.computeBoundingBox();     
      textMesh.position.copy(pos);
      textMesh.rotation.x = Math.PI/2;
      textMesh.rotation.y = -Math.PI/2;
      
      toRemove.push(textMesh);
      scene.add(textMesh);
    }

    function tutorialMessage() {
      var loader = new THREE.FontLoader();
      var font = loader.parse(loadedFonts["gentilis_regular.typeface"]);
      var mat1 = getMaterialFromTextures("stone");
      var mat2 = getMaterialFromTextures("sand");
      toDispose.push(mat1); toDispose.push(mat2);
      addTextOnScreen("wasd to move", new THREE.Vector3(8, 26, 5), 1.5, font, mat1, mat1, 0.3, 0.01, false);
      addTextOnScreen("qe to rotate", new THREE.Vector3(8, 25, 3), 1.5, font, mat2, mat2, 0.3, 0.01, false);
    }

    function simulateWinLevel(x) {
      if (canPlayerWinLevel[x]) {
        canPlayerWinLevel[x] = false;
        gameplayStage += 1;
      }
    }