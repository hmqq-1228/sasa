        var aaa = document.getElementById("aaa");
		var bbb = document.getElementById("bbb");
		var a1 = document.getElementById("a1");
		var b1 = document.getElementById("b1");
		aaa.onmouseover=function(){
			a1.style.display="block";
		}
		aaa.onmouseout=function(){
			a1.style.display="none"
		}
		bbb.onmouseover=function(){
			b1.style.display="block";
		}
		bbb.onmouseout=function(){
			b1.style.display="none"
		}
		
function checkusr(){
		var val=form2.user.value;
		var reg= /^1\d{10}$/;
		var reg1= /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
		if(reg.test(val)||reg1.test(val)){
			tip1.innerHTML='<span class="tips_true">输入正确</span>';
			return true;
			}else if(val==""){
				tip1.innerHTML='<span class="tips_false">请输入账号</span>';
			    return false;
		}else{
			tip1.innerHTML='<span class="tips_false">请输入正确格式的账号</span>';
			return false;
		   }
		 }

function checkpd(){
		var val=form2.pwd.value;
		var reg= /\w{6,16}$/;
		if(reg.test(val)){
			tip2.innerHTML='<span class="tips_true">输入正确</span>';
			return true;
			}else if(val==""){
				tip2.innerHTML='<span class="tips_false">请输入账号,6-16位字符和数字</span>';
			    return false;
		}else{
			tip2.innerHTML='<span class="tips_false">请输入正确格式的账号</span>';
			return false;
		   }
		 }

function checkrpd(){
		var val1=form2.pwd.value;
		var val=form2.rpwd.value;
		if(val==val1){
			tip3.innerHTML='<span class="tips_true">输入正确</span>';
			return true;
		}else{
			tip3.innerHTML='<span class="tips_false">和密码不一致，请重新输入</span>';
			return false;
		   }
}

function checkck(){
//	var val=form2.v_container.value;
    var res = verifyCode.validate(document.getElementById("code_input").value);
		if(res){
			tip4.innerHTML='<span class="tips_true">验证码输入正确</span>';
			return true;
		}else{
			tip4.innerHTML='<span class="tips_false">请输入验证码</span>';
			return false;
		}
}

//function checkag(){
//		var val=form2.ch1;
//		alert(val)
//		if(val=='checked'){
//			return true;
//		}else{
//			return false;
//		}
//}

function checkAll(){
	return checkusr()&&checkpd()&&checkrpd()&&checkck();
}

$(function(){
   	$("#btn").click(function(){
   		var $u=$("#user").val();
   		var $p=$("#pwd").val();
   		$.get("http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID="+$u+"&password="+$p,function(res,status,xhr){
//			console.log(res);
			if(res==1){
				window.location.href="login.html";
			}else if(res==0){
				$("#tip1").text("用户名已被注册");
			}else if(res==2){
				alert("数据库报错");
			}
   		})
   	})
   })

 var verifyCode = new GVerify("v_container");
        var verifyCode = new GVerify({id:"v_container",type:"blend"});
		document.getElementById('sx').onclick = function(){verifyCode.refresh();};//verifyCode.refresh()刷新验证码

		document.getElementById("btn").onclick = function(){
			var res = verifyCode.validate(document.getElementById("code_input").value);
			//verifyCode.validate(code);验证图形验证码，参数code为用户输入的验证码，返回值：正确：true,错误：false
			if(res){
				alert("验证正确");
			}else{
				alert("验证码错误");
			}
		}