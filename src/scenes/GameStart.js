import Phaser from '../lib/phaser.js'

export default class GameStart extends Phaser.Scene
{
constructor()
{
super('game-start')
}

preload(){
    this.load.image('intro', 'assets/Background/Robotdawn.png');

}

create()
{
    const width = this.scale.width
    const height = this.scale.height

    var bg = this.add.sprite(width * 0.5, height * 0.4,'intro');
    //bg.setOrigin(0,0);
    
    
    this.add.text(width * 0.15, height * 0.7, 'Press Spacebar to Start', {
    fontSize: 24
    })

   

    this.add.text(width * 0.5, height * 0.8, 'Use arrow-keys to move', {
        fontSize: 24
        })
    .setOrigin(0.5)


    this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start('game')
     })
        



}
 }
