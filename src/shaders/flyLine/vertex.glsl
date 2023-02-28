attribute float aSize;
uniform float uTime;
uniform float uLength;
varying float vSize;
void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    vec4 viewPosition = viewMatrix *modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    vSize = (aSize-uTime);
    if(vSize<0.0){
        vSize = vSize + uLength; 
    }
    vSize = (vSize-500.0)*0.2;
    gl_PointSize = -vSize/viewPosition.z;
}