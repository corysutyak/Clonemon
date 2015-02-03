#pragma strict
import System.Collections.Generic;

//All monsters
var AllMonsters : monster[];

var enemyMonster : monster;

var monsterEquipped : monster;

function Start () {

}

function OnGUI(){
	var other : PlayerStats;
	other = gameObject.Find("Player").GetComponent(PlayerStats);
	
	if(other.isInCombat){
		GUI.Label(Rect(50, 100, 200, 100), "" + enemyMonster.name);
		GUI.DrawTexture(Rect(70, 100, 128,128), enemyMonster.image);
	}
}

function Update () {

	if(Input.GetKeyDown("r")){
		randomizeMonster();
	}
}

function randomizeMonster(){
	var other : PlayerStats;
	other = gameObject.Find("Player").GetComponent(PlayerStats);
	
	var tempMonsters: List.<monster> = new List.<monster>();
	var randomNum : int = Random.Range(0,100);
	
	if(randomNum < 15){
		for (var i = 0; i < AllMonsters.Length; i++){
			if(AllMonsters[i].rarity == Rarity.rare && AllMonsters[i].regionLocated == other.region){
				tempMonsters.Add(AllMonsters[i]);
			}
		}
	}
	else{
		for(var j = 0; j < AllMonsters.Length; j++){
			if(AllMonsters[j].rarity == Rarity.common && AllMonsters[j].regionLocated == other.region){
			tempMonsters.Add(AllMonsters[j]);
			}
		}
	}
	
	var newRandom = Random.Range(0, tempMonsters.Count);
	enemyMonster = tempMonsters[newRandom];
}