
class Vector
{
  // Constructor
  constructor(x = 0, y = 0, z = 0) {
    this.x = x; // x:Number
    this.y = y; // y:Number
    this.z = z; // z:Number
  }
  // Methods
  info() {
    return( "V: " + this.x + "," + this.y + "," + this.z );
  }
  
  set( v ) {
    this.x = v.x;  this.y = v.y;  this.z = v.z;
  }
  copy() {
    return new Vector( this.x, this.y, this.z );
  }
  
  plus( v ) {
    this.x += v.x;  this.y += v.y;  this.z += v.z;
  }
  minus( v ) {
    this.x -= v.x;  this.y -= v.y;  this.z -= v.z;
  }
  mult( k ) {
    this.x *= k;  this.y *= k;  this.z *= k;
  }

  len() {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }

  dot( v ) {
    return( this.x*v.x + this.y*v.y + this.z*v.z );
  }
  cross( v ) {
    return new Vector(
        this.y*v.z - this.z*v.y,
        this.z*v.x - this.x*v.z,
        this.x*v.y - this.y*v.x
    );
  }

  multM( m ) {
    var X = this.x*m.m[0][0] + this.y*m.m[1][0] + this.z*m.m[2][0] + m.m[3][0];
    var Y = this.x*m.m[0][1] + this.y*m.m[1][1] + this.z*m.m[2][1] + m.m[3][1];
    var Z = this.x*m.m[0][2] + this.y*m.m[1][2] + this.z*m.m[2][2] + m.m[3][2];
    var W = this.x*m.m[0][3] + this.y*m.m[1][3] + this.z*m.m[2][3] + m.m[3][3];
    if( W != 0 ) {
      this.x = X/W;
      this.y = Y/W;
      this.z = Z/W;
    }
  }
}


class Matrix
{
  // Constructor
  constructor() {
    this.m    = new Array( 4 );
    this.m[0] = new Array(1,0,0,0);
    this.m[1] = new Array(0,1,0,0);
    this.m[2] = new Array(0,0,1,0);
    this.m[3] = new Array(0,0,0,1);
  }

  copy() {
    var r = new Matrix();
    for( var i=0; i<4; i++ )
     for( var j=0; j<4; j++ )
        r.m[i][j] = this.m[i][j];
    return r;
  }

  // Methods
  info() {
    return( "M: " + this.m[0] + "\n   " 
                  + this.m[1] + "\n   " 
                  + this.m[2] + "\n   " 
                  + this.m[3] );
  }

  multR( r ) { // r:Matrix
    var t = this.copy();
    for( var i=0; i<4; i++ )
     for( var j=0; j<4; j++ ) {
       this.m[i][j] = 0;
       for( var k=0; k<4; k++ )
         this.m[i][j] += t.m[i][k] * r.m[k][j];
     }
  }

  rotation( i, j, a ) { // i:Number, j:Number, a:Number
    var c = Math.cos( a );
    var s = Math.sin( a );
    this.m[i][i] = c;
    this.m[i][j] =-s;
    this.m[j][i] = s;
    this.m[j][j] = c;
  }

}
