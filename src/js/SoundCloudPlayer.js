import SoundCloudApiService from './SoundCloudApiService.js';

var PLAYER_STATE = {
    IDLE: 'idle',
    PLAYING: 'playing',
    PAUSED: 'paused'
};

var SoundCloudPlayer = function() {
    this.state = PLAYER_STATE.IDLE;
    this.playlist = [];
    this.index;
    this.player;
}

SoundCloudPlayer.prototype.load = function(tracks) {
    if (this.player) {
        this.player.pause();
    }

    this.playlist = tracks;
    this.index = 0;

    return this;
}

SoundCloudPlayer.prototype.play = function() {
    var self = this;

    if (!this.playlist || !this.playlist[this.index]) {
        throw new Error('no tracks to play');
    }

    var track = this.playlist[index];

    if (!track.streamable) {
        this.next();
    }

    SoundCloudApiService.stream(track.id, function(response) {
        if (response.success) {
            self.player = response.sound;
            self.state = PLAYER_STATE.PLAYING;
            self.player.play();
        } else {
            self.next();
        }
    });
}

SoundCloudPlayer.prototype.pause = function() {
    if (!this.player) {
        throw new Error('no player defined');
    }

    this.state = PLAYER_STATE.PAUSED;

    this.player.pause();
}

SoundCloudPlayer.prototype.seek = function(milliseconds) {
    if (!this.player) {
        throw new Error('no player defined');
    }

    this.player.seek(milliseconds);
}

SoundCloudPlayer.prototype.next = function() {
    if (this.index < this.playlist.length - 1) {
        this.index++;
        this.play();
    }
}

SoundCloudPlayer.prototype.prev = function() {
    if (this.index > 0) {
        this.index--;
        this.play();
    }
}

SoundCloudPlayer.prototype.getCurrentTrack = function() {
    if (this.playlist && this.playlist[this.index]) {
        return this.playlist[this.index];
    }

    return null;
}

export default new SoundCloudPlayer();
