$(function() {
	// select ul and add an element before fresh figs
	$('ul').before('<p>Just updated</p>');
	// add "+" for uls
	$('li.hot').prepend('+ ');
	// create a new variable for the last item
	var $newItem = $('<li><em>gluten-free</em> soy source</li>');
	$('li:last').after($newItem); // then insert it in the last
});