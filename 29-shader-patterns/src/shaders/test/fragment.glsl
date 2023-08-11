#define PI 3.14159265

varying vec2 vUv;
varying vec3 vPosition;

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main()
{
    // float strength = vUv.x;
    // float strength = vUv.y;
    // float strength = 1.0 - vUv.y;

    // float strength = vUv.y * 10.0;

    // float strength = mod(vUv.y, 0.1)*10.0 ;

    // float strength = mod(vUv.y * 10.0, 1.0) ;
    // strength = step(0.5, strength);

    // float strengthX = mod(vUv.x * 10.0 - 0.2, 1.0);
    // float strengthY = mod(vUv.y * 10.0 - 0.2, 1.0);
    // float strength = (step(0.35, strengthX)) * (step(0.6, strengthY) - step(0.8, strengthY)) + (step(0.6, strengthX)-step(0.8, strengthX)) * step(0.35, strengthY) ;
    // float strengthX = abs(cos(vUv.x * 10.0));
    // float strengthY = abs(cos(vUv.y * 10.0));
    // float strength = step(0.5, strengthX) * step(0.5, strengthY) + step(0.5, strengthX) * step(0.5, strengthY) ;


    // float strength = (cos(vUv.x * 3.1415*2.0) +1.0)/4.0;

    // float strength = min(abs(vUv.x -0.5), abs(vUv.y - 0.5));

    // float strength = max(abs(vUv.x -0.5) , abs(vUv.y - 0.5));

    // float strength = step(0.2, max(abs(vUv.x -0.5), abs(vUv.y - 0.5)));

    // float square1 = step(0.2, max(abs(vUv.x -0.5), abs(vUv.y - 0.5)));
    // float square2 = 1.0 - step(0.25, max(abs(vUv.x -0.5), abs(vUv.y - 0.5)));
    // float strength = square1 * square2;

    // float strength = floor(vUv.x * 10.0)/10.0 ;

    // float strength = floor(vUv.x * 10.0)/10.0 * floor(vUv.y * 10.0)/10.0 ;

    // float strength = random(vUv);

    // vec2 gridUv = vec2(
    //      floor(vUv.x * 10.0)/10.0,
    //      floor(vUv.y * 10.0)/10.0
    // );

    // float strength = random(gridUv);

    // vec2 gridUv = vec2(
    //      floor(vUv.x * 10.0)/10.0,
    //      floor((vUv.y + vUv.x/2.0) * 10.0)/10.0
    // );

    // float strength = random(gridUv);

    // float strength = vUv.x * vUv.x + vUv.y * vUv.y;
    // float strength = length(vUv - 0.5);

    // float strength = 1.0 - length(vUv - 0.5);

    // float strength = 0.015 / length(vUv - 0.5);

    // vec2 lightUvX = vec2(
    //     vUv.x * 0.1 + 0.45,
    //     vUv.y* 0.5 + 0.25
    // );
    // float lightX = 0.015 / length(lightUvX - 0.5);

    // vec2 lightUvY = vec2(
    //     vUv.y * 0.1 + 0.45,
    //     vUv.x* 0.5 + 0.25
    // );
    // float lightY = 0.015 / length(lightUvY - 0.5);

    // float strength = lightX * lightY;

    // vec2 rotatedUv = rotate(vUv, PI/4.0, vec2(0.5));

    // vec2 lightUvX = vec2(
    //     rotatedUv.x * 0.1 + 0.45,
    //     rotatedUv.y* 0.5 + 0.25
    // );
    // float lightX = 0.015 / length(lightUvX - 0.5);

    // vec2 lightUvY = vec2(
    //     rotatedUv.y * 0.1 + 0.45,
    //     rotatedUv.x* 0.5 + 0.25
    // );
    // float lightY = 0.015 / length(lightUvY - 0.5);

    // float strength = lightX * lightY;

    // float strength = step(0.25,distance(vUv,vec2(0.5)));

    // float strength = 1.0 - step(0.01,abs(distance(vUv,vec2(0.5))-0.25));

    // vec2 waveUv = vec2(
    //     vUv.x,
    //     sin(vUv.x * 40.0)*0.1 + vUv.y
    // );
    // float circle = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5))-0.25));

    // float strength = circle;

    // vec2 waveUv = vec2(
    //     vUv.x + sin(vUv.y*30.0) *0.1,
    //     sin(vUv.x * 30.0)*0.1 + vUv.y
    // );
    // float circle = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5))-0.25));

    // float strength = circle;

    // vec2 waveUv = vec2(
    //     vUv.x + sin(vUv.y*100.0) *0.1,
    //     sin(vUv.x * 100.0)*0.1 + vUv.y
    // );
    // float circle = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5))-0.25));

    // float strength = circle;

    // float angle = atan(vUv.x - 0.5, vUv.y-0.5);
    // float strength = angle /(PI*2.0) + 0.5;

    // float angle = atan(vUv.x - 0.5, vUv.y-0.5);
    // angle = angle /(PI*2.0) + 0.5;
    // float strength = mod(angle, 0.05)*20.0;

    // float angle = atan(vUv.x - 0.5, vUv.y-0.5);
    // angle = angle /(PI*2.0) + 0.5;
    // float strength = sin(angle*30.0*PI);
    
    // float radius = atan(vUv.x - 0.5, vUv.y-0.5)/(PI*2.0) + 0.5;
    // float strength = 1.0 - step(0.01,abs(distance(vUv,vec2(0.5))-0.25 + sin(radius * 100.0) * 0.02));
    
    
    // float strength = 1.0 - abs(cnoise(vUv * 10.0));

    // float strength = step(0.9,sin(cnoise(vUv * 10.0) * 20.0));

    // float strength = step(0.9,sin(cnoise(vUv * 10.0) * 20.0));

    // float strength = vUv.y;


    // strength = clamp(strength, 0.0, 1.0);

    // vec3 blackColor = vec3(0.0);
    // vec3 uvColor = vec3(vUv, 0.0);

    // vec3 mixedColor = mix(blackColor, uvColor, strength);

    gl_FragColor = vec4(vec3(vUv.x), 1.0);
}