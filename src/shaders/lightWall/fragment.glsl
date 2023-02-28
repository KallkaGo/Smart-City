uniform float uHeight;
varying vec3 vPosition;
void main(){
    float strength = (vPosition.y+uHeight/2.0)/ uHeight;
    gl_FragColor = vec4(1.0,0.0,0.0,1.0-strength);
 
}