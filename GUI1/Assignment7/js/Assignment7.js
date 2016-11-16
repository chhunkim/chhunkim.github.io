/******
	File: /~ckim/GUI1/Assignment7/js/Assignment7.js
  COMP4610 GUI Programming I Assignment: Using the jQuery Validation Plugin with Dynamic Table
  Chhun Kim, UMASS Lowell Computer Science, chhun_kim@student.uml.edu
  Copyright (c) 2016 by Chhun Kim. All rights reserved.
  May be freely copied or excerpted for educational purposes with credit to the author.
		Created by CK on 11/14/2016 
		Updated by CK on 11/16/2016
	*****/

// Reference sites: https://jqueryvalidation.org/validate/
// 									https://www.sitepoint.com/basic-jquery-form-validation-tutorial/

// validate function is to handle user's inputs.
$().ready(function() {
  // Valid function to check the input is smaller or grader based on the source example
  // Source: http://jsfiddle.net/tUPQc/2/
  // Function to check greater which is use in rules for validate
  $.validator.addMethod("greaterThan",
    function (value, element, param) {
      var $min = $(param);
      if (this.settings.onfocusout) {
        $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
					$(element).valid();
				});
			}
      return parseInt(value) > parseInt($min.val());
    }, " Max must be greater than min");

	// Function to check smaller which is use in rules for validate
	$.validator.addMethod("lessThan",
    function (value, element, param) {
      var $max = $(param);
      if (this.settings.onfocusout) {
		    $max.off(".validate-lessThan").on("blur.validate-lessThan", function () {
			   $(element).valid();
				});
			}
			return parseInt(value) < parseInt($max.val());
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
    }
	});
});

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
  return false;
}

/*// the validateInputs function is to vertify all inputs are correct
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
	