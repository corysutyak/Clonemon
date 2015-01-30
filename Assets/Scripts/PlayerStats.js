#pragma strict

var startPoint : Vector3;
var endPoint : Vector3;
var speed : float;
private var increment : float;
var isMoving : boolean;

var walkCounter : int;
var walkCounter2 : int;
var isInCombat : boolean;

var CameraMain : GameObject;
var CombatCamera : GameObject;

function Start () {

	startPoint = transform.position;
	endPoint = transform.position;
	speed = 5;

	walkCounter2 = Random.Range(5, 15);
	isInCombat = false;

}

function Update () {

	if(increment <= 1 && isMoving == true){
		increment += speed/100;
		Debug.Log("Moving");
	}
	else{
		isMoving = false;
		Debug.Log("Stopped");
	}
	
	if(isMoving){
		transform.position = Vector3.Lerp(startPoint,endPoint, increment);
	}
	
	if(!isInCombat){
	if(Input.GetKey("w") && isMoving == false){
		calculateWalk();
		increment = 0;
		isMoving = true;
		startPoint= transform.position;
		endPoint= new Vector3(transform.position.x, transform.position.y + 1, transform.position.z);
	}
	
		if(Input.GetKey("s") && isMoving == false){
				calculateWalk();
		increment = 0;
		isMoving = true;
		startPoint= transform.position;
		endPoint= new Vector3(transform.position.x, transform.position.y - 1, transform.position.z);
	}
	
		if(Input.GetKey("a") && isMoving == false){
				calculateWalk();
		increment = 0;
		isMoving = true;
		startPoint= transform.position;
		endPoint= new Vector3(transform.position.x - 1, transform.position.y, transform.position.z);
	}
	
		if(Input.GetKey("d") && isMoving == false){
				calculateWalk();
		increment = 0;
		isMoving = true;
		startPoint= transform.position;
		endPoint= new Vector3(transform.position.x + 1, transform.position.y, transform.position.z);
	}
	
	}
}

	function calculateWalk(){
		if(walkCounter >= walkCounter2){
			walkCounter2 = Random.Range(5, 15);
			walkCounter = 0;
			enterCombat();
		}
		else{
			walkCounter++;
		}
	}
	
	function enterCombat(){
	//isInCombat = true;
	CameraMain.active = false;
	CombatCamera.active = true;
		Debug.Log("You have entered COMBAT");
	}
