$(document).ready(function(){

    $(".page-scroll").click(function(){
        var $target = this.hash;
        $('html, body').animate({
          scrollTop: $target.offset().top
      }, 1000);
    });
});