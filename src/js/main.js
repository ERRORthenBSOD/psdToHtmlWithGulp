$(document).ready(() => {
  new WOW().init();
  $('.js-wp-2').waypoint(
    direction => {
      $('.js-wp-2').addClass('animated slideInUp');
    },
    {
      offset: '70%'
    }
  );
  $('.burger-nav').on('click', () => {
    $('.container nav ul').toggleClass('open');
  });
  $('.iphone-btn')
    .delay(2300)
    .animate({ bottom: '+=-3' }, 300);
  $('.iphone-btn')
    .delay(300)
    .animate({ top: '+=-3' }, 100);
  $('.iphone-on')
    .delay(2800)
    .queue(function() {
      $(this).addClass('animated fadeIn');
    });
});
