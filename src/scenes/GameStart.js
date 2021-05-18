import Phaser from '../lib/phaser.js'

export default class GameStart extends Phaser.Scene
{
constructor()
{
super('game-start')
}

create()
{
    const width = this.scale.width
    const height = this.scale.height
    
    
    this.add.text(width * 0.15, height * 0.5, 'Press Spacebar to Start', {
    fontSize: 24
    })

    this.add.text(width * 0.5, height * 0.6, 'Use arrow-keys to move', {
        fontSize: 24
        })
    .setOrigin(0.5)


    this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start('game')
     })
        



}
 }
