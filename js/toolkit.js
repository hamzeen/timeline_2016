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

  // image slides for 'Things To Do'
  $(".things_to_do h1").click(function() {
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

  // open overlay
  $("#sg_btn_more").click(function() {
    $(this).addClass("transform");
    $("body").css({overflow: "hidden"});
    $("#sg_overlay_bg").addClass("show");
    $("#sg_overlay_wrap").addClass("show");
    $(".overlay_close").addClass("open");
  });

  // close overlay
  $("#sg_overlay_close").click(function() {
    $("#sg_btn_more").removeClass("transform");
    $("body").css({overflow: "auto"});
    $("#sg_overlay_bg").removeClass("show");
    $("#sg_overlay_wrap").removeClass("show");
    $(this).removeClass("open");
  });

  stickyHeaders.load($(".followMeBar"));
  $(window).scroll(function() {
    var winTop = $(window).scrollTop();
    /*if(winTop >= ($(window).height()/3)) {
      $("body").addClass("sticky-header");
    } else{
      $("body").removeClass("sticky-header");
    }*/ // earlier used for toggle scaling of intro text

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
