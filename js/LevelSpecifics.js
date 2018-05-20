
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
        if (gameplayStage >= 4) {
          scene.add(showUpLight({"position": new THREE.Vector3(64, 20, 3)}, new THREE.Vector3(0, 0, 0), 0xffffff));
          scene.add(showUpLight({"position": new THREE.Vector3(64, 20, 3)}, new THREE.Vector3(0, 0, 0), 0xffffff));
          scene.add(showUpLight({"position": new THREE.Vector3(64, 20, 3)}, new THREE.Vector3(0, 0, 0), 0xffffff));
          scene.add(showUpLight({"position": new THREE.Vector3(64, 20, 3)}, new THREE.Vector3(0, 0, 0), 0xffffff));
          scene.add(showUpLight({"position": new THREE.Vector3(64, 20, 3)}, new THREE.Vector3(0, 0, 0), 0xff0000));
          scene.add(showUpLight({"position": new THREE.Vector3(64, 20, 3)}, new THREE.Vector3(0, 0, 0), 0x00ff00));
          scene.add(showUpLight({"position": new THREE.Vector3(64, 20, 3)}, new THREE.Vector3(0, 0, 0), 0x0000ff));
        }
      }
      else if (level == 1) {
        setupSkyBox("autumn", "png");
        lightColor = 0xccddcc;
        lightIntensity = 110;
        lightDistanceFromPlayer = 25;
        specularLight = 0x111511;

        if (dificulty == "easy" || extraHints == true) {        
            // hint
          var loader = new THREE.FontLoader();
          var font = loader.parse(loadedFonts["gentilis_regular.typeface"]);
          var mat = getMaterialFromTextures("sand");
          toDispose.push(mat);
          addTextOnScreen("og", new THREE.Vector3(-20, 26, 8), 10, font, mat, mat, 4, 0.8, true);
          scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, -3, -3), 0xccd6cc));
          scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, -3, 3), 0xccd6cc));
          scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, 3, -3), 0xccd6cc));
          scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, 3, 3), 0xccd6cc));
        }
      }
      else if (level == 2) {
        setupSkyBox("sahara", "png");
        lightColor = 0xffffcc;
        lightIntensity = 250;
        lightDistanceFromPlayer = 35;
        specularLight = 0x333322;

          // hint
        var loader = new THREE.FontLoader();
        var font = loader.parse(loadedFonts["gentilis_regular.typeface"]);
        var mat = getMaterialFromTextures("sand");
        toDispose.push(mat);
        addTextOnScreen("3R", new THREE.Vector3(-20, 26, 8), 10, font, mat, mat, 4, 0.8, true);
        if (dificulty == "easy" || extraHints == true) {        
          scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, -2.5, -2.5), 0xffff00));
          scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, -2.5, 2.5), 0xffff00));
          scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, 2.5, -2.5), 0xffff00));
          scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, 2.5, 2.5), 0xffff00));
        }
      }
      else if (level == 3) {
        setupSkyBox("winter", "png");
        lightColor = 0xffffff;
        lightIntensity = 300;
        lightDistanceFromPlayer = 35;
        specularLight = 0x333333;

        // hint
        var loader = new THREE.FontLoader();
        var font = loader.parse(loadedFonts["gentilis_regular.typeface"]);
        if (!playerGotHintFor3) {
          var mat = getMaterialFromTextures("sand");
          toDispose.push(mat);
          addTextOnScreen("5L", new THREE.Vector3(-20, 26, 8), 10, font, mat, mat, 4, 0.8, true);
          if (dificulty == "easy" || extraHints == true) {
            scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, -2.5, -2.5), 0xffff00));
            scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, -2.5, 2.5), 0xffff00));
            scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, 2.5, -2.5), 0xffff00));
            scene.add(showUpLight({"position": new THREE.Vector3(-16, 20, 12)}, new THREE.Vector3(0, 2.5, 2.5), 0xffff00));
          }
        }
        else {
          var mat = getMaterialFromTextures("snow");
          toDispose.push(mat);
          addTextOnScreen("pi", new THREE.Vector3(-20, 26, 8), 10, font, mat, mat, 4, 0.8, true);
        }
      }
      else if (level == 4) {
        console.log("You win.");
        setupSkyBox("volcano", "png");
        lightColor = 0xffffff;
        lightIntensity = 300;
        lightDistanceFromPlayer = 35;
        specularLight = 0x333333;

          // shaders work
        var noiseTexture = texturesMap["cloud"];
        noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping; 
          
          // lava
        var lavaTexture = texturesMap["lava"];
        lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping; 
        
        this.customUniforms = {
          baseTexture: 	{ type: "t", value: lavaTexture },
          baseSpeed: 		{ type: "f", value: 0.05 },
          noiseTexture: 	{ type: "t", value: noiseTexture },
          noiseScale:		{ type: "f", value: 0.5337 },
          alpha: 			{ type: "f", value: 1.0 },
          time: 			{ type: "f", value: 1.0 }
        };
        
        var customMaterial = new THREE.ShaderMaterial( {
          uniforms: customUniforms,
          vertexShader: document.getElementById('vertexShader').textContent,
          fragmentShader: document.getElementById('fragmentShader').textContent
        });
        customMaterial.side = THREE.DoubleSide;

         // water
        var waterTexture = texturesMap["water"];
        waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping; 
        
        this.customUniforms2 = {
          baseTexture: 	{ type: "t", value: waterTexture },
          baseSpeed: 		{ type: "f", value: 1.15 },
          noiseTexture: 	{ type: "t", value: noiseTexture },
          noiseScale:		{ type: "f", value: 0.2 },
          alpha: 			{ type: "f", value: 0.8 },
          time: 			{ type: "f", value: 1.0 }
        };

        var customMaterial2 = new THREE.ShaderMaterial({
          uniforms: customUniforms2,
          vertexShader: document.getElementById('vertexShader').textContent,
          fragmentShader: document.getElementById('fragmentShader').textContent
        });
        customMaterial2.side = THREE.DoubleSide;
        customMaterial2.transparent = true;

        toDispose.push(customMaterial);
        toDispose.push(customMaterial2);
        level4Materials["lava"] = customMaterial;
        level4Materials["water"] = customMaterial2;

          // 3d text on screen
        var loader = new THREE.FontLoader();
        var font = loader.parse(loadedFonts["gentilis_bold.typeface"]);
        addTextOnScreen("You Win!", new THREE.Vector3(30, 47, 8), 10, font, customMaterial, customMaterial2, 4, 0.8, true);
        addTextOnScreen("c:", new THREE.Vector3(30, 24, -1), 10, font, customMaterial, customMaterial2, 4, 0.8, true);

         // 17.
         addTextOnScreen("17", new THREE.Vector3(-20, 24, 8), 5, font, customMaterial, customMaterial2, 1, 0.8, false);  
         addTextOnScreen("<3", new THREE.Vector3(-20, 24, 2), 5, font, customMaterial, customMaterial2, 1, 0.8, false);
      }
    }
