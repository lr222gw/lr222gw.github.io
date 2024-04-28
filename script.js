

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
        console.log("clienthieghtr:" + $(element).find('.projectLinkMedia')[0].clientHeight)
        console.log(element);
        let path = getCurrentPath(element,"img");

        console.log("path:" +path)
        let altPath = getAltPath(element,"img");
        console.log("altPath:" +altPath)
        if(isExtensionVideo(getExtension(altPath)))
        {
            replaceWithVideo(element,altPath,path);
            $(element).find('video').attr('style', 'height: '+ useInitHeight+'px;');
        }
        else if(isExtensionImage(getExtension(altPath)))
        {
            replaceWithImage(element,altPath,path);
            $(element).find('img').attr('style', 'height: '+ useInitHeight+'px;');
        }
        let projectLinkMedia = $(element).find('.projectLinkMedia');
        projectLinkMedia.attr('style', 'height: '+ useInitHeight+'px;')
    }
    onExitHover = function(element)
    {
        if(!isInsideDiv)
            return ;

        let path = getCurrentPath(element,'source');
        let altPath = getAltPath(element,'source');
        if(isExtensionVideo(getExtension(altPath)))
        {                
            replaceWithVideo(element,altPath,path);
            let useInitHeight = $(element).find('.projectLinkMedia').attr("initialClientHeight");
            $(element).find('video').attr('style', "");
        }
        else if(isExtensionImage(getExtension(altPath)))
        {

            replaceWithImage(element,altPath,path);
            let useInitHeight = $(element).find('.projectLinkMedia').attr("initialClientHeight");
            $(element).find('img').attr('style', "");
        }
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
        let splitpath = (path.split("/"))
        let filename = splitpath[splitpath.length -1];
        let splitextension = filename.split('.')
        let extension = splitextension[splitextension.length -1]
        
        return extension;
    }
    
    replaceWithVideo = function(element, currentPath, altPath)
    {

        $(element).find('video').show();
        $(element).find('video').find('source').attr('src', currentPath);
        $(element).find('video').find('source').attr('altsrc', altPath);

        $(element).find('img').hide();
        
    }
    replaceWithImage = function(element, currentPath, altPath )
    {
        $(element).find('video').hide()        

        $(element).find('img').show();
        $(element).find('img').attr('src', currentPath);
        $(element).find('img').attr('altsrc', altPath);
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