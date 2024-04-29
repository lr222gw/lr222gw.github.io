

$(function(){

    // jQuery methods go here...
    initFuncs();
        
    isInsideDiv = false;

    $(".projectLink").on("touchstart",
    function()
    {
        onEnterHover(this);
    }
    )
    $(".projectLink").on("touchend",
    function()
    {
        onExitHover(this);
    }
    )
    

    $(".projectLink").on("mouseenter",
        function()
        {
            onEnterHover(this);
        }
    );

    $(".projectLink").on("mouseleave",
        function()
        {
            onExitHover(this);
        }
    );
}); 


function initFuncs()
{
    onEnterHover = function(element)
    {
        console.log("tagname:" +element.tagName)
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
        if(!isInsideDiv)
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