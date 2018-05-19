
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
        addTextOnScreen("You Win!", new THREE.Vector3(30, 47, 8), 10, font, customMaterial, customMaterial2);
        addTextOnScreen("c:", new THREE.Vector3(30, 24, -1), 10, font, customMaterial, customMaterial2);
      }
    }
