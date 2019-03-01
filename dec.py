from Crypto.Cipher import AES
a = [ 28, 44, -36, -101, 37, 78, 102, -33, -80, 83, 44, 95, -83, -83, -120, -14, 26, -21, -58, -52, -35, 13, 127, -84, -122, -38, 41, 56, 3, -62, 125, -54 ]
a = [ bytes( i ).encode( 'utf8' ) for i in a ]
b = [ 115, 104, 97, 114, 101, 107, 104, 97, 110, 100, 102, 116, 50, 48, 49, 54 ];
b = [ bytes( i ).encode( 'utf8' ) for i in b ]
a = ''.join( a )
b = ''.join( b )
print AES.new( a , AES.MODE_CBC , b )

