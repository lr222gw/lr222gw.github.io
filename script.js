
var isInsideDiv = false;
var lasttHover = null
var windowSizeWasAdjusted = false;
var finallyLoaded = false;
$(function(){

    // jQuery methods go here...
    initFuncs();

    var override_css = function()
    {
        $('.post-link').css('scale','1') 
        $('.post-link').css('opacity','1')
    }
            
    var currentHover = null
    $(".projectLink").on("touchstart",
    function()
    {
        if(finallyLoaded == false)
            return;
        if(currentHover != null)
            return; 
        currentHover = this;
         
        $(this).addClass('projectLink_hover')
        onEnterHover(this);
        lasttHover = this;
    }
    )
    $(".projectLink").on("touchend",
    function()
    {
        if(finallyLoaded == false)
            return;
        console.log($(this))
        console.log($(currentHover))
        if(currentHover != this)
            return;
        
        $(this).removeClass('projectLink_hover')
        onExitHover(this);
        currentHover = null;
    }
    )
    

    $(".projectLink").on("mouseenter",
        function()
        {   
            if(finallyLoaded == false)
                return;
            $(this).addClass('projectLink_hover')
            onEnterHover(this);
            lasttHover = this;
        }
    );

    $(".projectLink").on("mouseleave",
        function()
        {
            if(finallyLoaded == false)
                return;
            
            onExitHover(this);
            $(this).removeClass('projectLink_hover')
            if(windowSizeWasAdjusted){
                windowSizeWasAdjusted = false;
                adjustRowHeight();
            }
        }
    );
    // $(window).on('resize',function(){
        
    //     $('[thumbnail]').each(function(){
    //         $(this).attr('style', "");
    //     });
    // })

    var adjustRowHeight = function() {

        $('[thumbnail]').each(function(){
            $(this).attr('style', "");
        });        

        var container = $(".wrapper")[1]
        var items = $('.post-link');
        
        var columnHeights = [0, 0];
        var columnIndex = 0;
        if (window.innerWidth  < 1200)
        {
            items.each(function(){
    
                this.style = "";
    
            });
            $("main")[0].style.marginBottom = '0px';
            // if(finallyLoaded)
            // override_css();
            // return;
        }
        else {

            var subWidth = $($(".post-list-heading")[0]).innerWidth();
            let counter = 0;
            let rowcounter = 0;
            items.each(function(){
                const itemHeight = this.offsetHeight;
                const shortestColumnHeight = Math.min(...columnHeights) ;
                const shortestColumnIndex = columnHeights.indexOf(shortestColumnHeight);
    

                const left = shortestColumnIndex * (container.offsetWidth / 2);
                const top = shortestColumnHeight + (shortestColumnHeight > 0 ? rowcounter * 20 : 0); // Add padding if not the first item
                counter++;
                if(counter % 2 == 0){
                    rowcounter++;
                }

    
                this.style.left = left  + 'px';
                this.style.top = top + 'px';
                this.style.width = subWidth * 0.5 -20 + 'px';
                
    
                columnHeights[shortestColumnIndex] += itemHeight;
            });
            let maxHeight = Math.max(...columnHeights) 
            $("main")[0].style.marginBottom = maxHeight+'px';
        }      
        
        // container.style.gridAutoRows = `${maxItemHeight}px`;
        console.log("aa");
        windowSizeWasAdjusted = true; 
        if(finallyLoaded)
            override_css();
        
    }
    $(window).on('resize', adjustRowHeight);
    $(window).on('zoom', adjustRowHeight);
    
    var onloadfunc = function()
    {
        adjustRowHeight();
        finallyLoaded = true;

        
        $('.post-link').css('scale','0') 
        $('#loading').css( 'scale', '1' )
        
        $('#loading').animate( {scale: 0 }, 150 )
        $('#loading').animate( {borderWidth: 0 },200 )
        $('#loading').delay(200,function(){this.remove();});

        // Show the container (fade in effect)
        $('.post-link').animate({ opacity: 1 }, 250); // Adjust duration as needed
        $('.post-link').animate({ scale: 1.1 }, 250); // Adjust duration as needed
        $('.post-link').animate({ scale: 1 }, 100); // Adjust duration as needed
    
        // Show each item with a delay for a staggered effect
        $('.item').each(function(index) {
            $(this).delay(index * 100).fadeIn(500); // Adjust delay and duration as needed
        });
    }

    //  $(window).resize(adjustRowHeight);
    $(window).on('load', onloadfunc);
    $(window).on('ready',adjustRowHeight);
    $(adjustRowHeight);
}); 


function initFuncs()
{
    onEnterHover = function(element)
    {
        if(isInsideDiv)
            return ;
        isInsideDiv = true;

        let useInitHeight = $(element).find('.projectLinkMedia')[0].clientHeight;
        $(element).find('.projectLinkMedia').attr("initialClientHeight",useInitHeight);

        showDemofeed(element,useInitHeight);

        let projectLinkMedia = $(element).find('.projectLinkMedia');
        projectLinkMedia.attr('style', 'height: '+ useInitHeight+'px;')
    }
    onExitHover = function(element)
    {
        if(! isInsideDiv)
            return ;

        showThumbnail(element);
        
        let projectLinkMedia = $(element).find('.projectLinkMedia');
        projectLinkMedia.attr('style', '');

        isInsideDiv = false;
    }

    getCurrentPath = function(element, type)
    {
        let path =  $(element).find(type).attr("src")

        return path;
    }
    getAltPath = function(element, type)
    {
        let path =  $(element).find(type).attr("altsrc")
        return path;
    }

    getExtension = function(path)
    {
        console.log(`splitting: ${path}`)
        let splitpath = (path.split("/"))
        let filename = splitpath[splitpath.length -1];
        let splitextension = filename.split('.')
        let extension = splitextension[splitextension.length -1]
        
        return extension;
    }
    
    showDemofeed = function(element, useInitHeight)
    {

        demotype = $(element).find('[demotype]').attr('demotype');
        if(demotype == 'video'){
            $($(element).find('[demotype]')[0].parentElement).show();
            if (lasttHover != element)
            $(element).find('[demotype]')[0].parentElement.currentTime = 0;

            $(element).find('[demotype]')[0].parentElement.play();
            $($(element).find('[demotype]')[0].parentElement).attr('style', 'height: '+ useInitHeight+'px;');
        }
        else {
            $(element).find('[demotype]').show()
            $(element).find('[demotype]').attr('style', 'height: '+ useInitHeight+'px;');
        }

        $(element).find('[thumbnail]').hide();
        
    }
    showThumbnail = function(element)
    {
        demotype = $(element).find('[demotype]').attr('demotype');
        if(demotype == 'video'){
            $($(element).find('[demotype]')[0].parentElement).hide();
        }
        else {
            $(element).find('[demotype]').hide()
        }
        
        $(element).find('[thumbnail]').show();
    }

    isExtensionVideo = function(extension)
    {
        switch (extension) {
            case "mp4":
                return true;
                break;
        
            default:
                return false;
                break;
        }
        return false;
    }
    isExtensionImage = function(extension)
    {
        switch (extension) {
            case "png":
                return true;
                break;
            case "gif":
                return true;
                break;
        
            default:
                return false;
                break;
        }
        return false;
    }
}