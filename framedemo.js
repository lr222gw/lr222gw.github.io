$(document).ready(function() {

    widthOfScreen = $($('.post-header')[0]).innerWidth();
    heightOfScreen = $(document).innerHeight();
    var widthSlider = $('<input type="range" min="1" max="'+widthOfScreen.toString()+'" value="'+(widthOfScreen/2.0).toString()+'" class="canvasinput" id="width_slider" name="width_slider" >');
    var heightSlider = $('<input type="range" min="1" max="'+heightOfScreen.toString()+'" value="'+(heightOfScreen/2.0).toString()+'" class="canvasinput" id="height_slider" name="height_slider" >');
    var nrOfEmojis = $('<input type="number" min="0" max="100" value="1" class="canvasinput" id="emojiNr" name="emojiNr" >');
    var maxPerRow = $('<input type="number" min="0" max="100" value="4" class="canvasinput" id="maxPerRow" name="maxPerRow" >');
    var padding_y = $('<input type="number" min="10" max="100" value="50" class="canvasinput" id="padding_y" name="padding_y" >');
    var canvasElement = $('<canvas id="canvas"></canvas>');
    canvasElement.css('display','block');
    canvasElement.css('margin','auto');
    canvasElement.css('border','1px solid black');

    var width_slider_label = $('<label for="width_slider">width_slider</label>')
    var height_slider_label = $('<label for="height_slider">height_slider</label>')
    var emojiNr_label = $('<label for="emojiNr">emojiNr</label>')
    var maxPerRow_label = $('<label for="maxPerRow">maxPerRow</label>')
    var padding_y_label = $('<label for="padding_y">padding_y</label>')
    $('#canvasRegion').after(width_slider_label);
    width_slider_label.after(widthSlider);
    widthSlider.after(height_slider_label);
    height_slider_label.after(heightSlider);
    heightSlider.after(emojiNr_label);
    emojiNr_label.after(nrOfEmojis);
    nrOfEmojis.after(maxPerRow_label)
    maxPerRow_label.after(maxPerRow)
    maxPerRow.after(padding_y_label)
    padding_y_label.after(padding_y);
    padding_y.after(canvasElement);

    var canvas = $("#canvas")[0]; 
    var ctx = canvas.getContext('2d');

    widthSlider.on('input', function()
    {
        canvas.width =  $(this).val();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas = $("#canvas")[0]; 
        draw();
    })

    heightSlider.on('input', function()
    {
        canvas.height =  $(this).val();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    })
    nrOfEmojis.on('input', function()
    {        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    })
    maxPerRow.on('input', function()
    {        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    })
    padding_y.on('input', function()
    {        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    })
    
    var draw = function()
    {
        console.log("caca")
        
    
        var width = canvas.width;
        var height = canvas.height;
    
        var frame_w = 10;
        var frame_h = 10;
        var parent_w = canvas.width;
        var parent_h = canvas.height;
    
        var x = (width - frame_w) / 2;
        var y = (height + frame_h) / 2;
    
        var p_x = (width - parent_w) / 2;
        var p_y = (height + parent_h) / 2;
    
        var parentMid_y = p_y - parent_h / 2 + frame_h / 2;
        var parentMid_x = p_x + parent_w / 2 - frame_w / 2;
    
        var nrOfFrames = Number($('#emojiNr').val());
        var maxPerRow =  Number($('#maxPerRow').val());

        var rowHeight = Number($('#padding_y').val());;
            
        var frames = [];
        var emoji = "😊"; 
        for (var k = 0; k < nrOfFrames; k++) {
            frames.push(emoji);
            y += rowHeight;
        }
    
        var rowCounter = 1;
        for (var i = 0; i < nrOfFrames; i++) {
            var move_x = 0.0;
            var move_all_x = 0.0;
            var move_y = parentMid_y;
            var sss = i / maxPerRow;
            var tightness = 1;
            var marigin_x = 1;
            tightness = Math.max(tightness, ((frame_w + marigin_x) / parent_w * maxPerRow));
    
            var a = Math.min(nrOfFrames, maxPerRow) % maxPerRow !== 0 ? Math.min(nrOfFrames, maxPerRow) : maxPerRow ;
            if (nrOfFrames - (nrOfFrames % maxPerRow) <= i) {
                a = nrOfFrames % maxPerRow !== 0 ? nrOfFrames  % (maxPerRow)  : maxPerRow;
            }
            
            move_x = 1 / a * (parent_w * tightness) * (i % maxPerRow) - (parent_w * tightness) / 2.0;
            move_all_x = (1 / a * (parent_w * tightness) * a - (parent_w * tightness) / 2) / a;

            move_y += rowHeight * Math.floor(sss) ;

            var nrOfRows = Math.floor((nrOfFrames / maxPerRow) - 0.01 ); // Easy hack...
            var heightAdjustment = (nrOfRows * rowHeight) / 2.0;
    
            var newX = parentMid_x + move_x + move_all_x;
            var newY = move_y -heightAdjustment;
    
            ctx.fillText(frames[i], newX, newY);
        }
        
        for(var i = 0; i < nrOfFrames; i++) 
        {
            
        }
    }
    draw();


    $(document).keydown(function(event) {
        var keyCode = event.which || event.keyCode;
        var move = steps[keyCode.toString()];
        if (move) {
            // Handle movement
            // You can update the position of the emoji based on the key press
        }
    });

    

    // Implement animation loop here if needed
});