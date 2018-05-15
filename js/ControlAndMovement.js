/////////////// CONTROLS & MOVEMENT ///////////////

    function overdueMovements() {
      playerOverdueMovements();
      cameraOverdueMovements();
    }

    function cameraOverdueMovements() {
      if (cameraRotateAcc > eps) {
        rotateCamera = (rotateCamera + cameraRotateAcc)%(2*Math.PI);
        camera.position.x = player.position.x + 14 * Math.cos( rotateCamera - Math.PI);
        camera.position.y = player.position.y + 14 * Math.sin( rotateCamera - Math.PI);
        cameraRotateAcc -= cameraRotateAcc/20;
        cameraLookPlayer();
      }
      else if (cameraRotateAcc < -eps) {
        rotateCamera = (rotateCamera + cameraRotateAcc)%(2*Math.PI);
        camera.position.x = player.position.x + 14 * Math.cos( rotateCamera - Math.PI);
        camera.position.y = player.position.y + 14 * Math.sin( rotateCamera - Math.PI);
        cameraRotateAcc -= cameraRotateAcc/20;
        cameraLookPlayer();
      }
      else {
        cameraRotateAcc = 0;
      }
    }

      // for smooth movement
    function playerOverdueMovements() {
      if (playerYAcc > eps) {
        player.position.y += playerYAcc;
        player.rotation.x -= playerYAcc;
        camera.position.y += playerYAcc;
        playerYAcc -= playerYAcc/Math.abs(55*Math.pow(playerWeight, -0.75));
      }
      else if (playerYAcc < -eps) {
        player.position.y += playerYAcc;
        player.rotation.x -= playerYAcc;
        camera.position.y += playerYAcc;
        playerYAcc -= playerYAcc/Math.abs(55*Math.pow(playerWeight, -0.75));
      }
      else {
        playerYAcc = 0;
      }
      if (playerXAcc > eps) {
        player.position.x -= playerXAcc;
        player.rotation.y -= playerXAcc;
        camera.position.x -= playerXAcc;
        playerXAcc -= playerXAcc/Math.abs(55*Math.pow(playerWeight, -0.75));
      } else if (playerXAcc < -eps) {
        player.position.x -= playerXAcc;
        player.rotation.y -= playerXAcc;
        camera.position.x -= playerXAcc;
        playerXAcc -= playerXAcc/Math.abs(55*Math.pow(playerWeight, -0.75));
      }
      else {
        playerXAcc = 0;
      }
    }

      // keyboard events
    var keyMap = {};
    onkeydown = onkeyup = function(e){
      if (controlsActive)
        keyMap[e.keyCode] = e.type == 'keydown';

      if (texturesLoaded && controlsActive && keyMap[88]) { // X
        dressPlayer("cobble");
        terrainGroup.children.forEach(function(x){
          dressObject(x, "stone");
        });
      }
      if (controlsActive && keyMap[81]) { // Q
        rotateCamera = (rotateCamera + cameraRotateSpeed)%(2*Math.PI);
        camera.position.x = player.position.x + 14 * Math.cos( rotateCamera - Math.PI);
        camera.position.y = player.position.y + 14 * Math.sin( rotateCamera - Math.PI);
        cameraRotateAcc += cameraRotateSpeed/2;
        cameraLookPlayer();
      }
      if (controlsActive && keyMap[69]) { // E
        rotateCamera = (rotateCamera - cameraRotateSpeed)%(2*Math.PI);
        camera.position.x = player.position.x + 14 * Math.cos( rotateCamera - Math.PI);
        camera.position.y = player.position.y + 14 * Math.sin( rotateCamera - Math.PI);
        cameraRotateAcc -= cameraRotateSpeed/2;
        cameraLookPlayer();
      }
      if (controlsActive && keyMap[87]) { // W
        player.position.x += playerXSpeed;
        playerXAcc -= playerXSpeed/(playerWeight);
        player.rotation.y += playerXSpeed;
        camera.position.x += playerXSpeed;
      }
      if (controlsActive && keyMap[83]) { // S
        player.position.x -= playerXSpeed;
        playerXAcc += playerXSpeed/(playerWeight);
        player.rotation.y -= playerXSpeed;
        camera.position.x -= playerXSpeed;
      }
      if (controlsActive && keyMap[65]) { // A
        player.position.y += playerYSpeed;
        playerYAcc += playerYSpeed/(playerWeight);
        player.rotation.x -= playerYSpeed;
        camera.position.y += playerYSpeed;
      }
      if (controlsActive && keyMap[68]) { // D
        player.position.y -= playerYSpeed;
        playerYAcc -= playerYSpeed/(playerWeight);
        player.rotation.x += playerYSpeed;
        camera.position.y -= playerYSpeed;
      }
    }
