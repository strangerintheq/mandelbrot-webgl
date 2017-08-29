attribute vec2 xy;

void main(void) {
    gl_Position = vec4(xy, 0.0, 1.0);
}

precision highp float;

uniform float zoom;
uniform vec2 resolution;
uniform vec2 center;

vec2 mul(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, 2.0 * a.x * b.y);
}

void main(void) {

	vec2 p = (-resolution + 2.0*gl_FragCoord.xy)/resolution.y;
    p *= zoom;
    p += center;
   	vec2 z = vec2(0.0);
    vec2 c = p;
    float it = 0.;

    for (int i = 0 ; i < 256; i++) {
        // z = z^2 + c for complex numbers
    	z = mul(z, z) + c;
    	if (dot(z, z) > 4.0) {
    	    it = float(i);
    	    break;
    	}
    }

//    float sl = it - log2(log2(dot(z,z))) + 4.0;
//    float al = smoothstep( -0.1, 0.0, sin(0.5*6.2831) );
//    it = mix( it, sl, al );

    vec3 col = 0.5 + 0.5*cos( 3.0 + it*0.05 + vec3(0.0,0.6,1.0));
	gl_FragColor = vec4(col,1.);

}