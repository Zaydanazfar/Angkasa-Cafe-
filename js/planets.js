/* Planet berputar (WebGL): Bumi (tekstur NASA), Saturnus & Bulan (prosedural). Berjalan hanya saat terlihat & mode gelap. */
(()=>{'use strict';
const root=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const VS='attribute vec2 a;varying vec2 vP;void main(){vP=a;gl_Position=vec4(a,0.,1.);}';
const FS=`precision highp float;varying vec2 vP;uniform float uType,uT,uSpeed;uniform sampler2D uTex;
const float PI=3.14159265;
float h(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float vn(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*vn(p);p=p*2.03+17.1;a*=.5;}return s;}
float worley(vec3 p){vec3 i=floor(p),f=fract(p);float d=1.;for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++)for(int z=-1;z<=1;z++){vec3 g=vec3(float(x),float(y),float(z));vec3 o=vec3(h(i+g),h(i+g+19.1),h(i+g+37.7));d=min(d,length(g+o-f));}return d;}
vec3 rotY(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(v.x*c+v.z*s,v.y,-v.x*s+v.z*c);}
void main(){
 float r2=dot(vP,vP);if(r2>1.){gl_FragColor=vec4(0.);return;}
 float edge=1.-smoothstep(.993,1.,sqrt(r2));
 float z=sqrt(1.-r2);vec3 n=vec3(vP,z);
 vec3 L=normalize(vec3(-.42,.72,.55));float diff=dot(n,L);float rot=uT*uSpeed;vec3 col;
 if(uType<.5){
  float a=-.5236;vec3 w=vec3(n.x,n.y*cos(a)+n.z*sin(a),-n.y*sin(a)+n.z*cos(a));
  float lon=atan(w.x,w.z)+1.85-rot;float lat=asin(clamp(w.y,-1.,1.));
  vec3 D=texture2D(uTex,vec2(fract(lon/(2.*PI)+.5),.5-lat/PI)).rgb*1.08;
  float ocean=clamp((D.b-max(D.r*1.25,D.g*.95))*5.,0.,1.);
  float lit=.08+1.3*smoothstep(-.1,.5,diff);
  col=(D*(1.-ocean*.12)+ocean*vec3(0.,.05,.16)*.35)*lit;
  vec3 R=reflect(-L,n);col+=pow(max(R.z,0.),70.)*ocean*clamp(diff,0.,1.)*.7*vec3(1.,.95,.85);
  float cl0=lon+rot*.12;vec3 cp=vec3(cos(cl0)*cos(lat),sin(lat),sin(cl0)*cos(lat));
  float cl=clamp((fbm(cp*3.2)-.5)*3.6,0.,1.)*clamp(1.15-w.y*w.y*.5,0.,1.);cl=pow(cl,1.15)*.85;
  col=col*(1.-cl*.9)+vec3(cl*(.1+smoothstep(-.1,.5,diff))*.98);
  col+=vec3(.3,.58,1.)*pow(1.-z,2.6)*(.25+1.1*smoothstep(-.3,.6,diff))*1.15;
 }else if(uType<1.5){
  vec3 m=rotY(n,rot);float lat=asin(clamp(m.y,-1.,1.)),lon=atan(m.x,m.z);
  float b=sin(m.y*10.+fbm(vec3(m.x*2.,m.y*7.,m.z*2.)+3.)*4.8);
  col=mix(vec3(.81,.65,.44),vec3(.90,.79,.61),smoothstep(-.6,.6,b));
  col=mix(col,vec3(.73,.54,.33),smoothstep(.55,.85,fbm(m*vec3(3.,9.,3.)+7.))*.55);
  float sp=smoothstep(.5,.2,length(vec2(lon-.9,(lat+.38)*2.4)));col=mix(col,vec3(.72,.33,.2),sp*.8);
  col*=.07+1.05*smoothstep(-.08,.5,diff);col+=vec3(1.,.8,.55)*pow(1.-z,3.)*.12*smoothstep(-.3,.6,diff);
 }else{
  vec3 m=rotY(n,rot);float alb=.62+.3*(fbm(m*2.5)-.5);
  float d=worley(m*4.5),d2=worley(m*10.+5.);
  alb=alb*(1.-smoothstep(.34,.08,d)*.38-smoothstep(.3,.06,d2)*.2)+smoothstep(.4,.34,d)*smoothstep(.2,.34,d)*.1;
  alb*=1.-smoothstep(.55,.7,fbm(m*1.4+3.))*.22;
  col=vec3(alb)*vec3(.96,.96,.93)*(.06+1.12*smoothstep(-.1,.5,diff));
 }
 gl_FragColor=vec4(clamp(col,0.,1.)*edge,edge);
}`;
const items=[];let raf=0,last=0;
function sh(gl,t,s){const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return gl.getShaderParameter(o,gl.COMPILE_STATUS)?o:null}
function init(cv){
  const type=+cv.dataset.t,gl=cv.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false,powerPreference:'low-power'});if(!gl)return null;
  const vs=sh(gl,gl.VERTEX_SHADER,VS),fs=sh(gl,gl.FRAGMENT_SHADER,FS);if(!vs||!fs)return null;
  const pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return null;gl.useProgram(pr);
  const bf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const U=n=>gl.getUniformLocation(pr,n);gl.uniform1f(U('uType'),type);gl.uniform1f(U('uSpeed'),[.14,.21,.105][type]);
  const it={cv,gl,uT:U('uT'),type,ready:type!==0,vis:false};
  if(type===0){const img=new Image();img.onload=()=>{const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.uniform1i(U('uTex'),0);it.ready=true;draw(it,performance.now())};img.src=window.EARTH_TEX||''}
  return it}
function fit(it){const D=Math.min(devicePixelRatio||1,it.type===0?1.25:1.5),w=Math.max(2,Math.round(it.cv.clientWidth*D));if(it.cv.width!==w){it.cv.width=it.cv.height=w;it.gl.viewport(0,0,w,w)}}
function draw(it,t){if(!it.ready)return;fit(it);it.gl.uniform1f(it.uT,t/1000+(it.type*7));it.gl.clearColor(0,0,0,0);it.gl.clear(it.gl.COLOR_BUFFER_BIT);it.gl.drawArrays(it.gl.TRIANGLE_STRIP,0,4)}
function loop(t){raf=0;if(t-last>=33){last=t;items.forEach(i=>i.vis&&draw(i,t))}
  if(root.dataset.theme==='dark'&&!document.hidden&&items.some(i=>i.vis)&&!reduce)raf=requestAnimationFrame(loop)}
const kick=()=>{if(!raf&&root.dataset.theme==='dark'&&!document.hidden&&!reduce)raf=requestAnimationFrame(loop)};
document.querySelectorAll('.planet canvas.gl').forEach(cv=>{
  const it=init(cv);
  if(!it){ // cadangan tanpa WebGL
    if(+cv.dataset.t===0){const im=new Image();im.src='gambar/earth.webp';im.alt='';im.width=im.height=1100;im.style.cssText='width:125%;height:125%;margin:-12.5%;display:block;max-width:none';cv.replaceWith(im)}
    else{const i=document.createElement('i');i.className='ball';cv.replaceWith(i)}return}
  items.push(it);
  if('IntersectionObserver'in window)new IntersectionObserver(es=>es.forEach(e=>{it.vis=e.isIntersecting;if(it.vis){if(reduce)draw(it,6000);kick()}}),{rootMargin:'80px'}).observe(cv);else it.vis=true;
});
new MutationObserver(kick).observe(root,{attributes:true,attributeFilter:['data-theme']});
document.addEventListener('visibilitychange',kick);
addEventListener('resize',()=>items.forEach(i=>{i.cv.width=1;i.vis&&draw(i,performance.now())}));
kick();
})();
