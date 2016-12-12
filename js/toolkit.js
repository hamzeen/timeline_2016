/* Sticky headers */
var stickyHeaders = (function() {
  var $window = $(window),$stickies;

  var load = function(stickies) {
    if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {
      $stickies = stickies.each(function() {
        var $thisSticky = $(this).wrap('<div class="followWrap" />');
        $thisSticky
            .data('originalPosition', $thisSticky.offset().top)
            .data('originalHeight', $thisSticky.outerHeight())
              .parent()
              .height($thisSticky.outerHeight());
      });

      // event listeners
      $window.off("scroll.stickies").on("scroll.stickies", function() {
        this.load;
		    _whenScrolling();
      });
      $window.resize(function() {
        this.load;
        _whenScrolling();
      });
    }
  };

  var _whenScrolling = function() { // console.log($window.scrollTop());
    $stickies.each(function(i) {
      var $thisSticky = $(this), $stickyPosition = $thisSticky.data('originalPosition');
      if ($stickyPosition <= $window.scrollTop()) {

        var $nextSticky = $stickies.eq(i + 1),
            $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');
        $thisSticky.addClass("fixed");
        if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {
          $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
        }

      } else {
        var $prevSticky = $stickies.eq(i - 1);
        $thisSticky.removeClass("fixed");
        if ($prevSticky.length > 0 && $window.scrollTop() <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {
          $prevSticky.removeClass("absolute").removeAttr("style");
        }
      }
    });
  };

  return { load: load };
})(); /*<!-- Sticky headers //-->*/

function labs() {
  setTimeout(function() {
    $(".intro").addClass("show");
  }, 800);

  setTimeout(function() {
    $(".secondary").addClass("show");
  }, 1400);
}
$(document).ready(function() {
  labs();
});

/* anonymous function for triggering all other animations & compoents appearances */
$(function() {

  // image slider for 'Things To Do'
  $("#sg_things_to_do h1").click(function() {
    var src = $(this).attr('ref');
    /*$("#sg_slides img").animate({ "opacity": "0" }, "100" );
    $("#sg_slides img").attr('src','slides/'+$(this).attr('ref'));
    $("#sg_slides img").animate({ "opacity": "1" }, "500" );*/
    $("#sg_slides img").fadeOut(function() {
      $("#sg_slides img").fadeTo("0", .4);
      $("#sg_slides img").attr('src','slides/' + src);
      $("#sg_slides img").fadeTo("fast", 1.0);
    });
  });

  $("#ch_things_to_do h1").click(function() {
    var src = $(this).attr('ref');
    //$("#ch_slides img").fadeOut(function() {
      $("#ch_slides img").fadeTo("0", .4);
      $("#ch_slides img").attr('src','slides/' + src);
      $("#ch_slides img").fadeTo("fast", 1.0);
    //});
  });

  $("#kl_things_to_do h1").click(function() {
    var src = $(this).attr('ref');
    //$("#ch_slides img").fadeOut(function() {
      $("#kl_slides img").fadeTo("0", .4);
      $("#kl_slides img").attr('src','slides/' + src);
      $("#kl_slides img").fadeTo("medium", 1.0);
    //});
  });

  $("#jkt_things_to_do h1").click(function() {
    var src = $(this).attr('ref');
    //$("#ch_slides img").fadeOut(function() {
      $("#jkt_slides img").fadeTo("0", .4);
      $("#jkt_slides img").attr('src','slides/' + src);
      $("#jkt_slides img").fadeTo("medium", 1.0);
    //});
  });

  // open overlay
  $(".btn_more").click(function() {
    console.log("Idx: " + $('.btn_more').index(this));
    var winTop = $(window).scrollTop();
    if(winTop >= $(window).height() - 20) {
      $(".slide-progress-container").removeClass("show");
    }

    switch($('.btn_more').index(this)) {

      case 0: // open singapore overlay
        console.log("Hello Singapore!");
        $(this).addClass("transform");
        $("body").css({overflow: "hidden"});
        $("#sg_overlay_bg").addClass("show");
        $("#sg_overlay_wrap").addClass("show");
        $("#sg_overlay_close").addClass("open");
      break;

      case 1:// open chennai overlay
        console.log("Hello Chennai!");
        $(this).addClass("transform");
        $("body").css({overflow: "hidden"});
        $("#in_overlay_bg").addClass("show");
        $("#in_overlay_wrap").addClass("show");
        $("#in_overlay_close").addClass("open");
      break;

      case 2:// open malaysia overlay
        console.log("Hello KL!");
        $(this).addClass("transform");
        $("body").css({overflow: "hidden"});
        $("#my_overlay_bg").addClass("show");
        $("#my_overlay_wrap").addClass("show");
        $("#my_overlay_close").addClass("open");
      break;

      case 3:// open jakarta overlay
        console.log("Hello Jakarta!");
        $(this).addClass("transform");
        $("body").css({overflow: "hidden"});
        $("#jkt_overlay_bg").addClass("show");
        $("#jkt_overlay_wrap").addClass("show");
        $("#jkt_overlay_close").addClass("open");
      break;

      default:
      break;
    }
  });

  // close overlay
  $(".overlay_close").click(function() {
    console.log("Idx: " + $('.overlay_close').index(this));
    var winTop = $(window).scrollTop();
    if(winTop >= $(window).height() - 20) {
      $(".slide-progress-container").addClass("show");
    }

    switch($('.overlay_close').index(this)) {

      case 0: // close singapore overlay
        console.log("Closing Singapore!");
        $("#sg_btn_more").removeClass("transform");
        $("body").css({overflow: "auto"});
        $("#sg_overlay_bg").removeClass("show");
        $("#sg_overlay_wrap").removeClass("show");
        $(this).removeClass("open");
      break;

      case 1: // close chennai overlay
        console.log("Closing India!");
        $("#in_btn_more").removeClass("transform");
        $("body").css({overflow: "auto"});
        $("#in_overlay_bg").removeClass("show");
        $("#in_overlay_wrap").removeClass("show");
        $(this).removeClass("open");
      break;

      case 2: // close malaysia overlay
        console.log("Closing Malaysia!");
        $("#my_btn_more").removeClass("transform");
        $("body").css({overflow: "auto"});
        $("#my_overlay_bg").removeClass("show");
        $("#my_overlay_wrap").removeClass("show");
        $(this).removeClass("open");
      break;

      case 3: // close jakarta overlay
        console.log("Closing Indonesia!");
        $("#jkt_btn_more").removeClass("transform");
        $("body").css({overflow: "auto"});
        $("#jkt_overlay_bg").removeClass("show");
        $("#jkt_overlay_wrap").removeClass("show");
        $(this).removeClass("open");
      break;

      default:
      break;
    }
  });

  stickyHeaders.load($(".followMeBar"));
  $(window).scroll(function() {
    var winTop = $(window).scrollTop();

    if(winTop >= 20 && $(window).width() >= 280 && $(window).height() >= 220) {
      $("#credits").css("height","50px");
    } else {
      $("#credits").css("height","0px");
    }

    if(winTop >= $(window).height() - 20) {
      $(".slide-progress-container").addClass("show");
      $(".intro").removeClass("show");
      $(".secondary").removeClass("show");
    } else{
      $(".slide-progress-container").removeClass("show");
      labs();
    }

    //update progress transform: translate3d(50%, 0px, 0px);
    var scrollPercentage = 100 * (winTop - ($(window).height()+0)) / (3 * $(window).height());
    if(scrollPercentage<=100) {
      $(".slide-progress").css("transform", "translate3d(" + scrollPercentage + "%, 0px, 0px)");
    } else {
      $(".slide-progress").css("transform", "translate3d(" + scrollPercentage + "%, 0px, 0px)");
      $(".slide-progress").css("left", "-" + scrollPercentage + "%");
    }
  });
});
