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

	var Sprite = gameObject.GetComponent(AnimateSprite);
	
	if(increment <= 1 && isMoving == true){
		increment += speed/100;
	}
	else{
		isMoving = false;
	}
	
	if(isMoving){
		transform.position = Vector3.Lerp(startPoint,endPoint, increment);
	}
	else{
		Sprite.totalCells = 1;
	}
	
	if(!isInCombat){
	if(Input.GetKey("w") && isMoving == false){
		Sprite.rowNumber = 3;
		Sprite.totalCells = 4;
		calculateWalk();
		increment = 0;
		isMoving = true;
		startPoint= transform.position;
		endPoint= new Vector3(transform.position.x, transform.position.y + 1, transform.position.z);
	}
	
		if(Input.GetKey("s") && isMoving == false){
		Sprite.rowNumber = 0;
		Sprite.totalCells = 4;
				calculateWalk();
		increment = 0;
		isMoving = true;
		startPoint= transform.position;
		endPoint= new Vector3(transform.position.x, transform.position.y - 1, transform.position.z);
	}
	
		if(Input.GetKey("a") && isMoving == false){
		Sprite.rowNumber = 1;
		Sprite.totalCells = 4;
				calculateWalk();
		increment = 0;
		isMoving = true;
		startPoint= transform.position;
		endPoint= new Vector3(transform.position.x - 1, transform.position.y, transform.position.z);
	}
	
		if(Input.GetKey("d") && isMoving == false){
		Sprite.rowNumber = 2;
		Sprite.totalCells = 4;
				calculateWalk();
		increment = 0;
		isMoving = true;
		startPoint= transform.position;
		endPoint= new Vector3(transform.position.x + 1, transform.position.y, transform.position.z);
	}
	
	}
}

	function calculateWalk(){
		yield WaitForSeconds(.3);
		
		var hit: RaycastHit;
			if(Physics.Raycast (transform.position, -Vector3.up, hit, 100.0)){
				var distanceToGround = hit.distance;
			}
			if(hit.collider.gameObject.tag == "TallGrass"){
				walkCounter++;
			}
	
		if(walkCounter >= walkCounter2){
			walkCounter2 = Random.Range(5, 15);
			walkCounter = 0;
			enterCombat();
		}
	}
	
	function enterCombat(){
	//isInCombat = true;
	CameraMain.active = false;
	CombatCamera.active = true;
		Debug.Log("You have entered COMBAT");
	}
