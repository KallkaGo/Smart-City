varying float vSize;
uniform vec3 uColor;
void main(){
    float distanceTOCenter = distance(gl_PointCoord,vec2(0.5));
    float strength =0.05/distanceTOCenter - 0.1;
   if(vSize<=0.0){
        gl_FragColor = vec4(1,0,0,0);
    }else{
        gl_FragColor = vec4(vec3(uColor),strength);
    }
}