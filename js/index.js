var canvas = new fabric.Canvas('drawing', {
  width: window.innerWidth,
  height: window.innerWidth - 50,
  isDrawingMode: false,
  backgroundColor: '#fff'
});

document.querySelectorAll('.square')[0].addEventListener('click', function(){
  canvas.add(new fabric.Rect({left: 0, top: 0, fill: '#000', width: 100, height: 100}));
});
    
document.querySelectorAll('.circle')[0].addEventListener('click', function(){
  canvas.add(new fabric.Circle({radius: 50, fill: '#000', left: 0, top: 0}));
});
    
document.querySelectorAll('.triangle')[0].addEventListener('click', function(){
  canvas.add(new fabric.Triangle({ width: 100, height: 100, fill: '#000', left: 0, top: 0 }));
});