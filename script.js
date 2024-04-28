

$(function(){

    // jQuery methods go here...
    
    function getCurrentPath(element, type)
    {
        let path =  $(element).find(type).attr("src")
        return path;
    }
    function getAltPath(element, type)
    {
        let path =  $(element).find(type).attr("altsrc")
        return path;
    }

    function getExtension(path)
    {
        let splitpath = (path.split("/"))
        console.log("path:"+path);
        let filename = splitpath[splitpath.length -1];
        console.log("filename:"+filename);
        let splitextension = filename.split('.')
        let extension = splitextension[splitextension.length -1]
        console.log("extension:"+extension);
        
        return extension;
    }
    
    function replaceWithVideo(element, currentPath, altPath)
    {

        $(element).find('video').show();
        $(element).find('video').find('source').attr('src', currentPath);
        $(element).find('video').find('source').attr('altsrc', altPath);

        $(element).find('img').hide();
        
    }
    function replaceWithImage(element, currentPath, altPath )
    {
        $(element).find('video').hide()

        $(element).find('img').show();
        $(element).find('img').attr('src', currentPath);
        $(element).find('img').attr('altsrc', altPath);
    }

    function isExtensionVideo(extension)
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
    function isExtensionImage(extension)
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
    
    isInsideDiv = false

    $(".projectLink").on("mouseenter",
        function()
        {
            console.log("tagname:" +this.tagName)
            if(isInsideDiv)
                return ;
            isInsideDiv = true;

            let path = getCurrentPath(this,"img");

            console.log("path:" +path)
            let altPath = getAltPath(this,"img");
            console.log("altPath:" +altPath)
            if(isExtensionVideo(getExtension(altPath)))
                replaceWithVideo(this,altPath,path);
            else if(isExtensionImage(getExtension(altPath)))
                replaceWithImage(this,altPath,path);
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
                replaceWithVideo(this,altPath,path);
            else if(isExtensionImage(getExtension(altPath)))
                replaceWithImage(this,altPath,path);

            isInsideDiv = false;
        }
    );
    
  
  }); 

