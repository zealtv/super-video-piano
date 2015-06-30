autowatch = 1;
inlets = 1;
outlets = 2;

var matrix = new JitterMatrix(1, "char", 1, 24);
var matrixin = new JitterMatrix(1, "char", 1, 24);
var pmatrix = new JitterMatrix(1, "char", 1, 24);

var thresh = 100;

var doAudio = 1;
var doMidi = 1;

function bang()
{
	matrix.setall( 0 );
	outlet(0, "jit_matrix", matrix.name);
}


function setThresh( i )
{
	thresh = clamp( i );
	post( thresh + "\n");
}


function jit_matrix( m )
{
	matrixin.frommatrix( m );
	
	
	
	for( var i = 0; i < 24; i++ )
	{
		var val = matrixin.getcell( 0, i );
		var pval = pmatrix.getcell( 0, i );
		
		if(  val > thresh && pval <= thresh )
		{
			matrix.setcell2d( 0, i, val );
			outlet( 1, i, val/2 );
			
		}
		else if( val < thresh && pval >=thresh )
		{
			matrix.setcell2d( 0, i, 0 );
			outlet( 1, i, 0 );
		}
	}
	
	pmatrix.frommatrix( m );
	
	outlet( 0, "jit_matrix", matrix.name );
	
	
}


function clamp( i )
{
	var j = i;
	if( j < 0 ) j = 0;
	if( j > 255 ) j = 255;
	return j;
}