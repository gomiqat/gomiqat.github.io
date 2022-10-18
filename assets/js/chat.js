
/* -------------- Friend onclick get chating data with this friend------------------ */
function decrypt(message, password){
        var decrypted = CryptoJS.AES.decrypt(message, password);
        return decrypted.toString(CryptoJS.enc.Utf8);
}
 $(".friend-list").on("click", '.friend', function(e){ 
    if ($('.chat-screen').hasClass("hidden")) {
        $('.welcome-screen').addClass("hidden");
        $('.first-screen .body').addClass("hidden");
        $('.chat-screen').removeClass("hidden");
    }

    var friendUID = $(this).find(".user-uid").val();
    var chatStatus = $(this).find(".chat-status").val();
    var friendshipID = $(this).find(".friendship-id").val();
    var friendName = $(this).find(".user-full-name").text();
    var friendStatus = $(this).find(".user-status").val();
    var friendPhotoUrl = $(this).find(".user-image").attr('src');

    $("#friend_name").text(friendName);
    $("#friend_status").text(friendStatus);
    $("#friend_uid").val(friendUID);
    $("#friendship_id").val(friendshipID);
    $("#chat_flag").val("p2p");
    $("#chat_status").val(chatStatus);
    console.log( $("#chat_status").val());
    $("#friend_image").attr("src", friendPhotoUrl);
     
    $(".chat-screen .body").html("");
 
/*-----start---------------get realtime messages data-----------------------------*/ 
    var html = ""; 
    var q = dbRef.collection('messages').orderBy("msgtime").where("friendship_id", "==", $("#friendship_id").val());
     q.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
                
            var doc = change.doc.data();
            
            if (doc.from_uid != currentUser.uid) {
                if(doc.fileurl.length >0){ // file send
                           html += '<div class="friend-chat">'
                        +'<img id="" class="selected-user-image" src="'+friendPhotoUrl+'" alt="">'
                        +'<div class="selected-user-info">'
                        + '<p id=""><span class="selected-user-full-name">'+friendName+'</span>&nbsp;&nbsp;'
                        +'<time class="chat-time">'+doc.time+'</time></p>'
                        +'<img class="card shared-img" src='+doc.fileurl+'></div>'
                        +'</div>';
                }else{
                         html += '<div class="friend-chat">'
                        +'<img id="" class="selected-user-image" src="'+friendPhotoUrl+'" alt="">'
                        +'<div class="selected-user-info">'
                        + '<p id=""><span class="selected-user-full-name">'+friendName+'</span>&nbsp;&nbsp;'
                        +'<time class="chat-time">'+doc.time+'</time></p>'
                        +'<p class="selected-user-chat">'+decrypt(doc.text, password)+'</p></div>'
                        +'</div>';
                }
         
            } else {
                if(doc.fileurl.length >0){ // file send
                      html += '<div class="my-chat">'
                        +'<div class="selected-user-info">'
                        + '<p class="text-right">'
                        + '<time class="chat-time">'+doc.time+' </time> &nbsp;&nbsp;'
                        +'<span class="selected-user-full-name">'+$("#currenUsersFullName").text()+'</span>'
                        + '</p>'
                        +'<img class="card shared-img pull-right" src='+doc.fileurl+'></div>'
                        +'<img id="" class="selected-user-image" src="'+$("#currentUserImg").attr('src')+'" alt="">'
                        +'</div>';
                }else{
                      html += '<div class="my-chat">'
                        +'<div class="selected-user-info">'
                        + '<p class="text-right">'
                        + '<time class="chat-time">'+doc.time+' </time> &nbsp;&nbsp;'
                        +'<span class="selected-user-full-name">'+$("#currenUsersFullName").text()+'</span>'
                        + '</p>'
                        +'<p class="selected-user-chat text-right pull-right">'+decrypt(doc.text, password)+'</p></div>'
                        +'<img id="" class="selected-user-image" src="'+$("#currentUserImg").attr('src')+'" alt="">'
                        +'</div>';
                }
              
            }
          
        });
         $(".chat-screen .body").html(html); 
         $(".chat-screen .body").animate({scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 0); 
    });
    /*-----end---------------get realtime messages data-----------------------------*/     
        
    
});

 $(".recent-list").on("click", '.friend', function(e){ 
    if ($('.chat-screen').hasClass("hidden")) {
        $('.welcome-screen').addClass("hidden");
        $('.first-screen .body').addClass("hidden");
        $('.chat-screen').removeClass("hidden");
    }

    var friendUID = $(this).find(".user-uid").val();
    var chatStatus = $(this).find(".chat-status").val();
    var friendshipID = $(this).find(".friendship-id").val();
    var friendName = $(this).find(".user-full-name").text();
    var friendStatus = $(this).find(".user-status").val();
    var friendPhotoUrl = $(this).find(".user-image").attr('src');

    $("#friend_name").text(friendName);
    $("#friend_status").text(friendStatus);
    $("#friend_uid").val(friendUID);
    $("#friendship_id").val(friendshipID);
    $("#chat_flag").val("p2p");
    $("#chat_status").val(chatStatus);
    console.log( $("#chat_status").val());
    $("#friend_image").attr("src", friendPhotoUrl);
     
    $(".chat-screen .body").html("");
/*    var html = ""; 
     dbRef.collection('messages').orderBy("msgtime", "desc").where("friendship_id", "==", friendshipID).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) { 
            
            if (doc.data().from_uid != currentUser.uid) {
                if(doc.data().fileurl.length >0){ // file send
                           html += '<div class="friend-chat">'
                        +'<img id="" class="selected-user-image" src="'+friendPhotoUrl+'" alt="">'
                        +'<div class="selected-user-info">'
                        + '<p id=""><span class="selected-user-full-name">'+friendName+'</span>&nbsp;&nbsp;'
                        +'<time class="chat-time">'+doc.data().time+'</time></p>'
                        +'<img class="card shared-img" src='+doc.data().fileurl+'></div>'
                        +'</div>';
                }else{
                           html += '<div class="friend-chat">'
                        +'<img id="" class="selected-user-image" src="'+friendPhotoUrl+'" alt="">'
                        +'<div class="selected-user-info">'
                        + '<p id=""><span class="selected-user-full-name">'+friendName+'</span>&nbsp;&nbsp;'
                        +'<time class="chat-time">'+doc.data().time+'</time></p>'
                        +'<p class="selected-user-chat">'+decrypt(doc.data().text, password)+'</p></div>'
                        +'</div>';
                }
         
            } else {
                if(doc.data().fileurl.length >0){ // file send
                      html += '<div class="my-chat">'
                        +'<div class="selected-user-info">'
                        + '<p class="text-right">'
                        + '<time class="chat-time">'+doc.data().time+' </time> &nbsp;&nbsp;'
                        +'<span class="selected-user-full-name">'+$("#currenUsersFullName").text()+'</span>'
                        + '</p>'
                        +'<img class="card shared-img pull-right" src='+doc.data().fileurl+'></div>'
                        +'<img id="" class="selected-user-image" src="'+$("#currentUserImg").attr('src')+'" alt="">'
                        +'</div>';
                }else{
                      html += '<div class="my-chat">'
                        +'<div class="selected-user-info">'
                        + '<p class="text-right">'
                        + '<time class="chat-time">'+doc.data().time+' </time> &nbsp;&nbsp;'
                        +'<span class="selected-user-full-name">'+$("#currenUsersFullName").text()+'</span>'
                        + '</p>'
                        +'<p class="selected-user-chat text-right pull-right">'+decrypt(doc.data().text, password)+'</p></div>'
                        +'<img id="" class="selected-user-image" src="'+$("#currentUserImg").attr('src')+'" alt="">'
                        +'</div>';
                }
              
            }
          
        });
         $(".chat-screen .body").html(html); 
         $(".chat-screen .body").animate({scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 1000);
    });
 */
     
/*-----start---------------get realtime messages data-----------------------------*/ 
    var html = ""; 
    var q = dbRef.collection('messages').orderBy("msgtime").where("friendship_id", "==", $("#friendship_id").val());
     q.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
                
            var doc = change.doc.data();
            
            if (doc.from_uid != currentUser.uid) {
                if(doc.fileurl.length >0){ // file send
                           html += '<div class="friend-chat">'
                        +'<img id="" class="selected-user-image" src="'+friendPhotoUrl+'" alt="">'
                        +'<div class="selected-user-info">'
                        + '<p id=""><span class="selected-user-full-name">'+friendName+'</span>&nbsp;&nbsp;'
                        +'<time class="chat-time">'+doc.time+'</time></p>'
                        +'<img class="card shared-img" src='+doc.fileurl+'></div>'
                        +'</div>';
                }else{
                         html += '<div class="friend-chat">'
                        +'<img id="" class="selected-user-image" src="'+friendPhotoUrl+'" alt="">'
                        +'<div class="selected-user-info">'
                        + '<p id=""><span class="selected-user-full-name">'+friendName+'</span>&nbsp;&nbsp;'
                        +'<time class="chat-time">'+doc.time+'</time></p>'
                        +'<p class="selected-user-chat">'+decrypt(doc.text, password)+'</p></div>'
                        +'</div>';
                }
         
            } else {
                if(doc.fileurl.length >0){ // file send
                      html += '<div class="my-chat">'
                        +'<div class="selected-user-info">'
                        + '<p class="text-right">'
                        + '<time class="chat-time">'+doc.time+' </time> &nbsp;&nbsp;'
                        +'<span class="selected-user-full-name">'+$("#currenUsersFullName").text()+'</span>'
                        + '</p>'
                        +'<img class="card shared-img pull-right" src='+doc.fileurl+'></div>'
                        +'<img id="" class="selected-user-image" src="'+$("#currentUserImg").attr('src')+'" alt="">'
                        +'</div>';
                }else{
                      html += '<div class="my-chat">'
                        +'<div class="selected-user-info">'
                        + '<p class="text-right">'
                        + '<time class="chat-time">'+doc.time+' </time> &nbsp;&nbsp;'
                        +'<span class="selected-user-full-name">'+$("#currenUsersFullName").text()+'</span>'
                        + '</p>'
                        +'<p class="selected-user-chat text-right pull-right">'+decrypt(doc.text, password)+'</p></div>'
                        +'<img id="" class="selected-user-image" src="'+$("#currentUserImg").attr('src')+'" alt="">'
                        +'</div>';
                }
              
            }
          
        });
         $(".chat-screen .body").html(html); 
         $(".chat-screen .body").animate({scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 0); 
    });
    /*-----end---------------get realtime messages data-----------------------------*/     
        
    
});

/* ------------------- Message Send --------------------*/
function sendMessage() {
    if($('#chat-box').val() != "" || imgURL.length > 1){
        var date = moment().format('LL');
        var day = moment().format('dddd');
        var time = moment().format('LT');
        var fileurl = imgURL;
        var msgtime = Date.now();
        
        var message = "";
        var friendUID = $("#friend_uid").val();
        var friendshipID = $("#friendship_id").val();
        
        var me = $("#currenUsersFullName").text(); 
        var friend = $("#friend_name").text();
 
        var text = $('#chat-box').val();
        if ( text.charAt( 0 ) == '/' ) {
            message = getAction(me, text.slice(1), friend);
          }else{
             message = text;
          }
                
        var encrypted = CryptoJS.AES.encrypt(message, password).toString();

        var messageData = {
            from_uid: currentUser.uid,
            text: encrypted,
            to_uid: friendUID,
            date: date,
            day: day,
            time: time,
            fileurl: fileurl,
            friendship_id: friendshipID,
            msgtime: msgtime
        }

        dbRef.collection('messages').doc()
            .set(messageData)
            .then(function () {
                console.log("Message Sent");
                if( $("#chat_status").val() == 0){
                       dbRef.collection('friendship').doc(friendshipID).update(
                        {chat : 1}
                       )
                        .then(function() {
                            console.log("frndship 0 to 1") ;   
                        })
                }
            });



        $('#chat-box').val("");
        imgURL = "";
        
        if(fileurl.length > 0){
         var  sendhtml =   '<div class="my-chat">'
                        + '<div class="selected-user-info">'
                        + '<p class="text-right">'
                        + '<time class="chat-time">'+time+' </time> &nbsp;&nbsp;'
                        + '<span class="selected-user-full-name">'+$("#currenUsersFullName").text()+'</span>'
                        + '</p>'
                        + '<img id="" class="selected-user-image pull-right" src="'+$("#currentUserImg").attr('src')+'" alt="">'
                        +'<img class="card shared-img pull-right" src='+fileurl+'></div>'
                        + '</div>';

        $(".chat-screen .body").append(sendhtml);
        $(".chat-screen .body").animate({scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 1000);
            
        }else{ // message send
        var  sendhtml =   '<div class="my-chat">'
                        + '<div class="selected-user-info">'
                        + '<p class="text-right">'
                        + '<time class="chat-time">'+time+' </time> &nbsp;&nbsp;'
                        + '<span class="selected-user-full-name">'+$("#currenUsersFullName").text()+'</span>'
                        + '</p>'
                        + '<p class="selected-user-chat text-right pull-right">'+message+'</p></div>'
                        + '<img id="" class="selected-user-image" src="'+$("#currentUserImg").attr('src')+'" alt="">'
                        + '</div>';

        $(".chat-screen .body").append(sendhtml);
        $(".chat-screen .body").animate({scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 1000); 
            
        }
        
    }
}


var imgfile;
var imgURL = "";
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
                sendMessage();
              });
        });
};


$("#add_friend").on("click", function () {
    var reqUID = $("#friend_uid").val();
    var date = moment().format('LL');
    var day = moment().format('dddd');
    var time = moment().format('LT');
    var timestamp = new Date();

    var friendship = {
        from_uid: currentUser.uid,
        to_uid: reqUID,
        date: date,
        day: day,
        time: time,
        timestamp: timestamp,
        status: 1,
        chat: 0
    }

    dbRef.collection('friendship').doc()
        .set(friendship)
        .then(function () {

            console.log("request sent");
        });

});

$(".notification-list").on("click", ".acceptBtn", function () {
    var current_li = $(this).closest("li");
    var request_from = current_li.find(".friendship-uid").val();
    var friendName = current_li.find(".user-full-name").val();
    var photoURL = current_li.find("#friend_user_image").val();
    
    dbRef.collection('friendship').doc(request_from).update({
        status: 2
    }).then(function () {
        // $.notify(friendName + " has accepted your request !", { title: "Friend Request!" }, { url: photoURL});
        current_li.remove();
    });


})

$(".notification-list").on("click", ".rejectBtn", function () {
    var current_li = $(this).closest("li");
    var request_from = current_li.find(".friendship-uid").val();
    dbRef.collection('friendship').doc(request_from).update({
        status: 0
    }).then(function () {
        console.log("Request rejected!");
        current_li.remove();
    });
})

