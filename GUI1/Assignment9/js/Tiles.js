
var Rack = [];
var letters = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Tiles function is to give the 7 letterss on the rack for playing the scrabble game
function Tiles(){
	var tile = "";
	tile += '<table id="TilesRack"><tr>';
	for (var i=0; i < 7; i++){
		// http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
		// generate random letters from the letters
		var index = Math.floor(Math.random() * letters.length);
		
		// loop the letters array to see if there is anything letters left
		while(ScrabbleTiles[letters[index]].numberRemaining === 0 ){
			index = Math.floor(Math.random() * letters.length);
		}
		// Get letterss link
		var urlletters = "images/Scrabble_Tile_" + letters[index] + ".jpg";
		tile += "<td><img id='tile_drag_" + i + "' class='board_piece_" + letters[index] + "' src='" + urlletters + "'></img></td>";
		
		ScrabbleTiles[letters[index]].numberRemaining = ScrabbleTiles[letters[index]].numberRemaining - 1;
		
		Rack.push({"letters": letters[index], "id" : "dragTile_" + i, "value" : ScrabbleTiles[letters[index]].value})
	}
	tile += '</tr></table>';
	//$("#score").html(score);
	$("#Tiles").html(tile);
	// call UpdateRemainWord that we know how many tiles we have 
	// at the start
	UpdateRemainWord();
}

// shuffle tiles function is generated after the user hits the shuffle button
// to get different tiels on the rack 
function shuffleTiles(){
	// initialized the rack tiles ID
	var rackID = $("#scrabbleBoard").find('td');
	rackID.each(function() {
		if($(this)[0].id == "dropped"){
			$(this)[0].innerHTML = "";
			removeDroppedID();
		}
	});
	
	// for (var i = 0; i < Rack.length; i++){
        // var lettr = Rack[i].Letter;
        // ScrabbleTiles[lettr].numberRemaining += 1;
  // }
	
	// Rack = [];
	UpdateRemainWord();
	Tiles();
	DragAndDrop();	
}

function returnTilesToRack(){
	var  rid = $("#scrabbleBoard").find('td');
	rid.each(function() {
			if (String($(this)[0].id) === "dropped"){
					$(this).removeAttr('id');
					$(this)[0].firstChild.outerHTML = "";
			}
	});

	var tile = "";
	tile += '<table id="TilesRack"><tr>';
	var j = 0;
	rid = $("#Tiles").find('td');
	for ( var i = 0; i < rid.length; i++){
			if (i < Rack.length) {
					tile += "<td>" + Rack[j].Link + "</td>";
					j++;
			} else {
					tile += "<td></td>";
			}
	}    
	tile += '</tr></table>';
	$("#Tiles").html(tile);
}
