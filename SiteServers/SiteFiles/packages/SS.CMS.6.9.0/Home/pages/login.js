var $api=new utils.Api("/v1/users/actions/login"),$captchaGetUrl=utils.getApiUrl("/v1/captcha/LOGIN-CAPTCHA"),$captchaCheckApi=new utils.Api("/v1/captcha/LOGIN-CAPTCHA/actions/check");window.top!=self&&(window.top.location=self.location);var data={pageConfig:null,pageSubmit:!1,pageAlert:null,account:null,password:null,isAutoLogin:!1,captcha:null,captchaUrl:null},methods={load:function(t){this.pageConfig=t,this.reload()},reload:function(){this.captcha="",this.pageSubmit=!1,this.captchaUrl=$captchaGetUrl+"?r="+(new Date).getTime()},checkCaptcha:function(){var t=this;utils.loading(!0),$captchaCheckApi.post({captcha:t.captcha},function(i,a){utils.loading(!1),t.reload(),i?t.pageAlert={type:"danger",html:i.message}:t.login()})},login:function(){var t=this;utils.loading(!0),$api.post({account:t.account,password:md5(t.password),isAutoLogin:t.isAutoLogin},function(i,a){utils.loading(!1),i?t.pageAlert={type:"danger",html:i.message}:(utils.setToken(a.accessToken,a.expiresAt),location.href=utils.getQueryString("returnUrl")||"../index.html")})},btnLoginClick:function(t){t.preventDefault(),this.pageSubmit=!0,this.pageAlert=null,this.account&&this.password&&this.captcha&&this.checkCaptcha()},btnRegisterClick:function(){location.href="register.html?returnUrl="+(utils.getQueryString("returnUrl")||"login.html")}};new Vue({el:"#main",data:data,directives:{focus:{inserted:function(t){t.focus()}}},methods:methods,created:function(){var t=this;utils.getConfig("login",function(i){t.load(i.config)})}});