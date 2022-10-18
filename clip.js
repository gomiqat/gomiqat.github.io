/*--------firebase login function-------------*/
$('#login_password').keypress(function (e) {
    if (e.keyCode == 13) {
        doLogin();
    }
});
$('#login_btn').on('click', function () {
    doLogin();
});


function doLogin() {
    $("#login_btn").addClass("hidden");
    $("#login_loading").removeClass("hidden");
    var loginInfo = {
        email: $('#login_email').val(),
        password: $('#login_password').val()
    };

    if (loginInfo.email !== '' && loginInfo.password !== '') {

        auth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
            .then(function (authData) {
                loadPage("pages/app.html");
            }).catch(function (error) {
                  $("#login_btn").removeClass("hidden");
                  $("#login_loading").addClass("hidden");
                console.log("Login Failed!", error);
            });
    }
}


var provider = new firebase.auth.FacebookAuthProvider();
$("#login_by_fb").on("click", function(){

  firebase.auth().signInWithPopup(provider)
   .then(function(result) {
    $("#login_btn").addClass("hidden");
    $("#go_register_btn").addClass("hidden");
    $("#fb_login_loading").removeClass("hidden");
    $("#loading_text").removeClass("hidden");
   
    
    var token = result.credential.accessToken;
    var fbuser = result.user;
    var uid = fbuser.uid;
    
    var email = fbuser.email;
    var name = fbuser.displayName;
    var photo = fbuser.photoURL;
      console.log(photo);
    var firstName = name.split(' ').slice(0, -1).join(' ');
    var lastName = name.split(' ').slice(-1).join(' ');
        var date = moment().format('LL');
        var day = moment().format('dddd');
        var time = moment().format('LT');
        var createtime = Date.now();
      var img = new Image();
      img.src = "http://yinoneliraz-001-site1.smarterasp.net/MyPicture.png?time=" + (new Date()).getTime();



   }).catch(function(error) {

  });
})


<!--    <div id="content_loading">
             <img src="/assets/img/content_loading.gif" id="fb_login_loading">
    </div>-->