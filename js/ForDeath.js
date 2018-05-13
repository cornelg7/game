/////////////// FUNCTIONS CALLED WHEN PLAYER DIES ///////////////

    // cleans canvas and reinitializes it
    function reInit(level) {
      cleanCanvas();
      init(level);
    }

      // clear canvas for reuse, resets variables
    function cleanCanvas() {
      toDispose.forEach(function(e) {e.dispose()}); 
      terrainGroup.children.forEach(function(e) {terrainGroup.remove(e)});
      scene.remove(terrainGroup);
      scene.remove(player);

      playerXAcc = 0;
      playerYAcc = 0;
      playerZSpeed = 1.0;
      playerIsFalling = false;
      controlsActive = false;
      keyMap = {};
      inGame = false;
    }