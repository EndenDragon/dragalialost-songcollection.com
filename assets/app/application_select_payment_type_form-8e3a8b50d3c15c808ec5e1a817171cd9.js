(function(){!function(e){var t,r;return r=function(){function t(r){this.supportTLS11=!0,this.$el=e(r),this.$credit=this.$el.find("#credit-card"),this.$el.find("#gmo-credit").length>0&&(this.$credit=this.$el.find("#gmo-credit"),this.gmoShopID=this.$credit.find('[name$="[token_api_key]"]').val()),this.cards=[],this.$el.find('[name="creditcard[]"]').each(function(t){return function(r,n){return t.cards.push(e(n).val())}}(this)),this.$submit=this.$el.find("[type=submit]"),this.$submit.on("click",e.proxy(this.submitHandler,this)),this.$submit.prop("disabled",!1),window.execTran=function(e){t.prototype.execTranHandler(e)}}return t.VISA_REG=/^4[0-9]{12}(?:[0-9]{3})?$/,t.MASTER_REG=/^[5|2][0-9]{12}(?:[0-9]{3})?$/,t.prototype.execTranHandler=function(t){return"000"!==t.resultCode?(window.alert("処理に失敗しました"),location.reload()):(this.$credit=e("form").find("#gmo-credit"),this.$submit=e("form").find("[type=submit]"),this.$credit.find('[name$="[card_token]"]').val(t.tokenObject.token),this.$credit.find('[name$="[card_req_card_number]"]').val(t.tokenObject.maskedCardNo),this.$submit.submit())},t.prototype.submitHandler=function(){var t,r,n;return n=this.getTokenRequestData(),"100"===this.$el.find("[name=payment_type_id]:checked").val()?(r=this.calcCardMode(),"registered"===r?(this.$submit=e("form").find("[type=submit]"),this.$submit.submit()):this.$credit.find('[name$="[security_code]"]').val().length<1||this.$credit.find('[name$="[card_number]"]').val().length<1?window.alert("フォームが空です"):(t=window.Multipayment,t.init(this.gmoShopID),t.getToken({cardno:this.$credit.find('[name$="[card_number]"]').val(),expire:[this.$credit.find('[name$="[card_expire2]"]').val().slice(-2),("00"+this.$credit.find('[name$="[card_expire1]"]').val()).slice(-2)].join(""),securitycode:this.$credit.find('[name$="[security_code]"]').val(),tokennumber:2},window.execTran),"no_register"===r&&this.setCreditDisabled(!0))):"1"!==this.$el.find("[name=payment_type_id]:checked").val()||this.hasCardToken()?this.request():this.requestMdkToken(),!1},t.prototype.calcCardMode=function(){var e,t;return t=this.$el.find("[name=gmo_cards]:checked").val(),"undefined"===t?"no_register":/^-?\d+$/.test(t)?"registered":(e="1"===this.$el.find("[name=card_register]:checked").val(),e?"register":"no_register")},t.prototype.request=function(){return this.hideErrorMessages(),this.hasCardToken()&&this.setCreditDisabled(!0),e.ajax({url:this.$el.attr("action"),type:this.$el.attr("method"),data:this.$el.serialize(),dataType:"json",beforeSend:e.proxy(this.beforeSendHandler,this),success:e.proxy(this.successHandler,this),error:e.proxy(this.errorHandler,this),complete:e.proxy(this.completeHandler,this)})},t.prototype.beforeSendHandler=function(){return this.$submit.prop("disabled",!0)},t.prototype.successHandler=function(t){switch(t.status){case 200:return window.location=t.redirect_to;case 400:return this.$el.data("confirm")&&e.magnificPopup.close(),this.showErrorMessages(t.errors),this.setCreditDisabled(!1),this.$submit.prop("disabled",!1)}},t.prototype.errorHandler=function(e){return this.showErrorMessages(e.errors),this.$submit.prop("disabled",!1)},t.prototype.showErrorMessages=function(t){var r,n,i,s,a,o,d;d=[];for(i in t){switch(o=t[i],i=i.toLowerCase().replace(/(.*)::/,"")){case"credit":i="credit-card";break;case"cvs":i="convenience";break;default:i="payment"}n=this.$el.find("#"+i),r=e('<div class="alert alert-danger"></div>').appendTo(n),d.push(function(){var e;e=[];for(a in o)s=o[a],e.push(r.append("<div>"+s+"</div>"));return e}())}return d},t.prototype.hideErrorMessages=function(){return this.$el.find(".alert.alert-danger").remove()},t.prototype.setCreditDisabled=function(e){var t;return t='[name$="[card_number]"], [name$="[card_expire1]"], [name$="[card_expire2]"], [name$="[security_code]"], [name$="[token_api_key]"]',this.$el.find(t).prop("disabled",e)},t.prototype.requestMdkToken=function(){var t,r,n;return this.hideErrorMessages(),r=this.getTokenRequestData(),t={},this.validateTokenRequestData(r,t)?(n=this.supportTLS11?"https://api.veritrans.co.jp/4gtoken":"https://3gs.veritrans.co.jp/4gtoken",e.ajax({url:n,type:"POST",contentType:"application/json",data:JSON.stringify(r),dataType:"json",beforeSend:e.proxy(this.tokenBeforeSendHandler,this),success:e.proxy(this.tokenSuccessHandler,this),error:e.proxy(this.tokenErrorHandler,this)})):(this.$el.data("confirm")&&e.magnificPopup.close(),this.showErrorMessages(t))},t.prototype.tokenBeforeSendHandler=function(){return this.$submit.prop("disabled",!0)},t.prototype.tokenSuccessHandler=function(e){return this.setTokenResponseData(e),this.request()},t.prototype.hasCardToken=function(){return this.$credit.find('[name$="[card_token]"]').val()&&this.$credit.find('[name$="[card_req_card_number]"]').val()},t.prototype.tokenErrorHandler=function(e){var t,r;return 0===e.readyState&&0===e.status?(this.supportTLS11=!1,this.requestMdkToken()):(r=e.responseJSON.code,t={credit:{key:[e.responseJSON.message]}},this.showErrorMessages(t),this.$submit.prop("disabled",!1))},t.prototype.getTokenRequestData=function(){var e;return e={card_number:this.$credit.find('[name$="[card_number]"]').val(),card_expire:[("00"+this.$credit.find('[name$="[card_expire1]"]').val()).slice(-2),this.$credit.find('[name$="[card_expire2]"]').val().slice(-2)].join("/"),security_code:this.$credit.find('[name$="[security_code]"]').val(),token_api_key:this.$credit.find('[name$="[token_api_key]"]').val()}},t.prototype.setTokenResponseData=function(e){return this.$credit.find('[name$="[card_token]"]').val(e.token),this.$credit.find('[name$="[card_req_card_number]"]').val(e.req_card_number)},t.prototype.validateTokenRequestData=function(e,t){return e.card_number?this.cards.length>0&&!this.checkCardBrand(e.card_number)?(t.credit={card_number:["カード番号がご利用可能なクレジットカードの種類でない為ご利用いただけません"]},!1):this.$credit.data("expire")&&!this.checkCardExpire(e.card_expire)?(t.credit={card_expire:[this.$credit.data("expire-message")]},!1):e.security_code?!0:(t.credit={security_code:["セキュリティコードを入力してください"]},!1):(t.credit={card_number:["カード番号を入力してください"]},!1)},t.prototype.checkCardBrand=function(e){var r,n,i,s,a,o;for(i=!1,o=this.cards,s=0,a=o.length;a>s;s++)r=o[s],n=t[r.toUpperCase()+"_REG"],i||"undefined"==typeof n||(i=n.test(e));return i},t.prototype.checkCardExpire=function(e){var t,r,n;return n=e.split("/"),t=new Date(parseInt(String((new Date).getFullYear()).substr(0,2)+n[1]),parseInt(n[0]),0,23,59,59),r=new Date(this.$credit.data("expire")),t>r},t}(),t=function(t){return this.each(function(){var n,i,s;return n=e(this),i=n.data("select-payment-type-form"),s="object"==typeof t&&t,i||n.data("select-payment-type-form",i=new r(this,s)),n})},e.fn.selectPaymentTypeForm=t,e.fn.selectPaymentTypeForm.Constructor=r,window.SelectPaymentTypeForm=r,e(function(){return e(".select-payment-type-form").selectPaymentTypeForm()})}(window.$)}).call(this),function(){var e={}.hasOwnProperty,t=function(t,r){function n(){this.constructor=t}for(var i in r)e.call(r,i)&&(t[i]=r[i]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t};!function(e){var r,n;return r=function(r){function n(e){n.__super__.constructor.call(this,e)}return t(n,r),n.prototype.successHandler=function(t){var r,n;switch(t.status){case 200:return this.$el.data("finish-target-url")?window.location.href=this.$el.data("finish-target-url"):(n=this.$el.find("#finish-template"),"waiting"===t.order_status&&(n=this.$el.find("#finish-template-cvs")),r=e(n.html()).appendTo(this.$el),r.find("a").on("click",function(){return window.location.reload()}),r.modal());case 400:return this.$el.data("confirm")&&e.magnificPopup.close(),this.showErrorMessages(t.errors),this.setCreditDisabled(!1),this.$submit.prop("disabled",!1)}},n.prototype.errorHandler=function(){return this.$el.data("confirm")?e.magnificPopup.close():void 0},n.prototype.showErrorMessages=function(t){var r,i,s,a,o,d;n.__super__.showErrorMessages.call(this,t),d=[];for(s in t)o=t[s],i=this.$el.find("#error-container"),"digital_content_payment"===s?(r=e('<div class="alert alert-danger"></div>').appendTo(i),d.push(function(){var e,t,n;for(n=[],e=0,t=o.length;t>e;e++)a=o[e],n.push(r.append("<div>"+a+"</div>"));return n}())):d.push(void 0);return d},n}(SelectPaymentTypeForm),n=function(t){return this.each(function(){var n,i,s;return n=e(this),i=n.data("digital-content-select-payment-type-form"),s="object"==typeof t&&t,i||n.data("digital-content-select-payment-type-form",i=new r(this,s)),n})},e.fn.digitalContentSelectPaymentTypeForm=n,e.fn.digitalContentSelectPaymentTypeForm.Constructor=r,window.DigitalContentSelectPaymentTypeForm=r,e(function(){return e(".digital-content-select-payment-type-form").digitalContentSelectPaymentTypeForm()})}(window.$)}.call(this),function(){}.call(this);