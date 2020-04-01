function addUser(){
            
    window.location.href = '/contacts/add';
}
function cancelAdd(){
    
    window.location.href = '/contacts';
}


// tracking num
var _number1 = 1;
var _number2 = 1;
var _number3 = 1;

function createInput(type, value, name) {
	var _input = document.createElement("INPUT");
	_input.setAttribute("type", type);
	_input.setAttribute("name", name);
	_input.setAttribute("value", value);
	_input.setAttribute("class", "textField");
	_input.setAttribute("id", type + _number1);

	return _input;
}

// creating textnode
function TextNode(text) {
	var _lable = document.createElement("LABLE");
	_lable.setAttribute("CLASS", "lable");
	var _text = document.createTextNode(text);
	_lable.appendChild(_text);
	return _lable;
}
// space elements
function addSpace() {

	var space = document
			.createTextNode('\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0');
	return space;
}

// add div element when we press add button
function addElement() {
	var createDiv = document.createElement("fieldset");
	createDiv.setAttribute("name", "AddressTag");
	createDiv.setAttribute("id", "div" + _number1);
	createDiv.setAttribute("CLASS", "AddressDetails");
	return createDiv;
}

function addDate(){
	var dynamicPhonelist = document.getElementById("dynamicDatelist");
	var numberOfInputs = document.getElementById("numberOfInputs");
	var divtion = document.createElement('div');
	divtion.setAttribute("id",_number3);
	
	var table = document.createElement('table');
	var tr = [];
    var td1,td2;


    td1 = document.createElement('td');
    td2 = document.createElement('td');
	td1.appendChild(TextNode("Type of Date:"));
	var dt = createInput("Text", " ", "DateType" + _number3);
	dt.setAttribute("required","");
	td2.appendChild(dt);
	tr[0] = document.createElement('tr');
	tr[0].appendChild(td1);
	tr[0].appendChild(td2);
	table.appendChild(tr[0]);

	td1 = document.createElement('td');
    td2 = document.createElement('td');
	td1.appendChild(TextNode("Date:"));
	td2.appendChild(createInput("date", " ", "Date" + _number3));
	tr[1] = document.createElement('tr');
	tr[1].appendChild(td1);
	tr[1].appendChild(td2);
	table.appendChild(tr[1]);

	 td1 = document.createElement('td');
    var btn = createInput("Button", "Delete Date", "Date" + _number3);
    btn.setAttribute("class", "button1");
    btn.onclick = function() { // Note this is a function
      var elm = this.closest("div");
      var temp = elm.id;
      var inputslen = document.getElementById("D"+temp);
      inputslen.parentElement.removeChild(inputslen);
      elm.parentNode.removeChild(elm);
    };

	td1.appendChild(btn);
	tr[2] = document.createElement('tr');
	tr[2].appendChild(td1);
	table.appendChild(tr[2]);

	var legend = document.createElement('legend');
	legend.appendChild(TextNode("Date :"));

	divtion.appendChild(document.createElement('BR'));
	divtion.style.border = "thin dotted green";
	divtion.appendChild(legend);
	divtion.appendChild(table);
	dynamicAddresslist.appendChild(divtion);

   	var _input = document.createElement("INPUT");
	    _input.setAttribute("type", "Text");
	    _input.setAttribute("name", "lengthOfDates");
	    _input.setAttribute("value", _number3);
	    _input.setAttribute("class", "textField");
	    _input.setAttribute("id", "D"+_number3);

	    numberOfInputs.appendChild(_input);

	   _number3++;
}

function addPhoneNumber(){
    var dynamicPhonelist = document.getElementById("dynamicPhonelist");
	var numberOfInputs = document.getElementById("numberOfInputs");
	var divtion = document.createElement('div');
	divtion.setAttribute("id",_number2);
	var table = document.createElement('table');
	var tr = [];
    var td1,td2;

    td1 = document.createElement('td');
    td2 = document.createElement('td');
	td1.appendChild(TextNode("Type of Number:"));
	var nt = createInput("Text", " ", "NumberType" + _number2)
	nt.setAttribute("required","");
	td2.appendChild(nt);
	tr[0] = document.createElement('tr');
	tr[0].appendChild(td1);
	tr[0].appendChild(td2);
	table.appendChild(tr[0]);

	td1 = document.createElement('td');
    td2 = document.createElement('td');
	td1.appendChild(TextNode("Area code:"));
	td2.appendChild(createInput("Text", " ", "AreaCode" + _number2));
	tr[1] = document.createElement('tr');
	tr[1].appendChild(td1);
	tr[1].appendChild(td2);
	table.appendChild(tr[1]);

	td1 = document.createElement('td');
    td2 = document.createElement('td');
	td1.appendChild(TextNode("Number:"));
	td2.appendChild(createInput("Text", " ", "Number" + _number2));
	tr[2] = document.createElement('tr');
	tr[2].appendChild(td1);
	tr[2].appendChild(td2);
	table.appendChild(tr[2]);

	 td1 = document.createElement('td');
    var btn = createInput("Button", "Delete phone Number", "DeleteNumber" + _number2);
    btn.setAttribute("class", "button1");
    btn.onclick = function() { // Note this is a function
      var elm = this.closest("div");
      var temp = elm.id;
      var inputslen = document.getElementById("N"+temp);
      inputslen.parentElement.removeChild(inputslen);
      elm.parentNode.removeChild(elm);
    };

	td1.appendChild(btn);
	tr[3] = document.createElement('tr');
	tr[3].appendChild(td1);
	table.appendChild(tr[3]);

	var legend = document.createElement('legend');
	legend.appendChild(TextNode("Phone Number :"));


	divtion.appendChild(document.createElement('BR'));
	divtion.style.border = "thin dotted blue";
	divtion.appendChild(legend);
	divtion.appendChild(table);
	dynamicAddresslist.appendChild(divtion);

   	var _input = document.createElement("INPUT");
	    _input.setAttribute("type", "Text");
	    _input.setAttribute("name", "lengthOfNumbers");
	    _input.setAttribute("value", _number2);
	    _input.setAttribute("class", "textField");
	    _input.setAttribute("id", "N"+_number2);

	    numberOfInputs.appendChild(_input);

	   _number2++;
}

function addAddress() {
	var dynamicAddresslist = document.getElementById("dynamicAddresslist");
	var numberOfInputs = document.getElementById("numberOfInputs");
	//var divtion = addElement();
	var divtion = document.createElement('div');
	divtion.setAttribute("id",_number1);
	var table = document.createElement('table');
	var tr = [];
    var td1,td2;

    td1 = document.createElement('td');
    td2 = document.createElement('td');
	td1.appendChild(TextNode("Address Type:"));
	var at = createInput("Text", " ", "AddressType" + _number1);
	at.setAttribute("required","");
	td2.appendChild(at);
	tr[0] = document.createElement('tr');
	tr[0].appendChild(td1);
	tr[0].appendChild(td2);
	table.appendChild(tr[0]);

	td1 = document.createElement('td');
    td2 = document.createElement('td');
	td1.appendChild(TextNode("Address:"));
	td2.appendChild(createInput("Text", " ", "Address" + _number1));
	tr[1] = document.createElement('tr');
	tr[1].appendChild(td1);
	tr[1].appendChild(td2);
	table.appendChild(tr[1]);

	td1 = document.createElement('td');
    td2 = document.createElement('td');
	td1.appendChild(TextNode("City:"));
	td2.appendChild(createInput("Text", " ", "City" + _number1));
	tr[2] = document.createElement('tr');
	tr[2].appendChild(td1);
	tr[2].appendChild(td2);
	table.appendChild(tr[2]);

	td1 = document.createElement('td');
    td2 = document.createElement('td');
	td1.appendChild(TextNode("State:"));
	td2.appendChild(createInput("Text", " ", "State" + _number1));
	tr[3] = document.createElement('tr');
	tr[3].appendChild(td1);
	tr[3].appendChild(td2);
	table.appendChild(tr[3]);

	td1 = document.createElement('td');
    td2 = document.createElement('td');
	td1.appendChild(TextNode("Zip:"));
	td2.appendChild(createInput("Text", " ", "Zip" + _number1));
	tr[4] = document.createElement('tr');
	tr[4].appendChild(td1);
	tr[4].appendChild(td2);
	table.appendChild(tr[4]);

    td1 = document.createElement('td');
    var btn = createInput("Button", "Delete Address", "DeleteAddress" + _number1);
    btn.setAttribute("class", "button1");
    btn.onclick = function() { // Note this is a function
      var elm = this.closest("div");
      var temp = elm.id;
      var inputslen = document.getElementById("A"+temp);
      inputslen.parentElement.removeChild(inputslen);
      elm.parentNode.removeChild(elm);
    };

	td1.appendChild(btn);
	tr[5] = document.createElement('tr');
	tr[5].appendChild(td1);
	table.appendChild(tr[5]);


	var legend = document.createElement('legend');
	legend.appendChild(TextNode("Address :"));

	divtion.appendChild(document.createElement('BR'));
	divtion.style.border = "thin dotted red";
	divtion.appendChild(legend);
	divtion.appendChild(table);
	dynamicAddresslist.appendChild(divtion);

		var _input = document.createElement("INPUT");
	    _input.setAttribute("type", "Text");
	    _input.setAttribute("name", "lengthOfAddresses");
	    _input.setAttribute("value", _number1);
	    _input.setAttribute("class", "textField");
	    _input.setAttribute("id", "A"+_number1);

	    numberOfInputs.appendChild(_input);

	_number1++;
}

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}