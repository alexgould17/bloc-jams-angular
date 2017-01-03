(function() {
	function SongPlayer() {
		/**
		* @desc custom object that holds all the services & variables for this service provider.
		* @type {Object}
		*/
		var SongPlayer = {};
		
		/**
		* @desc Holds the data of the song that's currently playing
		* @type {Object}
		*/
		var currentSong = null;
		
		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;
		
		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
		};
		
		/**
		* @function playSong
		* @desc Plays currentBuzzObject & sets the playing variable to true
		*/
		var playSong = function() {
			currentBuzzObject.play();
			song.playing = true;
		};
		
		/**
		* @function play
		* @desc Plays the song parameter passed to the method.
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			if(currentSong !== song) {
				setSong(song);
				playSong();
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused())
					currentBuzzObject.play();
			}
		};
		
		/**
		* @function pause
		* @desc Pauses the song parameter passed to the method
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
		};

		return SongPlayer;
	}

	angular.module('blocJams').factory('SongPlayer', SongPlayer);
})();