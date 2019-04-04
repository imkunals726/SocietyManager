n , m = map( int , raw_input( ).split( ) )
strings = []
for _ in xrange( n ):
	strings.append( raw_input( ) )

comp = ['=' for i in xrange( n ) ]
operations = 0
prevcomp = [ '=' for i in xrange( n )]
for i in xrange( m ):
	for j in xrange( 1 , n ):
		
		if comp[ j ] == '=':
			if strings[j][i] > strings[j-1][i]:
				
				comp[j] = '>'
			elif strings[j][i] < strings[j-1][i]:
				operations += 1
				comp	= [ prevstate for prevstate in prevcomp ]
				break
	prevcomp = [ currentstate for currentstate in comp ]

print operations
		

