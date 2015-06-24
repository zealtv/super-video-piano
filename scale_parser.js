autowatch = 1;
inlets = 1;
outlets = 2;


var maxNotes = 156;
var offset = 12;
var currentScale = 0;


//scales
//------------------------------------
var scale_ionian = {
	name: "Ionian",
	jumps: [ 2, 2, 1, 2, 2, 2, 1 ],
	scale: [],

	clearScale: clearScale,
	makeScale: makeScale
};

var scale_majorPent = {
	name: "Major Pentatonic",
	jumps: [ 2, 2, 3, 2, 3 ],
	scale: [],

	clearScale: clearScale,
	makeScale: makeScale	
};

var scale_aeolian = {
	name: "Aeolian",
	jumps: [ 2, 1, 2, 2, 1, 2, 2 ],
	scale: [],

	clearScale: clearScale,
	makeScale: makeScale	
};

var scale_minorPent = {
	name: "Minor Pentatonic",
	jumps: [ 3, 2, 3, 3, 2 ],
	scale: [],

	clearScale: clearScale,
	makeScale: makeScale	
};

var scales = [ scale_ionian, scale_majorPent, scale_aeolian, scale_minorPent ];


//scale functions
//------------------------------------
function makeScale()
{
	var pi = 0;
	for( var i = 0; i < maxNotes; i++ )
	{
		this.scale.push(pi);
		pi = pi + this.jumps[ i % this.jumps.length];
	}
	this.scale.push(pi);
}


function clearScale()
{
	this.scale = [];
}


function getScales()
{
	outlet( 1, "scales", 0 );
	for( var i = 0; i < scales.length; i++ )
	{
		outlet( 1, "scales", scales[i].name );
	}
}


function setScale( i )
{
	var j = i;
	if( j > scales.length ) j = scales.length;
	if( j < 0 ) j = 0;
	currentScale = j;
	flush();
}
//------------------------------------


function bang()
{

	post( "scales length = " + scales.length + "\n" );

	for( var i = 0; i < scales.length; i++ )
	{

		scales[i].clearScale();
		scales[i].makeScale();

		post( "Scale: " + scales[i].name + "\n");
		post( "scale length = " + scales[i].scale.length + "\n");

	}

	getScales();

}


function list( a )
{
	if( arguments.length == 2 )
	{

		var note = arguments[0];
		var vel = arguments[1];

		if( vel > 127 ) vel = 127;

		note = scales[currentScale].scale[ note % maxNotes ] + offset;		
		
		outlet( 0, note, vel );
	}
}


function setOffset( i )
{
	offset = i;
	flush();
}


function flush()
{
	outlet( 1, "flush", 1 );
}



