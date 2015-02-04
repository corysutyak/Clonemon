#pragma strict
import System.Collections.Generic;

//All monsters
var AllMonsters : monster[];

var enemyMonster : monster;

var monsterEquipped : monster;

var turn : int;

//other scripts
var other : PlayerStats;
var monsterAttacks : MonsterAttacks;

function Start () {
	copyMonster();
}

function Awake(){
	monsterAttacks = gameObject.Find("Player").GetComponent(MonsterAttacks);
	other = gameObject.Find("Player").GetComponent(PlayerStats);
}
function OnGUI(){
	
	if(other.isInCombat){
		//Enemy
		GUI.Label(Rect(50, 100, 200, 100), "" + enemyMonster.name);
		GUI.Label(Rect(50, 110, 200, 100), "" + enemyMonster.baseHP + "/" + enemyMonster.curHP);
		GUI.DrawTexture(Rect(70, 150, 128,128), enemyMonster.image);
		
		//Us
		GUI.Label (Rect (Screen.width/2, 100, 200, 100), "" + monsterEquipped.name);
		GUI.Label (Rect (Screen.width/2, 110, 200, 100), "" + monsterEquipped.baseHP + "/" + monsterEquipped.curHP);
		GUI.DrawTexture(Rect(Screen.width/2 + 40, 150, 128, 128), monsterEquipped.image);
		
		for(var i = 0; i < 4; i++){
			if(turn == 0){
				if(GUI.Button(Rect(150, 100 + (i * 50), 100, 30), "" + monsterEquipped.attacks[i].name)){
					monsterAttacks.useAbility("" + monsterEquipped.attacks[i].name, turn, monsterEquipped.attacks[i].type);
					playerAttacked();
				}
			}
		}
	}
}

function Update () {

	if(other.isInCombat){
		if(monsterEquipped.curHP <= 0){
			Debug.Log("Our monster Died");
			other.exitCombat();
			monsterEquipped.curHP = 20;
			monsterEquipped.maxHP = 20;
			monsterEquipped.baseHP = 20;
		}
		
		if(enemyMonster.curHP <= 0){
			Debug.Log("Enemy monster Died");
			other.exitCombat();
			monsterEquipped.curHP = 20;
			monsterEquipped.maxHP = 20;
			monsterEquipped.baseHP = 20;
		}
	}
}

function playerAttacked(){
	Debug.Log("Player Attacked");
	turn = 1;
	enemyAttacked();
}

function enemyAttacked(){
	yield WaitForSeconds(2);
	if(other.isInCombat){
		var randomAttack = Random.Range(0,4);
		monsterAttacks.useAbility("" + enemyMonster.attacks[randomAttack].name, turn, enemyMonster.attacks[randomAttack].type);
	}
	Debug.Log("Enemy Attacked");
	yield WaitForSeconds(2);
	turn = 0;
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
	enemyMonster = tempMonsters[newRandom ];
}

function copyMonster(){
	var equipMonster = new monster();
	equipMonster = AllMonsters[0];
	monsterEquipped.name = equipMonster.name;
	monsterEquipped.baseHP = equipMonster.baseHP;
	monsterEquipped.curHP = equipMonster.curHP;
	monsterEquipped.baseAtk = equipMonster.baseAtk;	
	monsterEquipped.curAtk = equipMonster.curAtk;
	monsterEquipped.baseDef = equipMonster.baseDef;
	monsterEquipped.curDef = equipMonster.curDef;
	monsterEquipped.speed = equipMonster.speed;
	monsterEquipped.regionLocated = equipMonster.regionLocated;
	monsterEquipped.rarity = equipMonster.rarity;
	monsterEquipped.image = equipMonster.image;
	monsterEquipped.attacks = equipMonster.attacks;
	monsterEquipped.maxHP = equipMonster.maxHP;
}