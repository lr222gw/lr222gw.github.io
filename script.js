

$(function(){

    // jQuery methods go here...
    
    function getCurrentPath(element)
    {
        let path =  $(element).find('img').attr("src")
        if (path == undefined )
        {
            path =  $(element).find('source').attr("src")
        }
        return path;
    }
    function getAltPath(element)
    {
        let path =  $(element).find('img').attr("altsrc")
        if (path == undefined )
        {
            path =  $(element).find('source').attr("altsrc")
        }
        
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
        var videoTag = $(
            "<video autoplay loop>"
            +"<source src='"+currentPath+"' altsrc='"+altPath+"' type='video/mp4'/>"
            +"</video>"
        );
        // $(element).find('img').replaceWith(videoTag);
        if(isExtensionVideo(getExtension(altPath)))
            $(element).find('video').replaceWith(videoTag);
        else 
            $(element).find('img').replaceWith(videoTag);
    }
    function replaceWithImage(element, currentPath, altPath )
    {
        var imgTag = $(
            "<img src='"+currentPath+"' altsrc='"+altPath+"'/>"
        );
        if(isExtensionVideo(getExtension(altPath)))
            $(element).find('video').replaceWith(imgTag);
        else 
            $(element).find('img').replaceWith(imgTag);
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

            let path = getCurrentPath(this);
            console.log("path:" +path)
            let altPath = getAltPath(this);
            console.log("altPath:" +altPath)
            if(isExtensionVideo(getExtension(altPath)))
                replaceWithVideo(this,altPath,path);
            else if(isExtensionImage(getExtension(altPath)))
                replaceWithImage(this,altPath,path);



            // let path = $(this).find('img').attr('src');
            // let path =  $(this).find('img').attr("altsrc")
            // let ogpath =  $(this).find('img').attr("src")
            // let splitpath = (path.split("/"))
            // console.log("path:"+path);
            // let filename = splitpath[splitpath.length -1];
            // console.log("filename:"+filename);
            // let splitextension = filename.split('.')
            // let extension = splitextension[splitextension.length -1]
            // console.log("extension:"+extension);

            // if current is video, get alt from 

            // if(extension == "mp4"){
            //     var videoTag = $(
            //         "<video autoplay loop>"
            //         +"<source src='"+path+"' altsrc='"+ogpath+"' type='video/mp4'/>"
            //         +"</video>"
            //     )
            //     $(this).find('img').replaceWith(videoTag)
                
            // }else {
            //     // var imgTag = $(
            //     //     "<img src='"+path+"' />"
            //     // )
            //     // $(this).find('video').replaceWith(imgTag)
            // }

            // let temp=$(this).find('img').attr('src')
            // $(this).find('img').attr('src', $(this).find('img').attr("altsrc"))
            // $(this).find('img').attr('altsrc', temp)

            // temp=$(this).find('img').attr('src')
            // $(this).find('img').attr('src', $(this).find('img').attr("altsrc"))
            // $(this).find('img').attr('altsrc', temp)
        }
    );

    $(".projectLink").on("mouseleave",
        function()
        {
            if(!isInsideDiv)
                return ;
            

            let path = getCurrentPath(this);
            let altPath = getAltPath(this);
            if(isExtensionVideo(getExtension(altPath)))
                replaceWithVideo(this,altPath,path);
            else if(isExtensionImage(getExtension(altPath)))
                replaceWithImage(this,altPath,path);


            isInsideDiv = false;

            // let ogpath =  $(this).find('source').attr("src")
            // let path   =  $(this).find('source').attr("altsrc")
            // let splitpath = (path.split("/"))
            // console.log("path:"+path);
            // let filename = splitpath[splitpath.length -1];
            // console.log("filename:"+filename);
            // let splitextension = filename.split('.')
            // let extension = splitextension[splitextension.length -1]
            // console.log("extension:"+extension);

            // if(extension == "png"){
            //     var imgTag = $(
            //         "<img src='"+ogpath+"' altsrc='"+path+"'/>"
            //     )
            //     $(this).find('video').replaceWith(imgTag)
                
            // }

            // let temp=$(this).find('img').attr('src')
            // $(this).find('img').attr('src', $(this).find('img').attr("altsrc"))
            // $(this).find('img').attr('altsrc', temp)
        }
    );
    
  
  }); 

