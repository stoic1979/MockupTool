var canvas = new fabric.Canvas('drawing', {
  width: window.innerWidth,
  height: window.innerWidth - 50,
  isDrawingMode: false,
  backgroundColor: '#fff'
});

canvas.selectionColor = 'rgba(0,255,0,0.3)';
  canvas.selectionBorderColor = 'red';
  canvas.selectionLineWidth = 5;

// text 
var text = new fabric.IText('HELLO',{fontSize:16,left:20,top:20});
canvas.add(text);

document.querySelectorAll('.square')[0].addEventListener('click', function(){
  canvas.add(new fabric.Rect({left: 0, top: 0, fill: '#ddd', width: 100, height: 100, stroke: '#222', strokeWidth: 2}));
});
    
document.querySelectorAll('.circle')[0].addEventListener('click', function(){
  canvas.add(new fabric.Circle({radius: 50, fill: '#000', left: 0, top: 0}));
});
    
document.querySelectorAll('.triangle')[0].addEventListener('click', function(){
  canvas.add(new fabric.Triangle({ width: 100, height: 100, fill: '#000', left: 0, top: 0 }));
});


function toggleDrawing(){
    canvas.isDrawingMode = !canvas.isDrawingMode;
}

function deleteSelected() {
	canvas.isDrawingMode = false;

	var activeObject = canvas.getActiveObject();
    if (activeObject) {
           if (confirm('Are you sure?')) {
            canvas.remove(activeObject);
        }
    }
}

function save(){
	var canvas1 = document.getElementById( 'drawing' );

	var ctx = canvas1.getContext('2d'),
    	w = canvas1.width,
    	h = canvas1.height,
    	img = new Image();
    download(canvas1, 'test.png');
}

function download(canvas111, filename) {
    
    if (typeof filename !== 'string' || filename.trim().length === 0)
        filename = 'Untitled';
    
    var lnk = document.createElement('a'),
        e;
    
    lnk.download = filename;		
    lnk.href = canvas111.toDataURL();	
    
    if (document.createEvent) {
        
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        
        lnk.dispatchEvent(e);
        
    } else if (lnk.fireEvent) {
        
        lnk.fireEvent("onclick");
    }
}