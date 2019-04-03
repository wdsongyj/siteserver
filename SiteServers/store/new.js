$(document).ready(function(){
    $('.sidelist').mousemove(function(){
	$(this).find('.i-list').show();
	$(this).find('h3').addClass('hover');
	});
	$('.sidelist').mouseleave(function(){
	$(this).find('.i-list').hide();
	$(this).find('h3').removeClass('hover');
	});
});
//Download by http://www.codefans.net
//slideUp