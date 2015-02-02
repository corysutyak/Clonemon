#pragma strict

var colCount : int = 4;
var rowCount : int = 4;

var rowNumber : int = 0;
var colNumber : int = 0;
var totalCells : int = 4;
var fps : int = 10;
var offset : Vector2;


function Update () {

	SetSpriteAnimation(colCount, rowCount, rowNumber, colNumber, totalCells, fps);	
}


function SetSpriteAnimation(colCount : int, rowCount : int, rowNumber : int, colNumber : int, totalCells : int, fps : int){

	//Calculate index
	var index : int = Time.time * fps;
	//Repeat when exhausting all cells
	index = index % totalCells;
	
	//Size of every cell
	var size = Vector2( 1.0 / colCount, 1.0 / rowCount);
	
	//split into horizontal and vertical index
	var uIndex = index % colCount;
	var vIndex = index / colCount;
	
	//build offset
	offset = Vector2((uIndex + colNumber) * size.x, (1.0 - size.y) - (vIndex + rowNumber) * size.y);
	
	renderer.material.SetTextureOffset ( "_MainTex", offset);
	renderer.material.SetTextureScale ("_MainTex", size);	
}