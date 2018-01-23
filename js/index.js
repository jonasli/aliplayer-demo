var player = null;



$(function(){
    player = createPlayer();
    player.on('ready',function(){
      console.log('ready可以调用播放器的方法了');
    });

    player.on('play',function(){
      console.log('开始播放(play)');
    });

    player.on('pause',function(){
       console.log('暂停播放(pause)');
     });

    $('.change').on('click',function(){
        var source = $('.source').val();
        var playAuth = $('.playauth').val();
        player = createPlayer(source,playAuth);
    })

    $('.submit').on('click',function(){



        var RPCClient = require('@alicloud/pop-core').RPCClient;

        var client = new RPCClient({
            accessKeyId: 'LTAIZhf3yzpDOf62',
            accessKeySecret: 'EGF3URvUrCi84GjALIiGH0oa8e4Vkv',
            endpoint: 'http://vod.cn-shanghai.aliyuncs.com',
            apiVersion: '2017-03-21'
        });
        
        // => returns Promise
        var auth = client.request("GetVideoPlayAuth", {
            VideoId: "ae6c9bf9a31747cabcff7b95529da065",
            AuthInfoTimeout	: 3000,
            Format: "JSON"
        }).then(data => {
            $('.playauth').val(data.PlayAuth);
            $('.source').val('ae6c9bf9a31747cabcff7b95529da065');
        });

        var source = "http://vod.service-now.cn/sv/24ea6d41-1611d12b24c/24ea6d41-1611d12b24c.mp4";
        var playAuth = $('.playauth').val();
        if(!source)
        {
            return;
        }
        if(source.indexOf('//')!=-1)
        {
            player.loadByUrl(source);
        }
        else if(playAuth)
        {
            if(player.replayByVidAndPlayAuth)
            {
                player.replayByVidAndPlayAuth(source, playAuth);
            }
            else
            {
                player = createPlayer(source,playAuth);
            }
        }
    })
})
    



function createPlayer(source, playauth)
{
    if(player)
    {
        player.dispose();
        $('#J_prismPlayer').empty();
        player = null;
    }
    var vid = source;
    if(!source && !playauth)
    {
        source = '';
        vid = "";
        playauth = "";
    }
    else if(source.indexOf('//')!=-1)
    {
        playAuth = "";
    }
    else if(playauth)
    {
        source = "";
    }
    var option = {
    id: "J_prismPlayer",
         autoplay: true,
         isLive:true,
         playsinline:true,
         width:"100%",
         height:"100%",
         controlBarVisibility:"click",
         useH5Prism:false, //启用H5播放器
         useFlashPrism:false,
         source:source,
         vid:vid,
         playauth:playauth,
         cover:""                  
    };

    return new Aliplayer(option);
}