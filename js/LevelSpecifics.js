
    function levelSpecificsInit(level) {
      if (level == 0) {
        drawNumbersLevel0();
        setupSkyBox("nebula", "png");
        lightColor = 0xdd4444;
        specularLight = 0x090101;
        lightDistanceFromPlayer = 5;
      }
      else if (level == 1) {
        setupSkyBox("autumn", "png");
        lightColor = 0xffffff;
        specularLight = 0x222222;
      }
    }
