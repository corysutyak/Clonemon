#pragma strict

var uvAnimationTileX = 4;
var uvAnimationTileY = 4;
var framesPerSecond = 10.0;

function Update () {

	var index : int = Time.time * framesPerSecond;
	index = index % (4 * 4);
	var size = Vector2(1.0 / uvAnimationTileX, 1.0 / uvAnimationTileY);
	var uIndex = index % uvAnimationTileX;
	var vIndex = index / uvAnimationTileX;
	var offset = Vector2(uIndex * size.x, 1.0 - size.y - vIndex * size.y);
	renderer.material.SetTextureOffset ("_MainTex", offset);
	renderer.material.SetTextureScale("_MainTex", size);
}