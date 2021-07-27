/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

var app = new Vue({
    el:'#app',
    data:{
        search:'',
        musicList:[],
        musicUrl:'',
        musicCover:'',
        hotComments:[],
        isPlaying:false,
        mvurl:'',
        isShow: false
    },
    methods:{
        // 获取音乐列表
        // 按下回车，查询歌曲数据，渲染数据
            searchMusic:function(){
                var that = this;
                axios.get("https://autumnfish.cn/search?keywords=" + this.search).then(function(response){
                    // console.log(response.data.result.songs);
                    that.musicList = response.data.result.songs;
                },function(err){
                    console.log(err);
                })
              
            },
            // 音乐播放
            // 点击播放 歌曲地址获取 歌曲地址设置
            playMusic:function(musicId){
                // console.log(musicId);
                var that = this;
                this.isShow = false;
                 this.mvurl = ''
                
                axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(function(res){
                    // console.log(res.data.data[0].url);
                    that.musicUrl = res.data.data[0].url
                },function(err){
                    console.log(err);
                })
                // 获取歌曲封面：点击播放 封面获取 歌曲设置封面
                axios.get('https://autumnfish.cn/song/detail?ids=' + musicId).then(function(res){
                // console.log(res.data.songs[0].al.picUrl);
                that.musicCover = res.data.songs[0].al.picUrl
                })
                // 获取评论 点击播放 获取平困 渲染平路
                axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId).then(function(res){
                    // console.log(res.data.hotComments);
                    that.hotComments = res.data.hotComments;
                },function(err){
                    console.log(err);
                })           
            },
            // 播放动画 监听音乐播放 监听音乐暂停 操纵类名 
            play:function(){
                // console.log('play');
                this.isPlaying = true
            },
            pause:function(){
                // console.log('pause');
                this.isPlaying = false 
            }
           ,
            // mv播放 mv图标显示v-if mv地址获取接口 mvid 遮罩层v-show v-on mv地址设置v-bind
            playMv:function(mvid){
               var that = this
               this.musicUrl = ''
                this.isShow = true,
               axios.get('https://autumnfish.cn/mv/url?id=' + mvid).then(function(res){
                that.mvurl = res.data.data.url  
               },function(err){
                console.log(err);
               })
            },
            close:function(){
                this.mvurl = '',
                this.isShow = false
            } 
    }
})

