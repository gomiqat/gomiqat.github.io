/*--------firebase get all current user function-------------*/    

refreshApp();
function refreshApp(){
	
auth.onAuthStateChanged(function(user) {
  if (user) {
/*          var a = dbRef.ref('messages/'+get_my_id+'/'+get_friend_uid);
     a.orderByChild(get_my_id).limitToLast(1).once('child_added', function(snapshot) {
        $(".chat-body").append("<p>"+snapshot.val().text+"</p>");
       
    
});*/
     
        dbRef.ref('/users/' + user.uid).once('value').then(function(snapshot) {
            currentUser = snapshot.val();
            $("#currenUsersFullName").text(currentUser.first_name+" "+currentUser.last_name);
            $("#currenUserStatus").text("Status : "+currentUser.is_active);
            
//             storageRef.child('images/'+currentUser.photo_url).getDownloadURL().then(function(url) {
//                    $("#currentUserImg").attr("src", url);
//             })
            
        });
		
      
     /*  
        dbRef.ref('friends/'+user.uid).once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childData = childSnapshot.val();
                if(childData !== null ){
                    if(childData.status == 0 ){
                    var friendlisthtml='<li class="list-group-item h-25 w-100 p-3 ">'; 
                        friendlisthtml+='<span class="request_user_email">Email : '+childData.to_uid+'</span><br>';
                        friendlisthtml+='<span class="request_user_uid d-none">'+childData.to_uid+'</span>';
                        friendlisthtml+='<button type="button" class="btn btn-success btn-sm btn-accept" onclick="acceptRequest(this)">Accept</button>';
                        friendlisthtml+='<button type="button" class="btn btn-danger btn-sm btn-reject" onclick="rejectRequest(this)">Reject</button>';
                        friendlisthtml+='</li>';
                    $("#request_user").append(friendlisthtml);
                }
             }
          });
        }); */
      
            dbRef.ref('friends/'+user.uid).once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {

              var childData = childSnapshot.val();

                if(childData !== null ){
                    if(childData.status == 1 ){
                        
							   dbRef.ref('/users/' + childData.to_uid).once('value').then(function(snapshot) {
								friendUser = snapshot.val();
								   var img_url = "";
								   var first_name = friendUser.first_name;
								   var last_name = friendUser.last_name;
								   var uid = friendUser.user_uid;
								   var friend_status = friendUser.is_active;
								     storageRef.child('images/'+friendUser.photo_url).getDownloadURL().then(function(url) {
											 img_url = url;
				
										
												var friendlisthtml = '<li class="friend">' 
												  + '<div class="friend-body">'
												  +	'<img id="friend_user_image" class="user-image" src="'+img_url+'" alt="">'
												  +	'<div class="user-info"><p id="" class="user-full-name">'+first_name+ ' ' +last_name+'</p>'
												  +	'<input type="hidden" class="user-uid" value="'+uid+'"/>'
												  +	'<input type="hidden" class="user-status" value="'+friend_status+'"/>'
												  + '<p class="user-thought">Whats up guys</p></div>'
												  + '<div class="user-status"><span class="user-activity"></span><span class="green-dot"></span></div>'
												  + '</div>'
												  + '</li>';

								  $(".friend-list").append(friendlisthtml);
												  
									});

							 });
										 
                    
            }
                    
                    
             }
          });
        });
      
       

       
      
  } else {
       // window.location.replace("user_login.html");
  }
});
	
}

var f;



var cMessageRef;
var friendName;
var friendPhotoUrl;
var friendUID;

 $(".friend-list").on("click", '.friend', function(e){
        if($('.chat-screen').hasClass("hidden")){ 
            $('.welcome-screen').addClass("hidden");
            $('.chat-screen').removeClass("hidden");
        }
	$(".chat-screen .body").animate({ scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 1000);	
	    
     friendUID =$(this).find(".user-uid").val(); 
        friendName =$(this).find(".user-full-name").text();
       var friendStatus =$(this).find(".user-status").val();
        friendPhotoUrl =$(this).find(".user-image").attr('src');
	
    $("#friend_name").text(friendName);
    $("#friend_status").text(friendStatus);
    $("#friend_uid").val(friendUID);
    $("#friend_image").attr("src", friendPhotoUrl);
	
	$(".chat-screen .body").html(""); 
	$(".chat-screen .body").find( "#"+friendUID+"").html("");
	
	cMessageRef = 'messages/'+currentUser.user_uid+'/'+friendUID;
	
    var html ='<div id = "'+friendUID+'"></div>';
	$(".chat-screen .body").append(html);
	var htmlContent;
   var msg =  dbRef.ref('messages/'+friendUID+'/' + currentUser.user_uid).limitToLast(20);
	msg.once('value').then(function(snapshot) {
        
		 if(snapshot != null){
			 				
			 snapshot.forEach(function(item) {

			   if(item.val().from_uid == friendUID ){
				   
				htmlContent = '<div class="friend-chat">'
								+'<img id="" class="selected-user-image" src="'+friendPhotoUrl+'" alt="">'
								+'<div class="selected-user-info">'
								+ '<p id=""><span class="selected-user-full-name">'+friendName+'</span>&nbsp;&nbsp;'
								+'<time class="chat-time">'+item.val().time+'</time></p>'
								+'<p class="selected-user-chat">'+item.val().text+'</p></div>'
								+'</div>';
			   }else{
				htmlContent = '<div class="my-chat">'
							
							+'<div class="selected-user-info">'
							+ '<p class="text-right">'
							+ '<time class="chat-time">'+item.val().time+' </time> &nbsp;&nbsp;'
							+'<span class="selected-user-full-name">'+$("#currenUsersFullName").text()+'</span>'
							+ '</p>'
							+'<p class="selected-user-chat text-right pull-right">'+item.val().text+'</p></div>'
							+'<img id="" class="selected-user-image" src="'+$("#currentUserImg").attr('src')+'" alt="">'
							+'</div>';
			   }
			   	$(".chat-screen .body").find( "#"+friendUID+"").append(htmlContent);
				 
			});
		 }
    });
     

     
     
    })




/*--------firebase logout function-------------*/
$("#logout_btn").on("click", function(){
    
    usersRef.doc(auth.user.uid).update({
            "is_active": "Offline"
        }).then(function() {
            console.log("Document successfully updated!");
        });
    
    auth.signOut().then(function() {
        
       // dbRef.ref('/users/' + currentUser.user_uid).update({is_active: "Offline"});
        
        window.location.replace("user_login.html");
    }, function(error) {
        console.log("An error happened.");
    });
});

/*---------------don't change up--------------------------*/


/*--------firebase get all user function-------------*/

dbRef.ref("/users").once("value").then(function(snapshot) {
    
    snapshot.forEach(function(childSnapshot) {
        
      var childData = childSnapshot.val();
        
        if(childData !== null ){
            var friendlisthtml='<li class="list-group-item h-25 w-100 p-3 ">'; 
                friendlisthtml+='<span class="user_name text-info font-weight-bold">Name : '+childData.first_name+' '+childData.last_name+'</span><br>';
                friendlisthtml+='<span class="user_email">Email : '+childData.email+'</span><br>';
            if(childData.is_active==="Online"){
                friendlisthtml+='<span class="user_status text-success">Status : '+childData.is_active+'</span><br>';
            } else {
                friendlisthtml+='<span class="user_status text-danger">Status : '+childData.is_active+'</span><br>';
            } 
                friendlisthtml+='<span class="user_uid d-none">'+childData.user_uid+'</span>';
                friendlisthtml+='<button type="button" class="btn btn-success btn-sm btn-friend-request">Send Request</button>';
                friendlisthtml+='</li>';
            
            $("#add_user").append(friendlisthtml)
        }
  });
});

  
$(".list-group").on("click", ".list-group-item .btn-friend-request", function(){
    var reqUID =$(this).closest('li').find(".user_uid").text();
    var myRequestData = {
        from_uid :  currentUser.user_uid,
        status : "0",
        to_uid : reqUID
    }
    var toRequestData = {
        from_uid :  reqUID,
        status : "0",
        to_uid : currentUser.user_uid
    }
    
      dbRef.ref('friends/'+currentUser.user_uid+'/' + reqUID)
                    .set(myRequestData)
                    .then(function(){
                        console.log("first insert");
      });
    
     dbRef.ref('friends/'+reqUID+'/' + currentUser.user_uid)
                .set(toRequestData)
                .then(function(){
                    console.log("second insert");
     });
    
});


function acceptRequest(el){
    var reqUID =$(el).closest('li').find(".request_user_uid").text();
       dbRef.ref('friends/'+currentUser.user_uid+'/' + reqUID)
                    .update({status : "1"})
                    .then(function(){
                        console.log("first updated");
      });
    
     dbRef.ref('friends/'+reqUID+'/' + currentUser.user_uid)
                .update({status : "1"})
                .then(function(){
                    console.log("second updated");
     });
    
}

function rejectRequest(el){
    var reqUID =$(el).closest('li').find(".request_user_uid").text();
    dbRef.ref('friends/'+currentUser.user_uid+'/' + reqUID)
                    .update({status : "3"})
                    .then(function(){
                        console.log("first updated");
    });
    
     dbRef.ref('friends/'+reqUID+'/' + currentUser.user_uid)
                .update({status : "3"})
                .then(function(){
                    console.log("second updated");
     });
}


function sendMessage(){
	    var friend_uid = $("#friend_uid").val();
        var my_uid = currentUser.user_uid;
        var message = $('#chat-box').val();
		
		var date = moment().format('LL');
		var day = moment().format('dddd');  ;
		var time = moment().format('LT');
		var fileurl = "";

		
        var friendMessageData = {
            from_uid : my_uid,
            text : message,
            to_uid : friend_uid,
			date : date,
			day : day,
			time : time,
			fileurl : fileurl
            }

        var myMessageData = {
            from_uid : my_uid,
            text : message,
            to_uid : friend_uid,
			date : date,
			day : day,
			time : time,
			fileurl : fileurl
            }

        dbRef.ref('messages/'+my_uid).child(friend_uid)
                .push(myMessageData)
                .then(function(){
                 
        });

        dbRef.ref('messages/'+friend_uid).child(my_uid)
                .push(friendMessageData)
                .then(function(){
                
        });
	$('#chat-box').val("");
}
                             
$("#send_btn").on("click", function(){
	 sendMessage();
    $(".chat-screen .body").animate({ scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 1000);
})

$('#chat_box').keypress(function(e){
      if(e.which == 13 && !e.shiftKey) {        
        sendMessage();
        e.preventDefault();
        return false;
    }
});

  f = dbRef.ref('messages/'+currentUser.user_uid+'/'+friendUID);
    
    f.off();

 f.on('child_added', function(item) {

			if(item != null){
			   if(item.val().from_uid == friendUID ){
				   
				htmlContent = '<div class="friend-chat">'
								+'<img id="" class="selected-user-image" src="'+friendPhotoUrl+'" alt="">'
								+'<div class="selected-user-info">'
								+ '<p id=""><span class="selected-user-full-name">'+friendName+'</span>&nbsp;&nbsp;'
								+'<time class="chat-time">'+item.val().time+'</time></p>'
								+'<p class="selected-user-chat">'+item.val().text+'</p></div>'
								+'</div>';
			   }else{
				htmlContent = '<div class="my-chat">'
							
							+'<div class="selected-user-info">'
							+ '<p class="text-right">'
							+ '<time class="chat-time">'+item.val().time+' </time> &nbsp;&nbsp;'
							+'<span class="selected-user-full-name">'+$("#currenUsersFullName").text()+'</span>'
							+ '</p>'
							+'<p class="selected-user-chat text-right pull-right">'+item.val().text+'</p></div>'
							+'<img id="" class="selected-user-image" src="'+$("#currentUserImg").attr('src')+'" alt="">'
							+'</div>';
			   }
			   	$(".chat-screen .body").find( "#"+friendUID+"").append(htmlContent);
				 
		
		 }
		
		
		$(".chat-screen .body").animate({ scrollTop: $(".chat-screen .body").prop("scrollHeight")}, 1000);
    });
   
