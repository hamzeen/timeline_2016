var stickyHeaders = (function() {
  var $window = $(window),$stickies;

  var load = function(stickies) {
    // console.log("onLoad");
    if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {
      $stickies = stickies.each(function() {
        var $thisSticky = $(this).wrap('<div class="followWrap" />');
        $thisSticky
            .data('originalPosition', $thisSticky.offset().top)
            .data('originalHeight', $thisSticky.outerHeight())
              .parent()
              .height($thisSticky.outerHeight());
      });

      $window.off("scroll.stickies").on("scroll.stickies", function() {
        this.load;
		      _whenScrolling();
      });
    }
  };

  var _whenScrolling = function() {
    // console.log($window.scrollTop());
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

  return {
    load: load
  };
})();

$(document).ready(function() {
  setTimeout(function() {
    $(".intro").addClass("show");
  }, 500);

  setTimeout(function() {
    $(".secondary").addClass("show");
  }, 1350);
});

$(function() {
  stickyHeaders.load($(".followMeBar"));
  $(window).scroll(function(){
    var winTop = $(window).scrollTop();
    if(winTop >= ($(window).height()/3)) {
      $("body").addClass("sticky-header");
      //$($(".followMeBar")[0]).addClass("fixed");
    } else{
      $("body").removeClass("sticky-header");
    }

    if(winTop >= $(window).height() - 20) {
      $(".slide-progress-container").addClass("show");
    } else{
      $(".slide-progress-container").removeClass("show");
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
