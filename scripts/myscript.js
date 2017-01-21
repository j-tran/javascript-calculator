$(document).ready(function() {
	update();
});

function evaluate(expresssion) {
	expression = expresssion.replace(/\(/g, "*(").replace(/÷/, "/"); //regex necessary to globally replace
	if (errorCheck(expression))
		return errorCheck(expression);
	try {
		return eval(expression);
	}
	catch (e) {
		return "Input Error";
	}
}

//Uses "this" to find out which button was pressed. Then take the content of that element and update it in the HTML
function update() {
	$("button").click(function(event) { //Gets the element of a button clicked so that the input can be updated
		var originalHist = $("#history").text();
		if ($(this).text() === "AC") { //clears everything
			$("#current-input").text("0");
			$("#history").text("0");
		}
		else if ($(this).text() === "CE") { //clears entry

			$("#current-input").text("0");
			$("#history").text(originalHist);
		}
		else if ($(this).text() === "=") { //generates result. If is an error, will not erase current history
			if (errorCheck($("#history").text()))
				$("#history").text(errorCheck($("#history").text()));
			$("#history").text(evaluate($("#history").text()));
			$("#current-input").text("0");
		}
		else {
			if ($("#current-input").text().substring(0, 1).match(/0|[a-z]/i)) { //replaces the default 0
				$("#current-input").text("");
			}
			if ($("#history").text().substring(0, 1).match(/0|[a-z]/i)) { //replaces the default 0
				$("#history").text("");
			}
			var strAppend = $(this).text();
			$("#current-input").text($("#current-input").text() + strAppend);
			$("#history").text($("#history").text() + strAppend)
		}
	});
}

//used to check the string for fallacious inputs
function errorCheck(input) {
	if (input.includes("/0"))
		return "Error: Divide by Zero"
	if (input.length > 8)
		return "Error: Character Limit Reached";
	return null;
}
