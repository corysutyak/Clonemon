#pragma strict

var talkMessage : String[];

var displayText : String;

var showText;

var next : boolean = false;

function OnGUI () {
	if(showText){
		GUI.TextArea (Rect(0, Screen.height * .8 ,Screen.width, Screen.height * .2), "" + displayText);
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