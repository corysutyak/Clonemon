#pragma strict

var talkMessage : String[];

var displayText : String;

var showText;


function OnGUI () {
	if(showText){
		GUI.Label (Rect(Screen.width/2,Screen.height/2 ,500, 20), "" + displayText);
	}
	
}

function Update () {
}

function talk(){
	//Disable player movement.
	var other : PlayerStats;
	other = gameObject.Find("Player").GetComponent(PlayerStats);
	other.disableMovement = true;
	showText = true;
	for (var i = 0; i < talkMessage.Length; i++){
		displayText = talkMessage[i];
		yield WaitForSeconds(2);
	}
	showText = false;
	other.disableMovement = false;
}