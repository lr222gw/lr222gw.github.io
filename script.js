
var isInsideDiv = false;
$(function(){

    // jQuery methods go here...
    initFuncs();
        
    var currentHover = null
    $(".projectLink").on("touchstart",
    function()
    {
        if(currentHover != null)
            return; 
        currentHover = this;
        $(this).addClass('projectLink_hover')
        onEnterHover(this);
    }
    )
    $(".projectLink").on("touchend",
    function()
    {
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
            $(this).addClass('projectLink_hover')
            onEnterHover(this);
        }
    );

    $(".projectLink").on("mouseleave",
        function()
        {
            onExitHover(this);
            $(this).removeClass('projectLink_hover')
        }
    );
    $(window).on('resize',function(){
        
        $('[thumbnail]').each(function(){
            $(this).attr('style', "");
        });
    })
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