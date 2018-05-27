'use strict';

import TwoVector from 'lance/serialize/TwoVector';
const PADDING = 20;
const WIDTH = 400;
const HEIGHT = 400;

import GameEngine from 'lance/GameEngine';
import SimplePhysicsEngine from 'lance/physics/SimplePhysicsEngine';
import PlayerAvatar from './PlayerAvatar';

export default class MyGameEngine extends GameEngine {

    constructor(options) {
        super(options);
        this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this });
    }

    registerClasses(serializer) {
        serializer.registerClass(PlayerAvatar);
    }

    start() {

        super.start();

        this.on('objectAdded', (object) => {
            if (object.class === PlayerAvatar) {
                this.PlayerAvatar = object;
            } else if (object.playerId === 1) {
                this.PlayerAvatar1 = object;
            } else if (object.playerId === 2) {
                this.PlayerAvatar2 = object;
            }
        });
    }

    initGame() {
        this.addObjectToWorld(new PlayerAvatar(this, null, { position: new TwoVector(PADDING, 0), playerId: 1 }));
    }

    processInput(inputData, playerId) {

        super.processInput(inputData, playerId);

        let PlayerAvatar = this.world.queryObject({ playerId });
        if (PlayerAvatar) {
            if (inputData.input === 'up') {
                PlayerAvatar.position.y -= 5;
            } else if (inputData.input === 'down') {
                PlayerAvatar.position.y += 5;
            }
	    if (inputData.input === 'left') {
                PlayerAvatar.position.x -= 5;
            } else if (inputData.input === 'down') {
                PlayerAvatar.position.x += 5;
            }
        }
    }
}
