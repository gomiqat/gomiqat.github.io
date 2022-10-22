var currentUser = auth.currentUser;
auth.onAuthStateChanged(function(user) {
  if (user) {
    dbRef.collection("users").where("uid", "==", currentUser.uid)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            currentUser = doc.data();
            $("#currenUsersFullName").text(currentUser.name);
            //$("#currenUserStatus").text(currentUser.is_active);
            //$("#currenUserStatus")
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }
}); 


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
  $("#msg_btn").on("click", function () {
  
    $("#post_body").hide(); 
    $('.chat-screen').removeClass("hidden"); 

  $(".chat-screen .body").html("");
    var channelhtml = ""; 
dbRef.collection('channelmessages').orderBy("msgtime").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) { 
            
            var htmlContent = "";
            if (doc.data().msg_by != currentUser.uid) {
                channelhtml += '<div class="friend-chat">'
                        +'<div class="selected-user-info">'
                        + '<p id="">'
                        +'<time class="chat-time" style="margin-top:-10px">'+doc.data().time+'</time></p>'
                        +'<p class="selected-user-chat">'+doc.data().text+'</p></div>'
                        +'</div>';
            } else {
                channelhtml += '<div class="my-chat">'
                        +'<div class="selected-user-info">'
                        + '<p class="text-right">'
                        + '<time class="chat-time">'+doc.data().time+' </time> &nbsp;&nbsp;'
                        +'<span class="selected-user-full-name"></span>'
                        + '</p>'
                        +'<p class="selected-user-chat text-right pull-right" style="margin-top:-10px">'+doc.data().text+'</p></div>'
                        +'</div>';
            }
          
        });
         $(".chat-screen .body").html(channelhtml); 
          $(".chat-screen .body").animate({scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 1000);
    });
  

});

$("#send_btn").on("click", function () {
  
  sendChannelMsg();
});
function sendChannelMsg() {

  var message = $('#chat-box').val();

  var date = moment().format('LL');
  var day = moment().format('dddd');
  var time = moment().format('LT');
  var fileurl = "";
  var msgtime = Date.now();

  var messageData = {
      msg_by : currentUser.uid,
      msg_by_name : $("#currenUsersFullName").text(),
      //msg_by_img : $("#currentUserImg").attr("src"),
      text: message,
      date: date,
      day: day,
      time: time,
      fileurl: fileurl,
      msgtime: msgtime
  }

  dbRef.collection('channelmessages').doc()
      .set(messageData)
      .then(function () {

      });



  $('#chat-box').val("");


  /*--start-------------print my send messages---------------------------------------*/
  var  sendhtml =   '<div class="my-chat">'
                  + '<div class="selected-user-info">'
                  + '<p class="text-right">'
                  + '<time class="chat-time">'+time+' </time> &nbsp;&nbsp;'
                  + '</p>'
                  + '<p class="selected-user-chat text-right pull-right">'+message+'</p></div>'
                  + '</div>';

  $(".chat-screen .body").append(sendhtml);
   $(".chat-screen .body").animate({scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 1000); 
  /*-end----------------print my send messages---------------------------------------*/

}
  $("#manage_btn").on("click", function () {
    $('.chat-screen').addClass("hidden");
    $("#post_body").show(); 
    var q = dbRef.collection('posts').orderBy("msgtime").where("uid", "==", currentUser.uid).where("deletestatus", "==", 0);
     q.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
                
            var doc = change.doc.data();
            console.log(change.doc.id)
                var str = doc.time + ' ' + doc.date; 
                $("#post_body").html(""); 
                if (doc.fileurl != "") {
                  var post = '<div class="card">'
                          +'<div class="card-body">'
                          +'<h5 class="card-title"  onclick="deletePost(\''+change.doc.id+'\')"><i class="material-icons">delete</i></h5>'
                            +'<div class="">'+str+'</div>'
                             +'<p class="card-title">'+ doc.text +'</p>'
                            +'<img class="img-fluid" alt="image" style="width: 225px;" src="'+doc.fileurl+'">'
                          +'</div>'
                          
                        +'</div>';

                      $("#post_body").prepend(post); 

                }else{
                  var post = '<div class="card">'
                  +'<div class="card-body">'
                  +'<h5 class="card-title" onclick="deletePost(\''+change.doc.id+'\')"><i class="material-icons">delete</i></h5>'
                   +'<div class="">'+str+'</div>'
                    +'<p class="card-title">'+ doc.text +'</p>'
                  +'</div>'
                 
                +'</div>';      
                $("#post_body").prepend(post); 
               }
        });
         
        // $("#post_body").animate({scrollTop: $("#post_body").prop("scrollHeight")}, 0); 
    });
    
  });
 function deletePost(uid){
  postsRef.doc(uid).delete().then(() => {
    alert("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});

 }
 $("#view_btn").on("click", function () {
  getRealTimePosts();
});


  /*-----start---------------get realtime messages data-----------------------------*/ 
    function getRealTimePosts(){
      $('.chat-screen').addClass("hidden");
      $("#post_body").show(); 
      
      var html = "";
      $("#post_body").html("");
      var q = dbRef.collection('posts').orderBy("msgtime").where("privacy", "==", "2");
      //var q = dbRef.collection('posts').orderBy("msgtime").where("uid", "==", currentUser.uid);
       q.onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
                  
              var doc = change.doc.data();
                  var str = '[' + doc.name + '] ' + doc.time + ' ' + doc.date; 

                  if (doc.fileurl != "") {
                    var f;
                    var post = '<div class="card">'
                            +'<div class="card-body">'
                              // +'<h5 class="card-title">'+ doc.name +'</h5>'
                               +'<p class="card-title">'+ doc.text +'</p>'
                              +'<img class="img-fluid" alt="image" style="width: 225px;" src="'+doc.fileurl+'">'
                    +'<h6><span onclick="hitLike(\''+doc.uid+'\')" id="'+doc.uid+'" style=""><i class="material-icons">favorite</i></span> '+doc.total+'</h6>'  
                            +'</div>'
                            
                            +'<div class="card-footer text-muted text-center">'+str+'</div>'
                          +'</div>';
 
                        $("#post_body").prepend(post); 

                  }else{
                    var post = '<div class="card">'
                    +'<div class="card-body">'
                       +'<h5 class="card-title"><span id="total"><i class="material-icons">volunteer_activism</i></span></h5>'
                      +'<p class="card-title">'+ doc.text +'</p>'
                    
                     +'<h6><span onclick="hitLike(\''+doc.uid+'\')" id="'+doc.uid+'" style=""><i class="material-icons">favorite</i></span>'+doc.total+' </h6>' 
                    +'</div>'
                    +'<div class="card-footer text-muted text-center">'+str+'</div>'
                  +'</div>';      
         $("#post_body").prepend(post); 
                  }


               
          });
           
          // $("#post_body").animate({scrollTop: $("#post_body").prop("scrollHeight")}, 0); 
      });
    }
    getRealTimePosts();
function hitLike(elem){
    $("#"+elem).css("color", "red");
}
      /*-----end---------------get realtime messages data-----------------------------*/     
  var imgfile;
  var imgURL = "";
  var url;
  var uploadTask;
  var uploadStatus = 0;
  var attachFile = function(event) {
    uploadStatus = 1;
    console.log("uploadStatus str  " + uploadStatus);
     imgfile = event.target.files[0];
  };
  
   function upload(){
    console.log("uploadStatus " + uploadStatus);
    uploadTask = storageRef.child('images/' + imgfile.name).put(imgfile);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, function(error) {
                console.log(error);
        }, function() {
              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                imgURL = downloadURL;
                url = downloadURL;
                console.log(url);
                var date = moment().format('LL');
                var day = moment().format('dddd');
                var time = moment().format('LT');
                var timestamp = new Date();
                var msgtime = Date.now();
                var messageData = {
                  uid: currentUser.uid,
                  name: currentUser.name,
                  text: $("#post_msg").val(),
                  date: date,
                  day: day,
                  time: time,
                  fileurl: url,
                  msgtime: msgtime,
                  editstatus: 0,
                  edittext : "",
                  deletestatus: 0,
                  editdate: "",
                  editday: "",
                  edittime: "",
                  editmsgtime: "",
                  slike: 0,
                  mlike: 0,
                  total: 0,
                  privacy : $("#privacy :selected").val()
              }
              dbRef.collection('posts').doc()
                  .set(messageData)
                  .then(function () {
                   $("#post_msg").val("");
                   $("#atteched_file").val('');
                   alert("Message Sent");
             });
              });
        });
        
   }


  $("#create_post_btn").on("click", function () {
    var date = moment().format('LL');
      var day = moment().format('dddd');
      var time = moment().format('LT');
      var timestamp = new Date();
      var msgtime = Date.now();
      console.log("###0  " + uploadStatus);
      if (uploadStatus != 0 && $("#post_msg").val() != "") {
        console.log("###1");
        console.log("###1  " + uploadStatus);
        upload();
        console.log("if  " +url);
      }else if(uploadStatus == 0 && $("#post_msg").val() != ""){
        console.log("###2");
        console.log("###2  " + uploadStatus);
        var messageData = {
                uid: currentUser.uid,
                name: currentUser.name,
                text: $("#post_msg").val(),
                date: date,
                day: day,
                time: time,
                fileurl: "",
                msgtime: msgtime,
                editstatus: 0,
                edittext : "",
                deletestatus: 0,
                editdate: "",
                editday: "",
                edittime: "",
                 slike: 0,
                  mlike: 0,
                  total: 0,
                privacy : $("#privacy :selected").val(),
                editmsgtime: ""
            }
            dbRef.collection('posts').doc()
                .set(messageData)
                .then(function () {
                 $("#post_msg").val("");
                 alert("Message Sent");
           });
      }else if(uploadStatus == 1 && $("#post_msg").val() == ""){
        upload();
        console.log("if  " +url);
      }



 });
   // Since you mentioned your images are in a folder,
      // we'll create a Reference to that folder:
  //var storageRef1 = firebase.storage().ref("images/");
  
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