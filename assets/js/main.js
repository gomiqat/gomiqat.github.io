

function loadPage(pageURL){
    $('#mainContent').load(pageURL);
}

function loadPageByJS(buttonID, pageURL){
    $(buttonID).on("click", function(){
        $('#mainContent').load(pageURL);
    });
}
//
//auth.onAuthStateChanged(function (userdata) {
//    if (userdata) {
//         loadPage("pages/app.html");
//
//    } else {
//        loadPage("pages/login.html");
//    }
//});
/*--------firebase logout function-------------*/
//$(".logout-btn").on("click", function () {
//     usersRef.doc(currentUser.uid).update({
//            "is_active": "Offline"
//     });
//    auth.signOut().then(function () {
//        loadPage("login.html")
//    }).catch(function (error) {
//        // An error happened.
//    });
//    
//});

//loadPage("pages/login.html")
/*
auth.onAuthStateChanged(function (user) {
    if (user) {
        loadPage("pages/app.html");
        usersRef.doc(user.uid).get().then(function (doc) {
            if (doc.exists) {
                // ---- current user data
                currentUser = doc.data();
                var userFullName = currentUser.email;
               usersRef.doc(currentUser.uid).update({
                         "is_active": "Online"
               }) 
                
                 $("#currenUsersFullName").text(userFullName);
                 $("#statusSignal").addClass("green-dot");
$(".friend-list").html("");
          
    dbRef.collection("friendship").where("to_uid", "==", user.uid).where("status", "==", 2)
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                // current_user in from and in to
                
                if (change.type === "added") {

                     usersRef.doc(change.doc.data().from_uid).get().then(function (doc) {

                        if (doc.exists) {
                            var childData = doc.data();
                            
                            var status;
                            if(childData.is_active == "Online"){ 
                                status =  '<span class="dot green-dot"></span>';
                            }else if(childData.is_active == "Offline"){
                                status = '<span class="dot grey-dot"></span>';
                            }
                            storageRef.child('images/' + childData.photo_url).getDownloadURL().then(function (url) {
                                var friendlisthtml = '<li class="friend">' 
                                          + '<div class="friend-body">'
                                          +	'<img id="friend_user_image" class="user-image" src="'+url+'" alt="">'
                                          +	'<div class="user-info"><p id="" class="user-full-name">'+childData.first_name+ ' ' +childData.last_name+'</p>'
                                          +	'<input type="hidden" class="user-uid" value="'+childData.uid+'"/>'
                                          +'<input type="hidden" class="friendship-id" value="'+change.doc.id+'"/>'
                                          +'<input type="hidden" class="chat-status" value="'+change.doc.data().chat+'"/>'
                                          +	'<input type="hidden" class="user-status" value="'+childData.is_active+'"/>'
                                          + '<p class="user-thought">'+childData.mood+'</p></div>'
                                          + '<div class="user-status"><span class="user-activity"></span>'+ status +'</div>'
                                          + '</div>'
                                          + '</li>';
                                    
                                
                                if(change.doc.data().chat == 1){
                                     $(".recent-list").append(friendlisthtml);
                                }
                                $(".friend-list").append(friendlisthtml);
                                
                                
                                friendlisthtml = "";
                            });
                        }
                    })


                }

            });
        });
    
        dbRef.collection("friendship").where("from_uid", "==", user.uid).where("status", "==", 2)
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {

                if (change.type === "added") {
       
                    usersRef.doc(change.doc.data().to_uid).get().then(function (doc) {
                        
                        if (doc.exists) {
                            var childData = doc.data();
                            var status;
                            if(childData.is_active == "Online"){ 
                                status =  '<span class="dot green-dot"></span>';
                            }else if(childData.is_active == "Offline"){
                                status = '<span class="dot grey-dot"></span>';
                            }
                            storageRef.child('images/' + childData.photo_url).getDownloadURL().then(function (url) {
                                var friendlisthtml = '<li class="friend">' 
                                          + '<div class="friend-body">'
                                          +	'<img id="friend_user_image" class="user-image" src="'+url+'" alt="">'
                                          +	'<div class="user-info"><p id="" class="user-full-name">'+childData.first_name+ ' ' +childData.last_name+'</p>'
                                          +	'<input type="hidden" class="user-uid" value="'+childData.uid+'"/>'
                                          + '<input type="hidden" class="friendship-id" value="'+change.doc.id+'"/>'
                                          +'<input type="hidden" class="chat-status" value="'+change.doc.data().chat+'"/>'
                                          +	'<input type="hidden" class="user-status" value="'+childData.is_active+'"/>'
                                          + '<p class="user-thought">'+childData.mood+'</p></div>'
                                          + '<div class="user-status"><span class="user-activity"></span>'+ status + '</div>'
                                          + '</div>'
                                          + '</li>';
                                if(change.doc.data().chat == 1){
                                     $(".recent-list").append(friendlisthtml);
                                }
                                $(".friend-list").append(friendlisthtml);
                            });
                        }
                    })

                }

            });
        });
    

                $(".notification-list").html("");
                dbRef.collection("friendship").where("to_uid", "==", user.uid).where("status", "==", 1)
                    .onSnapshot(function (snapshot) {
                        if (snapshot.size != 0) {
                            $("#notificationCount").text(snapshot.size);
                            $("#notification_badge").text(snapshot.size);
                        } else {
                            $("#notificationCount").text("");
                            $("#notification_badge").text("");
                        }
                        snapshot.docChanges().forEach(function (change) {
                            if (change.type === "added") {
                                usersRef.doc(change.doc.data().from_uid).get().then(function (doc) {

                                    if (doc.exists) {
                                        var childData = doc.data();
                                        storageRef.child('images/' + childData.photo_url).getDownloadURL().then(function (url) {
                                            var searchlisthtml = '<li class="friend">' 
                                                      + '<div class="friend-body">'
                                                      +	'<img id="friend_user_image" class="user-image" src="'+url+'" alt="">'
                                                      +	'<div class="user-info"><p id="" class="user-full-name">'+childData.first_name+ ' ' +childData.last_name+'</p>'
                                                      +	'<input type="hidden" class="user-uid" value="'+childData.uid+'"/>'
                                                      +	'<input type="hidden" class="from-uid" value="'+change.doc.data().from_uid+'"/>'
                                                      +	'<input type="hidden" class="friendship-uid" value="'+change.doc.id+'"/>'
                                                      +	'<input type="hidden" class="user-status" value="'+childData.is_active+'"/>'
                                                      + '<p class="user-thought">'+childData.mood+'</p></div>'
                                                      + '<div class="request-status">'
                                                      + '<button type="submit" class="btn btn-success btn-raised btn-fab btn-round acceptBtn"><i class="material-icons">done</i></button>'
                                                      + '<button type="submit" class="btn btn-danger btn-raised btn-fab btn-round rejectBtn"><i class="material-icons">close</i></button>'
                                                      + '</div>'
                                                      + '</div>'
                                                      + '</li>';

                                            $(".notification-list").append(searchlisthtml);
                                            
                                            $.notify(childData.first_name + " has sent you a request", { title: "Friend Request!" }, { url: url});

                                        });
                                    }
                                })
                            }
                        });
                    });
                
                
                $(".channel-list").html("");
                     dbRef.collection("channels").where("status", "==", 1).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) { 
            
                var childData = doc.data();
                 
                     
                    var channellisthtml =  '<li class="channel">' 
                                          + '<div class="channel-body">'
                                          +	'<img id="channel_image" class="user-image" src="assets/img/channel.jpg" alt="">'
                                          + '<a href="#" class="badge badge-dark">Join Here</a>'
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

          
        });
    });
 
                
                
                
              if(doc.data().photo_url != ""){
                 storageRef.child('images/' + doc.data().photo_url).getDownloadURL().then(function (url) {
                    $("#currentUserImg").attr("src", url);
                    $("#content_loading").addClass("hidden");
                    $(".main-container").removeClass("hidden");
                     
                     
                });
                }
            } else {
                console.log("No such document!");
            }

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    } else {
        loadPage("pages/login.html");
    }
});   
    
*/
