vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower) {
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(- lightDirection, normal);

    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    float specular = - dot(lightReflection, viewDirection);
    specular = pow(max(0.0, specular), specularPower);

    return lightColor * lightIntensity * (shading + specular) ;
}