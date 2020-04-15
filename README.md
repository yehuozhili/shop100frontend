

# 基于Express与React制作的pwa小电商


## 项目介绍
- 此项目有2部分组成，前端仓库地址为 https://github.com/yehuozhili/shop100frontend ，后端仓库地址为  https://github.com/yehuozhili/shop100backend 。
- 前后端都由我一个人完成，无设计稿，图片自己网上找的，使用rem适配，css写的有点乱，后端测试部分未写完。
- 写这个主要也是自己学习用，因为我自己在里面也手写了很多功能，下面项目特色会展示出来。
- 项目最后部署我是使用https发挥pwa威力，不然在http下pwa没有多少意义。不过部署后感觉第一次访问网站有点墨迹，跟一开始本地跑速度差的有点多，还有很大优化空间。不过后续访问会有serviceworker执行缓存就会快很多了。
- 这里还要感谢下教我技术的老师，特别是张仁阳老师和姜文老师，我的react和张仁阳老师学的，基础部分和姜文老师学的，本来我连个手写promise都搞不懂到底怎么回事，以为自己可能不适合搞这个，后来一次公开课听了姜文老师那节promise给我很大的信心。

## 项目特色

- 手写的虚拟化列表组件，在历史记录和首页处使用了这组件

<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/virtualize.gif" />

<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/history.gif" />

- 登录注册，地址功能，收藏功能，购物车小动画，加载页面动画等，为了方便改造，注册完可以直接登录。

<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/address.gif" />
<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/distinct.gif" />
<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/collect.gif" />

- 搜索带自动补全功能，虽然我感觉我这实现没写好。

<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/search.gif" />


- pwa安装应用

<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/pwainstall.jpg" />
<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/pwainstall.gif" />

- pwa离线缓存

<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/pwacache.gif" />

- 手写分片上传，后来没有采用，但是前后端代码都保留着。

<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/sliceupload.gif" />

- 自定义hook解决安卓机键盘遮挡

<img src="https://github.com/yehuozhili/shop100frontend/blob/master/demo/usekeyboard.gif" />


## 线上体验地址

https://www.yehuozhili.xyz:5677/#/

## 项目使用
- 下载前后端项目后进行npm install安装，命令在package.json里都有。
- 后端需要建立.env文件，照着.env.example配置一些信息。
- 前端src下有个env.tsx文件，写了后端地址。
- 另外如果不使用https,html上的一个http转https的meta标签可以去了，serviceworker也可以不用。将其剥离出去就行。
- 我部署项目使用的是docker,后端项目基于pm2镜像制作，前端项目基于nginx制作。https是申请的免费证书。自签名证书浏览器不认的。

## 项目结构

- 前端主要使用react,redux,thunk完成主要逻辑，pwa部分靠workbox。
- 目录结构：
``` 
|─api     ------- 后端请求
├─assets  ------- 资源文件
│  ├─images 
│  └─style  ----- 公用样式
├─components ---- 公用组件
│  ├─CityPicker
│  ├─hooks   ---- 自定义钩子
│  ├─Loader
│  ├─Nav
│  ├─Search
│  ├─Tabs
│  ├─Upload
│  └─Virtualize
├─routes      ---- 路由组件
│  ├─Cart 
│  ├─Home
│  │  └─components
│  │      ├─HomeHeader
│  │      ├─HomeProduct
│  │      └─HomeSlider
│  ├─Login
│  ├─ProductDetail
│  ├─Profile
│  │  └─component
│  │      └─ProfileCollection
│  ├─ProfileCollection
│  ├─ProfileEdit
│  ├─ProfileForget
│  ├─ProfileHistory
│  ├─ProfilePackage
│  ├─ProfileReceive
│  ├─ProfileReceiveAdd
│  ├─Register
│  ├─Search
│  └─Settle
│      └─components
│          └─AddressSelect
├─store 
│  ├─actions  ----派发action
│  └─reducers ----reducer逻辑
├─typings   ------ 声明文件
└─utils      -----公用函数
```
- 后端主要使用express完成。
- 目录结构：

```
├─controllers  ---控制器
├─exceptions  --- 错误处理
├─middlewares ----中间件
├─models      ----模型
├─public       ---静态资源
│  ├─detail
│  ├─images
│  │  └─uploads --上传目录
│  ├─products
│  └─sliders
└─utils        --- 通用逻辑
```


## 需要改造点
- 1、登录注册部分未验证邮箱。
- 2、首页图片太大太多以及逻辑太多，需要精简，加快首页渲染时间。
- 3、支付后面逻辑未写。
- 4、包裹查询逻辑未写。