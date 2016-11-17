$(function() {
	// create backgroundColor var for the value of the background-color
  var backgroundColor = $('li').css('background-color');
	// write the background color of the first list item
  $('ul').append('<p>Color was: ' + backgroundColor + '</p>');
	// update CSS properties
  $('li').css({
    'background-color': '#C5A996',
    'border': '1px solid #fff',
    'color': '#000',
    'text-shadow': 'none',
    'font-family': 'Georgia'
  });
});
