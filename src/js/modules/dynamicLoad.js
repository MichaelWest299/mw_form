//Define global namespace
var mw_app = mw_app || {};

mw_app.dynamicLoad = (function() {

  var current_fs, next_fs, previous_fs; //fieldsets
  var left, opacity, scale; //fieldset properties which we will animate
  var animating; //flag to prevent quick multi-click glitches

  var _cacheDom = function() {
    this.$visible = $('fieldset:visible');
  };

  var _animationSettings = {
    duration: 800,
    stepNext: function(currentOpacity) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale current_fs down to 80%
      scale = 1 - (1 - currentOpacity) * 0.2;
      //2. bring next_fs from the right(50%)
      left = (currentOpacity * 50) + "%";
      //3. increase opacity of next_fs to 1 as it moves in
      opacity = 0.7 - currentOpacity;
      current_fs.css({
        'transform': 'scale(' + scale + ')'
      });
      next_fs.css({
        'left': left,
        'opacity': opacity
      });
    },
    stepPrev: function(currentOpacity) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - currentOpacity) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = ((1 - currentOpacity) * 50) + "%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 0.7 - currentOpacity;
      current_fs.css({
        'left': left
      });
      previous_fs.css({
        'transform': 'scale(' + scale + ')',
        'opacity': opacity
      });
    },
    complete: function() {
      current_fs.hide();
      animating = false;
    }
  };

  var _animateNext = function() {
    if (animating) return false;
    animating = true;
    _cacheDom();
    current_fs = this.$visible;
    next_fs = this.$visible.next();
    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
      opacity: 0
    }, {
      step: function(currentOpacity) {
        _animationSettings.stepNext(currentOpacity);
      },
      duration: _animationSettings.duration,
      complete: function() {
        _animationSettings.complete();
      }
    });
  };

  var _animatePrev = function() {
    if (animating) return false;
    animating = true;
    _cacheDom();
    current_fs = this.$visible;
    previous_fs = this.$visible.prev();
    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
      opacity: 0
    }, {
      step: function(currentOpacity) {
        _animationSettings.stepPrev(currentOpacity);
      },
      duration: _animationSettings.duration,
      complete: function() {
        _animationSettings.complete();
      }
    });
  };

  var _eventNext = function() {
    $('.next').on('click', function(e) {
      _animateNext();
    });
  };

  var _eventPrev = function() {
    $('.previous').on('click', function(e) {
      _animatePrev();
    });
  };

  var _eventStartAgain = function() {
    $('.startagain').on('click', function(e) {
      location.reload();
    });
  };

  var init = function() {
    _eventNext();
    _eventPrev();
    _eventStartAgain();
  };

  return {
    init: init
  };
}());
