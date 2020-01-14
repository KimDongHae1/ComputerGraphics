// (CC-NC-BY) 201421105 KimDongHae 2019
// document.write("<script src='gml.js'></script>");
var gl;

function testGLError(functionLastCalled) {

    var lastError = gl.getError();

    if (lastError != gl.NO_ERROR) {
        alert(functionLastCalled + " failed (" + lastError + ")");
        return false;
    }

    return true;
}

function initialiseGL(canvas) {
    try {
 // Try to grab the standard context. If it fails, fallback to experimental
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    catch (e) {
    }

    if (!gl) {
        alert("Unable to initialise WebGL. Your browser may not support it");
        return false;
    }

    return true;
}
var toggle = 1;
var Fuc = 1;
var Equ = 1;

var shaderProgram;
function initialiseBuffer() {

    var vertexData = [
        0.5, 0.5, -0.5,     0.5, 0.0, 0.0, 0.7,     1.0, 1.0,//2
        0.5, -0.5, -0.5,    0.5, 0.0, 0.0, 0.7,     1.0, 0.0,//6
        -0.5,-0.5,-0.5,     0.5, 0.0, 0.0, 0.7,     0.0, 0.0,//8
           
        -0.5, 0.5, -0.5,    0.5, 0.0, 0.0, 0.7,     0.0, 1.0,//4
        0.5, 0.5, -0.5,     0.5, 0.0, 0.0, 0.7,     1.0, 1.0,//2
        -0.5,-0.5,-0.5,     0.5, 0.0, 0.0, 0.7,     0.0, 0.0,//8


        -0.5, -0.5, 0.5,    0.0, 0.0, 0.5, 0.7,     0.0, 0.0,//7
        0.5, -0.5, 0.5,     0.0, 0.0, 0.5, 0.7,     1.0, 0.0,//5
        0.5, 0.5, 0.5,      0.0, 0.0, 0.5, 0.7,     1.0, 1.0,//1
                 
        -0.5, -0.5, 0.5,    0.0, 0.0, 0.5, 0.7,     0.0, 0.0,//7
        0.5, 0.5, 0.5,      0.0, 0.0, 0.5, 0.7,     1.0, 1.0,//1
        -0.5, 0.5, 0.5,     0.0, 0.0, 0.5, 0.7,     0.0, 1.0,//3
        
         0.5, -0.5, -0.5,   0.0, 1.0, 0.0, 0.7,     1.0, 0.0,//6
         0.5, -0.5, 0.5,    0.0, 1.0, 0.0, 0.7,     1.0, 0.0,//5
        -0.5, -0.5, 0.5,    0.0, 1.0, 0.0, 0.7,     0.0, 0.0,//7
        
        -0.5,-0.5, -0.5,    0.0, 1.0, 0.0, 0.7,     0.0, 0.0,//8
         0.5, -0.5, -0.5,   0.0, 1.0, 0.0, 0.7,     1.0, 0.0,//6
        -0.5, -0.5, 0.5,    0.0, 1.0, 0.0, 0.7,     0.0, 0.0,//


        -0.5, 0.5, 0.5,     1.0, 1.0, 1.0, 0.7,     0.0, 1.0,//3
        0.5, 0.5, 0.5,      1.0, 1.0, 1.0, 0.7,     1.0, 1.0,//1
        0.5, 0.5, -0.5,     1.0, 1.0, 1.0, 0.7,     1.0, 1.0,//2
                
        -0.5, 0.5, 0.5,     1.0,1.0, 1.0, 0.7,      0.0, 1.0,//3
        0.5, 0.5, -0.5,     1.0, 1.0, 1.0, 0.7,     1.0, 1.0,//2
        -0.5, 0.5, -0.5,    1.0, 1.0, 1.0, 0.7,     0.0, 1.0,//4

        0.5, -0.5, 0.5,     1.0, 0.5, 0.0, 0.7,     0.0, 1.0,//5
        0.5, -0.5, -0.5,    1.0, 0.5, 0.0, 0.7,     0.0, 1.0,//6
        0.5, 0.5, -0.5,     1.0, 0.5, 0.0, 0.7,     1.0, 1.0,//2

        0.5, -0.5, 0.5,     1.0, 0.5, 0.0, 0.7,     0.0, 1.0,//5
        0.5, 0.5, -0.5,     1.0, 0.5, 0.0, 0.7,     1.0, 1.0,//2
        0.5, 0.5, 0.5,      1.0, 0.5, 0.0, 0.7,     1.0, 1.0,//
		 
	
			
		0.5, -0.5, 0.5,		1.0, 0.5, 0.0, 0.7,		0.0, 1.0,//5
		0.5, -0.5, -0.5,	1.0, 0.5, 0.0, 0.7,		0.0, 1.0,//6
		0.5, 0.5, -0.5,		1.0, 0.5, 0.0, 0.7,		1.0, 1.0,//2

		0.5, -0.5, 0.5,		1.0, 0.5, 0.0, 0.7,		0.0, 1.0,//5
		0.5, 0.5, -0.5,		1.0, 0.5, 0.0, 0.7,		1.0, 1.0,//2
		0.5, 0.5, 0.5,		1.0, 0.5, 0.0, 0.7,		1.0, 1.0,//1
				 
		-0.5, 0.5, -0.5,	1.0, 0.0, 0.0, 0.7,		0.0, 1.0,//4
		-0.5,-0.5, -0.5,	1.0, 0.0, 0.0, 0.7,		0.0, 0.0,//8
		-0.5, -0.5, 0.5,	1.0, 0.0, 0.0, 0.7,		0.0, 0.0,//7
		
		-0.5, 0.5, 0.5,		1.0, 0.0, 0.0, 0.7,		0.0, 1.0,//3
		-0.5, 0.5, -0.5,	1.0, 0.0, 0.0, 0.7,		0.0, 1.0,//4
		-0.5, -0.5, 0.5,	1.0, 0.0, 0.0, 0.7,		0.0, 0.0,//7

    ];
	
    // Generate a buffer object
    gl.vertexBuffer = gl.createBuffer();
    // Bind buffer as a vertex buffer so we can fill it with data
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
    return testGLError("initialiseBuffers");
}

function initialiseShaders() {

    var fragmentShaderSource = '\
			varying mediump vec4 color; \
			void main(void) \
			{ \
				gl_FragColor = 1.0 * color;\
			}';

    gl.fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(gl.fragShader, fragmentShaderSource);
    gl.compileShader(gl.fragShader);
    if (!gl.getShaderParameter(gl.fragShader, gl.COMPILE_STATUS)) {
        alert("Failed to compile the fragment shader.\n" + gl.getShaderInfoLog(gl.fragShader));
        return false;
    }

    var vertexShaderSource = '\
			attribute highp vec3 myVertex; \
			attribute highp vec4 myColor; \
			attribute highp vec2 myUV; \
			uniform mediump mat4 Pmatrix; \
			uniform mediump mat4 Vmatrix; \
			uniform mediump mat4 Mmatrix; \
			varying mediump vec4 color; \
			varying mediump vec2 texCoord;\
			void main(void)  \
			{ \
				gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(myVertex, 1.0);\
				color = myColor;\
				texCoord = myUV; \
			}';

    gl.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(gl.vertexShader, vertexShaderSource);
    gl.compileShader(gl.vertexShader);
    if (!gl.getShaderParameter(gl.vertexShader, gl.COMPILE_STATUS)) {
        alert("Failed to compile the vertex shader.\n" + gl.getShaderInfoLog(gl.vertexShader));
        return false;
    }

    gl.programObject = gl.createProgram();

    // Attach the fragment and vertex shaders to it
    gl.attachShader(gl.programObject, gl.fragShader);
    gl.attachShader(gl.programObject, gl.vertexShader);

    // Bind the custom vertex attribute "myVertex" to location 0
    gl.bindAttribLocation(gl.programObject, 0, "myVertex");
    gl.bindAttribLocation(gl.programObject, 1, "myColor");
	gl.bindAttribLocation(gl.programObject, 2, "myUV");

    // Link the program
    gl.linkProgram(gl.programObject);

    if (!gl.getProgramParameter(gl.programObject, gl.LINK_STATUS)) {
        alert("Failed to link the program.\n" + gl.getProgramInfoLog(gl.programObject));
        return false;
    }

    gl.useProgram(gl.programObject);

    return testGLError("initialiseShaders");
}

// FOV, Aspect Ratio, Near, Far 
function get_projection(angle, a, zMin, zMax) {
    var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
    return [
    	0.5/ang, 0 , 0, 0,
        0, 0.5*a/ang, 0, 0,
        0, 0, -(zMax+zMin)/(zMax-zMin), -1,
        0, 0, (-2*zMax*zMin)/(zMax-zMin), 0 ];
}
			
var proj_matrix = get_projection(30, 1.0, 1, 10.0);
var mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
var view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
// translating z

view_matrix[14] = view_matrix[14]-5;//zoom

 function identity$3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
function Blending_on(){
      toggle=0;
      return;
   }
function Blending_off(){
    toggle=1;
    return;
}
// blending 을 사용하기 위한 함수들.
function blend_SRC_ALPHA(){
    Fuc = 1;
    return;
}
function blend_SRC_COLOR(){
    Fuc = 2;
    return;
}
function blend_DST_COLOR(){
    Fuc = 3;
    return;
}
function blend_DST_ALPHA(){
    Fuc = 4;
    return;
}
function blend_ZERO(){
    Fuc = 5;
    return;
}
// blend_Func을 사용하기 위한 함수들
function blend_FUNC_ADD(){
    Equ = 1;
    return;
}
function blend_FUNC_SUB(){
    Equ = 2;
    return;
}
function blend_FUNC_REV(){
    Equ = 3;
    return;
}
// blendEquation을 사용하기 위한 함수.

 function multiply$3(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  }


function mulMatrix(m,k)
{
	multiply$3(m,m,k);
}

frames = 1
var v = new Array();
v[0] = 0.0;
v[1] = 0.0;
v[2] = 0.0

var as = new Array();
as[0] = -0.7;
as[1] = 0.0;
as[2] = 0.0;
var x = new Array(16); 

// 큰 정육면체에 대한 것이다.
function fromTranslation$2(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

function trXinc()
{
    as[0] += 0.01;
    document.getElementById("webTrX").innerHTML = "transX : " + v[0].toFixed(4);
}
//translate x +0.01
function trYinc()
{
    as[1] += 0.01;
    document.getElementById("webTrY").innerHTML = "transY : " + v[1].toFixed(4);
}
//translate y +0.01
function trZinc()
{
    as[2] += 0.01;
    document.getElementById("webTrZ").innerHTML = "transZ : " + v[2].toFixed(4);
}
//translate z +0.01
function tr_Xinc()
{
    as[0] -= 0.01;
    document.getElementById("webTrX").innerHTML = "transX : " + v[0].toFixed(4);
}
//translate x -0.01
function tr_Yinc()
{
    as[1] -= 0.01;
    document.getElementById("webTrY").innerHTML = "transY : " + v[1].toFixed(4);
}
//translate y -0.01
function tr_Zinc()
{
    as[2] -= 0.01;
    document.getElementById("webTrZ").innerHTML = "transZ : " + v[2].toFixed(4);
}
//translate z -0.01


function renderScene() {

    //console.log("Frame "+frames+"\n");
    frames += 1 ;
	rotAxis = [1,1,0];

    var locPmatrix = gl.getUniformLocation(gl.programObject, "Pmatrix"); // 원근법
    var locVmatrix = gl.getUniformLocation(gl.programObject, "Vmatrix"); // 카메라를 뒤로 빼는 것
    var locMmatrix = gl.getUniformLocation(gl.programObject, "Mmatrix"); // 모델을 돌리는 것이다.
	
 
    gl.uniformMatrix4fv(locPmatrix, false, proj_matrix);
    gl.uniformMatrix4fv(locVmatrix, false, view_matrix);


    if (!testGLError("gl.uniformMatrix4fv")) {
        return false;
    }

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 36, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, gl.FALSE, 36, 12);
	gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, gl.FALSE, 36, 28);

    if (!testGLError("gl.vertexAttribPointer")) {
        return false;
    }
    // gl.enable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LEQUAL); 
	// gl.enable(gl.CULL_FACE);
    if(toggle == 1){
        gl.disable(gl.BLEND); 
    }
    else {
        gl.enable(gl.BLEND); 
    }
    // toggle이라는 변수를 만들어 1일 경우 블렌딩을 disable하고 0일 경우 Enable 한다.
    if(Fuc == 1){
            gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_DST_ALPHA);
    }
    else if(Fuc == 2) {
            gl.blendFunc(gl.SRC_COLOR,gl.ONE_MINUS_DST_ALPHA);
    }
    else if(Fuc == 3){
            gl.blendFunc(gl.DST_COLOR,gl.ONE_MINUS_DST_ALPHA);  
    }
    else if(Fuc == 4){
            gl.blendFunc(gl.DST_ALPHA,gl.ONE_MINUS_DST_ALPHA);
    }
    else if(Fuc == 5){
            gl.blendFunc(gl.ZERO,gl.ONE_MINUS_DST_ALPHA);
    }
    // Fuc이라는 변수를 통해 Blend 함수를 실행시킨다. 
    if(Equ == 1){
            gl.blendEquation(gl.FUNC_ADD);
    }
    else if(Equ == 2) {
            gl.blendEquation(gl.FUNC_SUBTRACT);
    }
    else if(Equ == 3){
           gl.blendEquation(gl.FUNC_REVERSE_SUBTRACT);
    }
    //Equ 이라는 변수를 통해 blendEquation 함수를 실행시킨다.


    gl.clearColor(1.0, 0.8, 1.0, 1.0);
    gl.clearDepth(0.1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // 큰 큐브
    identity$3(mov_matrix); 
    fromTranslation$2(x,v);
    mulMatrix(mov_matrix,x)
    // translate(mov_matrix, transXbig, transYbig, transZbig);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    fromTranslation$2(x,as);
    mulMatrix(mov_matrix,x)
    // translate(mov_matrix, transXbig, transYbig, transZbig);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
	gl.drawArrays(gl.TRIANGLES, 6, 6);
    // 움직이지 않는 이유는 gsave grestore 때문이다. 
    // idMatrix(mov_matrix); // 이것이 이전에 했던 것을 다 지워 버리는 것이다.
 

    
    document.getElementById("matrix0").innerHTML = mov_matrix[0].toFixed(4);
	document.getElementById("matrix1").innerHTML = mov_matrix[1].toFixed(4);
	document.getElementById("matrix2").innerHTML = mov_matrix[2].toFixed(4);
	document.getElementById("matrix3").innerHTML = mov_matrix[3].toFixed(4);
	document.getElementById("matrix4").innerHTML = mov_matrix[4].toFixed(4);
	document.getElementById("matrix5").innerHTML = mov_matrix[5].toFixed(4);
	document.getElementById("matrix6").innerHTML = mov_matrix[6].toFixed(4);
	document.getElementById("matrix7").innerHTML = mov_matrix[7].toFixed(4);
	document.getElementById("matrix8").innerHTML = mov_matrix[8].toFixed(4);
	document.getElementById("matrix9").innerHTML = mov_matrix[9].toFixed(4);
	document.getElementById("matrix10").innerHTML = mov_matrix[10].toFixed(4);
	document.getElementById("matrix11").innerHTML = mov_matrix[11].toFixed(4);
	document.getElementById("matrix12").innerHTML = mov_matrix[12].toFixed(4);
	document.getElementById("matrix13").innerHTML = mov_matrix[13].toFixed(4);
	document.getElementById("matrix14").innerHTML = mov_matrix[14].toFixed(4);
	document.getElementById("matrix15").innerHTML = mov_matrix[15].toFixed(4);
    if (!testGLError("gl.drawArrays")) {
        return false;
    }

    return true;
}

function main() {
    var canvas = document.getElementById("helloapicanvas");
    console.log("Start");

    if (!initialiseGL(canvas)) {
        return;
    }

    if (!initialiseBuffer()) {
        return;
    }

    if (!initialiseShaders()) {
        return;
    }

    // Render loop
    requestAnimFrame = (
	function () {
        //	return window.requestAnimationFrame || window.webkitRequestAnimationFrame 
	//	|| window.mozRequestAnimationFrame || 
	   	return function (callback) {
			    // console.log("Callback is"+callback); 
			    window.setTimeout(callback, 10, 10); };
    })();

    (function renderLoop(param) {
        if (renderScene()) {
            // Everything was successful, request that we redraw our scene again in the future
            requestAnimFrame(renderLoop);
        }
    })();
}