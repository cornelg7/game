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
        if (rotateCamera + cameraRotateAcc <= 0)
          rotateCamera = rotateCamera + 2*Math.PI + cameraRotateAcc;
        else
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
      if (playerYAcc > eps) { // A
        var moveAlong = new THREE.Vector3(Math.cos(rotateCamera+Math.PI/2), Math.sin(rotateCamera+Math.PI/2), 0);
        moveAlong.multiplyScalar(Math.abs(playerYAcc));
        player.position.add(moveAlong);
        camera.position.add(moveAlong);

        var rotateAlong = new THREE.Vector3(-Math.cos(rotateCamera), 0, 0).normalize();
        player.rotateOnAxis(rotateAlong, Math.abs(playerYAcc));

        playerYAcc -= playerYAcc/Math.abs(55*Math.pow(playerWeight, -0.75));
      }
      else if (playerYAcc < -eps) { // D
        var moveAlong = new THREE.Vector3(Math.cos(rotateCamera+3*Math.PI/2), Math.sin(rotateCamera+3*Math.PI/2), 0);
        moveAlong.multiplyScalar(Math.abs(playerYAcc));
        player.position.add(moveAlong);
        camera.position.add(moveAlong);

        var rotateAlong = new THREE.Vector3(Math.cos(rotateCamera), 0, 0).normalize();
        player.rotateOnAxis(rotateAlong, Math.abs(playerYAcc));

        playerYAcc -= playerYAcc/Math.abs(55*Math.pow(playerWeight, -0.75));
      }
      else {
        playerYAcc = 0;
      }
      if (playerXAcc > eps) { // S
        var moveAlong = new THREE.Vector3(Math.cos(rotateCamera + Math.PI), Math.sin(rotateCamera + Math.PI), 0);
        moveAlong.multiplyScalar(Math.abs(playerXAcc));
        player.position.add(moveAlong);
        camera.position.add(moveAlong);

        var rotateAlong = new THREE.Vector3(0, -Math.cos(rotateCamera), 0).normalize();
        player.rotateOnAxis(rotateAlong, Math.abs(playerXAcc));

        playerXAcc -= playerXAcc/Math.abs(55*Math.pow(playerWeight, -0.75));
      }
      else if (playerXAcc < -eps) { // W
        var moveAlong = new THREE.Vector3(Math.cos(rotateCamera), Math.sin(rotateCamera), 0);
        moveAlong.multiplyScalar(Math.abs(playerXAcc));
        player.position.add(moveAlong);
        camera.position.add(moveAlong);

        var rotateAlong = new THREE.Vector3(0, Math.cos(rotateCamera), 0).normalize();
        player.rotateOnAxis(rotateAlong, Math.abs(playerXAcc));

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
        if (rotateCamera - cameraRotateSpeed <= 0)
          rotateCamera = rotateCamera + 2*Math.PI - cameraRotateSpeed;
        else
          rotateCamera = (rotateCamera - cameraRotateSpeed)%(2*Math.PI);
        camera.position.x = player.position.x + 14 * Math.cos( rotateCamera - Math.PI);
        camera.position.y = player.position.y + 14 * Math.sin( rotateCamera - Math.PI);
        cameraRotateAcc -= cameraRotateSpeed/2;
        cameraLookPlayer();
      }
      if (controlsActive && keyMap[87]) { // W
        var moveAlong = new THREE.Vector3(Math.cos(rotateCamera), Math.sin(rotateCamera), 0);
        moveAlong.multiplyScalar(playerXSpeed);
        player.position.add(moveAlong);
        camera.position.add(moveAlong);

        var rotateAlong = new THREE.Vector3(0, Math.cos(rotateCamera), 0).normalize();
        player.rotateOnAxis(rotateAlong, playerXSpeed);

        playerXAcc -= playerXSpeed/(playerWeight);
      }
      if (controlsActive && keyMap[83]) { // S
        var moveAlong = new THREE.Vector3(Math.cos(rotateCamera + Math.PI), Math.sin(rotateCamera + Math.PI), 0);
        moveAlong.multiplyScalar(playerXSpeed);
        player.position.add(moveAlong);
        camera.position.add(moveAlong);

        var rotateAlong = new THREE.Vector3(0, -Math.cos(rotateCamera), 0).normalize();
        player.rotateOnAxis(rotateAlong, playerXSpeed);

        playerXAcc += playerXSpeed/(playerWeight);
      }
      if (controlsActive && keyMap[65]) { // A
        var moveAlong = new THREE.Vector3(Math.cos(rotateCamera+Math.PI/2), Math.sin(rotateCamera+Math.PI/2), 0);
        moveAlong.multiplyScalar(playerXSpeed);
        player.position.add(moveAlong);
        camera.position.add(moveAlong);

        var rotateAlong = new THREE.Vector3(-Math.cos(rotateCamera), 0, 0).normalize();
        player.rotateOnAxis(rotateAlong, playerXSpeed);

        playerYAcc += playerYSpeed/(playerWeight);
      }
      if (controlsActive && keyMap[68]) { // D
        var moveAlong = new THREE.Vector3(Math.cos(rotateCamera+3*Math.PI/2), Math.sin(rotateCamera+3*Math.PI/2), 0);
        moveAlong.multiplyScalar(playerXSpeed);
        player.position.add(moveAlong);
        camera.position.add(moveAlong);

        var rotateAlong = new THREE.Vector3(Math.cos(rotateCamera), 0 , 0).normalize();
        player.rotateOnAxis(rotateAlong, playerXSpeed);

        playerYAcc -= playerYSpeed/(playerWeight);
      }
    }
