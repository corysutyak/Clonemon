#pragma strict

class monster{
	var name : String;
	var type : Type;
	var baseHP : float;
	var curHP : float;
	var maxHP : float;
	var baseAtk : float;
	var curAtk : float;
	var baseDef : float;
	var curDef : float;
	var speed : float;
	var regionLocated : String;
	var rarity : Rarity;
	var image : Texture2D;
	var attacks : Attack[];
	var weakness: Type;
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

enum Rarity{
	common,
	rare
}