var sketch = angular.module('sketch',[]);
sketch.controller('sketchController', ['$scope', function($scope){
	$scope.canvasSize = {width:1088,height:662};
	$scope.style = ['线性描边','内部填充'];
	$scope.tools = {
		class:['free','line','rect','arc','eareser'],
		name:['铅笔工具','直线工具','矩形工具','圆形工具','橡皮工具']
	}
	$scope.toolsIndex = 0;
	$scope.styleIndex = 0;
	$scope.styleClick = function(index){
		$scope.styleIndex = index;
		$scope.fnName = $scope.tools.class[$scope.toolsIndex]+$scope.styleIndex;
	}
	$scope.strokeColor = '#000000';
	$scope.fillColor = '#000000';
	$scope.width = 1;
	var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');
	var current;
	var style = {
		free0:function(evS){
			ctx.lineWidth = $scope.width;
			ctx.strokeStyle = $scope.strokeColor;
			ctx.beginPath();
			ctx.moveTo(evS.offsetX,evS.offsetY);
			canvas.onmousemove = function(evE){
				ctx.clearRect(0,0,$scope.canvasSize.width,$scope.canvasSize.height);
				if(current){
					ctx.putImageData(current,0,0)
				}
				ctx.lineTo(evE.offsetX,evE.offsetY);
				ctx.stroke();
			}
		},
		free1:function(evS){
			ctx.lineWidth = $scope.width;
			ctx.strokeStyle = $scope.fillColor;
			ctx.beginPath();
			ctx.moveTo(evS.offsetX,evS.offsetY);
			canvas.onmousemove = function(evE){
				if(current){
					ctx.putImageData(current,0,0)
				}
				ctx.lineTo(evE.offsetX,evE.offsetY);
				ctx.stroke();
			}
		},
		eareser0:function(evS){
			canvas.onmousemove = function(evE){
				ctx.clearRect(evE.offsetX,evE.offsetY,20,20);
			}
		},
		eareser1:function(evS){
			canvas.onmousemove = function(evE){
				ctx.clearRect(evE.offsetX,evE.offsetY,20,20);
			}
		},
		line0:function(evS){
			ctx.lineWidth = $scope.width;
			ctx.strokeStyle = $scope.strokeColor;
			canvas.onmousemove = function(evE){
				ctx.clearRect(0,0,$scope.canvasSize.width,$scope.canvasSize.height);
				if(current){
					ctx.putImageData(current,0,0)
				}
				ctx.beginPath();
				ctx.moveTo(evS.offsetX,evS.offsetY);
				ctx.lineTo(evE.offsetX,evE.offsetY);
				ctx.stroke();
			}
		},
		line1:function(evS){
			ctx.lineWidth = $scope.width;
			ctx.fillStyle = $scope.fillColor;
			canvas.onmousemove = function(evE){
				ctx.clearRect(0,0,$scope.canvasSize.width,$scope.canvasSize.height);
				if(current){
					ctx.putImageData(current,0,0)
				}
				ctx.beginPath();
				ctx.moveTo(evS.offsetX,evS.offsetY);
				ctx.lineTo(evE.offsetX,evE.offsetY);
				ctx.stroke();
			}
		},
		rect0:function(evS){
			ctx.lineWidth = $scope.width;
			ctx.strokeStyle = $scope.strokeColor;
			canvas.onmousemove = function(evE){
				ctx.clearRect(0,0,$scope.canvasSize.width,$scope.canvasSize.height);
				if(current){
					ctx.putImageData(current,0,0)
				}
				ctx.beginPath();
				ctx.rect(evS.offsetX,evS.offsetY,evE.offsetX-evS.offsetX,evE.offsetY-evS.offsetY);
				ctx.stroke();
			}
		},
		arc0:function(evS){
			ctx.lineWidth = $scope.width;
			ctx.strokeStyle = $scope.strokeColor;
			canvas.onmousemove = function(evE){
				ctx.clearRect(0,0,$scope.canvasSize.width,$scope.canvasSize.height);
				if(current){
					ctx.putImageData(current,0,0)
				}
				ctx.beginPath();
				ctx.arc(evS.offsetX,evS.offsetY,Math.sqrt(Math.pow(evE.offsetX-evS.offsetX,2)+Math.pow(evE.offsetY-evS.offsetY,2)),0,Math.PI*2);

				ctx.stroke();
			}
		},
		rect1:function(evS){
			ctx.fillStyle = $scope.fillColor;
			canvas.onmousemove = function(evE){
				ctx.clearRect(0,0,$scope.canvasSize.width,$scope.canvasSize.height);
				if(current){
					ctx.putImageData(current,0,0)
				}
				ctx.beginPath();
				ctx.rect(evS.offsetX,evS.offsetY,evE.offsetX-evS.offsetX,evE.offsetY-evS.offsetY);
				ctx.fill();
			}
		},
		arc1:function(evS){
			ctx.fillStyle = $scope.fillColor;
			canvas.onmousemove = function(evE){
				ctx.clearRect(0,0,$scope.canvasSize.width,$scope.canvasSize.height);
				if(current){
					ctx.putImageData(current,0,0)
				}
				ctx.beginPath();
				ctx.arc(evS.offsetX,evS.offsetY,Math.sqrt(Math.pow(evE.offsetX-evS.offsetX,2)+Math.pow(evE.offsetY-evS.offsetY,2)),0,Math.PI*2);

				ctx.fill();
			}
		}
	}
	$scope.fnName = 'free0';
	$scope.name = function(index){
		$scope.toolsIndex = index;
		$scope.fnName = $scope.tools.class[index]+$scope.styleIndex;
	}
	canvas.onmousedown = function(e){
		style[$scope.fnName](e);
		document.onmouseup = function(){
			current = ctx.getImageData(0,0,$scope.canvasSize.width,$scope.canvasSize.height);
			canvas.onmousemove = null;
		}
	}
	$scope.save = function(e){
		if(current){
			e.srcElement.href = canvas.toDataURL();
			e.srcElement.download = 'mypic.png';
		}else{
			alert('画布为空，无法保存')
		}
	}
	$scope.clearSketch = function(e){
		if(current){
			if(confirm('是否保存？')){
				e.srcElement.href = canvas.toDataURL();
				e.srcElement.download = 'mypic.png';
			}
			ctx.clearRect(0,0,$scope.canvasSize.width,$scope.canvasSize.height);
		}
	}
}])