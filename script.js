

$(document).ready(function(){

    // jQuery methods go here...
    
    
    

    $(".projectLink").on("mouseenter",
        function()
        {
            // let path = $(this).find('img').attr('src');
            let path =  $(this).find('img').attr("altsrc")
            let ogpath =  $(this).find('img').attr("src")
            let splitpath = (path.split("/"))
            console.log("path:"+path);
            let filename = splitpath[splitpath.length -1];
            console.log("filename:"+filename);
            let splitextension = filename.split('.')
            let extension = splitextension[splitextension.length -1]
            console.log("extension:"+extension);

            if(extension == "mp4"){
                var videoTag = $(
                    "<video autoplay loop>"
                    +"<source src='"+path+"' altsrc='"+ogpath+"' type='video/mp4'/>"
                    +"</video>"
                )
                $(this).find('img').replaceWith(videoTag)
                
            }else {
                var imgTag = $(
                    "<img src='"+path+"' />"
                )
                $(this).find('video').replaceWith(imgTag)
            }

            let temp=$(this).find('img').attr('src')
            $(this).find('img').attr('src', $(this).find('img').attr("altsrc"))
            $(this).find('img').attr('altsrc', temp)

            // temp=$(this).find('img').attr('src')
            // $(this).find('img').attr('src', $(this).find('img').attr("altsrc"))
            // $(this).find('img').attr('altsrc', temp)
        }
    );

    $(".projectLink").on("mouseleave",
        function()
        {
            let ogpath =  $(this).find('source').attr("src")
            let path   =  $(this).find('source').attr("altsrc")
            let splitpath = (path.split("/"))
            console.log("path:"+path);
            let filename = splitpath[splitpath.length -1];
            console.log("filename:"+filename);
            let splitextension = filename.split('.')
            let extension = splitextension[splitextension.length -1]
            console.log("extension:"+extension);

            if(extension == "png"){
                var imgTag = $(
                    "<img src='"+ogpath+"' altsrc='"+path+"'/>"
                )
                $(this).find('video').replaceWith(imgTag)
                
            }

            let temp=$(this).find('img').attr('src')
            $(this).find('img').attr('src', $(this).find('img').attr("altsrc"))
            $(this).find('img').attr('altsrc', temp)
        }
    );
    
  
  }); 

