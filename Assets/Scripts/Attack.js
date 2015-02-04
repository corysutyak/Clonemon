#pragma strict

class Attack{
	var name : Move;
	var damage : float;
	var type : Type;
}

enum Move{
	vine,
	tackle,
	smash,
	shock,
	charge
}
