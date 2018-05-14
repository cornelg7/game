    // essential
    var camera, scene, renderer;
    var time;
    var controlsActive = false;
    var inGame = false;
    var toDispose = [];

    // for levels
    var numberOfLevels = 4;
    var jsonLevels = []; // jsons
    var currentLevel; // json
    var terrainGroup;

    // player
    var player;
    var playerGeometry;
    var playerMaterial;
    // for movement
    var playerXSpeed = 0.03;
    var playerYSpeed = 0.03;
    var playerXAcc = 0.0;
    var playerYAcc = 0.0;
    var eps = 0.001;
    // for falling
    var playerIsFalling = false;
    var playerZSpeed = 1.0;
    var playerZInitial = 2.5;
    var playerZAcc = 0.1;

    // textures
    var texturesMap = {};
