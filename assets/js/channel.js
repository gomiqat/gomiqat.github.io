$("#addChannelBtn").on("click", function(){
    $("#channel_name").removeClass("hidden");
    $("#closeChannelBtn").removeClass("hidden");
    $("#addChannelBtn").addClass("hidden");
    
})

$("#channel_name").on("input", function () {
    if($("#channel_name").val().length <= 2){
        $("#saveChannelBtn").addClass("hidden");
    }else{
        $("#saveChannelBtn").removeClass("hidden");
    }

})

 $("#closeChannelBtn").on("click", function(){
    $("#channel_name").addClass("hidden");
    $("#closeChannelBtn").addClass("hidden");
    $("#saveChannelBtn").addClass("hidden");
    $("#addChannelBtn").removeClass("hidden");
    $("#channel_name").val("");
 })


 



$("#saveChannelBtn").on("click", function(){
    
    var channelName = $("#channel_name").val().toLowerCase();
/*    if (/\s/.test(str)) {
    // It has any kind of whitespace
    }*/
    $("#channel_name").val("");
    $("#channel_name").addClass("hidden");
    $("#closeChannelBtn").addClass("hidden");
    $("#saveChannelBtn").addClass("hidden");
    $("#addChann1elBtn").removeClass("hidden");
    
     var date = moment().format('LL');
     var day = moment().format('dddd');
     var time = moment().format('LT');
     var timestamp = new Date();
    
    var channelData = {
        channel_id : "",
        channel_name: "#"+channelName,
        created_by: currentUser.uid,
        created_by_name : $("#currenUsersFullName").text(),
        date: date,
        day: day,
        time: time,
        timestamp: timestamp,
        status: 1
    }

     
    dbRef.collection('channels')
         .where("created_by", "==", currentUser.uid)
         .where("channel_name", "==", channelName)
         .get().then(function(querySnapshot) {
            if(querySnapshot.size > 0){
                console.log("channel already exists");
            }else{
             var channelRef =  dbRef.collection('channels').doc();
                    channelRef.set(channelData)
                    .then(function () {
                     dbRef.collection('channels').doc(channelRef.id).update({
                            "channel_id": channelRef.id
                        })
                }); 
            }
        
    });
    
        dbRef.collection("channels").where("status", "==", 1)
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                // current_user in from and in to
                
                if (change.type === "added") {

           var childData = change.doc.data();
                 
                         
                    var channellisthtml =  '<li class="channel">' 
                                          + '<div class="channel-body">'
                                          +	'<img id="channel_image" class="user-image" src="assets/img/channel.jpg" alt="">'
                                          +	'<div class="user-info"><p id="channel_name" style="font-weight:bold;">'+childData.channel_name+'</p>'
                                          + '<input type="hidden" class="channel-name" value="'+childData.channel_name+'"/>'
                                          +	'<input type="hidden" class="channel-id" value="'+childData.channel_id+'"/>'
                                          + '<input type="hidden" class="created-by" value="'+childData.created_by+'"/>'
                                          + '<input type="hidden" class="created-by-name" value="'+childData.created_by_name+'"/>'
                                          +	'<input type="hidden" class="user-status" value=""/>'
                                          + '<p class="user-thought">'+childData.created_by_name+'</p></div>'
                                          + '</div>'
                                          + '</li>';

                                          $(".channel-list").append(channellisthtml);


                }

            });
        });




    
    
})




   var channelhtml = ""; 

$(".channel-list").on("click", ".channel", function () {
    if ($('.chat-screen').hasClass("hidden")) {
         $('.welcome-screen').addClass("hidden");
         $('.first-screen').addClass("hidden");
         $('.chat-screen').removeClass("hidden");
     }
     $(".chat-screen .body").html("");
    var current_li = $(this).closest("li");
    var channelID = current_li.find(".channel-id").val();
    var channelName = current_li.find(".channel-name").val();
    var createdBy = current_li.find(".created-by").val();
    var createdByName = current_li.find(".created-by-name").val();

     $("#friend_name").text(channelName);
     $("#friend_status").text("Owner : " + createdByName);
     $("#friend_uid").val(channelID);
     $("#chat_flag").val("chnl");
     $("#friend_image").attr("src", "assets/img/channel.jpg");

    var channelhtml = ""; 
dbRef.collection('channelmessages').orderBy("msgtime").where("channel_id", "==", channelID).get().then(function(querySnapshot) {
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
  
         
/*-----start---------------get realtime messages data-----------------------------*/ 
    var q = dbRef.collection('channelmessages').orderBy("msgtime").where("channel_id", "==", $("#friend_uid").val());
     q.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if(change.doc.data().channel_id == $("#friend_uid").val() && change.doc.data().msg_by != currentUser.uid ){

                  var  newMsg = '<div class="friend-chat">'
                                +'<div class="selected-user-info">'
                                + '<p id="">'
                                +'<time class="chat-time">'+change.doc.data().time+'</time></p>'
                                +'<p class="selected-user-chat">'+change.doc.data().text+'</p></div>'
                                +'</div>';
                $(".chat-screen .body").append(newMsg);
          }
        });
          $(".chat-screen .body").animate({scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 1000); 
    });
    /*-----end---------------get realtime messages data-----------------------------*/     
     
    

})

function sendChannelMsg() {

    var channelID = $("#friend_uid").val();
    var message = $('#chat-box').val();

    var date = moment().format('LL');
    var day = moment().format('dddd');
    var time = moment().format('LT');
    var fileurl = "";
    var msgtime = Date.now();

    var messageData = {
        channel_id : channelID,
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