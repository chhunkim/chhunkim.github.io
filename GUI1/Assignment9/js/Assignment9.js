/******
	File: /~ckim/GUI1/Assignment9/js/Assignment9.js
  COMP4610 GUI Programming I Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
  Chhun Kim, UMASS Lowell Computer Science, chhun_kim@student.uml.edu
  Copyright (c) 2016 by Chhun Kim. All rights reserved.
  
	This Assignment is buldling up from Assginment 6 and 7;
		Created by CK on 11/14/2016 
		Updated by CK on 11/16/2016
		Updated by CK on 11/22/2016
		Updated by CK on 12/04/2016
		Updated by CK on 12/08/2016
		Updated by CK on 12/09/2016
		
	Note that: I work with Chong Vu, and we are agreed to let me use most of his code.
	*****/

	
// global variable for Word check
var WordCheck = "";
// Use to update the total score
var word_score = 0;
var word_length = 0;

// playingGame is function that generates the board and start play game
function playingGame(){
	// call the Board function to generate the board
	Board();
	// reset so it display the remaining letter table as a start
	resetButton();
	// call the Tiles function to generate tiles
	Tiles();
	// call Droppable function
	DragAndDrop();
}
	
$().ready(function(){
	// Execute playingGame funciton to load the game
	playingGame();
	
	// reset game button
	$("#reset").click(function(){
		resetButton(); // reset button function is allowed users to reset the game
		DragAndDrop(); // Drag and Drop function is allowed users to drag and drop tiles
	});
	
	$("#returnTiles").click(function(){
		returnTilesToRack();
		DragAndDrop(); // Drag and Drop function is allowed users to drag and drop tiles
	});	

	// shuffle tiles button
	$("#shuffle").click (function() {
		shuffleTiles();
		DragAndDrop();
	});
	
	// clear board button
	$("#clear").click(function(){
		Board();
		word_length = 0;
		DragAndDrop();
	});
	
	$("#endturn").click(function(){
		endTurnButton();
		DragAndDrop(); // Drag and Drop function is allowed users to drag and drop tiles
	});
});
 
// Do a jQuery Ajax request for the text dictionary
$.get( "dict/dict.txt", function( txt ) {
	// The dictionary lookup object
	var dict = {};
	// Get an array of all the words
  var words = txt.split( "\n" );
 
  // And add them as properties to the dictionary lookup
  // This will allow for fast lookups later
  for ( var i = 0; i < words.length; i++ ) {
    dict[ words[i] ] = true;
  }
});
 
// Modified to only pass in one word, which can then be verified.
function findWord( word ) {
  // See if it's in the dictionary
  if ( dict[ word ] ) {
    // If it is, return that word
    return word;
  }

    // Otherwise, it isn't in the dictionary.
  return "_____";
}

// After the user hits the reset button 
// it will refresh the game to where it started
function resetButton(){
	// initialized letter to get back all the letters
	var letters = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for(var i = 0; i < letters.length; i++){
		ScrabbleTiles[letters[i]].numberRemaining = ScrabbleTiles[letters[i]].originalDistribution;
	}
	word_score = 0;
	Board();
	Tiles();
	UpdateRemainWord();
}

// calculateScore is function calculate the valid words that already placed on the board
function calculateScore($word) {
	// currentScore will keep the score while the game is still playing
	var currentScore = 0;
	// Calculate the double and triple letter 
	for (var i = 0; i < $word.length; i++) {
		// if the double letter is found, times value of letter by 2
		if (String($word[i].xValue) === "lDouble")
			$word[i].score = parseInt($word[i].Value) * Number(2);
		// if the double letter is found, times value of letter by 2
		else if (String($word[i].xValue) === "lTriple")
			$word[i].score = parseInt($word[i].Value) * Number(3);
		// the score is current score
		else
			$word[i].score = parseInt($word[i].Value)
		
		// add the score together
		currentScore += $word[i].score;
	}
	// Calcuate the double and triple word 
	for (var i = 0; i < $word.length; i++) {
		// if the double word is found, times value of word by 2
		if (String($word[i].xValue) === "wDouble")
			currentScore = parseInt(currentScore) * Number(2);
		 // if the double word is found, times value of word by 3
		else if (String($word[i].xValue) === "wTriple")
			currentScore = parseInt(currentScore) * Number(3);
	}
	return currentScore; // return the score
}


// This function use for check the word is valid or not
function endTurnButton() {
	var Word_Obj = [];
			
	Word_Obj = GetWordFromBoard();
	// check for word is valid or not
	if (word_length != Word_Obj.length) {
		var checkcorrect = CheckWordValid(Word_Obj);
		
		// if the word is valid, then calculate the score
		if(checkcorrect) {
			var Score = GetScore(Word_Obj); // get score return from the word
			AddToTable(Word_Obj);   // add the valid word to the game board so it wont be able to move
			GetNewLetter();
			var word = WordCheck + " is a valid word";
			$(".error").html(word);     // display the message 
			word_score += Score;    // update the score
			word_length = Word_Obj.length;  // update flag for make sure not check the same word again
		} else {
			var word = WordCheck + " is not a valid word";
			$(".error").html(word); // display the message 
			returntorack(); // return all the Letter that is invalid back to rack
		}
		$('#scoreID').html(word_score);   // display the score
		Word_Obj = [];  // empty the object

	} else {
		var word = "Error: There are either NO WORD or WORD THAT ALREADY VALID";
		$(".error").html(word); // display the message 
	}
}
/* For Assignment 8
	I found the good tips from:
	http://www.vikaskbh.com/form-auto-submission-tips-for-jquery/
for the auto display table after a user inputs in all boxes */
/*
function autoDisplayingTable() {
	// if the form is validated
	if( $("form#tableForm").valid() == true ){
		// Call submit handler
		$("form#tableForm").submit();
	}
}

// Reference sites: https://jqueryvalidation.org/validate/
// 									https://www.sitepoint.com/basic-jquery-form-validation-tutorial/
// validate function is to handle user's inputs.
$().ready(function() {
	// Chong Vu, one of classmates, recommanded me to go on
	// http://jsfiddle.net/sd88wucL/1/
	// So when one of the input is failed the validation,
	// the store current table will be disable
	$("input").on("blur keup", function() {
		if($("#tableForm").valid()) {
			$("#submit").prop("disabled", false);
		}else{
			$("#submit").prop("disabled", "disabled");
		}
	});
	
	// slider UI function
	// Minimum Column Slider
	$("#mincol_slider").slider({
		range: 100,
		min: -50,
		max: 50,
		values:[0],
		slide: function(event, ui){
			$("#minCol").val(ui.value);
			// enable the submit button
			$("#submit_button").prop("disabled", false);
			autoDisplayingTable();
		}
	});
	// Maximum Column Slider
	$("#maxcol_slider").slider({
		range: 100,
		min: -50,
		max: 50,
		values:[0],
		slide: function(event, ui){
			$("#maxCol").val(ui.value);
			// enable the submit button
			$("#submit_button").prop("disabled", false);
			autoDisplayingTable();
		}
	});
	// Minimum Row Slider
	$("#minrow_slider").slider({
		range: 100,
		min: -50,
		max: 50,
		values:[0],
		slide: function(event, ui){
			$("#minRow").val(ui.value);
			// enable the submit button
			$("#submit_button").prop("disabled", false);
			autoDisplayingTable();
		}
	});
	// Maximum Row Slider
	$("#maxrow_slider").slider({
		range: 100,
		min: -50,
		max: 50,
		values:[0],
		slide: function(event, ui){
			$("#maxRow").val(ui.value);
			// enable the submit button
			$("#submit_button").prop("disabled", false);
			autoDisplayingTable();
		}
	});
	
  // Valid function to check the input is smaller or grader based on the source example
  // Source: http://jsfiddle.net/tUPQc/2/
  // Function to check greater which is use in rules for validate
  $.validator.addMethod("greaterThan",
    function (value, element, param) {
      var $min = $(param);
      if (this.settings.onfocusout) {
				$("#submit").prop("disabled", "disabled");
        $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
					$(element).valid();
				});
			}
      return parseInt(value) >= parseInt($min.val());
    }, " Max must be greater than min");

	// Function to check smaller which is use in rules for validate
	$.validator.addMethod("lessThan",
    function (value, element, param) {
      var $max = $(param);
      if (this.settings.onfocusout) {
				$("#submit").prop("disabled", "disabled");
		    $max.off(".validate-lessThan").on("blur.validate-lessThan", function () {
					$(element).valid();
				});
			}
			return parseInt(value) <= parseInt($max.val());
	}, " Min must be smaller than max"); 
    
	// Function to validate all inputs entered by the users	
	$('#tableForm').validate({
		// below is the rules for validating a form,
		// to make sure user typing the correct inputs
		rules: {
			// Minimum Column
			minCol: {
				number: true,
				min: -50,
				max:50,
        lessThan: "#maxCol",
				required: true
			},
			// Maximum Column
			maxCol: {
				number: true,
				min:-50,
				max:50,
        greaterThan: "#minCol",
				required:true
			},
			// Minimum Row
			minRow:{
				number: true,
				min:-50,
				max:50,
        lessThan: "#maxRow",
				required:true
			},
			// Maximum Row
			maxRow:{
				number: true,
				min:-50,
				max:50,
        greaterThan: "#minRow",
				required:true
			}
		},
		
		// These error messages will be displayed when users enter the wrong an input
		messages: {
			minCol: {
				number: "<br/>YOUR INPUT IS INVALID.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				min: "<br/>THE INPUT IS TOO SMALL.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				max: "<br/>THE INPUT IS TOO LARGE.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				required: "<br/>EACH BOX CANNOT BE EMPTY.<br/>VALID INPUT IS BETWEEN -50 TO 50."
			},
			maxCol: {
				number: "<br/>YOUR INPUT IS INVALID.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				min: "<br/>THE INPUT IS TOO SMALL.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				max: "<br/>THE INPUT IS TOO LARGE.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				required: "<br/>EACH BOX CANNOT BE EMPTY.<br/>VALID INPUT IS BETWEEN -50 TO 50."
			},
			minRow: {
				number: "<br/>YOUR INPUT IS INVALID.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				min: "<br/>THE INPUT IS TOO SMALL.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				max: "<br/>THE INPUT IS TOO LARGE.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				required: "<br/>EACH BOX CANNOT BE EMPTY.<br/>VALID INPUT IS BETWEEN -50 TO 50."
			},
			maxRow: {
				number: "<br/>YOUR INPUT IS INVALID.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				min: "<br/>THE INPUT IS TOO SMALL.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				max: "<br/>THE INPUT IS TOO LARGE.<br/>VALID INPUT IS BETWEEN -50 TO 50.",
				required: "<br/>EACH BOX CANNOT BE EMPTY.<br/>VALID INPUT IS BETWEEN -50 TO 50."
			}
		},
		
		// invalidHandler is a function handling invalid inputs, 
		// it is a build-in function in https://jqueryvalidation.org/validate/
		invalidHandler: function() {
			$("#error").empty();
			$("#myTable").empty();
		},
        
    // submitHandler is a function call createTable function to 
    // drawing the table
    submitHandler: function(){
			// calling createTable() to implement the table
      createTable();
      return false;
    },
		
		// The onkeyup event occurs as soon as the user releases a key
		//	in this case, the user switch or release out from a box
		onkeyup: function (element, event){
			// So when call autoDisplayingTable function on keyup,
			// it is automatically generated the table
			autoDisplayingTable();
		}
	});
	
	// Call tableTabs function to store the current table
	tableTabs();
});

// tableTabs function is used for creating a new tab storing
// the current implemented table by jQuery Tabs
// https://jqueryui.com/tabs/
// this function code was token and modified from:
// https://stackoverflow.com/questions/605969/jquery-count-number-of-list-elements
// In this function, I allow to store only 10 tabs
// initialized a number of tab
var numOfTabs = 1;
function tableTabs(){	
	$("#submit").click(function(){
		console.log("function call");
		// initialized index of tab
		var tabIndex = $("#tabs li").length + 1;
		// for debug pupose
		console.log("The current number of tab is: " + tabIndex);

		// Alert the user if the total number of tabs exceed 10.
		if (tabIndex > 10) {
			alert("Sorry, but the tabs can not be store more than 10 tabs. Please remove at least tab to store the current table.");
			return false;
		}
	
		// initialize the jQuery Tab
		$("#tabs").tabs();
		// Get all four values of the current table
		// and display it in a new tab and label that tab with the four parameters
		var minCol = Number(document.getElementById('minCol').value);
		var maxCol = Number(document.getElementById('maxCol').value);
		var minRow = Number(document.getElementById('minRow').value);
		var maxRow = Number(document.getElementById('maxRow').value);
		// Increment the number of tab
		numOfTabs++;
		// Set title of each tab bar
		var title = "<li class='tab'><a href='#tab-" + numOfTabs + "'>" + minCol
								+ " to " + maxCol + " by " + minRow + " to " + maxRow + "</a>"
								+ "<span class='ui-icon ui-icon-close' role='presentation'></span>"
								+ "</li>";
		// create a new title bar
		
		console.log(title);
		$("div#tabs ul").append(title);
		// create the current table
		$("div#tabs").append('<div id="tab-' + numOfTabs + '">' + $("#myTable").html() + '</div>');
		// refresh the tabs div to allow the new tab displays
		$("#tabs").tabs("refresh");
		// make the new active
		 $("#tabs").tabs("option", "active", -1);
		// Remove tab
		$("#tabs").delegate("span.ui-icon-close", "click", function(){
			var panelID = $(this).closest("li").remove().attr("aria-controls");
			$("#" + panelID).remove();
		
			// refresh the tab to make the tab is removed
			try{
				$("#tabs").tabs("refresh");
			}
			catch (error){}
		
			// if tab is 0, remove the tab of table div
			if($('ul li.tab').length == 0){
				try{
					$("#tabs").tabs("destroy");
				}
				catch (error){}
				// this will go back the default
				return false;
			}
		});
		// Remove all tabs fucntion
		$("#removeAllTabs").click(function() {
			// get the number of all tabs
			var totalTabs = $("#tabs li").length;
			while(totalTabs > 0){
				var panelID = $("#tabs li").last().remove().attr("aria-controls");
				$("#" + panelID).remove();
				totalTabs = $("#tabs li").length;
			}
			// reset the number of tab to 1
			numOfTabs = 1;
			$("#tabs").tabs("refresh");
		});
	});
}

// createTable() function called after the submit button has been hit
// to generate the table corespond to the inputs from user
function createTable(){
	// Get value of the Min Column
  //cMin = document.getElementById("minCol").value;
  var cMin = parseInt($('input[name=minCol]').val());
  // Get value of the Max Column
	//cMax = document.getElementById("maxCol").value;
  var cMax = parseInt($('input[name=maxCol]').val());
	// Get value of the Min Row
	//rMin = document.getElementById("minRow").value;
  var rMin = parseInt($('input[name=minRow]').val());
	// Get value of the Max Row
	//rMax = document.getElementById("maxRow").value;
  var rMax = parseInt($('input[name=maxRow]').val());

	// Check to see if the numbers are read correctly.
  console.log("minCol: ", cMin, "maxCol: ", cMax),
  console.log("minRow: ", rMin, "maxRow: ", rMax);
	
	var tableOutput = ""; //define the tableOutput
	var checkColor = 0; // using this variable to check the color of each cell
	tableOutput += "<table id='myTable'>"; // opening tag for table
		
	// create table from column to row with the input provided by user
	// this "for loop" is creating rows 
	for(var row = 0; row <= (rMax - rMin + 1); row++){
		tableOutput += "<tr>"; // opening tag for table
		// this "for loop" is creating columns
		for(var col = 0; col <= (cMax - cMin + 1); col++){
			// all the if and else statements are taking care of the coloring cell
			if(row == 0){
				tableOutput += "<td class='header'>" + ((col == 0)? "" : ( col + cMin - 1)) + "</td>";
			}
			else if( col == 0 ){
				tableOutput += "<td class='header'>" + (row + rMin - 1) + "</td>";
			}
			else{
				tableOutput += ((Number(checkColor) % 2 == 0) ? "<td class='child-blink'>" : "<td class='color'>") + ((row + rMin - 1) * (col + cMin - 1)) + "</td>";  
				checkColor++; // increment the checkColor
			}
		}
		row % 2 == 0 ? checkColor = 0 : checkColor = 1;
		tableOutput += "</tr>"; // closing tag for the row
	}
	tableOutput += "</table>";// closing tag for the table
  $("#myTable").html(tableOutput);// Outputing the table
	// this is making sure that after the box is Drew
	// the submit button is enable
	$("#submit").prop("disabled", false);
  return false;
}
*/

/*// For Assignment 7
	//the validateInputs function is to vertify all inputs are correct
function validateInputs(rMin, rMax, cMin, cMax){
	//document.getElementById("error").innerHTML = "";
	// if one of the input is NULL, prompt an error message
	if(rMin == "" || rMax =="" || cMin == "" || cMax ==""){
		document.getElementById("error").innerHTML = "<h3><font color=#FF0000>At least one of boxes is empty.<br>Please enter a positive number in all boxes.</font></h3>";
		return false;
	}
	// if Max is less than Min, prompt an error message
	// Without Number(), it will give the wrong result.
	// and if (rMin >= rMax || cMin >= cMax), 3 >= 12 is true. 
	else if(Number(rMin) >= Number(rMax) || Number(cMin) >= Number(cMax)){
		document.getElementById("error").innerHTML = "<h3><font color=#FF0000>Maximum MUST be greater than Minimum.<br>And MUST be a positive integer.<br>Please try again!</font></h3>";
		return false;
	}
	// Since the negative number is allowed, so we don't need this condition
	// if one of the input is less than 0, prompt an error message
	//else if(rMin < 0 ||  rMax < 0 || cMin < 0 ||  cMax < 0){
		//document.getElementById("error").innerHTML = "<h3><font color=#FF0000>All inputs MUST be a positive integer. Please try again!</font></h3>";
		//return false;
	//}
	// if one of the input is not an integer, prompt an error message
	else if(rMin % 1 != 0 || rMax % 1 != 0 || cMin % 1 != 0 || cMax % 1 != 0 ){
		document.getElementById("error").innerHTML = "<h3><font color=#FF0000>All inputs MUST be a positive integer. Please try again!</font></h3>";
		return false;
	}
	// otherwise, all inputs are valid.
	else{ 
		return true; 
	}
}*/
	