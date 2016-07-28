// recovering the that audio on the html file 
var audioElement = document.getElementsByTagName('audio')[0]
// varibles for buttons Play and Pause , we will use this for the same button
var play_button = document.getElementById('play_icon');
var pause_button = document.getElementById('pause_icon');





// this is the  contructor --Jukebox--
function Jukebox() {
  this.songs = [] // this is an array of songs 
  this.i = 0 // this is the "index" of this array
}


Jukebox.prototype.initialize = function() {
  // put the first song on the audio tag - element 
  this.setSong()
}


Jukebox.prototype.setSong = function() {
  // update src in audio element
  audioElement.setAttribute("src", this.songs[this.i].url)
}


// function play 

Jukebox.prototype.play = function() {
  audioElement.play()

  // you can change  the icon of the  play/pause button
  play_button.style.display = "none"
  pause_button.style.display = "inline-block"
}


Jukebox.prototype.pause = function() {
  audioElement.pause()
 

// you can change  the icon of the  paus/play button
  pause_button.style.display = "none"
  play_button.style.display = "inline-block"
}



Jukebox.prototype.stop = function() {
  this.pause()
  audioElement.currentTime = 0
}

Jukebox.prototype.next = function() {
  this.i++
  // stops audio if at end of playlist
  if (this.i == this.songs.length) {
    this.i--
    this.stop()
  } else {
    this.setSong()
    this.play()
  }
}

Jukebox.prototype.previous = function() {
  this.i--
  // stops audio if at start of playlist
  if (this.i < 0) {
    this.i++
    this.stop()
  } else {
    this.setSong()
    this.play()
  }
}




// this is to load the songs 

Jukebox.prototype.loadSongs = function() {
  for (var i = 0; i < arguments.length; i++) { 
    this.songs.push(arguments[i])    
  }
}

Jukebox.prototype.listSongs = function() {
  for (var i = 0; i < this.songs.length; i++) { 
    var trackNum = i + 1
    if (trackNum.toString().length < 2) {
      trackNum = "0" + trackNum.toString()
    }
 }
}


// constructor for the object Song 

function Song(artist, title, url) {
  this.artist = artist
  this.title = title
  this.url = url
}

// this is just a easy way to storage owr jukebox 
var Myjukebox = new Jukebox()

// this are the new songs 
var song1 = new Song("Mitú", "Litoral", "audio/1_one.mp3")
var song2 = new Song("Sohn", "Lights", "audio/2_two.mp3")
var song3 = new Song("And Wot?", "TroyBoi", "audio/3_three.mp3")



Myjukebox.loadSongs(song1,song2,song3)



window.onload = function() {
  Myjukebox.initialize()
}



// this are the Buttons with actions 
document.getElementById("play_icon").addEventListener("click", function() {
  Myjukebox.play()
})

document.getElementById("pause_icon").addEventListener("click", function() {
  Myjukebox.pause()
})

document.getElementById("next_icon").addEventListener("click", function() {
 
  Myjukebox.next()
})

document.getElementById("previous_icon").addEventListener("click", function() {
  Myjukebox.previous()
})


// auto advance to the next song at end of song
audioElement.addEventListener("ended", function() {
  Myjukebox.next()
})
