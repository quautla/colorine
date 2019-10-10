
//Imports
var pow  = Math.pow;
var sqrt = Math.sqrt;

//Exports
exports.rgb_to_lab  = rgb_to_lab;
exports.rgba_to_lab = rgba_to_lab;

//Returns color with alpha channel converted to Lab color. You could pass a background color that by default is white.
function rgba_to_lab(color, backgound_color){
    return rgb_to_lab(color, backgound_color);
}

function rgb_to_lab(color, backgound_color)
{
  var backgound_color = typeof backgound_color !== 'undefined' ? backgound_color : {R: 255, G: 255, B:255};

  if( typeof color.A !== 'undefined' ) {
    color = {R: backgound_color.R + ( color.R - backgound_color.R ) * color.A,
        G: backgound_color.G + ( color.G - backgound_color.G ) * color.A,
        B: backgound_color.B + ( color.B - backgound_color.B ) * color.A};
  }

  return xyz_to_lab(rgb_to_xyz(color));
}

//Returns c converted to xyzcolor.
function rgb_to_xyz(color)
{
  // Based on http://www.easyrgb.com/index.php?X=MATH&H=02
  var R = ( color.R / 255 );
  var G = ( color.G / 255 );
  var B = ( color.B / 255 );

  R = ( R > 0.04045 ) ? pow(( ( R + 0.055 ) / 1.055 ), 2.4) : R / 12.92;
  G = ( G > 0.04045 ) ? pow(( ( G + 0.055 ) / 1.055 ), 2.4) : G / 12.92;
  B = ( B > 0.04045 ) ? pow(( ( B + 0.055 ) / 1.055 ), 2.4) : B / 12.92;

  R *= 100;
  G *= 100;
  B *= 100;

  // Observer. = 2°, Illuminant = D65
  var X = R * 0.4124 + G * 0.3576 + B * 0.1805;
  var Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  var Z = R * 0.0193 + G * 0.1192 + B * 0.9505;
  return {'X' : X, 'Y' : Y, 'Z' : Z};
}

// Returns c converted to labcolor.
function xyz_to_lab(color)
{
  // Based on http://www.easyrgb.com/index.php?X=MATH&H=07
  var ref_Y = 100.000;
  var ref_Z = 108.883;
  var ref_X = 95.047; 
  
  // Observer= 2°, Illuminant= D65
  var Y = color.Y / ref_Y;
  var Z = color.Z / ref_Z;
  var X = color.X / ref_X;

  X = ( X > 0.008856 ) ? pow( X, 1/3 ) : ( 7.787 * X ) + ( 16 / 116 );
  Y = ( Y > 0.008856 ) ? pow( Y, 1/3 ) : ( 7.787 * Y ) + ( 16 / 116 );
  Z = ( Z > 0.008856 ) ? pow( Z, 1/3 ) : ( 7.787 * Z ) + ( 16 / 116 );

  var L = ( 116 * Y ) - 16;
  var a = 500 * ( X - Y );
  var b = 200 * ( Y - Z );
  return {'L' : L , 'a' : a, 'b' : b};
}