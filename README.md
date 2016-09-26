# Games
******
该游戏提供两种运行方法

1. 直接运行游戏主体  
这种运行能玩到游戏的绝大部分内容,不需要注册用户,基本上不需要配置环境,是一种简单的运行方法.  
进入`Games/WebContent`目录,使用`python2.7`运行`webserver.py`,命令如下：  
```shell
python webserver.py
```
然后打开浏览器,在地址栏输入`127.0.0.1:8000`,就可以进行游戏了.  
2. 运行完整的项目
运行完整的项目,你会看到更美观的页面设计,需要注册登陆,可以冲击排行榜.  
如果你想要运行完整的项目,你必须先配置好环境,然后打开网站,注册账号,才能开始游戏,如果你足够厉害,就能进入游戏的排行榜.  
**配置环境**：  

+ `python`版本：`python3`及以上,最好是`python3.5`
+ `Django`版本：`Django1.10.1`
导入`Django`,推荐使用`pip`导入`Django`,命令如下：  
```shell
pip install Django==1.10.1
```
详情请访问[Django官网][djangoproject].  
+ `BootStrap`版本：`BootStrap3.3`

请到[BootStrap官网][getbootstrap]下载最新版本的`BootStrap`  
将`bootstrap.min.css`拷贝到`Games/Invaders/static/Invaders/css`目录下,将`bootstrap.min.js`拷贝到`Games/Invaders/static/Invaders/js`目录下，命令如下:
```shell
# xxx为bootstrap文件目录.比如说 ~/Download/ ,yyy为该项目的保存目录
$ copy /xxx/bootstrap-3.3.7-dist/js/bootstrap.min.css /yyy/Games/Invaders/static/Invaders/css
$ copy /xxx/bootstrap-3.3.7-dist/js/bootstrap.min.js /yyy/Games/Invaders/static/Invaders/js
```
当然你也可以直接用鼠标复制粘贴bootstrap的css,js文件到游戏的相应目录下.  

**运行游戏**：  
打开终端,进入游戏目录,运行游戏,命令如下：   
```shell
# yyy为该项目的保存目录
$ cd /yyy/Games 
$ python3 manage.py run server
```
打开浏览器,在地址栏输入`127.0.0.1:8000/Invaders/`,就可以游戏了.  







[djangoproject]: <https://www.djangoproject.com/download/> (下载Django)
[getbootstrap]: <http://getbootstrap.com/getting-started/#download> (下载BootStrap)
