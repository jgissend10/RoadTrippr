
var el = document.getElementById("main"),
    two = new Two({ 
        fullscreen: true
    });
 
two.appendTo(el);

var w = 350;
var h = 400;
var s = 20;
var ax = -w/2;
var ay = -h/2;


var poly = two.makeCurve(0+ax,0+s+ay, 0+s+ax,0+ay, w/2+ax,0+ay, w-s+ax,0+ay, w+ax,0+s+ay, w+ax,h-s+ay, w-s+ax,h+ay, 0+s+ax,h+ay, 0+ax,h-s+ay);
poly.linewidth = 4;
//poly.translation = new Two.Vector(w/2, h/2);
poly.stroke = "#cccccc";
poly.fill = "#ececec";
 ax = -w/2;
 ay = -h/2;
var ellipse = two.makeEllipse(0,ay, w/2, 40);
//ellipse.translation = new Two.Vector(720, 90);
ellipse.fill = "#ccc";
ellipse.stroke = "#112233";
ellipse.linewidth = 5;
var ellipse2 = two.makeEllipse(0,ay-30, 40, 40);
//ellipse2.translation = new Two.Vector(720, 50);
ellipse2.fill = "#ccc";
ellipse2.stroke = "#112233";
ellipse2.linewidth = 5;
var poly2 = two.makeCurve( w+ax,h-s+ay, w-s+ax,h+ay, 0+s+ax,h+ay, 0+ax,h-s+ay, 0+s*2+ax,h-s*2+ay, w-s*2+ax,h-s*2+ay);
poly2.linewidth = 4;
//poly2.translation = new Two.Vector(720, 470);
poly2.stroke = "#cccccc";
poly2.fill = "#ececec";
var group = two.makeGroup(poly, ellipse,poly2, ellipse2);

two.update();
var t = 0;
two.bind('update', function(frameCount) {
  // This code is called everytime two.update() is called.
  // Effectively 60 times per second.
  //if (group.scale > 0.9999) {
  //  group.scale = group.rotation = 0;
  //}
  //group.translation = new Two.Vector(-720-w/2, -h/2);
  t++;
  //if((t/10)%2==0)
 	 group.rotation = Math.sin(t/1000*45)/10;
	//else
	//	group.rotation = -1;
  group.translation = new Two.Vector($( window ).width()/2, 270);
}).play();  // Finally, start the animation loop
