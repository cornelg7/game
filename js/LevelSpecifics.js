
    function levelSpecificsInit(level) {
      if (level == 0) {
        drawNumbersLevel0();
        setupSkyBox("nebula", "png");
        lightColor = 0xdd5555;
        specularLight = 0x090101;
        lightIntensity = 30;
        lightDistanceFromPlayer = 5;
        levelNumberGroups.forEach(function(x){ // adding show up lights above numbers
          scene.add(showUpLight(x, new THREE.Vector3(1, 1, 3)));
          scene.add(showUpLight(x, new THREE.Vector3(1, -1, 3)));
          scene.add(showUpLight(x, new THREE.Vector3(-1, 1, 3)));
          scene.add(showUpLight(x, new THREE.Vector3(-1, -1, 3)));
          scene.add(showUpLight(x, new THREE.Vector3(0, 0, -1)));
        });
      }
      else if (level == 1) {
        setupSkyBox("autumn", "png");
        lightColor = 0xffffff;
        lightIntensity = 50;
        specularLight = 0x222222;
      }
    }
