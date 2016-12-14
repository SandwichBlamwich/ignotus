/* Script.js
 *  Script object
 */

//Define commands in script editor (ctrl x to close, etc.)
$(document).keydown(function(e) {
	if (Engine.currentPage == Engine.Page.ScriptEditor) {
		//Ctrl + x
        if (e.keyCode == 88 && e.ctrlKey) {			
			var filename = document.getElementById("script-editor-filename").value;
			
			if (checkValidFilename(filename) == false) {
				postScriptEditorStatus("Script filename can contain only alphanumerics, hyphens, and underscores");
				return;
			}
			
			filename += ".script";
			
			//If the current script matches one thats currently running, throw an error
			for (var i = 0; i < Player.getCurrentServer().runningScripts.length; i++) {
				if (filename == Player.getCurrentServer().runningScripts[i].filename) {
					postScriptEditorStatus("Cannot write to script that is currently running!");
					return;
				}
			}
			
			//If the current script already exists on the server, overwrite it
			for (var i = 0; i < Player.getCurrentServer().scripts.length; i++) {
				if (filename == Player.getCurrentServer().scripts[i].filename) {
					Player.getCurrentServer().scripts[i].saveScript();
					Engine.loadTerminalContent();
					return;
				}
			}
			
			//If the current script does NOT exist, create a new one
			var script = new Script();
			script.saveScript();
			Player.getCurrentServer().scripts.push(script);
			Engine.loadTerminalContent();
        }
	}
});

//Checks that the string contains only valid characters for a filename, which are alphanumeric,
// underscores and hyphens
function checkValidFilename(filename) {
	var regex = /^[a-zA-Z0-9_-]+$/;
	
	if (filename.match(regex)) {
		return true;
	}
	return false;
}

var ScriptEditorLastStatus = null;
function postScriptEditorStatus(text) {
	document.getElementById("script-editor-status").innerHTML = text;
	
	clearTimeout(ScriptEditorLastStatus);
	ScriptEditorLastStatus = setTimeout(function() {
		document.getElementById("script-editor-status").innerHTML = "";
	}, 3000);
}

function Script() {    
	this.filename 	= "";
    this.code       = "";
    this.ramUsage   = 0;
	this.server 	= null;	//IP of server this script is on
    
    /* Properties to calculate offline progress. Only applies for infinitely looping scripts */
    
    //Time it takes to execute one iteration of the entire script
    //Each function takes CONSTANTS.CodeInstructionRunTime seconds, 
    //plus hacking time plus and sleep commands
    this.executionTimeMillis    = 0;
    
    //Number of instructions ("lines") in the code. Any call ending in a ; 
    //is considered one instruction. Used to calculate executionTime
    this.numInstructions        = 0;
    
    //Which servers are hacked in one iteration of the script. May contain duplicates
    this.serversHacked          = [];
};

//Get the script data from the Script Editor and save it to the object
Script.prototype.saveScript = function() {
	if (Engine.currentPage == Engine.Page.ScriptEditor) {
		//Update code and filename
		var code = document.getElementById("script-editor-text").value;
		this.code = code;
		
		var filename = document.getElementById("script-editor-filename").value + ".script";
		this.filename = filename;
		
		//Server
		this.server = Player.currentServer;
		
		//TODO Calculate/update number of instructions, ram usage, execution time, etc. 
		this.updateNumInstructions();
		this.updateRamUsage();
	}
}

//Calculates the number of instructions, which is just determined by number of semicolons)
Script.prototype.updateNumInstructions = function() {
	var numSemicolons = this.code.split(";").length - 1;
	this.numInstructions = numSemicolons;
}

//Updates how much RAM the script uses when it is running.
//Right now, it is determined solely by the number of instructions
//Ideally, I would want it to be based on instructions (e.g. hack() costs a lot but others dont)
Script.prototype.updateRamUsage = function() {
	this.ramUsage = this.numInstructions * .2;
}

Script.prototype.toJSON = function() {
    return Generic_toJSON("Script", this);
}

Script.fromJSON = function(value) {
    return Generic_fromJSON(Script, value.data);
}

Reviver.constructors.Script = Script;


//Called when the game is loaded. Loads all running scripts (from all servers)
//into worker scripts so that they will start running
function loadAllRunningScripts() {
	var count = 0;
	console.log("AllServers.length: " + AllServers.length);
	for (var i = 0; i < AllServers.length; i++) {
		var server = AllServers[i];
		console.log("Loading scripts from server " + server.hostname);
		for (var j = 0; j < server.runningScripts.length; j++) {
			count++;
			addWorkerScript(server.runningScripts[j], server);
		}
	}
	console.log("Loaded " + count.toString() + " running scripts");
}