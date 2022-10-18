$("#callbtn").on("click", function(){
    
function hasUserMedia() { 
   //check if the browser supports the WebRTC 
   return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || 
      navigator.mozGetUserMedia); 
} 

if (hasUserMedia()) { 
   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia; 
		
   //enabling video and audio channels 
   navigator.getUserMedia({ video: true, audio: true }, function (stream) { 
       var video = document.getElementById('localVideo');
       video.src = window.URL.createObjectURL(stream);

   }, function (err) {}); 
} else { 
   alert("WebRTC is not supported"); 
}

})
     