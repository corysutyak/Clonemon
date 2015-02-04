#pragma strict

var mainScript : Main1;

function Awake(){
	mainScript = gameObject.Find("Main").GetComponent(Main1);
}
function Start () {

}

function Update () {

}

function useAbility (attackName : String, turn : int, type : Type){
	switch(attackName){
		case "vine":
			vine(turn, type);
			break;
		case "smash":
			smash(turn, type);
			break;
		default:
			Debug.Log("none");
		break;
	}
}

function vine(turn : int, type: Type){
	Debug.Log("Vine");
	calculateDamage(5, turn, type);
}

function smash(turn : int, type: Type){
	Debug.Log("Smash");
	calculateDamage(10, turn, type);
}

function calculateDamage(damage : int, turn : int, type: Type){

	if(turn == 0){
		if(mainScript.enemyMonster.weakness == type){
			mainScript.enemyMonster.curHP -= damage * 2;
		}
		else{
			mainScript.enemyMonster.curHP -= damage;
		}
	}
	else{
		if(mainScript.monsterEquipped.weakness == type){
			mainScript.monsterEquipped.curHP -= damage * 2;
		}
		else{
			mainScript.monsterEquipped.curHP -= damage;
		}
	}
}