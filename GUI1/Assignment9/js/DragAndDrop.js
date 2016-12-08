/******
	File: /~ckim/GUI1/Assignment9/js/Assignment9.js
  COMP4610 GUI Programming I Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
  Chhun Kim, UMASS Lowell Computer Science, chhun_kim@student.uml.edu
  Copyright (c) 2016 by Chhun Kim. All rights reserved.
		Created by CK on 12/06/2016
		
	Most of code was token and modified from Chong Vu: http://www.cs.uml.edu/~cvu/HW9/js/hw9.js
	*****/
	
// call both Drag and Drop function
function DragAndDrop(){
	Draggable();
	Droppable();
}

function Draggable(){
	for (var i = 0; i < 7; i++) {
        // // Credit to Jason for draggable and back to original position
        // // https://github.com/JasonD94/GUI/blob/gh-pages/js/scrabble/draggable.js
        
        $("#tile_drag_" + i).draggable ({
            revert: "invalid",            // This is key. Only the rack and game board are considered valid!
            start: function(ev, ui) {
                // Save original position. (used for swapping tiles)
                startPos = ui.helper.position();  // startPos is a global variable found in variables.js
            },
            stop: function() {
                // If an invalid event is found, this will return the draggable object to its
                // default "invalid" option. From this Stackoverflow post (also used in the droppable part.)
                $(this).draggable('option', 'revert', 'invalid');
            }

        }); // end draggable
    } // end for loop
}

function Droppable(){
	// droppable to scrabbleBoard
	// http://jsfiddle.net/awsFU/
	
	$("#scrabbleBoard td").droppable ({    // select all td tab in scrabbleBoard
		accept: ".ui-draggable", // accept class ui-draggable after generate by draggable function
		tolerance: 'intersect',     // Draggable overlaps the droppable at least 50% in both directions.
		revert: "invalid",  // this is to make sure that it can be drop, key for check valid
		drop: function (event, ui) {
				if ($(this).attr('id') == undefined) {
						$(this)[0].id = $(this)[0].id + " dropped"; // get the id of the td
						ui.draggable[0].style.cssText = "";     // chagne the css style of the img dragg
						var img = ui.draggable[0].outerHTML;    // get the dragged content

						var strID = String($(this)[0].id);      // get the id from the td
						var match = strID.match(/(.+)(dropped)/);   // using regex to make a groups of substrings
						
						// combine to get te new td tag
						var newTD = '<td class="' + $(this)[0].className + '" id="' + match[2] + '">' + img + '</td>';
						// console.log("check", newTD);
						// replace td tab to new td tab
						$(this)[0].outerHTML = newTD;

						// remove current dragging 
						ui.draggable[0].outerHTML = "";
						
						// call the drag and drop function
						DragAndDrop()
						
						// remove the id after drop on the board
						removeDroppedID();

				} else {
						// console.log("false");
						// check if the td already have letter, if true then letter will auto return back to the rack
						ui.draggable.draggable('option', 'revert', true);
						return;
				}
		},
		// remove id if the letter is dragged to other place from the table cell
		out: function (event, ui) {
				//$(this).removeAttr('id');
		}
	});

	// Allow to drag back to the Rack
	$("#Tiles td").droppable ({
		accept: ".ui-draggable",    // accept class ui-draggable after generate by draggable function
		drop: function (event, ui) {
				ReworkBoardGame();
		},
		out: function (event, ui) {
				$(this).removeAttr('id');
		}
	});
}

// remove 
function removeDroppedID(){
	// dID variable is initialized to delete the "dropped" ID
	// after dropped on the board
	var dID = $("#scrabbleBoard").find("td");
	dID.each(function() {
		if($(this)[0].childElementCount == 0 && $(this)[0].id != ""){
			$(this).removeAttr('id');
		}
	});
}