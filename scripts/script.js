window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 840,
        height: 910,
        physics:{
            default:'arcade',
            arcade:{
                gravity: {y:300},
                debug: false
            }
        },
        scene: [
            loadTudo,
            menu,
            fase1
        ]
    }
   
    game = new Phaser.Game(config);
    window.focus();
};

var player, player2 
var cursors
var lava, plataformas, agua, fim
var caixa
var tileset
var w,a,s,d
var bombas, bomba1, bomba2, bomba3, bomba4
var botoes, botao, botao2, porta, porta2
var elevador1, elevador2, elevadores, plataformaAndante
var timer, textTime, gameOverText, gameOver
var bluestar, redstar
var score=0, score2=0, scoreText, scoreText2
var score1
var camera
var playerFim=0, player2Fim=0



class loadTudo extends Phaser.Scene{

    constructor(){
        super('loadTudo')
    }

    preload (){
        this.load.tilemapTiledJSON('mundo', 'assets/mundo.json')
        this.load.image('tiles','assets/tiles2.png')
        this.load.spritesheet('dude','assets/dude2.png',{ frameWidth: 121, frameHeight: 191 })
        this.load.spritesheet('dude2','assets/dude3.png',{ frameWidth: 121, frameHeight: 191 })
        this.load.image('elevador','assets/elevador.png')
        this.load.image('botao','assets/botao.png')
        this.load.image('caixa','assets/caixa.png')
        this.load.image('porta','assets/porta.png')
        this.load.image('bomb','assets/bomb.png')
        this.load.image('background','assets/teste2.png')
        this.load.image('bluestar', 'assets/redstar.png')
        this.load.image('redstar', 'assets/bluestar.png')
        this.load.image('level1', 'assets/level1.png')
        this.load.image('level2', 'assets/level2.png')
        this.load.image('play', 'assets/play.png')
        this.load.image('backgroundmenu','assets/backgroundmenu.png')
        this.load.audio('musica','assets/musica.wav')
        this.load.image('title','assets/title.png')
        this.load.image('playgame','assets/playgame.png')
        this.load.image('selecionado','assets/selecionado.png')
    }

    create(){
        this.scene.start('menu')
    }

}


class menu extends Phaser.Scene {

    constructor() {
        super('menu');
    }

    create() {
        score1 = 0;
        score2 = 0;
        this.addGameTitle();
    }

    addGameTitle() {
        
        this.guiGroup = this.add.group();

        var fundo = this.add.sprite(0, 0, "backgroundmenu");
        var escolha, selecionado = true, selecionado2 =

        fundo.setOrigin(0, 0);
        fundo.displayWidth = game.config.width;
        fundo.displayHeight = game.config.height;
        fundo.alpha = 0.8;

        this.guiGroup.add(fundo);

        this.add.sprite(430, 150, "title").setScale(0.8)
        this.add.sprite(430, 650, "playgame").setScale(0.5)
        
        let playBotao = this.add.sprite(430, 500, "play").setScale(0.25)
        let playBotao2 = this.add.sprite(250, 300, "level1").setScale(0.6)
        let playBotao3 = this.add.sprite(615, 300, "level2").setScale(0.6)
        
        

        playBotao.setInteractive();
        playBotao2.setInteractive();
        playBotao3.setInteractive();

        selecionado = this.add.sprite(250, 300, "selecionado").setScale(0.2)
        selecionado.setVisible(false)
        playBotao2.on("pointerup", function () {
            selecionado.setVisible(true)
            selecionado.setX(250)
            escolha = "jogo1"
        }, this);

        playBotao3.on("pointerup", function () {
            selecionado.setVisible(true)    
            selecionado.setX(615)
            escolha = "jogo2"
        }, this);

        playBotao.on("pointerup", function () {
            this.guiGroup.toggleVisible();
            this.guiGroup.active = false;
            this.scene.start(escolha);
        }, this);

        this.guiGroup.add(playBotao);
    }
}

class fase1 extends Phaser.Scene{

    constructor(){
        super('jogo1')
    }

    create (){

        var background = this.add.image(420,455,'background').setScale(2)
        camera = this.cameras.main
        camera.setZoom(1);
        //camera.setDeadzone(840, 910);
        
        var map = this.make.tilemap({ key: 'mundo' })
        tileset = map.addTilesetImage('tiles2', 'tiles')
        
        
        lava = map.createLayer('lava', tileset)
        plataformas = map.createLayer('plataformas', tileset)
        agua = map.createLayer('agua', tileset)
        fim = map.createLayer('fim', tileset)
    
        map.setCollisionBetween(0, 624 , true , false , 'lava')
        map.setCollisionBetween(0, 624 , true , false , 'plataformas')
        map.setCollisionBetween(0, 624 , true , false , 'agua')
        map.setCollisionBetween(0, 624 , true , false , 'fim')
        
        this.sound.play('musica')

        bombas = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            allowGravity: false,
            immovable: true,
            collideWorldBounds :true
        });
    
        bomba1 = bombas.create(100,820,'bomb').setScale(0.015)
        bomba2 = bombas.create(660,770,'bomb').setScale(0.015)
        bomba3 = bombas.create(150,625,'bomb').setScale(0.015)
        bomba4 = bombas.create(400,350,'bomb').setScale(0.015)

        redstar = this.physics.add.staticGroup();
        redstar.create(350, 760, 'redstar');
        redstar.create(30, 440, 'redstar');
        redstar.create(825, 360, 'redstar');
        redstar.create(370, 10, 'redstar');

        bluestar = this.physics.add.staticGroup();
        bluestar.create(550, 760, 'bluestar');
        bluestar.create(720, 190, 'bluestar');
        bluestar.create(600, 400, 'bluestar');
        bluestar.create(15, 50, 'bluestar');
    
        botoes = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            allowGravity: false,
            immovable: true,
            collideWorldBounds :true
        });
    
        botao = botoes.create(200,657,'botao')
        botao2 = botoes.create(720,482,'botao').setScale(0.6,1)
    
        caixa = this.physics.add.sprite(550, 200,'caixa').setScale(0.55).refreshBody()
        caixa.setCollideWorldBounds(true)
        caixa.body.setAllowGravity(true)
        caixa.setImmovable(false)
        caixa.body.setMaxVelocityX(70)
        caixa.body.setDragX(70)
    
        porta = this.physics.add.image(800,42,'porta').setScale(0.5).refreshBody()
        porta.setCollideWorldBounds(true)
        porta.body.setAllowGravity(false)
        porta.setImmovable()

        porta2 = this.physics.add.image(750,42,'porta').setScale(0.5).refreshBody()
        porta2.setCollideWorldBounds(true)
        porta2.body.setAllowGravity(false)
        porta2.setImmovable()
        
        player = this.physics.add.sprite(15, 820, 'dude').setScale(0.2)
        player2 = this.physics.add.sprite(55, 820, 'dude2').setScale(0.2)
    
        player.setBounce(0);
        player.setCollideWorldBounds(true);
    
        player2.setBounce(0);
        player2.setCollideWorldBounds(true);
    
        elevadores = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            allowGravity: true
        });
    
        elevador1 = this.physics.add.sprite(5,550,'elevador').setScale(0.6).refreshBody()
        elevadores.add(elevador1)
        elevador2 = this.physics.add.sprite(585,550,'elevador').setScale(0.6).refreshBody()
        elevadores.add(elevador2)
        
    
        // TODO VEZ QUE FOR ADICIONADO UM ELEVADOR NO GRUPO, SERA CHAMADA ESSA FUNCAO
        elevadores.getChildren().forEach(function (elevador) {
            elevador.setCollideWorldBounds(true)
            elevador.setImmovable(true)
            elevador.setGravityY(-250)
            this.physics.add.collider(plataformas, elevador);
            this.physics.add.collider(player, elevador);
            this.physics.add.collider(player2, elevador);
        }, this);
        
        plataformaAndante = this.physics.add.sprite(277,95,'elevador').setScale(0.9,0.4).refreshBody()
        plataformaAndante.body.setAllowGravity(false)
        plataformaAndante.setImmovable(true)

        cursors = this.input.keyboard.createCursorKeys();
    
        w = this.input.keyboard.addKey('W');
        a = this.input.keyboard.addKey('A');
        s = this.input.keyboard.addKey('S');
        d = this.input.keyboard.addKey('D');
        //this.wasdKeys = this.input.keyboard.addKeys('W,S,A,D');

        // ------- TEXTO DE GAMEOVER ------
        gameOverText = this.add.text(400,300, 'GAME OVER', {fontSize: '64px', fill: '#b30000' });
        gameOverText.setOrigin(0.5);
        gameOverText.visible = false;

        // ----------- TEMPO -----------
        timer = this.time.addEvent({
            delay: 80000,
            paused: false
        });

        this.input.on('pointerdown', function () {
            timer.paused = !timer.paused;
        });

        scoreText = this.add.text(16, 330, 'Water: 0', {fontSize: '32px', fill: '#0073e6' });
        scoreText2 = this.add.text(16, 380, 'Fire: 0', {fontSize: '32px', fill: '#b30000' });

        textTime = this.add.text(350, 330, '', 'Timer: 0', {fontSize: '32px', fill: '#0073e6' });
        gameOverText.setOrigin(0.5);
        
        // ------ ANIMACOES --------
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left2',
            frames: this.anims.generateFrameNumbers('dude2', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn2',
            frames: [ { key: 'dude2', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right2',
            frames: this.anims.generateFrameNumbers('dude2', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.physics.add.collider(player, plataformas)
        this.physics.add.collider(player, caixa)
        this.physics.add.collider(player, agua)
        this.physics.add.collider(player, plataformaAndante)
        this.physics.add.collider(player, lava, this.hitlava, null, this)
        this.physics.add.collider(player, bombas, this.hitBomb, null, this)
        this.physics.add.collider(player, fim, this.hitFim, null, this)
        
        this.physics.add.collider(player2, plataformas)
        this.physics.add.collider(player2, caixa)
        this.physics.add.collider(player2, lava)
        this.physics.add.collider(player2, plataformaAndante)
        this.physics.add.collider(player2, agua, this.hitwater, null, this)
        this.physics.add.collider(player2, bombas, this.hitBomb, null, this)
        this.physics.add.collider(player2, fim, this.hitFim, null, this)

        this.physics.add.collider(redstar, plataformas)
        this.physics.add.collider(bluestar, plataformas)
    
        this.physics.add.overlap(player, redstar, this.collectRedstar, null, this)
        this.physics.add.overlap(player, porta, this.encostarPorta, null, this)
        this.physics.add.overlap(player2, bluestar, this.collectBluestar, null, this)
        this.physics.add.overlap(player2, porta2, this.encostarPortaDois, null, this)
        this.physics.add.collider(plataformas, caixa)
    }


    update (){

        textTime.setText('Time: ' + timer.getRemainingSeconds().toFixed(1));
        //console.log(timer.getProgress());
        if (timer.getProgress() == 1) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            player2.setTint(0xff0000);
            player2.anims.play('turn');
            gameOver = true;
            gameOverText.visible = true;
        }

        this.checkFimdoJogo()

        this.bombaAndando()

        this.cameraSeguir()
        
        if (this.checkBotao())
        {
            elevador1.setVelocityY(-50)
            if(elevador1.y<550){
                elevador1.body.stop()
            }
        }

        if (this.checkBotao2())
        {
            elevador2.setVelocityY(-50)
            if(elevador2.y<550){
                elevador2.body.stop()
            }
        }

        
        if (this.checkCaixa()) {
            caixa.setImmovable(true)
        }
        

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
            player.anims.play('turn');
        }
        if (cursors.up.isDown && player.body.blocked.down)
        {
            player.setVelocityY(-204);
        }

        if (a.isDown)
        {
            player2.setVelocityX(-160);
            player2.anims.play('left2', true);
        }
        else if (d.isDown)
        {
            player2.setVelocityX(160);
            player2.anims.play('right2', true);
        }
        else
        {
            player2.setVelocityX(0);
            player2.anims.play('turn2');
        }
        
        if (w.isDown && player2.body.blocked.down)
        {
            player2.setVelocityY(-204);
        }
        
    }

    hitlava ()
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
        gameOverText.visible = true;
        timer.paused = true;
    }

    hitwater(){

        this.physics.pause();
        player2.setTint(0xff0000);
        player2.anims.play('turn');
        gameOver = true;
        gameOverText.visible = true;
        timer.paused = true;
    }

    hitBomb ()
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        player2.setTint(0xff0000);
        player2.anims.play('turn');
        gameOver = true;
        gameOverText.visible = true;
        timer.paused = true;
    }

    hitFim ()
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        player2.setTint(0xff0000);
        player2.anims.play('turn');
        gameOver = true;
        gameOverText.visible = true;
        timer.paused = true;
    }

    checkBotao(){

        var boundPlayer = player.getBounds()
        var boundPlayer2 = player2.getBounds()
    
        if (Phaser.Geom.Intersects.RectangleToRectangle(boundPlayer2, botao.getBounds())) {
            return Phaser.Geom.Intersects.RectangleToRectangle(player2.getBounds(), botao.getBounds())
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(boundPlayer, botao.getBounds())) {
            return Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), botao.getBounds())
        }
    
    }

    checkBotao2(){

        var boundPlayer = player.getBounds()
        var boundPlayer2 = player2.getBounds()
    
        if (Phaser.Geom.Intersects.RectangleToRectangle(boundPlayer2, botao2.getBounds())) {
            return Phaser.Geom.Intersects.RectangleToRectangle(player2.getBounds(), botao2.getBounds())
        }
        if (Phaser.Geom.Intersects.RectangleToRectangle(boundPlayer, botao2.getBounds())) {
            return Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), botao2.getBounds())
        }
    
    }

    checkCaixa (){

        if (caixa.x<95) {
            return true
        }
        return false
    }


    bombaAndando(){

        if (bomba1.x<=100) {
            bomba1.body.setVelocityX(150);
        }
        else if (bomba1.x>=660){
            bomba1.body.setVelocityX(-150);
        }
    
        if (bomba2.x<=100) {
            bomba2.body.setVelocityX(150);
        }
        else if (bomba2.x>=660){
            bomba2.body.setVelocityX(-150);
        }
    
        if (bomba3.x<=150) {
            bomba3.body.setVelocityX(150);
        }
        else if (bomba3.x>=630){
            bomba3.body.setVelocityX(-150);
        }
        if (bomba4.x<=100) {
            bomba4.body.setVelocityX(150);
        }
        else if (bomba4.x>=400){
            bomba4.body.setVelocityX(-150);
        }

        if (plataformaAndante.x<=277) {
            plataformaAndante.body.setVelocityX(40);
        }
        else if (plataformaAndante.x>=422){
            plataformaAndante.body.setVelocityX(-40);
        }

    }

    collectRedstar (player, redstar)
    {
        redstar.disableBody(true, true);

        score += 1;
        scoreText.setText('Water: ' + score);
    }


    collectBluestar (player2, bluestar)
    {

        bluestar.disableBody(true, true);

        score2 += 1;
        scoreText2.setText('Fire: ' + score2);

    }

    encostarPorta(){
        playerFim=1
    }
    encostarPortaDois(){
        player2Fim=1
    }

    checkFimdoJogo ()
    {
        if (playerFim==1&&player2Fim==1&&score==4&&score2==4) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            player2.setTint(0xff0000);
            player2.anims.play('turn');
            gameOverText.setText("DEU BOM")
            gameOver = true;
            gameOverText.visible = true;
            timer.paused = true;
        }
    }
    
    cameraSeguir(){

        if (player.y>=player2.y) {
            camera.startFollow(player)
            scoreText.y=player.y - 480
            scoreText2.y=player.y - 450
            textTime.y=player.y - 480
            gameOverText.y=player.y - 200
        }
        else{
            camera.stopFollow();
            camera.startFollow(player2)
            scoreText.y=player2.y - 480
            scoreText2.y=player2.y - 450
            textTime.y=player2.y - 480
            gameOverText.y=player2.y - 200
        }

        camera.setFollowOffset(0, 1800);
        //camera.centerOn(410, 350);
        camera.centerOnX(410);
        camera.setLerp(0,0.2);

    }

}
