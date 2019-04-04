
#  abcba
# a10001
# c00100
# a10000
# b02000

index_map = {}


a = raw_input( )
b = raw_input( )
m , n = len( a ) , len( b )

for i in xrange( n  - 1 , - 1 , -1 ):
	curr = index_map.get( b[ i ] , [] )
	curr.append( i )
	index_map[ b[ i ] ] = curr


curlens = [ ( 0 , 0 ) for i in xrange( n + 1 ) ] 

ans = 0 
for i in xrange( m ):
	for j in index_map.get( a[ i ] , [] ):

		if curlens[ j ][ 1 ] == i:
			curlens[ j + 1 ] = ( curlens[ j ][0] + 1 , i + 1 )
		else:
			curlens[ j ] 		= ( 0 , i + 1 )
			curlens[ j + 1 ] 	= ( 1 , i + 1 )

		ans = max( ans , curlens[ j + 1 ][0] )


print ans 
 
