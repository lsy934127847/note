

/*
 当我们去浏览器地址栏输入一个url后 浏览器会发起网络请求 去请求响应的html css js文件
 在浏览器中network 查看 
  initiator 字段 https://blog.csdn.net/qq_34752068/article/details/89244809
     other    代表 其他一些流程或操作启动了请求，
              例如用户通过链接导航到页面，或者在地址栏中输入URL。
     Script   脚本启动了请求
     Redirect HTTP重定向启动了请求
     Parser   Chrome的HTML解析器发起了请求

  基本所有资源 缓存都是由后端设置 

  默认情况下
  如果服务器不进行任何缓存设置,浏览器不会对资源进行缓存。

  缓存分为强制缓存和协商缓存
  强制缓存
   res.setHeader("Cache-Control","max-age=100") 
   注意点
   1.表示最大过期时间为100s,在100s刷新浏览器会走缓存,在100s后刷新浏览器会再次发起请求
   2.走强制缓存不会发起浏览器请求,size字段显示 memory-cache time字段 为0 
   3.强制缓存对从地址栏请求的资源不生效,即从地址栏请求的文件依旧会发起请求
   4.强制缓存可以对引入的资源生效,如link和script发起的请求

   问题
   1.假如设置过期时间为10s,在这10s内,文件发生了变化,但是浏览器会走缓存,不会请求,导致拿不到最新的资源
   2.文件一直没有变,但是浏览器10s会再次发起请求

   解决 
   1.浏览器每次都向服务器询问是否要缓存,然后服务告诉浏览器是否要走缓存
   2.当浏览器第一访问后,先将文件缓存,然后刷新第二次请求资源时,服务器判断文件内容有没有发生变化
     如果有变化,返回资源,没有变化,不返回资源,浏览器走缓存

 协商缓存
   a.res.setHeader("Cache-Control","no-cache")  将资源缓存,并询问服务器是否要缓存
   b.res.setHeader("last-modified",123) 上一次修改 可以写文件的最后修改时间
   c.req.headers["if-modified-since"]   携带上次修改的值

   流程
   第一次请求 设置响应头为"Cache-Control"为"no-cache",
             设置响应头为"last-modified"为123
             拿到请求头中的上一次修改为undefined
             判断是否123 不等于 undefined 返回资源
             浏览器将资源缓存

   第二次请求 设置响应头为"Cache-Control"为"no-cache",
             设置响应头为"last-modified"为123
             拿到请求头中的上一次修改为123
             判断是否last-modified等于if-modified-since 设置状态码304 返回空资源res.end()
             浏览器根据状态304取缓存 这里验证过

    问题 
       1.last-modified一般设置为文件的最后修改时间,如果文件文件内容没有变,但是修改的文件
         会导致上次的修改if-modified-since和这一次last-modified的修改不一样
         导致服务器重新将资源返回给浏览器

   解决 
       1. 根据文件内容判断 如果文件内容发生变化,就重新返回资源,没有变化走缓存

            
             
*/