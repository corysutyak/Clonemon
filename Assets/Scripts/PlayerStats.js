#pragma strict

var startPoint : Vector3;
var endPoint : Vector3;
var speed : float;
private var increment : float;
var isMoving : boolean;
var disableMovement : boolean;

var walkCounter : int;
var walkCounter2 : int;
var isInCombat : boolean;
var directionFacing : String;

var CameraMain : GameObject;
var CombatCamera : GameObject;

var teleportLoc : GameObject[];

var region : String;

var MainScript : Main;
function Start () {

	startPoint = transform.position;
	endPoint = transform.position;
	
	walkCounter2 = Random.Range(5, 15);
	isInCombat = false;
	region = "region1";

}

function Update () {

	if(Input.GetKeyDown("space") && !disableMovement){
		talkToNPC();
	}
	var Sprite = gameObject.GetComponent(AnimateSprite);
	var xMove : int;
	var yMove : int;	
	var direction;
	var disableMove : boolean;
	var hit2: RaycastHit;
	
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
	
	if(!isInCombat && !disableMovement){
		if (Input.GetKey(KeyCode.LeftShift)){
			speed = 10;
		}
		else{
			speed = 5;
		}

	if(Input.GetKey("w") && isMoving == false){
		xMove = 0;
		yMove = 1;
		Sprite.rowNumber = 3;
		Sprite.totalCells = 4;
		directionFacing = "north";
	}
	
		if(Input.GetKey("s") && isMoving == false){
		xMove = 0;
		yMove = -1;
		Sprite.rowNumber = 0;
		Sprite.totalCells = 4;
		directionFacing = "south";
	}
	
		if(Input.GetKey("a") && isMoving == false){
		xMove = -1;
		yMove = 0;
		Sprite.rowNumber = 1;
		Sprite.totalCells = 4;
		directionFacing = "west";
	}
	
		if(Input.GetKey("d") && isMoving == false){
		xMove = 1;
		yMove = 0;
		Sprite.rowNumber = 2;
		Sprite.totalCells = 4;
		directionFacing = "east";
	}
	
	if (xMove > 0){
		direction = transform.TransformDirection (-Vector3.left);
	}
	else if (xMove < 0) {
		direction = transform.TransformDirection (Vector3.left);
	}
	else if (yMove > 0) {
		direction = transform.TransformDirection (Vector3.up);
	}
	else if (yMove < 0) {
		direction = transform.TransformDirection (-Vector3.up);
	}	
		
	if (direction != null){
		if(Physics.Raycast (transform.position, direction, hit2, speed)){
			var distanceToGround = hit2.distance;
			if(hit2.collider.gameObject.tag == "Collision"){
				disableMove = true;
			}
		}
		if(!disableMove){
			increment = 0;
			isMoving = true;
			startPoint= transform.position;
			endPoint= new Vector3(transform.position.x + xMove, transform.position.y + yMove, transform.position.z);
			calculateWalk();
		}
		disableMove = false;	
		}
	}
}

	function calculateWalk(){
		yield WaitForSeconds(.3);
		
		var hit: RaycastHit;
			if(Physics.Raycast (transform.position, -Vector3.up, hit, 100.0)){
				var distanceToGround = hit.distance;
				if(hit.collider.gameObject.tag == "TallGrass"){
					walkCounter++;
				}
			}	
		if(walkCounter >= walkCounter2){
			walkCounter2 = Random.Range(5, 15);
			walkCounter = 0;
			enterCombat();
		}
	}
	
	function enterCombat(){
		MainScript.randomizeMonster();
		isInCombat = true;
		CameraMain.active = false;
		CombatCamera.active = true;
		Debug.Log("You have entered COMBAT");
	}

	function OnTriggerEnter(col : Collider){
		if(col.gameObject.tag == "TeleportEntrance1")
		{
			Debug.Log("TeleportEntrance1");
			this.transform.position = teleportLoc[1].transform.position;
			this.transform.position.y += 2;
			region = "region2";
		}
		if(col.gameObject.tag == "TeleportEntrance2")
		{
			Debug.Log("TeleportEntrance2");
			this.transform.position = teleportLoc[0].transform.position;
			this.transform.position.y -= 2;
			region = "region1";
		}
	}
	
	function talkToNPC(){
		var hit : RaycastHit;
		var distanceToGround;
		if(directionFacing == "north"){
			if (Physics.Raycast(transform.position, Vector3.up, hit, 1.0)){
				distanceToGround = hit.distance;
				if(hit.collider.gameObject.tag == "npc"){
					hit.collider.SendMessage("talk");
				}
			}
		}
		if(directionFacing == "south"){
			if (Physics.Raycast(transform.position, Vector3.down, hit, 1.0)){
				distanceToGround = hit.distance;
				if(hit.collider.gameObject.tag == "npc"){
					hit.collider.SendMessage("talk");
				}
			}
		}
		if(directionFacing == "east"){
			if (Physics.Raycast(transform.position, Vector3.right, hit, 1.0)){
				distanceToGround = hit.distance;
				if(hit.collider.gameObject.tag == "npc"){
					hit.collider.SendMessage("talk");
				}
			}
		}
		if(directionFacing == "west"){
			if (Physics.Raycast(transform.position, Vector3.left, hit, 1.0)){
				distanceToGround = hit.distance;
				if(hit.collider.gameObject.tag == "npc"){
					hit.collider.SendMessage("talk");
				}
			}
		}
	}