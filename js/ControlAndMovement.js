/////////////// CONTROLS & MOVEMENT ///////////////

      // for smooth movement
    function playerOverdueMovements() {
      if (playerYAcc > eps) {
        player.position.y += playerYAcc;
        player.rotation.x -= playerYAcc;
        camera.position.y += playerYAcc;
        playerYAcc -= playerYAcc/50;
      }
      else if (playerYAcc < -eps) {
        player.position.y += playerYAcc;
        player.rotation.x -= playerYAcc;
        camera.position.y += playerYAcc;
        playerYAcc -= playerYAcc/50;
      }
      else {
        playerYAcc = 0;
      }
      if (playerXAcc > eps) {
        player.position.x -= playerXAcc;
        player.rotation.y -= playerXAcc;
        camera.position.x -= playerXAcc;
        playerXAcc -= playerXAcc/50;
      } else if (playerXAcc < -eps) {
        player.position.x -= playerXAcc;
        player.rotation.y -= playerXAcc;
        camera.position.x -= playerXAcc;
        playerXAcc -= playerXAcc/50;
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
      if (controlsActive && keyMap[69]) { // E
       if (rotateCamera+cameraRotateSpeed>Math.PI)
         rotateCamera = rotateCamera - 2*Math.PI + cameraRotateSpeed;
       else
          rotateCamera = rotateCamera + cameraRotateSpeed;
        camera.position.x = player.position.x + 14 * Math.cos( rotateCamera );
        camera.position.y = player.position.y + 14 * Math.sin( rotateCamera );
        cameraLookPlayer();
      }
      if (controlsActive && keyMap[81]) { // Q
       if (rotateCamera-cameraRotateSpeed<-Math.PI)
         rotateCamera = rotateCamera + 2*Math.PI - cameraRotateSpeed;
       else
          rotateCamera = rotateCamera - cameraRotateSpeed;
        camera.position.x = player.position.x + 14 * Math.cos( rotateCamera );
        camera.position.y = player.position.y + 14 * Math.sin( rotateCamera );
        cameraLookPlayer();
      }
      if (controlsActive && keyMap[87]) { // W
        player.position.x += playerXSpeed;
        playerXAcc -= playerXSpeed/2;
        player.rotation.y += playerXSpeed;
        camera.position.x += playerXSpeed;
      }
      if (controlsActive && keyMap[83]) { // S
        player.position.x -= playerXSpeed;
        playerXAcc += playerXSpeed/2;
        player.rotation.y -= playerXSpeed;
        camera.position.x -= playerXSpeed;
      }
      if (controlsActive && keyMap[65]) { // A
        player.position.y += playerYSpeed;
        playerYAcc += playerYSpeed/2;
        player.rotation.x -= playerYSpeed;
        camera.position.y += playerYSpeed;
      }
      if (controlsActive && keyMap[68]) { // D
        player.position.y -= playerYSpeed;
        playerYAcc -= playerYSpeed/2;
        player.rotation.x += playerYSpeed;
        camera.position.y -= playerYSpeed;
      }
    }
