/////////////// OTHERS ///////////////

      // for transforming coords to grid and grid to coords
    function coordToGrid(x){ return Math.floor((x+Math.floor(currentLevel.blockSize/2))/currentLevel.blockSize); }
    function gridToCoord(x){ return x*currentLevel.blockSize; }
    
      // for checking whether the player should fall or not 
    function gridOutOfBounds(pgX, pgY) {
      return pgX < 0 || pgX > currentLevel.size.x || pgY < 0 || pgY > currentLevel.size.y;
    }
