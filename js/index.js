var canvas = new fabric.Canvas('drawing', {
    isDrawingMode: false,
    backgroundColor: '#fff'
});

canvas.counter = 0;
canvas.selection = false;

canvas.selectionColor = 'rgba(0,255,0,0.3)';
canvas.selectionBorderColor = 'red';
canvas.selectionLineWidth = 5;
canvas.freeDrawingBrush.color = '#dddddd';


var state = [];
var mods = 0;

updateModifications(true);


canvas.on(
        'object:modified', function () {
            updateModifications(true);
        },
        'object:added', function () {
            updateModifications(true);

        });

function updateModifications(savehistory) {
    if (savehistory === true) {
        var myjson = JSON.stringify(canvas);
        state.push(myjson);
    }
}

undo = function undo() {


    if (mods < state.length) {


        if(geladen = state.length-1-mods-1 < 0 ) return;

        canvas.clear().renderAll();
        canvas.loadFromJSON(state[state.length - 1 - mods - 1]);
        canvas.renderAll();
        console.log("geladen " + (state.length-1-mods-1));
        console.log("state " + state.length);
        mods += 1;
        console.log("mods " + mods);
    }
}

redo = function redo() {
    if (mods > 0) {
        canvas.clear().renderAll();
        canvas.loadFromJSON(state[state.length - 1 - mods + 1]);
        canvas.renderAll();
        console.log("geladen " + (state.length-1-mods+1));
        mods -= 1;
        console.log("state " + state.length);
        console.log("mods " + mods);
    }
}

function clearCanvas() {
    console.log("clearCanvas");

    if(state.length == 0) return;

    canvas.clear().renderAll();
    canvas.loadFromJSON(state[0]);
    canvas.renderAll();
}


function addText() {
    var text = new fabric.IText('HELLO',{fontSize:16,left:20,top:20});
    canvas.add(text);
    updateModifications(true);
    canvas.counter++;
}
// text 


function addRect() {
    canvas.add(new fabric.Rect({left: 0, top: 0, fill: canvas.freeDrawingBrush.color, width: 100, height: 100, stroke: '#222', strokeWidth: 2}));

    updateModifications(true);
    canvas.counter++;
}

function addCircle() {
    canvas.add(new fabric.Circle({radius: 50, fill: canvas.freeDrawingBrush.color, left: 0, top: 0, stroke: '#222', strokeWidth: 2}));
    updateModifications(true);
    canvas.counter++;
}

function addTriangle() {
    canvas.add(new fabric.Triangle({ width: 100, height: 100, fill: canvas.freeDrawingBrush.color, left: 0, top: 0, stroke: '#222', strokeWidth: 2 }));
    updateModifications(true);
    canvas.counter++;
}

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


document.getElementById('colorpicker').addEventListener('change', function (e) {
    console.log(e.target.value);
    canvas.freeDrawingBrush.color = e.target.value;
});
