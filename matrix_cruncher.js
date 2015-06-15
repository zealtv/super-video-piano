inlets = 1;
outlets = 2;

var matrix = new JitterMatrix(1, "char", 1, 24);
var matrixin = new JitterMatrix(1, "char", 1, 24);
var pmatrix = new JitterMatrix(1, "char", 1, 24);

var thresh = 100;
var offset = 12;

var scale_major = [ 0, 2, 4, 5, 7, 9, 11 ];


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


function setOffset( i )
{
	offset = i;
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
			outlet( 1, scale( i ), val );
			
		}
		else if( val < thresh && pval >=thresh )
		{
			matrix.setcell2d( 0, i, 0 );
			outlet( 1, scale( i ), 0 );
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


function scale( i )
{
	var j = i;
	//TODO unwrong this:
	j = j + scale_major[ i % scale_major.length ] + offset;
	
	return j;
}