#pragma strict
var player: GameObject;
function Start () {
	player = GameObject.Find("Player");
	Load();
}

function Load(){
	if(PlayerPrefs.GetFloat("playerX") != null){
		player.transform.position.x = (PlayerPrefs.GetFloat("playerX"));
		player.transform.position.y = (PlayerPrefs.GetFloat("playerY"));
		player.transform.position.z = (PlayerPrefs.GetFloat("playerZ"));
	}
}

function Save(){
	Debug.Log("Test Save");
	
	PlayerPrefs.SetFloat("playerX", player.transform.position.x);
	PlayerPrefs.SetFloat("playerY", player.transform.position.y);
	PlayerPrefs.SetFloat("playerZ", player.transform.position.z);
}