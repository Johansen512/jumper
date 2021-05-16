import Phaser from '../lib/phaser.js'


// import the Carrot class here
import Carrot from '../game/Carrot.js'

export default class Game extends Phaser.Scene
{

    carrotsCollected = 0

    /** @type {Phaser.Physics.Arcade.StaticGroup} */
        platforms

    /** @type {Phaser.Physics.Arcade.Sprite} */
        player

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
        cursors

    /** @type {Phaser.Physics.Arcade.Group} */
        carrots

        /** @type {Phaser.GameObjects.Text} */
        carrotsCollectedText



    /**
        * @param {Phaser.GameObjects.Sprite} sprite
        */
            addCarrotAbove(sprite)
        {
        const y = sprite.y - sprite.displayHeight

        /** @type {Phaser.Physics.Arcade.Sprite} */
        const carrot = this.carrots.get(sprite.x, y, 'carrot')

        // set active and visible
        carrot.setActive(true)
        carrot.setVisible(true)

        this.add.existing(carrot)

        // update the physics body size
        carrot.body.setSize(carrot.width, carrot.height)

        // make sure body is enabed in the physics world
        this.physics.world.enable(carrot)

        return carrot










}

/**
* @param {Phaser.Physics.Arcade.Sprite} player
* @param {Carrot} carrot
*/
handleCollectCarrot(player, carrot)
{
// hide from display
this.carrots.killAndHide(carrot)

// play jump sound
this.sound.play('eat')

// disable from physics world
this.physics.world.disableBody(carrot.body)


// increment by 1
this.carrotsCollected++


// create new text value and set it
const value = `Carrots: ${this.carrotsCollected}`
this.carrotsCollectedText.text = value


 }

 findBottomMostPlatform()
 {
    const platforms = this.platforms.getChildren()
    let bottomPlatform = platforms[0]
 
    for (let i = 1; i < platforms.length; ++i)
 {
    const platform = platforms[i]
 
  // discard any platforms that are above current
    if (platform.y < bottomPlatform.y)
    {
     continue
     }
 
    bottomPlatform = platform
  }
 
    return bottomPlatform
  }
 




constructor()
{
super('game')
}

init()
{
this.carrotsCollected = 0
}


preload()
{
    this.load.image('background', 'assets/Background/bg_layer1.png')

    // load the platform image
    this.load.image('platform', 'assets/Environment/ground_grass.png')

    this.load.image('bunny-stand', 'assets/Players/bunny1_stand.png')

    this.load.image('bunny-jump', 'assets/Players/bunny1_jump.png')

    this.load.image('bunny-fall', 'assets/Players/bunny1_fall.png')

    this.load.image ('carrot', 'assets/Items/carrot.png')

    this.load.audio('jump', 'assets/sfx/phaseJump2.ogg')

    this.load.audio('eat', 'assets/sfx/testEat.wav')

    this.load.audio('fall', 'assets/sfx/fall.wav')


    this.cursors = this.input.keyboard.createCursorKeys()

    

 }

create()
{

    this.add.image (240, 320, 'background')
        .setScrollFactor(1, 0)


    // create the group
    this.platforms = this.physics.add.staticGroup()

    // then create 5 platforms from the group
for (let i = 0; i < 5; ++i)
{
const x = Phaser.Math.Between(80, 400)
const y = 150 * i

/** @type {Phaser.Physics.Arcade.Sprite} */
const platform = this.platforms.create(x, y, 'platform')
platform.scale = 0.5

/** @type {Phaser.Physics.Arcade.StaticBody} */
const body = platform.body
body.updateFromGameObject()
}

// create a bunny sprite
this.player = this.physics.add.sprite(240, 320, 'bunny-stand')
.setScale(0.5)

this.physics.add.collider(this.platforms, this.player)

this.player.body.checkCollision.up = false
this.player.body.checkCollision.left = false
this.player.body.checkCollision.right = false

this.cameras.main.startFollow(this.player)

this.cameras.main.startFollow(this.player)

// set the horizontal dead zone to 1.5x game width
this.cameras.main.setDeadzone(this.scale.width * 1.5)

// create a carrot
this.carrots = this.physics.add.group({
classType:Carrot

})  

this.physics.add.collider (this.platforms, this.carrots)


// formatted this way to make it easier to read
    this.physics.add.overlap(this.player, this.carrots, this.handleCollectCarrot, undefined, this )
    
    //Counter
    
    const style = { color: '#000', fontSize: 24 }
    this.carrotsCollectedText = this.add.text(240, 10, 'Carrots: 0', style)
    .setScrollFactor(0)
    .setOrigin(0.5, 0)


}

//Here starte Update
update()
{

    this.platforms.children.iterate(child => {
        /** @type {Phaser.Physics.Arcade.Sprite} */
        const platform = child
        
        const scrollY = this.cameras.main.scrollY
        if (platform.y >= scrollY + 700)
         {
        platform.y = scrollY - Phaser.Math.Between(50, 100)
        platform.body.updateFromGameObject()


        // create a carrot above the platform being reused
            this.addCarrotAbove(platform)

        }
         })
        

    // find out from Arcade Physics if the player's physics body
// is touching something below it
const touchingDown = this.player.body.touching.down

if (touchingDown)
{
// this makes the bunny jump straight up
this.player.setVelocityY(-300)

// switch to jump texture
this.player.setTexture('bunny-jump')

// play jump sound
this.sound.play('jump')


}

const vy = this.player.body.velocity.y
if (vy > 0 && this.player.texture.key !== 'bunny-stand')
{
// switch back to jump when falling
this.player.setTexture('bunny-stand')
 }

// left and right input logic
if (this.cursors.left.isDown && !touchingDown)
{
this.player.setVelocityX(-200)
}
else if (this.cursors.right.isDown && !touchingDown)
{
this.player.setVelocityX(200)
}
else
{
// stop movement if not left or right
this.player.setVelocityX(0)
}

this.horizontalWrap(this.player)


const bottomPlatform = this.findBottomMostPlatform()
if (this.player.y > bottomPlatform.y + 200)

{
   // play fall sound

    this.player.setTexture('bunny-fall')

    this.sound.play('fall')

    this.scene.start('game-over')
}







}
//update ends 

/**
 * @param {Phaser.GameObjects.Sprite} sprite
*/
horizontalWrap(sprite)
{
const halfWidth = sprite.displayWidth * 0.5
const gameWidth = this.scale.width
    if (sprite.x < -halfWidth)
    {
    sprite.x = gameWidth + halfWidth
    }
    else if (sprite.x > gameWidth + halfWidth)
    {
    sprite.x = -halfWidth
    }
    }

    







}