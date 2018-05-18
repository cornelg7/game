
    function levelSpecificsInit(level) {
      if (level == 0) {
        drawNumbersLevel0();
        drawNumbersLevel0Behind();
        setupSkyBox("nebula", "png");
        lightColor = 0xdd5555;
        specularLight = 0x090101;
        lightIntensity = 30;
        lightDistanceFromPlayer = 5;
        var colours = [0x99aa99, 0xffff77, 0xeeeeff];
        for (i = 0; i < 3; i ++) {
          scene.add(showUpLight(levelNumberGroups[i], new THREE.Vector3(1, 1, 3), colours[i]));
          scene.add(showUpLight(levelNumberGroups[i], new THREE.Vector3(1, -1, 3), colours[i]));
          scene.add(showUpLight(levelNumberGroups[i], new THREE.Vector3(-1, 1, 3), colours[i]));
          scene.add(showUpLight(levelNumberGroups[i], new THREE.Vector3(-1, -1, 3), colours[i]));
          scene.add(showUpLight(levelNumberGroups[i], new THREE.Vector3(0, 0, -1), colours[i]));
          scene.add(showUpLight(levelNumberGroups[i], new THREE.Vector3(0, 0, 3), colours[i]))
        }
      }
      else if (level == 1) {
        setupSkyBox("autumn", "png");
        lightColor = 0xccddcc;
        lightIntensity = 110;
        lightDistanceFromPlayer = 25;
        specularLight = 0x111511;
      }
      else if (level == 2) {
        setupSkyBox("sahara", "png");
        lightColor = 0xffffcc;
        lightIntensity = 250;
        lightDistanceFromPlayer = 35;
        specularLight = 0x333322;
      }
      else if (level == 3) {
        setupSkyBox("winter", "png");
        lightColor = 0xffffff;
        lightIntensity = 300;
        lightDistanceFromPlayer = 35;
        specularLight = 0x333333;
      }
      else if (level == 4) {
        console.log("You win.");
        setupSkyBox("autumn", "png");
        lightColor = 0xffffff;
        lightIntensity = 300;
        lightDistanceFromPlayer = 35;
        specularLight = 0x333333;
      }
    }
