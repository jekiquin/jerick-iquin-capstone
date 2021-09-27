export function genControls(scene) {
    if (!scene.gameState.player.anims.isPlaying) {
        scene.gameState.player.setVelocityX(0);
    }
    
    if (scene.gameState.cursors.right.isDown) {
        console.log('run');
        scene.gameState.player.flipX = true;
        scene.gameState.player.body.touching.down && scene.gameState.player.anims.play('run', true);
        scene.gameState.player.setVelocityX(250);
    } else if (scene.gameState.cursors.left.isDown) {
        scene.gameState.player.flipX = false;
        scene.gameState.player.body.touching.down && scene.gameState.player.anims.play('run', true);
        scene.gameState.player.setVelocityX(-250);
    } else if(scene.gameState.player.anims.currentAnim.key === 'run') {
        scene.gameState.player.anims.play('run', false);
        scene.gameState.player.body.touching.down && scene.gameState.player.anims.play('stand', true);
        scene.gameState.player.setVelocityX(0);
    }
    
    if(scene.gameState.cursors.up.isDown && scene.gameState.player.body.touching.down) {
        scene.gameState.player.anims.play('jump', true);
        scene.gameState.player.setVelocityY(-470);
    }
    
    if(scene.gameState.cursors.space.isDown) {
        scene.gameState.player.setVelocityX(0);
        scene.gameState.player.anims.play('punch', true);
    }
}
