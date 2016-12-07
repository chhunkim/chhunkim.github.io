
var Rack = [];

// Tiles function is to give the 7 letters on the rack for playing the scrabble game
function Tiles(){
	var tile = "";
	var letter = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	tile += '<table id="TilesRack"><tr>';
	for (var i=0; i < 7; i++){
		// http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
		// generate random letter from the letter
		var index = Math.floor(Math.random() * letter.length);
		
		// loop the letter array to see if there is anything letter left
		while(ScrabbleTiles[letter[index]].number_remaining === 0 ){
			index = Math.floor(Math.random() * letter.length);
		}
		// Get letters link
		var urlLetter = "images/Scrabble_Tile_" + letter[index] + ".jpg";
		tile += "<td><img id='tile_drag_" + i + "' class='board_piece_" + letter[index] + "' src='" + urlLetter + "'></img></td>";
		
		ScrabbleTiles[letter[index]].number_remaining = ScrabbleTiles[letter[index]].number_remaining - 1;
		
		Rack.push({"Letter": letter[index], "id" : "dragTile_" + i, "value" : ScrabbleTiles[letter[index]].value})
	}
	tile += '</tr></table>';
	//$("#score").html(score);
	$("#Tiles").html(tile);
	
}