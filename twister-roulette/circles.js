function drawCircle(cx,cy,r){

    var svgCircle = document.createElementNS('http://www.w3.org/2000/svg',"circle");
        svgCircle.setAttributeNS(null,"cx", cx);
        svgCircle.setAttributeNS(null,"cy", cy);
        svgCircle.setAttributeNS(null,"r", r);
        svgCircle.setAttributeNS(null,"stroke",'blue')
        svgCircle.setAttributeNS(null,"fill",'transparent')
    return svgCircle;

}

function polarToCartesian(center_x, center_y, radius, angle_in_degrees) {
    var return_value = {}
    var angle_in_radians =  angle_in_degrees * Math.PI / 180.0;
        return_value.x =    center_x + radius * Math.cos(angle_in_radians);
        return_value.y =    center_y + radius * Math.sin(angle_in_radians);
    return return_value;
}

const init = svg => {

    //  The center is the same for all circles
    var cx = 200;
    var cy = 200;

    var radius_of_satellites_from_center = 150;
    var number_of_satellite_circles = 16;
    var radius_of_small_circles = ((Math.PI*radius_of_satellites_from_center)/number_of_satellite_circles)-2;

    for(var n = 0; n < number_of_satellite_circles; n++){

        //  Find how many degrees separate each circle
        var degrees_of_separation = 360/number_of_satellite_circles;

        var angle_as_degrees = (degrees_of_separation * n) + (degrees_of_separation/2);

        var coordinates = polarToCartesian(cx, cy, radius_of_satellites_from_center, angle_as_degrees);

        svg.appendChild( drawCircle(coordinates.x,coordinates.y,radius_of_small_circles) );

    }

}

export default { init }