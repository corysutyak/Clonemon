#pragma strict

class monster{
	var type : Type;
	var baseHP : float;
	var curHP : float;
	var baseAtk : float;
	var curAtk : float;
	var baseDef : float;
	var curDef : float;
	var speed : float;
}

enum Type {
	grass,
	psychic,
	water,
	fire,
	ground,
	steel,
	electric
}