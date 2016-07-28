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

// this displays the name of the current song 
  this.showname()
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
  this.showname()

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

  if (this.i < 0) {
    this.i++
    this.stop()
  } else {
    this.setSong()
    this.play()
  }
}


// this function is to display de name of the song playing 
Jukebox.prototype.showname = function(){

    // alert(this.i)
    if (this.songs[this.i].title == "Litoral"){
      document.getElementById('title').innerHTML= this.songs[0].title;
      document.getElementById('artist').innerHTML= this.songs[0].artist;

    } else if(this.songs[this.i].title == "Lights") {
      document.getElementById('title').innerHTML= this.songs[1].title;
      document.getElementById('artist').innerHTML= this.songs[1].artist;

    } else if(this.songs[this.i].title == "And Wot?") {
      document.getElementById('title').innerHTML= this.songs[2].title;
      document.getElementById('artist').innerHTML= this.songs[2].artist

    } else if(this.songs[this.i].title =="Millionare"){
      document.getElementById('title').innerHTML= this.songs[3].title;
      document.getElementById('artist').innerHTML= this.songs[3].artist;

    }

}




// this is to push the songs in the array
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
  this.isPlaying = false;
}


window.onload = function() {
  Myjukebox.initialize()
}


// this is just a easy way to storage our jukebox 
var Myjukebox = new Jukebox();

// this are the new songs 
var song1 = new Song("Mitú", "Litoral", "audio/1_one.mp3")               // 0
var song2 = new Song("Sohn", "Lights", "audio/2_two.mp3")                // 1
var song3 = new Song("TroyBoi","And Wot?","audio/3_three.mp3")           // 2
var song4 = new Song("Plastilina Mosh","Millionare","audio/4_four.mp3")  // 3

Myjukebox.loadSongs(song1,song2,song3,song4)


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
