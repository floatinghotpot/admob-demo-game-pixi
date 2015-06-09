// create an array of assets to load
var assetsToLoader = ['asset/logo_small.png', 'asset/PixieSpineData.json', 'asset/Pixie.json', 'asset/iP4_BGtile.jpg', 'asset/iP4_ground.png'];
// create a new loader
loader = new PIXI.AssetLoader(assetsToLoader);
// use callback
loader.onComplete = onAssetsLoaded;
//begin load
loader.load();
// create an new instance of a pixi stage
var stage = new PIXI.Stage(0xFFFFFF, true);
// create a renderer instance
var renderer = new PIXI.autoDetectRenderer(1024, 640);
// set the canvas width and height to fill the screen
renderer.view.style.display = 'block';
renderer.view.style.width = '100%';
renderer.view.style.height = '100%';
    // add render view to DOM
document.body.appendChild(renderer.view);
var postition = 0;
var background;
var background2;

function onAssetsLoaded() {
    // Load sprites and put them on the stage
    background = PIXI.Sprite.fromImage('asset/iP4_BGtile.jpg');
    background2 = PIXI.Sprite.fromImage('asset/iP4_BGtile.jpg');
    stage.addChild(background);
    stage.addChild(background2);
    foreground = PIXI.Sprite.fromImage('asset/iP4_ground.png');
    foreground2 = PIXI.Sprite.fromImage('asset/iP4_ground.png');
    stage.addChild(foreground);
    stage.addChild(foreground2);
    foreground.position.y = foreground2.position.y = 640 - foreground2.height;

    // Create a spine using Spine Runtime
    var pixie = new PIXI.Spine('asset/PixieSpineData.json');
    var scale = 0.3;
    pixie.position.x = 1024 / 3;
    pixie.position.y = 500;
    pixie.scale.x = pixie.scale.y = scale;
    stage.addChild(pixie);
    // Set mixing time between animations
    pixie.stateData.setMixByName('running', 'jump', 0.2);
    pixie.stateData.setMixByName('jump', 'running', 0.4);
    // Clear and reset curren animation to 'running' and loop forever
    pixie.state.setAnimationByName('running', true);

    // bind mouse and touch handler
    stage.mousedown = stage.touchstart = function() {
        // clear and reset current animation to 'jump' and play only once
        pixie.state.setAnimationByName('jump', false);
        // ... followed by looped 'running' animation
        pixie.state.addAnimationByName('running', true);
    };

    // put logo sprite on the stage
    var logo = PIXI.Sprite.fromImage('asset/logo_small.png');
    stage.addChild(logo);
    logo.anchor.x = 1;
    logo.position.x = 1024;
    logo.scale.x = logo.scale.y = 0.5;
    logo.position.y = 640 - 70;
    logo.setInteractive(true);
    logo.buttonMode = true;
    logo.click = logo.tap = function() {
        window.open('https://github.com/GoodBoyDigital/pixi.js', '_blank');
    };

    // Enter game main loop using function `requestAnimFrame` which is a 
    // function alias created by Pixi.js for `requestAnimationFrame`.
    // See https://docs.webplatform.org/wiki/dom/Window/requestAnimationFrame 
    // for detailed information about `requestAnimationFrame` API.
    requestAnimFrame(animate);
}

function animate() {
    // Calculating positions for the sprite
    postition += 10;
    background.position.x = -(postition * 0.6);
    background.position.x %= 1286 * 2;
    if (background.position.x < 0) background.position.x += 1286 * 2;
    background.position.x -= 1286;
    background2.position.x = -(postition * 0.6) + 1286;
    background2.position.x %= 1286 * 2;
    if (background2.position.x < 0) background2.position.x += 1286 * 2;
    background2.position.x -= 1286;
    foreground.position.x = -postition;
    foreground.position.x %= 1286 * 2;
    if (foreground.position.x < 0) foreground.position.x += 1286 * 2;
    foreground.position.x -= 1286;
    foreground2.position.x = -postition + 1286;
    foreground2.position.x %= 1286 * 2;
    if (foreground2.position.x < 0) foreground2.position.x += 1286 * 2;
    foreground2.position.x -= 1286;
    // invoke requestAnimFrame again
    requestAnimFrame(animate);
    renderer.render(stage);
}
