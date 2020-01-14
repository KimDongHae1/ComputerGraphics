Computer Graphics 
Final Report(Blending)

학과 : 디지털 미디어 학과, 학번 :201421105 , 이름 : 김 동 해

1.	Blending 이란 

![Fragment](/uploads/08d38f870d9d2cd4926efc2af37a6e26/Fragment.jpeg)


 : Fragment Shader의 조각 색상 출력을 가져와서 이들 출력이 매핑 되는 색상 버퍼의 색상과 결합하는 OpenGL 랜더링 파이프 라인의 단계이다.
    블랜딩 단계는 per-fragment operation 단계에서 이루어진다. 
    블랜딩 매개 변수를 사용하면 각 출력의 소스 및 대상 색상을 다양한 방식으로 결합할 수 있다. 


-	Fragment shader : vertex shader에서 varing 값을 받아와 색을 입히는 과정이다.
    vertex shader에서 각 vertex의 값이 화면에 맞게 조정되고 color등의 색이 정해지면 fragment shader 전달된다.


-	per-fragment operation : 이 단계는 해당 픽셀을 보여줄 지, 보여주지 않을 지 결정하는 부분이다 많은 단계들로 이루어져있다.
    각각의 단계를 통해 화면에 벗어나는 부분을 자르고, 카메라의 위치 기준으로 뒤에 있는 것을 가릴수도 있고 
    가리지 않을 수도 있게 조정하고, 겹칠때 어떻게 처리하는 지 등 많은 단계가 있다.


2.	Blending 선택 이유 : 
    web gl에서 진행하다보면 두 개의 object이 겹치는 경우가 발생한다. 
    두 개의 부분이 겹질 때 색도 같이 합쳐지는 데 이 부분을 직접 조절할 수 있고 색의 혼합을 막을 때도 사용할 수 있어 선택했다.


3.	Blending이 실행되는 부분 :
    그림이 직접적으로 그려지는 부분이기 때문에 renderScene() 부분에 작성한다.


4.	함수 설명

 가. glEnable(GL_BLEND),glDisable(GL_BLEND) 
-   이 부분은 Blend 기능을 사용할지 말지를 결정하는 함수들이다.
	Disable 함수를 사용하게 되면 blending 효과는 일어나지 않는다. 
	그래서 앞에 있는 object가 뒤에 있는 object를 가리게 된다.
	만약 Enable함수를 사용하게 되면 겹친 object들의 blending 효과가 일어나게 된다.
	그래서 두 object들의 겹친 부분에 blending 효과가 일어난 것을 알 수 있다.
 	 
![dajkldjakldad](/uploads/bf201e7b773699a1a56e5796f63cf3a1/dajkldjakldad.png)


 나. glBlendFunc(Glenum sfactor, Glenum dfactor) 
-	이 함수가 입력으로 들어가게 되면 object와 프레임 버퍼에 그려져 있는 object의 블렌딩 비율을 결정하는 함수이다.
	이 함수의 인자를 살펴보면, 첫번째 인자가 source이고 두번째가 destiantion이다. 
	마치 처음 source가 원래 그려져 있는 object 같이 보이지만 전혀 그렇지 않고 그 반대이다. 
	ource인 첫번째 인자가 들어오는 object이고 두번째 인자인 destination이 목적지인 그려질 위치에 있던 object를 말한다.

![dada](/uploads/2ded1b5d3dc8b46956ad15e64926e1b2/dada.png)

총 5개의 버튼을 만들었고 각 버튼마다 실행되는 코드가 다른데 blending 효과가 들어간 것을 확인할 수 있다. 
표의 맨 아래 이 gl_blendFunc안에 사용할 수 있는 변수들이 예제들을 넣어서 사용하면 된다.

 다. glBlendEquation (Glenum mode)
-	이 모드에서는 두 연산 결과를 합칠 방법을 정의하는 함수이다.

![213](/uploads/6694834bf7f75acf2b544509c8d07817/213.png)

 라. glBlendFuncSeparate(Glenum srcRGB, dstRGB. srcAlpha, dstAlpha)
-	RGBA값과 프레임 버퍼에 있는 RGBA값을 혼합하는 함수이다. 이 함수를 이용해 둘의 혼합 비율을 조정할 수 있다. 
	srcRGB는 src의 색상을 의미하고 dst는 프레임 버퍼에 들어있는 object의 색깔을 의미한다. 
	그리고 srcAlpha 값은 src의 Alpha값을 의미하며, dstAlpha값은 프레임 버퍼에 들어있는 object의 Alpha값을 나타낸다. 

 마. glBlendColor (Glclampf red, green blue, alpha)
-	 다음 함수는 좀 더 상세한 연산 방법을 지정한다. 
	 glblendfunc는 RGB 색상 요소와 알파 요소를 같이 연산하는데 비해 이 함수는 두 요소에 대해 각각 다른 블렌딩 함수를 지정한다.
	 지정 가능한 연산의 종류는 동일하다.


 바. glBlendEquationSepatate (Glenum modeRGB, mode alpha)
-   이 모드에서는 두 연산 결과를 합칠 방법을 정의하는 함수이다.
