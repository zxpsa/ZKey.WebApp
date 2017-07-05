//{'path':"",'preload':是否预先下载,'loop':是否循环} 
var AudioService=function(pars){
    var _self=this;
    var audio = new Audio(pars.path);
    audio=document.createElement("audio");
    audio.src=pars.path;
    // audio.autoplay=true;
    // audio.controls="controls";
    if(pars.preload)audio.preload=true;
    if(pars.loop)audio.preload=true;
    // audio.onloadstart=function(a){
    //     alert(JSON.stringify(arguments));
    // }
    // //loadstart，durationchange，loadeddata，progress，canplay，canplaythrough
    // audio.onplaying=function(a){
    //     alert(JSON.stringify(arguments));
    // }
    _self.play=function(){
        audio.play();
    }

    _self.stop=function(){
        audio.pause();
        audio.currentTime = 0;
    }

    _self.pause=function(){
        audio.pause();
    }

};
module.exports = AudioService;