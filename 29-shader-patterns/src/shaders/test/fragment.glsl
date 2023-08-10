#define PI 3.14159265

varying vec2 vUv;
varying vec3 vPosition;

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



    gl_FragColor = vec4(strength, strength, strength, 1.0);
}