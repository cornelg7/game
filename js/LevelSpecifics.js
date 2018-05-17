
    function levelSpecificsInit(level) {
      if (level == 0) {
        drawNumbersLevel0();
      }
      else if (level == 1) {
        setupSkyBox("autumn", "png");
        lightColor = 0xffffff;
      }
    }
