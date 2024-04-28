

$(function(){

    // jQuery methods go here...
    initFuncs();
        
    isInsideDiv = false

    $(".projectLink").on("mouseenter",
        function()
        {
            console.log("tagname:" +this.tagName)
            if(isInsideDiv)
                return ;
            isInsideDiv = true;

            let useInitHeight = $(this).find('.projectLinkMedia')[0].clientHeight;
            $(this).find('.projectLinkMedia').attr("initialClientHeight",useInitHeight);
            console.log("clienthieghtr:" + $(this).find('.projectLinkMedia')[0].clientHeight)
            console.log(this);
            let path = getCurrentPath(this,"img");

            console.log("path:" +path)
            let altPath = getAltPath(this,"img");
            console.log("altPath:" +altPath)
            if(isExtensionVideo(getExtension(altPath)))
            {
                replaceWithVideo(this,altPath,path);
                $(this).find('video').attr('style', 'height: '+ useInitHeight+'px;');
            }
            else if(isExtensionImage(getExtension(altPath)))
            {
                replaceWithImage(this,altPath,path);
                $(this).find('img').attr('style', 'height: '+ useInitHeight+'px;');
            }
            let projectLinkMedia = $(this).find('.projectLinkMedia');
            projectLinkMedia.attr('style', 'height: '+ useInitHeight+'px;')
        }
    );

    $(".projectLink").on("mouseleave",
        function()
        {
            if(!isInsideDiv)
                return ;

            let path = getCurrentPath(this,'source');
            let altPath = getAltPath(this,'source');
            if(isExtensionVideo(getExtension(altPath)))
            {                
                replaceWithVideo(this,altPath,path);
                let useInitHeight = $(this).find('.projectLinkMedia').attr("initialClientHeight");
                $(this).find('video').attr('style', "");
            }
            else if(isExtensionImage(getExtension(altPath)))
            {

                replaceWithImage(this,altPath,path);
                let useInitHeight = $(this).find('.projectLinkMedia').attr("initialClientHeight");
                $(this).find('img').attr('style', "");
            }
            let projectLinkMedia = $(this).find('.projectLinkMedia');
            projectLinkMedia.attr('style', '');

            isInsideDiv = false;
        }
    );
    
  
}); 


function initFuncs()
{
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