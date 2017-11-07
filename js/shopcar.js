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
	
$(function(){
			$(window).scroll(function(){
				var sT=$(window).scrollTop();
			if(sT>50){
				$(".toTop").css("display","block");
			}else{
				$(".toTop").css("display","none");
			}
			});
			$("li.toTop").click(function(){
				$("body").animate({"scrollTop":0},500);
			
		 })

		})	
		



        var cals = document.getElementsByName("cal");
		var selected = document.getElementById("selected");
		var ff = document.getElementById("ff");
		var trs = document.getElementsByTagName("tr");
		var all = document.getElementsByName("all");
		var shangs = document.getElementsByName("shang");
		var nums = document.getElementsByName("num");
		var jians = document.getElementsByName("jian");
		var adds = document.getElementsByName("add");
		var totDel = document.getElementById("totDel");
		var priceTotal = document.getElementById("priceTotal");
		var selectedTotal = document.getElementById("selectedTotal");
		all[0].onchange = function(){
			for(var i = 0;i < shangs.length;i++){
				shangs[i].checked = this.checked;
			}
			all[1].checked = this.checked;
			totalPrice();
		}
		all[1].onchange = function(){
			for(var i = 0;i < shangs.length;i++){
				shangs[i].checked = this.checked;
			}
			all[0].checked = this.checked;
			totalPrice();
		}
		for(var i = 0;i < shangs.length;i++){
			shangs[i].onchange = checkAll;
		}
		function checkAll(){
			var c = true;
			for(var i = 0;i < shangs.length;i++){
				if(shangs[i].checked == false){
					c = false;
					break;
				}
			}
			for(var k = 0;k < all.length;k++){
				all[k].checked = c;
			}
			sel();
			totalPrice();
		}
		function totalPrice(){
			var p = 0;
			var total = 0;
			for(var i = 1;i < trs.length-1;i++){
				if(trs[i].getElementsByTagName("input")[0].checked){
					var rowPrice =trs[i].cells[4].innerHTML;
					var num = document.getElementsByName("num")[i-1];
					p = p + parseFloat(rowPrice);
					total = total + parseInt(num.value);
				}
				
			}
			priceTotal.innerHTML = p.toFixed(2);
			selectedTotal.innerHTML=total;
		}
		function getRowPrice(tr){
			var cols = tr.cells;
			var price = cols[2].innerHTML;
			var num = tr.getElementsByTagName("input")[2];
			var rowPrice = cols[4];
			rowPrice.innerHTML = price * parseInt(num.value);
			if(num.value <= 1){
				num.previousElementSibling.value = " ";
			}else{
				num.previousElementSibling.value = "-";
			}
			totalPrice();
		}
		for(var i = 0;i < nums.length;i++){
			nums[i].onkeyup = function(){
				getRowPrice(this.parentNode.parentNode);
			};
			jians[i].onclick = function(){
				if(this.nextElementSibling.value <= 1){
					this.value = " ";
				}else{
					this.value = "-";
					this.nextElementSibling.value--;
					
				}
				getRowPrice(this.parentNode.parentNode);
			}
			adds[i].onclick = function(){
				this.previousElementSibling.value++;
				if(this.previousElementSibling.value > 1){
					this.previousElementSibling.previousElementSibling.value = "-";
				}
				getRowPrice(this.parentNode.parentNode);
			}
		}
		function del(){
			this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
			totalPrice();
		}
		for(var i = 1;i < trs.length-1;i++){
			var btn = trs[i].getElementsByTagName("span")[0];
			btn.onclick = del;
		}
		totDel.onclick = function(){
			for(var i = 0;i < shangs.length;i++){
				if(shangs[i].checked =true){
					shangs[i].parentNode.parentNode.parentNode.removeChild(shangs[i].parentNode.parentNode);
					i--;
				}
				
			}
			totalPrice();
		}
		selected.onclick = function(){
			spans = this.getElementsByTagName("span");
			for(var i = 1;i < spans.length;i++){
				if(spans[i].style.display != "none"){
					spans[i].style.display="none";
				}else{
					spans[i].style.display = "inline";
				}
			}
			if(ff.style.display != "none"){
				ff.style.display = "none";
			}else{
				ff.style.display = "block";
			}
		}
		function sel(){
			for(var i = 0;i < shangs.length;i++){
				var dd = document.getElementById("dd"+i);
				if(shangs[i].checked == true){
					dd.style.display = "block";
				}else{
					dd.style.display = "none";
				}
			}
		}
		for(var i = 0;i < cals.length;i++){
			cals[i].onclick = function(){
				this.parentNode.style.display = "none";	
				for(var j = 0;j < cals.length;j++){
					var dd = document.getElementById("dd"+j);
					if(dd.style.display == "none"){
						shangs[j].checked = false;
					}
				}
				totalPrice();
				checkAll();
			}
		}