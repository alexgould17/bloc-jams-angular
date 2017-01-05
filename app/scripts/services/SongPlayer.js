(function() {
	function SongPlayer($rootScope, Fixtures) {
		/**
		* @desc Custom object that holds all the services & variables for this service provider.
		* @type {Object}
		*/
		var SongPlayer = {};
		
		/**
		* @desc Album holding all the songs & their data
		* @type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();
		
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
				stopSong();
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			
			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});

			SongPlayer.currentSong = song;
		};
		
		/**
		* @function playSong
		* @desc Plays currentBuzzObject & sets the playing variable to true
		*/
		var playSong = function() {
			currentBuzzObject.play();
			SongPlayer.currentSong.playing = true;
		};
		
		/**
		* @function stopSong
		* @desc Stops currentBuzzObject & sets the playing variable to null
		*/
		var stopSong = function() {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
		};
		
		/**
		* @function getSongIndex
		* @desc Gets the 0-start index of the song object passed in the current album
		* @param {Object} song
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
		/**
		* @desc Holds the data of the song that's currently playing
		* @type {Object}
		*/
		SongPlayer.currentSong = null;
		
		/**
		* @desc Current playback time (in seconds) of currently playing song
		* @type {Number}
		*/
		SongPlayer.currentTime = null;
		
		/**
		* @desc Current playback volume (0-100)
		* @type {Number}
		*/
		SongPlayer.volume = 0;
		
		/**
		* @function play
		* @desc Plays the song parameter passed to the method.
		* @param {Object} song (optional)
		*/
		SongPlayer.play = function(song) {
			song == song || SongPlayer.currentSong;
			if(SongPlayer.currentSong !== song) {
				setSong(song);
				playSong();
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused())
					currentBuzzObject.play();
			}
		};
		
		/**
		* @function pause
		* @desc Pauses the song parameter passed to the method
		* @param {Object} song (optional)
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		/**
		* @function previous
		* @desc Goes to the start of the previous song in the album & plays it. Does not wrap, unlike the last player. Sigh...
		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			if (currentSongIndex < 0) {
				stopSong();
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		
		/**
		* @function next
		* @desc Goes to the start of the next song in the album & plays it. Does not wrap, unlike the last player.
		*/
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			if (currentSongIndex >= currentAlbum.songs.length) {
				stopSong();
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		
		/**
		* @function setCurrentTime
		* @desc Set current time (in seconds) of currently playing song
		* @param {Number} time
		*/
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};
		
		/**
		* @function setCurrentTime
		* @desc Set current time (0-100) of the current song.
		* @param {Number} volume
		*/
		SongPlayer.setVolume = function(volume) {
			if (currentBuzzObject) {
				currentBuzzObject.setVolume(volume);
			}
		};

		return SongPlayer;
	}

	angular.module('blocJams').factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();