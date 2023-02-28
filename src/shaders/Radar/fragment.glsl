#define PI 3.1415926535897932384626433832795
uniform vec3 uColor;
uniform float uTime;
varying vec2 vUv;

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main(){
    vec2 rotateUv = rotate(vUv,-uTime*2.0*PI,vec2(0.5));
    float alpha = 1.0-step(0.5,distance(rotateUv,vec2(0.5)));
    float angle = atan(rotateUv.x -0.5,rotateUv.y-0.5);
    angle /=  2.0*PI;
    float strength = angle+0.5;
    gl_FragColor = vec4(vec3(uColor),alpha*strength);
 
}