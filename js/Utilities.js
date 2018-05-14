/////////////// OTHERS ///////////////

      // for transforming coords to grid and grid to coords
    function coordToGrid(x){ return Math.floor((x+Math.floor(currentLevel.blockSize/2))/currentLevel.blockSize); }
    function gridToCoord(x){ return x*currentLevel.blockSize; }

      // for checking whether the player should fall or not
    function gridOutOfBounds(pgX, pgY) {
      return pgX < 0 || pgX > currentLevel.size.x || pgY < 0 || pgY > currentLevel.size.y;
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
