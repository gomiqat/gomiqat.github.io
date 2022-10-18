function getAction(me, text, friend){

switch (text) {
    case "hug":
        return '<span class="color-red">**'+me+' is huggimg '+friend+'**</span>';
        break;
    case "roll":
        var rand = Math.floor(Math.random() * (100 - 0) + 0);
        return '<span class="color-green">**'+me+' has rolled '+rand+'**</span>';
        break;
    case "thank":
        return '<span class="color-red">**'+me+' is appreciating '+friend+'**</span>';
        break;
    case "sing":
        return '<span class="color-red">**'+me+' is singing a song la la la la ... **</span>';
        break;
    case "power":
         var strength = Math.floor(Math.random() * (100 - 0) + 0);
         var weakness = Math.floor(Math.random() * (100 - 0) + 0);
         var love = Math.floor(Math.random() * (100 - 0) + 0);
        return '<span class="color-red">**'+me+'\'s current strength <i class="material-icons">accessibility</i> '+strength+'%, weakness <i class="material-icons">sentiment_very_dissatisfied</i> '+weakness+'% and love <i class="material-icons">spa</i> '+love+'%. Cheers !**</span>';
        break;
    case "pinch":
         return '<span class="color-red">**'+me+' just pinched '+friend+'**</span>';
         break;
    case  "brb":
         return '<span class="color-blue">**'+me+' will be right back**</span>';
 }
}