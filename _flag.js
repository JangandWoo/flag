/*
* flag v0.1
* Copyright 2015.12.24
* flag is Javascript library for non-blocking notifications. this plugin don't need to jquery library
*if you have someting, please contact this email here('hacking4soju at gmail.com' or 'jhjang1005@naver.com')
*/
(function(){
  'use strict';
    try{
      var _flag = flag || {} || new Object();
      var self = this;
      var flag = {
          info : info,
          success : success,
          warning : warning,
          error : error,
          debug : function(){
            console.log(this);
              // require(flag.settings.lib+'_debug.js'); //디버깅할때만..strictly하게
          },
          low_client : false,
          no:0
      }
      if(window.navigator.appName == 'Microsoft Internet Explorer' && window.attachEvent && !window.addEventListener){//익스8까지만 서포트
        window.navigator.__defineGetter__('userAgent', function(){
          flag.low_client = true;
        });
      }
      function initialize(position){
        if(!flag.parentNode){
            if(!position){
                position='flag_top-right';
            }
            var _parent = document.createElement('div');
            var attr = document.createAttribute('id');
            attr.value = '_flag';
            _parent.setAttributeNode(attr);
            attr = document.createAttribute('class');
            attr.value = position;
            _parent.setAttributeNode(attr);
            document.body.appendChild(_parent);
            flag.parentNode = _parent;
        }
      }
      initialize();

      function info(content, title){
        console.log('is info');
        createNode({type:'info', content:content, title:title, size:'is-middle'});
      }
      function success(content, title){
        console.log('is success');
        createNode({type:'success', content:content, title:title, size:'is-middle'});
      }
      function warning(content, title){
        console.log('is warning');
        createNode({type:'warning', content:content, title:title, size:'is-middle'});
      }
      function error(content, title){
        console.log('is error');
        createNode({type:'error', content:content, title:title, size:'is-middle'});
      }

      // type, content, title
      function createNode(option){
        if(!option.content){
          option.content = 'display default message';
        }
        if(!option.title){
          // console.log('yes i"m here');
          switch (option.type) {
            case 'info': option.title = 'Info';
              break;
            case 'success': option.title = 'Success';
              break;
            case 'warning': option.title = 'Warning';
              break;
            case 'error' : option.title = 'Error'
              break;
          }
        }

        var div = document.createElement('div');
        var attr = document.createAttribute('class');
        attr.value = '_flag_dom '+option.type+' '+option.size;
        div.setAttributeNode(attr);
        attr = document.createAttribute('data-flag-index');
        attr.value = ++flag.no;
        div.setAttributeNode(attr);

        var title_tag = document.createElement('h3');
        title_tag.appendChild(document.createTextNode(option.title));
        div.appendChild(title_tag);

        var content_tag = document.createElement('p')
        content_tag.appendChild(document.createTextNode(option.content));
        div.appendChild(content_tag);
        if(!flag.parentNode){
            console.log("You need to initialize!");
        }
        flag.parentNode.appendChild(div);
      }

      if(!window.flag){
          window.flag = flag;
      }
      if(!window.flag){
        window.flag = flag;
      }
    }catch(e){
        switch (true){
            case (e instanceof EvalError):
              console.log("Eval 에러: " + e.message);
                break;
            case (e instanceof RangeError):
              console.log("RangeError 에러: " + e.message);
                break;
            default:
              console.log("에러: " + e.message);
                break;
        }
    }
})();

flag.info("Content", "Title");
flag.success();

flag.success("Content", "Title");
flag.info("Content", "Title");
flag.success("Content", "Title");
flag.success("Content", "Title");
