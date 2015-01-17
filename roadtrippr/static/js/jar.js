var SITE_URL = "http://codejar.me";

function loadUser(){
	$.getJSON( SITE_URL+"/user", function( data ) {
   		//data = data.data;
   		//if(document.querySelector('.getUserInfo') !=null)

   });
}
if(document.querySelector('.getUserInfo') !=null)
document.querySelector('.getUserInfo').addEventListener('click', function(evt) {
			loadUser();
		}, false);

var saved_rows = new Array();

var selected_rows = new Array();
var selected_row = -1;

var linktree = new Array();
var linktree_name = new Array();

var users = new Array();

var file_selected = "";

var fines = new Array();

if(document.querySelector('.cancel') != null)
	document.querySelector('.cancel').addEventListener('click', function(evt) {
			hideForm();
			}, false);

function getrepos(){
	$.getJSON( SITE_URL+"/repos", function( data ) {
   		//data = data.data;
   		//if(document.querySelector('.getUserInfo') !=null)

   });
}

function buildSelected(){
	var select = document.getElementById("resource"); 
	var strval = "";
	strval += file_selected;
	strval += " [";
	for(var i =0;i<saved_rows.length;i++){
		if(i!=0)strval += ",";
		strval += saved_rows[i];
	}
	strval += "]";	
	select.value = strval;
}

function viewForm(){
	buildUsersDropdown();
	buildFinesDropdown();
	buildSelected();
	$("#transation").removeClass('hide');
}
function hideForm(){
	$("#transation").addClass('hide');
}
function buildUsersDropdown(){
	var select = document.getElementById("user"); 
	//var options = ["1", "2", "3", "4", "5"]; 

	for(var i = 0; i < users.length; i++) {
	    var opt = users[i].username;
	    var el = document.createElement("option");
	    el.textContent = opt;
	    el.value = users[i].pk;
	    select.appendChild(el);
	}
}

function buildFinesDropdown(){
	var select = document.getElementById("fine"); 
	//var options = ["1", "2", "3", "4", "5"]; 

	for(var i = 0; i < fines.length; i++) {
	    var opt = fines[i].fields.description;
	    var el = document.createElement("option");
	    el.textContent = opt;
	    el.value = fines[i].pk;
	    select.appendChild(el);
	}
}

function buildUsers(data){
	users = new Array();
	var f = data[0].fields;
	var peeps = new Array();
	for(var i = 0;i< f.users.length;i++){
		peeps[i] = f.users[i];
	}
	peeps[peeps.length] = f.leader;
	for(var i = 0;i< peeps.length;i++){
		(function (i) {
			$.getJSON( SITE_URL+"/api/user/"+i, function( data ) {
				   		users[users.length] = data;
				   });
		}) (peeps[i]);	
	}
}

function buildFines(data){
	fines = new Array();
	for(var i = 0;i< data.length;i++){
		fines[i] = data[i];
	}
}

function buildJarInfo(data){
	var return_html = "";
	var f = data[0].fields;
	return_html += "<h4>Start bid: $"+f.startbid+"</h4>";
	return_html += "<h4>People: "+(f.users.length+1)+"</h4>";

	document.getElementById('jar_info').innerHTML = return_html;
}

function buildjarlist(div, info){
	var return_html = "";
	return_html += "<div class=\"row\">";
	for(var i =0;i< info.length;i++){
		var fl = info[i].fields;
		return_html += "<div class=\"col-lg-4\">";
        return_html += "<h2>"+fl.repo+"</h2>";
        return_html += "<p>There are "+(fl.users.length+1)+" people in this jar.</p>";
        return_html += "<p><a class=\"btn btn-default\" href=\"/jar/"+fl.repo+"\" role=\"button\">View details »</a></p>";
        return_html += "</div>";
	}

	return_html += "</div>";
	div.innerHTML = return_html;
}

function buildrepolist(div, tree){
	var return_html = "";
	return_html += "<table>";
	return_html += "<ol class=\"breadcrumb\" style=\"width: 880px;\">";

	return_html += "</ol>";
	return_html += "<tbody>";
	for(var i =0;i<tree.length;i++){
		var node = tree[i];
		return_html += "<tr>";
		return_html += "<td id=\"tp"+i+"\" class=\"table_path\">"+node.path+"</td>";
		return_html += "<td id=\"tt"+i+"\" class=\"table_type\">"+node.type+"</td>";
		return_html += "</tr>";	
	}

	return_html += "</tbody>";
	return_html += "</table>";
	div.innerHTML = return_html;
	for(var i =0;i<tree.length;i++){
		var node = tree[i];
		var el1 = document.getElementById('tp'+i);
		var el2 = document.getElementById('tt'+i);
		if(node.type == "tree"){
			(function (i, tree) {
				
				el1.addEventListener('click', function(evt) {
					linktree[linktree.length] = SITE_URL+"/api/github/repo/"+repo+"/tree/"+tree[i].sha;
					linktree_name[linktree_name.length] = tree[i].path;
					$.getJSON( SITE_URL+"/api/github/repo/"+repo+"/tree/"+tree[i].sha, function( data ) {
				   		buildrepolist(document.getElementById('table_location'), data.tree);
				   });
					buildLinkTree(document.querySelector('.breadcrumb'));
				}, false);
				el2.addEventListener('click', function(evt) {
					linktree[linktree.length] = SITE_URL+"/api/github/repo/"+repo+"/tree/"+tree[i].sha;
					linktree_name[linktree_name.length] = tree[i].path;
					$.getJSON( SITE_URL+"/api/github/repo/"+repo+"/tree/"+tree[i].sha, function( data ) {
				   		buildrepolist(document.getElementById('table_location'), data.tree);
				   });
					buildLinkTree(document.querySelector('.breadcrumb'));
				}, false);
			}) (i, tree);
			
		}else if(node.type == "blob"){
			var pathSum = "";
			for(var q=1;q<linktree_name.length;q++)
				pathSum += linktree_name[q]+"/";
			(function (i, tree, pathSum) {
				
				el1.addEventListener('click', function(evt) {
					file_selected = pathSum+tree[i].path;
					$.getJSON( SITE_URL+"/api/github/resource/"+repo+"/contents/"+pathSum+tree[i].path, function( data ) {
				   		buildtable(document.getElementById('table_location'), atob(data.content));
				   		buildLinkTree(document.querySelector('.breadcrumb'));
				   });
					
				}, false);
				el2.addEventListener('click', function(evt) {
					file_selected = pathSum+tree[i].path;
					$.getJSON( SITE_URL+"/api/github/resource/"+repo+"/contents/"+pathSum+tree[i].path, function( data ) {
				   		buildtable(document.getElementById('table_location'), atob(data.content));
				   		buildLinkTree(document.querySelector('.breadcrumb'));
				   });
					
				}, false);
				buildLinkTree(document.querySelector('.breadcrumb'));
			}) (i, tree, pathSum);
		}
		
	}
	buildLinkTree(document.querySelector('.breadcrumb'));
     		
}

function buildLinkTree(div){
	var return_html = "";
	for(var i=0;i<linktree.length;i++){
		return_html += "<li id=\"lt"+i+"\"><a href=\"#\">"+linktree_name[i]+"</a></li>";
	}

	div.innerHTML = return_html;

	for(var i=0;i<linktree.length;i++){
			(function (x) {
			document.getElementById('lt'+i).addEventListener('click', function(evt) {
					var linktree2 = new Array();
					var linktree_name2 = new Array();
					for(var i = 0;i<=x;i++)
					{
						linktree2[i] = linktree[i];
						linktree_name2[i] = linktree_name[i];
					}
					linktree = linktree2;
					linktree_name = linktree_name2;
					$.getJSON( linktree[x], function( data ) {
				   		buildrepolist(document.getElementById('table_location'), data.tree);
				   });
			
		}, false);}) (i);	
	}
}

function buildtable(div, text_data){
		
	var return_html = "";
	return_html += "<table>";
	// Table head IF I WAS USING IT SAIDOJASIJD
	return_html += "<ol class=\"breadcrumb\" style=\"width: 880px;\">";

	return_html += "</ol>";

	return_html += "<tbody>";
	text_data = text_data.replace(/</g, "&lt;");
	text_data = text_data.replace(/>/g, "&gt;");
	text_data = text_data.replace(/ /g, "&nbsp;");
	text_data = text_data.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
	var lines = text_data.split('\n');
	
	for(var i = 0;i < lines.length-1;i++){
	    var line = lines[i];
	    return_html += "<tr>";
		return_html += "<td id=\"tc"+i+"\" class=\"table_count\">"+i+"</td>";
		return_html += "<td id=\"tl"+i+"\" class=\"table_line\">"+line+"</td>";
		return_html += "</tr>";	
	}

	return_html += "</tbody>";
	// Table footer IF I WAS USING IT SAIDOJASIJD
	return_html += "</table>";
	return_html += "<div id=\"table_info\">";
	//return_html += "LOL";
	return_html += "</div>";

	div.innerHTML = return_html;

	buildinfo(document.getElementById('table_info'));

	var matches = document.querySelectorAll('.table_count');
	for(var i=0;i<matches.length;i++){
		//First tune adding onclick this way!!! woo
		matches[i].addEventListener('click', function(evt) {
			selectrow(evt.target,evt.ctrlKey||evt.altKey,evt.shiftKey);
		}, false);
	}
	matches = document.querySelectorAll('.table_line');
	for(var i=0;i<matches.length;i++){
		//First tune adding onclick this way!!! woo
		matches[i].addEventListener('click', function(evt) {
			selectrow(evt.target,evt.ctrlKey||evt.altKey,evt.shiftKey);
		}, false);
	}
}

function buildinfo(div){
	var return_html = "";
	return_html += "<h3>Info:</h3>";
	if(selected_rows.length==0){
		return_html += "Select an oops!";
	}
	else if(selected_rows.length==1){
		return_html += "You have selected 1 line!";
	}
	else{
		return_html += "You have selected "+selected_rows.length+" lines!";
	}
	if(selected_rows.length!=0){
		return_html += "<span class=\"addSelected\">";
	    return_html += "<button class=\"info_button\">Add to oops</button>";
	    return_html += "</span>";
	    return_html += "<span class=\"removeSelected\">";
	    return_html += "<button class=\"info_button\">Remove selected</button>";
	    return_html += "</span><p></p>";
	    return_html += "<p>"+saved_rows.length+" lines selected for oops.</p>";


	   
	}
	if(saved_rows.length!=0){
		 return_html += "<span class=\"nextSelected\">";
	    return_html += "<button class=\"info_button\">Next</button>";
	    return_html += "</span>";
	}
	

	div.innerHTML = return_html;
	if(document.querySelector('.addSelected') != null)
	document.querySelector('.addSelected').addEventListener('click', function(evt) {
			addrows();
		}, false);
	if(document.querySelector('.removeSelected') != null)
	document.querySelector('.removeSelected').addEventListener('click', function(evt) {
			removerows();
		}, false);
	if(document.querySelector('.nextSelected') != null)
	document.querySelector('.nextSelected').addEventListener('click', function(evt) {
			viewForm();
		}, false);
	
}

function addrows(){
	for(var x =0;x <= selected_rows.length; x++ ){
		var there = false;
		for(var y =0;y <= saved_rows.length; y++ ){
			if(saved_rows[y]==selected_rows[x])
				there = true;
		}
		if(!there)
			saved_rows[saved_rows.length] = selected_rows[x];
		
	}
	
	$(".table_count").removeClass('added');
	$(".table_line").removeClass('added');
	for(var i =0;i<saved_rows.length;i++){
		$("#tc"+saved_rows[i]).addClass('added');
		$("#tl"+saved_rows[i]).addClass('added');
	}
	selected_rows = new Array();
	$(".table_count").removeClass('select');
	$(".table_line").removeClass('select');
	buildinfo(document.getElementById('table_info'));
}

function removerows(){
	for(var x =0;x <= selected_rows.length; x++ ){
		var there = false;
		for(var y =0;y <= saved_rows.length; y++ ){
			if(saved_rows[y]==selected_rows[x]){
				saved_rows.splice(y, 1);
				break;
			}
		}
		i
		
	}
	
	$(".table_count").removeClass('added');
	$(".table_line").removeClass('added');
	for(var i =0;i<saved_rows.length;i++){
		$("#tc"+saved_rows[i]).addClass('added');
		$("#tl"+saved_rows[i]).addClass('added');
	}
	selected_rows = new Array();
	$(".table_count").removeClass('select');
	$(".table_line").removeClass('select');
}

function selectrow(row, usingCTRL, usingSHIFT){
	var id = parseInt(row.id.substring(2));
	$(".table_count").removeClass('select');
	$(".table_line").removeClass('select');

	if(!usingCTRL && !usingSHIFT){
		selected_row = id;
		selected_rows = new Array();
		selected_rows[0] = id;
	}
	else if(usingSHIFT){
		selected_rows = new Array();
		var i1 = selected_row;
		var i2 = id;
		if(i2 < i1){
			var temp = i2;
			i2 = i1;
			i1 = temp;
		}
		for(var i =i1;i <= i2; i++ )
			selected_rows[selected_rows.length] = i;
	}
	else{
		var has = false;
		for(var i =0;i < selected_rows.length; i++ )
			if(selected_rows[i] == id ){
				selected_rows.splice(i, 1);
				has = true;
				break;
			}
		if(!has){
			selected_rows[selected_rows.length] = id;
		}
	}
	buildinfo(document.getElementById('table_info'));
	for(var i =0;i<selected_rows.length;i++){
		$("#tc"+selected_rows[i]).addClass('select');
		$("#tl"+selected_rows[i]).addClass('select');
	}
	
}



///http://www.html5rocks.com/en/tutorials/file/dndfiles/
/// #lazy #haventdonestuffwithitmuch #scary
function readBlob(opt_startByte, opt_stopByte) {

var files = document.getElementById('files').files;
if (!files.length) {
  alert('Please select a file!');
  return;
}

var file = files[0];
var start = parseInt(opt_startByte) || 0;
var stop = parseInt(opt_stopByte) || file.size - 1;

var reader = new FileReader();

// If we use onloadend, we need to check the readyState.
reader.onloadend = function(evt) {
  if (evt.target.readyState == FileReader.DONE) { // DONE == 2
  		buildtable(document.getElementById('table_location'), evt.target.result);
    
  }
};

var blob = file.slice(start, stop + 1);
reader.readAsBinaryString(blob);
}
if(document.querySelector('.readBytesButtons')!=null)
document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
if (evt.target.tagName.toLowerCase() == 'button') {
  var startByte = evt.target.getAttribute('data-startbyte');
  var endByte = evt.target.getAttribute('data-endbyte');
  readBlob(startByte, endByte);
}
}, false);






