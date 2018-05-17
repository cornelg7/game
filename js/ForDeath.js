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
      levelNumberGroups.forEach(function(x) {x.children.forEach(function(e) {x.remove(e)})});
      levelNumberGroups.forEach(function(x) {scene.remove(x)});
      scene.remove(terrainGroup);
      scene.remove(player);

      rotateCamera = 0;
      cameraRotateAcc = 0;
      playerXAcc = 0;
      playerYAcc = 0;
      playerZSpeed = 1.0;
      playerIsFalling = false;
      controlsActive = false;
      keyMap = {};
      inGame = false;
    }
