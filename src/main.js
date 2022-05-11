let canvas = new fabric.Canvas('canvas');
canvas.setDimensions({width:screen.width-60, height:screen.height-200});

canvas.selectionColor = 'rgba(0,255,0,0.3)';
canvas.selectionBorderColor = 'red';
canvas.selectionLineWidth = 3;


let draw_width = "2";
let isdrawing = false;
let start_left = 0;
let start_top =0;
let initial =0;
let initial_left =0;
let initial_top =0;


const poly_start_button = document.getElementById("poly_start");
const poly_end_button = document.getElementById("poly_end");
const clear_button = document.getElementById("clear_canvas");

poly_start_button.addEventListener("click", new_mode);
poly_end_button.addEventListener("click", exit_mode);
clear_button.addEventListener("click", clear);

function new_mode(event){
    let draw_color = document.getElementById("color").value;
    console.log(draw_color);
    
    canvas.on('mouse:down', (event)=>{
        const mEvent = event.e;
        var pointer = canvas.getPointer(mEvent);
        isdrawing = true;
        if(initial === 0){
            initial = 1;
            initial_left = pointer.x;
            initial_top = pointer.y;
            start_left = pointer.x;
            start_top = pointer.y;
        }
    })


    canvas.on('mouse:up', (event)=>{
        const mEvent = event.e;
        var pointer = canvas.getPointer(mEvent);
        if(isdrawing === true && initial!== 0){

            var line = new fabric.Line(
                [start_left, start_top, pointer.x, pointer.y],
                {
                    stroke: draw_color,
                    strokeWidth: draw_width
                });
            canvas.add(line);
        }
        start_left = pointer.x;
        start_top = pointer.y;
        isdrawing = false;
    })
}


function exit_mode(){
    let draw_color = document.getElementById("color").value;
    var line = new fabric.Line(
        [start_left, start_top, initial_left, initial_top], 
        {
            stroke: draw_color,
            strokeWidth: draw_width
        });
    initial = 0;
    canvas.add(line);
}

function clear(){
    canvas.clear()
}