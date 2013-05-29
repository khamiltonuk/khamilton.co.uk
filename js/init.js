$(document).ready(function() {

	// Show or hide the sticky footer button
			$(window).scroll(function() {
				if ($(this).scrollTop() > 200) {
					$('.go-top').fadeIn(200);
				} else {
					$('.go-top').fadeOut(200);
				}
			});
			
			// Animate the scroll to top
			$('.go-top').click(function(event) {
				event.preventDefault();
				
				$('html, body').animate({scrollTop: 0}, 300 , 'swing');
			})

	function runfade(){
	    $('#quotes li:gt(0)').hide();
	    var start = setInterval(function(){
	      $('#quotes li:first-child').fadeOut()
	         .next('#quotes > li').fadeIn()
	         .end().appendTo('#quotes');}, 
	      7000);
	};
	runfade();

	// global variables for script
  var current, size;
  
  $('.lightboxTrigger').click(function(e) {
    
    // prevent default click event
    e.preventDefault();
    
    // grab href from clicked element
    var image_href = $(this).attr("href");
     var image_title = $(this).attr("caption");
    
    // determine the index of clicked trigger
    var slideNum = $('.lightboxTrigger').index(this);
    
    // find out if #lightbox exists
    if ($('#lightbox').length > 0) {        
      // #lightbox exists
      $('#lightbox').fadeIn(300);
      // #lightbox does not exist - create and insert (runs 1st time only)
    } else {                                
      // create HTML markup for lightbox window
      var lightbox =
          '<div id="lightbox">' +
          '<div id="slideshow"><div class="slideshow-container"><p class="cross">Click to close</p>' +
          '<ul></ul>' +        
          '<div class="nav">' +
          '<a href="#prev" rel="prev" class="prev slide-nav">prev</a>' +
          '<a href="#next" rel="next" class="next slide-nav">next</a>' +
          '</div>' +
          '</div>' +
          '<div id="text"></div>' +
          '</div>';
      
      //insert lightbox HTML into page
      $('body').append(lightbox);
        
      
      // fill lightbox with .lightboxTrigger hrefs in #imageSet
      $('#imageSet').find('.lightboxTrigger').each(function() {
        var $href = $(this).attr('href');
          var image_alt = $(this).attr("title");
         var image_title = $(this).attr("caption");
          
        $('#slideshow ul').append(
          '<li>' +
          '<img src="' + $href + '" alt="' + image_alt +' ">' +
          '</li>'
        );
          $('#text').append(
          '<p class="product-info">' + image_title + '</p>'
          );
      });
      
    }
    
    // setting size based on number of objects in slideshow
    size = $('#slideshow ul > li').length;
    
    // hide all slide, then show the selected slide
    $('#slideshow ul > li').hide();
      $('p.product-info').hide();
    $('#slideshow ul > li:eq(' + slideNum + ')').show();
      $('p.product-info:eq(' + slideNum + ')').show();
    
    // set current to selected slide
    current = slideNum;
  });
  
  //Click anywhere on the page to get rid of lightbox window
  $('body').on('click', '#lightbox', function() { // using .on() instead of .live(). more modern, and fixes event bubbling issues
    $('#lightbox').fadeOut(300);
  });
  
  // show/hide navigation when hovering over #slideshow
  $('body').on(
    { mouseenter: function() {
      $('.nav').fadeIn(300);
    }, mouseleave: function() {
      $('.nav').fadeOut(300);
    }
    },'#slideshow');
  
  // navigation prev/next
  $('body').on('click', '.slide-nav', function(e, image_title) {
    
    // prevent default click event, and prevent event bubbling to prevent lightbox from closing
    e.preventDefault();
    e.stopPropagation();
    
    var $this = $(this);
    var dest;
    
    // looking for .prev
    if ($this.hasClass('prev')) {
      dest = current - 1;
      if (dest < 0) {
        dest = size - 1;
      }
    } else {
      // in absence of .prev, assume .next
      dest = current + 1;
      if (dest > size - 1) {
        dest = 0;
      }
    }
    
    // fadeOut curent slide, FadeIn next/prev slide
    $('#slideshow ul > li:eq(' + current + ')').stop(true,true).fadeOut(750);
    $('#slideshow ul > li:eq(' + dest + ')').fadeIn(750);
      $('.product-info').hide();
      $('.product-info:eq(' + dest + ')').show();
      //product-info').text(image_title);
      
    // update current slide
    current = dest;
  });
});