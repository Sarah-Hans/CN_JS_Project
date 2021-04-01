$(document).ready(function(){
    jQuery('#slider').skdslider({
        // Delay duration between two slides
        'delay':5000, 
        // <a href="https://www.jqueryscript.net/animation/">Animation</a> speed
        'animationSpeed': 500,
        // Show navigation
        showNav: true,
        // Show/hide navigation icon.
        'showNextPrev': true, 
        // If true, navigation will be numeric
        'numericNav': false,
        // Enable auto play
        'autoSlide': true,
        // Pause on hover
        'pauseOnHover':false,
        // Show play button
        'showPlayButton':false,
        // Stop sliding when reaching the last slide
        stopSlidingAfter: false,
        // fading or sliding
        animationType: 'fading',
        // Selector of slides
        slideSelector: '.slide',
        // Active class
        activeClass: 'active',
        // callback
        onMarkup: function() {},
      });
    $('.slide').first().click();
  });