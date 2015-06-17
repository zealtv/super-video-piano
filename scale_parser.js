inlets = 1;
outlets = 1;

var majorJumps = [ 2, 2, 1, 2, 2, 2, 1 ];
var scaleMajor = [];
var maxNotes = 156;
var offset = 12;

function bang()
{
	clear();
	makeMajor();
}



function makeMajor()
{

	var pi = 0;
	for( var i = 0; i < maxNotes; i++ )
	{
		scaleMajor.push(pi);
		pi = pi + majorJumps[ i % majorJumps.length];
	}
	scaleMajor.push(pi);
}



function clear()
{
	scaleMajor = [];
}



function printMajor()
{
	for( var i = 0; i < scaleMajor.length; i++ )
	{
		post( scaleMajor[i] + "\n" );
	}
}



function list( a )
{
	if( arguments.length == 2 )
	{

		var note = arguments[0];
		var vel = arguments[1];

		note = scaleMajor[ note % maxNotes ] + offset;		
		
		outlet( 0, note, vel);
	}
}



function setOffset( i )
{
	offset = i;
}