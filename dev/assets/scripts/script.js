// Menu feedback
$(document).ready(function(){

  var navLink = $('.menu-link'),
     local = window.location.pathname.split('/').pop();

  menuFeedback();

  function menuFeedback() {
    navLink.each(function(){
      if ($(this).attr('href') == local ) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  };

  if(local == "") {
    $('.menu-link:first').addClass('active');
  }

});
