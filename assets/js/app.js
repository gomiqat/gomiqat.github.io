var currentUser = auth.currentUser;
// auth.onAuthStateChanged(function(user) {
//   if (user) {
//     dbRef.ref('/users/' + user.uid).once('value').then(function(snapshot) {
//       currentUser = snapshot.val();
//     });
//   }
// }); 


var password = 'test';
///*--------firebase logout function-------------*/
$(".logout-btn").on("click", function () {
  //     usersRef.doc(currentUser.uid).update({
  //            "is_active": "Offline"
  //     });
      auth.signOut().then(function () {
          loadPage("login.html")
      }).catch(function (error) {
          // An error happened.
      });
      
  });
  $("#create_btn").on("click", function () {
  
      $('#myModal').modal('show');
  });
 
  /*-----start---------------get realtime messages data-----------------------------*/ 
      var html = ""; 
      var q = dbRef.collection('posts').orderBy("msgtime").where("uid", "==", currentUser.uid);
       q.onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
                  
              var doc = change.doc.data();
                  var str = '[' + doc.name + '] ' + doc.time + ' ' + doc.date; 

                  if (doc.fileurl != "") {
                    var f;
                    var post = '<div class="card">'
                            +'<div class="card-body">'
                              // +'<h5 class="card-title">'+ doc.name +'</h5>'
                              +'<img src="'+doc.fileurl+'">'
                            +'</div>'
                            +'<div class="card-footer text-muted  text-center">'+str+'</div>'
                          +'</div>';
 
                        $("#post_body").prepend(post); 

                  }else{
                    var post = '<div class="card">'
                    +'<div class="card-body">'
                      // +'<h5 class="card-title">'+ doc.name +'</h5>'
                      +'<p class="card-title">'+ doc.text +'</p>'
                    +'</div>'
                    +'<div class="card-footer text-muted  text-center">'+str+'</div>'
                  +'</div>';      
         $("#post_body").prepend(post); 
                  }


               
          });
           
          // $("#post_body").animate({scrollTop: $("#post_body").prop("scrollHeight")}, 0); 
      });
      /*-----end---------------get realtime messages data-----------------------------*/     
  var imgfile;
  var imgURL = "";
  var url = "";
  var uploadTask;
  var attachFile = function(event) {
     imgfile = event.target.files[0];
     uploadTask = storageRef.child('images/' + imgfile.name).put(imgfile);
  
  };
  
   function upload(){
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, function(error) {
                console.log(error);
        }, function() {
              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                imgURL = downloadURL;
                url = downloadURL;
              });
        });
   }


  $("#create_post_btn").on("click", function () {
    var date = moment().format('LL');
      var day = moment().format('dddd');
      var time = moment().format('LT');
      var timestamp = new Date();

      if (uploadTask != null) {
        upload();
      }

     var msgtime = Date.now();
     var messageData = {
             uid: currentUser.uid,
             text: $("#post_msg").val(),
             date: date,
             day: day,
             time: time,
             fileurl: url,
             msgtime: msgtime
         }
 
         dbRef.collection('posts').doc()
             .set(messageData)
             .then(function () {
              $("#post_msg").val("");
              url = '';
              alert("Message Sent");

             });
 
 });
   // Since you mentioned your images are in a folder,
      // we'll create a Reference to that folder:
  var storageRef1 = firebase.storage().ref("images/");
  
      // // Now we get the references of these images
      // storageRef1.listAll().then(function(result) {
      //   result.items.forEach(function(imageRef) {
      //     // And finally display them
      //     displayImage(imageRef);
      //   });
      // }).catch(function(error) {
      //   // Handle any errors
      // });
  
      function displayImage(imageRef) {
        imageRef.getDownloadURL().then(function(url) {
          // TODO: Display the image on the UI
            console.log(url)
        }).catch(function(error) {
          // Handle any errors
        });
      }
  
  //
  
















/* -------------- get currentUser and his/her friendlist and so ------------------ */

//auth.onAuthStateChanged(function (userdata) {
//    if (userdata) {
//         loadPage("pages/app.html");
//
//    } else {
//        loadPage("pages/login.html");
//    }
//});


//
//$("#searchBtn").on("click", function(e){
//    e.preventDefault();
//})
//
//$("#send_btn").on("click", function(){
//
//    if($("#chat_flag").val() == "p2p"){
//        sendMessage();
//    }else if($("#chat_flag").val() == "chnl"){
//          sendChannelMsg();   
//    }
//    
//})
//
//$('#chat-box').keypress(function (e) {
//    if (e.which == 13 && !e.shiftKey) {
//            if($("#chat_flag").val() == "p2p"){
//                sendMessage();
//            }else if($("#chat_flag").val() == "chnl"){
//                  sendChannelMsg();   
//            }
//
//        e.preventDefault();
//        $(".chat-screen .body").animate({scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 1000);
//    }
//    /*if (e.shiftKey) {
//        this.value = this.value+"\n";
//    }*/
//});
//
//
//
//$("#search_box").on("input", function () {
//    
//    $(".search-list").html("");
//    dbRef.collection('users').where("email", "==", $(this).val()).get().then(function (querySnapshot) {
//        querySnapshot.forEach(function (doc) {
//            if (doc != null && doc.data().uid != currentUser.uid) {
//                $("#searchBtn").addClass("hidden");
//                $(".nav-pill-tabs").addClass("hidden");
//
//                $("#searchCloseBtn").removeClass("hidden");
//                $(".search-list").removeClass("hidden");
//                var childData = doc.data();
//                                  var searchlisthtml = '<li class="friend">' 
//                                      + '<div class="friend-body">'
////                                      +	'<img id="friend_user_image" class="user-image" src="'+url+'" alt="">'
//                                      +	'<div class="user-info"><p id="" class="user-full-name">'+childData.first_name+ ' ' +childData.last_name+'</p>'
//                                      +	'<input type="hidden" class="user-uid" value="'+childData.uid+'"/>'
//                                      +	'<input type="hidden" class="user-status" value="'+childData.is_active+'"/>'
//                                      + '<p class="user-thought">Whats up guys</p></div>'
//                                      + '<div class="user-status"><span class="user-activity"></span><span class="green-dot"></span></div>'
//                                      + '</div>'
//                                      + '</li>';
//
//                    $(".search-list").append(searchlisthtml);
//
//                storageRef.child('images/' + childData.photo_url).getDownloadURL().then(function (url) {
//  
//                });
//            }
//
//        });
//
//        //$(".chat-screen .body").html(html); 
//    });
//});
//
//$("#searchCloseBtn").on("click", function (e) {
//    e.preventDefault();
//    $("#searchBtn").removeClass("hidden");
//    $(".nav-pill-tabs").removeClass("hidden");
//
//    $("#searchCloseBtn").addClass("hidden");
//    $(".search-list").addClass("hidden");
//
//    $(".search-list").html("");
//    $("#search_box").val("");
//
//    $("#add_friend").parent().addClass("hidden");
//});
//
//
// $(".search-list").on("click", '.friend', function (e) {
//     if ($('.chat-screen').hasClass("hidden")) {
//         $('.welcome-screen').addClass("hidden");
//         $('.first-screen .body').addClass("hidden");
//         $('.chat-screen').removeClass("hidden");
//     }
//
//     var friendUID = $(this).find(".user-uid").val();
//     var friendName = $(this).find(".user-full-name").text();
//     var friendStatus = $(this).find(".user-status").val();
//     var friendPhotoUrl = $(this).find(".user-image").attr('src');
//
//     $("#friend_name").text(friendName);
//     $("#friend_status").text(friendStatus);
//     $("#friend_uid").val(friendUID);
//     $("#friend_image").attr("src", friendPhotoUrl);
//
//     /*dbRef.collection("friendship").where("to_uid", "==", currentUser.uid).where("status", "==", 1)
//       .onSnapshot(function(snapshot) { 
//            if(snapshot.size != 0){
//             $("#notificationCount").text(snapshot.size);
//         }else{
//              $("#notificationCount").text("");
//         }
//       });*/
//
//     $(".chat-screen .body").html("");
//     $("#add_friend").parent().removeClass("hidden");
//
// });
//
//
//
//$("#edit-profile-img").on("click", function(){
//    $("#browsedImage").trigger("click");
//})
//
//
//
//
//var file = "";
//var loadFile = function(event) {
//   file = event.target.files[0];
//   $("#edit-profile-img").attr("src", URL.createObjectURL(event.target.files[0]));
//};
//
//
//
//$("#btn_image_send").on("click", function(event){
//    $("#sentImage").trigger("click");
//})
//
//
//
//function imageUpload(file){
//   var uploadTask = storageRef.child('images/' + currentUser.uid+".jpg").put(file);
//
//    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//      function(snapshot) {
//        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//        
//        }, function(error) {
//                console.log(error);
//        }, function() {
//              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//                $(".edit-profile").addClass("hidden");
//                 $("#currentUserImg").attr("src", downloadURL);
//              });
//        });
//}
//
//
//
var sendFile = function(event) {
  imgfile = event.target.files[0];
  var uploadTask = storageRef.child('images/' + imgfile.name).put(imgfile);
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
     function(snapshot) {
       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       }, function(error) {
               console.log(error);
       }, function() {
             uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
               imgURL = downloadURL;
               alert("done")
             });
       });
};