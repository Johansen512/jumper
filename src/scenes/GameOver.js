import Phaser from '../lib/phaser.js'

export default class GameOver extends Phaser.Scene
{
constructor()
{
super('game-over')
}

create()
{
    const width = this.scale.width
    const height = this.scale.height
  
    
    this.add.text(width * 0.25, height * 0.5, 'Game Over', {
    fontSize: 48, fill: '#00ff00'
    })

    this.add.text(width * 0.5, height * 0.6, 'Press Spacebar to start', {
        fontSize: 24
        })
    .setOrigin(0.5)


    this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start('game-start')
     })
        



}
 }
