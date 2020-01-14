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

var shaderProgram;

function initialiseBuffer() {
		
    var vertexData = [
		-0.5, 0.5, 0.5,		1.0, 1.0, 1.0, 0.5,		0.0, 1.0,//3
        0.5, 0.5, 0.5,		1.0, 1.0, 1.0, 0.5,		1.0, 1.0,//1
		0.5, 0.5, -0.5,		1.0, 1.0, 1.0, 0.5,		1.0, 1.0,//2
				
		-0.5, 0.5, 0.5,		1.0, 1.0, 1.0, 0.5,		0.0, 1.0,//3
		0.5, 0.5, -0.5,		1.0, 1.0, 1.0, 0.5,		1.0, 1.0,//2
		-0.5, 0.5, -0.5,	1.0, 1.0, 1.0, 0.5,		0.0, 1.0,//4
		 
		0.5, 0.5, -0.5,		0.0, 0.0, 0.0, 0.5,		1.0, 1.0,//2
		0.5, -0.5, -0.5,	0.0, 0.0, 0.0, 0.5,		1.0, 0.0,//6
		-0.5,-0.5,-0.5,		0.0, 0.0, 0.0, 0.5,		0.0, 0.0,//8
		   
		-0.5, 0.5, -0.5,	0.0, 0.0, 0.0, 0.5,		0.0, 1.0,//4
		0.5, 0.5, -0.5,		0.0, 0.0, 0.0, 0.5,		1.0, 1.0,//2
		-0.5,-0.5,-0.5,		0.0, 0.0, 0.0, 0.5,		0.0, 0.0,//8
			
		0.5, -0.5, 0.5,		1.0, 0.5, 0.0, 0.5,		0.0, 1.0,//5
		0.5, -0.5, -0.5,	1.0, 0.5, 0.0, 0.5,		0.0, 1.0,//6
		0.5, 0.5, -0.5,		1.0, 0.5, 0.0, 0.5,		1.0, 1.0,//2

		0.5, -0.5, 0.5,		1.0, 0.5, 0.0, 0.5,		0.0, 1.0,//5
		0.5, 0.5, -0.5,		1.0, 0.5, 0.0, 0.5,		1.0, 1.0,//2
		0.5, 0.5, 0.5,		1.0, 0.5, 0.0, 0.5,		1.0, 1.0,//1
				 
		-0.5, 0.5, -0.5,	1.0, 0.0, 0.0, 0.5,		0.0, 1.0,//4
		-0.5,-0.5, -0.5,	1.0, 0.0, 0.0, 0.5,		0.0, 0.0,//8
		-0.5, -0.5, 0.5,	1.0, 0.0, 0.0, 0.5,		0.0, 0.0,//7
		
		-0.5, 0.5, 0.5,		1.0, 0.0, 0.0, 0.5,		0.0, 1.0,//3
		-0.5, 0.5, -0.5,	1.0, 0.0, 0.0, 0.5,		0.0, 1.0,//4
		-0.5, -0.5, 0.5,	1.0, 0.0, 0.0, 0.5,		0.0, 0.0,//7
		
		-0.5, -0.5, 0.5,	0.0, 0.0, 1.0, 0.5,		0.0, 0.0,//7
		0.5, -0.5, 0.5,		0.0, 0.0, 1.0, 0.5,		1.0, 0.0,//5
		0.5, 0.5, 0.5,		0.0, 0.0, 1.0, 0.5,		1.0, 1.0,//1
				 
		-0.5, -0.5, 0.5,	0.0, 0.0, 1.0, 0.5,		0.0, 0.0,//7
		0.5, 0.5, 0.5,		0.0, 0.0, 1.0, 0.5,		1.0, 1.0,//1
		-0.5, 0.5, 0.5,		0.0, 0.0, 1.0, 0.5,		0.0, 1.0,//3
		
		 0.5, -0.5, -0.5,	0.0, 1.0, 0.0, 0.5,		1.0, 0.0,//6
		 0.5, -0.5, 0.5,	0.0, 1.0, 0.0, 0.5,		1.0, 0.0,//5
		-0.5, -0.5, 0.5,	0.0, 1.0, 0.0, 0.5,		0.0, 0.0,//7
		
		-0.5,-0.5, -0.5,	0.0, 1.0, 0.0, 0.5,		0.0, 0.0,//8
		 0.5, -0.5, -0.5,	0.0, 1.0, 0.0, 0.5,		1.0, 0.0,//6
		-0.5, -0.5, 0.5,	0.0, 1.0, 0.0, 0.5,		0.0, 0.0,//7
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

function idMatrix(m) {
    m[0] = 1; m[1] = 0; m[2] = 0; m[3] = 0; 
    m[4] = 0; m[5] = 1; m[6] = 0; m[7] = 0; 
    m[8] = 0; m[9] = 0; m[10] = 1; m[11] = 0; 
    m[12] = 0; m[13] = 0; m[14] = 0; m[15] = 1; 
}

function mulStoreMatrix(r, m, k) {
    m0=m[0];m1=m[1];m2=m[2];m3=m[3];m4=m[4];m5=m[5];m6=m[6];m7=m[7];
    m8=m[8];m9=m[9];m10=m[10];m11=m[11];m12=m[12];m13=m[13];m14=m[14];m15=m[15];
    k0=k[0];k1=k[1];k2=k[2];k3=k[3];k4=k[4];k5=k[5];k6=k[6];k7=k[7];
    k8=k[8];k9=k[9];k10=k[10];k11=k[11];k12=k[12];k13=k[13];k14=k[14];k15=k[15];

    a0 = k0 * m0 + k3 * m12 + k1 * m4 + k2 * m8;
    a4 = k4 * m0 + k7 * m12 + k5 * m4 + k6 * m8 ;
    a8 = k8 * m0 + k11 * m12 + k9 * m4 + k10 * m8 ;
    a12 = k12 * m0 + k15 * m12 + k13 * m4 + k14 * m8;

    a1 = k0 * m1 + k3 * m13 + k1 * m5 + k2 * m9;
    a5 = k4 * m1 + k7 * m13 + k5 * m5 + k6 * m9;
    a9 = k8 * m1 + k11 * m13 + k9 * m5 + k10 * m9;
    a13 = k12 * m1 + k15 * m13 + k13 * m5 + k14 * m9;

    a2 = k2 * m10 + k3 * m14 + k0 * m2 + k1 * m6;
    a6 =  k6 * m10 + k7 * m14 + k4 * m2 + k5 * m6;
    a10 =  k10 * m10 + k11 * m14 + k8 * m2 + k9 * m6;
    a14 = k14 * m10 + k15 * m14 + k12 * m2 + k13 * m6; 

    a3 = k2 * m11 + k3 * m15 + k0 * m3 + k1 * m7;
    a7 = k6 * m11 + k7 * m15 + k4 * m3 + k5 * m7;
    a11 = k10 * m11 + k11 * m15 + k8 * m3 + k9 * m7;
    a15 = k14 * m11 + k15 * m15 + k12 * m3 + k13 * m7;

    r[0]=a0; r[1]=a1; r[2]=a2; r[3]=a3; r[4]=a4; r[5]=a5; r[6]=a6; r[7]=a7;
    r[8]=a8; r[9]=a9; r[10]=a10; r[11]=a11; r[12]=a12; r[13]=a13; r[14]=a14; r[15]=a15;
}

function mulMatrix(m,k)
{
	mulStoreMatrix(m,m,k);
}

function translate(m, tx,ty,tz) {
   var tm = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]; 
   tm[12] = tx; tm[13] = ty; tm[14] = tz; 
   mulMatrix(m, tm); 
}
function scale(m,sx,sy,sz){
   var tm = [sx,0,0,0, 0,sy,0,0, 0,0,sz,0, 0,0,0,1]; 
   mulMatrix(m, tm); 
}

function rotateX(m, angle) {
	var rm = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]; 
    var c = Math.cos(angle);
    var s = Math.sin(angle);

	rm[5] = c;  rm[6] = s; 
	rm[9] = -s;  rm[10] = c;
	mulMatrix(m, rm); 
}

function rotateY(m, angle) {
	var rm = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]; 
    var c = Math.cos(angle);
    var s = Math.sin(angle);

	rm[0] = c;  rm[2] = -s;
	rm[8] = s;  rm[10] = c; 
	mulMatrix(m, rm); 
}

function rotateZ(m, angle) {
	var rm = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]; 
    var c = Math.cos(angle);
    var s = Math.sin(angle);

	rm[0] = c;  rm[1] = s;
	rm[4] = -s;  rm[5] = c; 
	mulMatrix(m, rm); 
}

function normalizeVec3(v)
{
	sq = v[0]*v[0] + v[1]*v[1] + v[2]*v[2]; 
	sq = Math.sqrt(sq);
	if (sq < 0.000001 ) // Too Small
		return -1; 
	v[0] /= sq; v[1] /= sq; v[2] /= sq; 
}

function rotateArbAxis(m, angle, axis)
{
	var axis_rot = [0,0,0];
	var ux, uy, uz;
	var rm = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]; 
    var c = Math.cos(angle);
	var c1 = 1.0 - c; 
    var s = Math.sin(angle);
	axis_rot[0] = axis[0]; 
	axis_rot[1] = axis[1]; 
	axis_rot[2] = axis[2]; 
	if (normalizeVec3(axis_rot) == -1 )
		return -1; 
	ux = axis_rot[0]; uy = axis_rot[1]; uz = axis_rot[2];
	console.log("Log", angle);
	rm[0] = c + ux * ux * c1;
	rm[1] = uy * ux * c1 + uz * s;
	rm[2] = uz * ux * c1 - uy * s;
	rm[3] = 0;

	rm[4] = ux * uy * c1 - uz * s;
	rm[5] = c + uy * uy * c1;
	rm[6] = uz * uy * c1 + ux * s;
	rm[7] = 0;

	rm[8] = ux * uz * c1 + uy * s;
	rm[9] = uy * uz * c1 - ux * s;
	rm[10] = c + uz * uz * c1;
	rm[11] = 0;

	rm[12] = 0;
	rm[13] = 0;
	rm[14] = 0;
	rm[15] = 1;

	mulMatrix(m, rm);
}

rotValue = 0.0; 
rotValue1 = 0.0;
rotValue2 = 0.0;
rotValue3 = 0.0;
rotValue4 = 0.0;
rotValue5 = 0.0;
rotValue6 = 0.0;
rotValue7 = 0.0;
rotValue8 = 0.0;

animRotValue = 0.0;
animRotValue1 = 0.0;
animRotValue2 = 0.0;
animRotValue3 = 0.0;
animRotValue4 = 0.0;
animRotValue5 = 0.0;
animRotValue6 = 0.0;
animRotValue7= 0.0;
animRotValue8 = 0.0;

transXbig = 0.0; // 전체 크기를 움직이는 것.
transYbig = 0.0; // 전체 크기를 움직이는 것.
transZbig = 0.0; // 전체 크기를 움직이는 것.

transX1 = 0.0; // 전체 크기를 움직이는 것.
transY1 = 0.0; // 전체 크기를 움직이는 것.
transZ1 = 0.0; // 전체 크기를 움직이는 것.

transX2 = 0.0; // 전체 크기를 움직이는 것.
transY2 = 0.0; // 전체 크기를 움직이는 것.
transZ2 = 0.0; // 전체 크기를 움직이는 것.

transX3 = 0.0; // 전체 크기를 움직이는 것.
transY3 = 0.0; // 전체 크기를 움직이는 것.
transZ3 = 0.0; // 전체 크기를 움직이는 것.

transX4 = 0.0; // 전체 크기를 움직이는 것.
transY4 = 0.0; // 전체 크기를 움직이는 것.
transZ4 = 0.0; // 전체 크기를 움직이는 것.

transX5 = 0.0; // 전체 크기를 움직이는 것.
transY5 = 0.0; // 전체 크기를 움직이는 것.
transZ5 = 0.0; // 전체 크기를 움직이는 것.

transX6 = 0.0; // 전체 크기를 움직이는 것.
transY6 = 0.0; // 전체 크기를 움직이는 것.
transZ6 = 0.0; // 전체 크기를 움직이는 것.

transX7 = 0.0; // 전체 크기를 움직이는 것.
transY7 = 0.0; // 전체 크기를 움직이는 것.
transZ7 = 0.0; // 전체 크기를 움직이는 것.

transX8 = 0.0; // 전체 크기를 움직이는 것.
transY8 = 0.0; // 전체 크기를 움직이는 것.
transZ8 = 0.0; // 전체 크기를 움직이는 것.

frames = 1;

// 큰 정육면체에 대한 것이다.
function animRotateBig()
{
	animRotValue += 0.01;
}
function trXinc()
{
    transXbig += 0.01;
    document.getElementById("webTrX").innerHTML = "transX : " + transXbig.toFixed(4);
}
function trYinc()
{
    transYbig += 0.01;
    document.getElementById("webTrY").innerHTML = "transY : " + transYbig.toFixed(4);
}
function trZinc()
{
    transZbig += 0.01;
    document.getElementById("webTrZ").innerHTML = "transZ : " + transZbig.toFixed(4);
}

// 1번 정육면체
function animRotate1()
{
    animRotValue1 += 0.01;
}
function trXinc1()
{
    transX1 += 0.01;
}
function trYinc1()
{
    transY1 += 0.01;
}
function trZinc1()
{
    transZ1 += 0.01;
}

// 2번 정육면체
function animRotate2()
{
    animRotValue2 += 0.01;
}
function trXinc2()
{
    transX2 += 0.01;
}
function trYinc2()
{
    transY2 += 0.01;
}
function trZinc2()
{
    transZ2 += 0.01;
}

// 3번 정육면체
function animRotate3()
{
    animRotValue3 += 0.01;
}
function trXinc3()
{
    transX3 += 0.01;
}
function trYinc3()
{
    transY3 += 0.01;
}
function trZinc3()
{
    transZ3 += 0.01;
}

// 4번 정육면체
function animRotate4()
{
    animRotValue4 += 0.01;
}
function trXinc4()
{
    transX4 += 0.01;
}
function trYinc4()
{
    transY4 += 0.01;
}
function trZinc4()
{
    transZ4 += 0.01;
}

// 5번 정육면체
function animRotate5()
{
    animRotValue5 += 0.01;
}
function trXinc5()
{
    transX5 += 0.01;
}
function trYinc5()
{
    transY5 += 0.01;
}
function trZinc5()
{
    transZ5 += 0.01;
}

// 6번 정육면체
function animRotate6()
{
    animRotValue6 += 0.01;
}
function trXinc6()
{
    transX6 += 0.01;
}
function trYinc6()
{
    transY6 += 0.01;
}
function trZinc6()
{
    transZ6 += 0.01;
}

// 7번 정육면체
function animRotate7()
{
    animRotValue7 += 0.01;
}
function trXinc7()
{
    transX7 += 0.01;
}
function trYinc7()
{
    transY7 += 0.01;
}
function trZinc7()
{
    transZ7 += 0.01;
}

// 8번 정육면체
function animRotate8()
{
    animRotValue8 += 0.01;
}
function trXinc8()
{
    transX8 += 0.01;
}
function trYinc8()
{
    transY8 += 0.01;
}
function trZinc8()
{
    transZ8 += 0.01;
}

// 모든 정육면체의 회전을 일시정지 시키기위한 것.
function animPause(){
    animRotValue = 0.0;
    animRotValue1 = 0.0;
    animRotValue2 = 0.0;
    animRotValue3 = 0.0;
    animRotValue4 = 0.0;
    animRotValue5 = 0.0;
    animRotValue6 = 0.0;
    animRotValue7 = 0.0;
    animRotValue8 = 0.0;
}
// 모든 정육면체의 위치를 제자리로 두기 위한 것
function animPause2(){
    transX = 0.0;
    tranxY = 0.0;
    transZ = 0.0;

    transX1 = 0.0;
    tranxY1 = 0.0;
    transZ1 = 0.0;

    transX2 = 0.0;
    tranxY2 = 0.0;
    transZ2 = 0.0;

    transX3 = 0.0;
    tranxY3 = 0.0;
    transZ3 = 0.0;

    transX4 = 0.0;
    tranxY4 = 0.0;
    transZ4 = 0.0;

    transX5 = 0.0;
    tranxY5 = 0.0;
    transZ5 = 0.0;

    transX6 = 0.0;
    tranxY6 = 0.0;
    transZ6 = 0.0;

    transX7 = 0.0;
    tranxY7 = 0.0;
    transZ7 = 0.0;

    transX8 = 0.0;
    tranxY8 = 0.0;
    transZ8 = 0.0;
}



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
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.blendEquation(gl.FUNC_ADD);

    gl.clearColor(0.6, 0.8, 1.0, 1.0);
    gl.clearDepth(1.0); 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // 큰 큐브
	idMatrix(mov_matrix); 
    translate(mov_matrix, transXbig, transYbig, transZbig); 
    rotateArbAxis(mov_matrix, rotValue, rotAxis);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
	gl.drawArrays(gl.TRIANGLES, 0, 36);
    // 움직이지 않는 이유는 gsave grestore 때문이다. 
    // idMatrix(mov_matrix); // 이것이 이전에 했던 것을 다 지워 버리는 것이다.
    var mov_matrix_child = mov_matrix.slice();
    // 1st moon
    translate(mov_matrix, 0.75+transX1, 0.75+transY1, 0.75+transZ1); 
    scale(mov_matrix, 0.25,0.25,0.25);
    rotateY(mov_matrix, rotValue1 * 3.0);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    mov_matrix = mov_matrix_child.slice();
    //2nd moon
    translate(mov_matrix, 0.75+transX2, 0.75+transY2, -0.75+transZ2); 
    scale(mov_matrix, 0.25,0.25,0.25);
    rotateX(mov_matrix, rotValue2 * 3.0);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    mov_matrix = mov_matrix_child.slice();
    //3rd moon
    translate(mov_matrix, 0.75+transX3, -0.75+transY3, 0.75+transZ3); 
    scale(mov_matrix, 0.25,0.25,0.25);
    rotateX(mov_matrix, rotValue3 * 3.0);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

     mov_matrix = mov_matrix_child.slice();
    //4th moon
    translate(mov_matrix, 0.75+transX4, -0.75+transY4, -0.75+transZ4); 
    scale(mov_matrix, 0.25,0.25,0.25);
    rotateY(mov_matrix, rotValue4 * 3.0);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    mov_matrix = mov_matrix_child.slice();
    //5th moon
    translate(mov_matrix, -0.75+transX5, 0.75+transY5, 0.75+transZ5); 
    scale(mov_matrix, 0.25,0.25,0.25);
    rotateZ(mov_matrix, rotValue5 * 3.0);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    mov_matrix = mov_matrix_child.slice();
    //6th moon
    translate(mov_matrix, -0.75+transX6, 0.75+transY6, -0.75+transZ6); 
    scale(mov_matrix, 0.25,0.25,0.25);
    rotateX(mov_matrix, rotValue6 * 3.0);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

     mov_matrix = mov_matrix_child.slice();
    //7th moon
    translate(mov_matrix, -0.75+transX7, -0.75+transY7, 0.75+transZ7); 
    scale(mov_matrix, 0.25,0.25,0.25);
    rotateZ(mov_matrix, rotValue7 * 3.0);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    mov_matrix = mov_matrix_child.slice();
     //8th moon
    translate(mov_matrix, -0.75+transX8,-0.75+transY8, -0.75+transZ8); 
    scale(mov_matrix, 0.25,0.25,0.25);
    rotateY(mov_matrix, rotValue8 * 3.0);
    gl.uniformMatrix4fv(locMmatrix, false, mov_matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    rotValue += animRotValue; 
    rotValue1 += animRotValue1; 
    rotValue2 += animRotValue2; 
    rotValue3 += animRotValue3;          
    rotValue4 += animRotValue4; 
    rotValue5 += animRotValue5; 
    rotValue6 += animRotValue6; 
    rotValue7 += animRotValue7; 
    rotValue8 += animRotValue8;     


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
