
$("#skip_update_profile").on('click', function(){
      $(".edit-profile").addClass("hidden");
})
$("#update_profile").on('click', function(){
     $("#skip_update_profile").addClass("hidden");
     $("#update_profile").addClass("hidden");
     $("#update_loading").removeClass("hidden");
 
    var profileData;
if(file == ""){
    profileData = {
  /*  first_name : "",
    last_name : "",*/
    username : $("#user_name").val(),
    mood : $("#user_mood").val(),
    recovery_email : $("#user_rec_email").val(),
    phone : $("#user_phone_no").val(),
    gender : "",
    birth_date :  $('#date').val()
    
}
    
}else{
    profileData = {
    photo_url : currentUser.uid+".jpg",
  /*  first_name : "",
    last_name : "",*/
    username : $("#user_name").val(),
    recovery_email : $("#user_rec_email").val(),
    phone : $("#user_phone_no").val(),
    gender : "",
    birth_date :  $('#date').val()
    
}
}


  usersRef.doc(currentUser.uid)
        .update(profileData)
        .then(function() {
            $("#currenUserStatus").text(profileData.mood);   
            imageUpload(file);
         });
     
})

