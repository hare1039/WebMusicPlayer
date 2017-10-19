song = new Audio();

let cur_path = ["/"];
let root_path = "./mnt"
let on_msg = false
let cur_list = [];
let playing_id = 0;

$("#container").height($(window).height()-$("#footer").height());
function setCtrl(element){
	element.on("click",function(e){
		if(!on_msg){
			console.log("click");
			if($(this).hasClass("dir")){
				cur_path.push(element.text()+"/");
				updateList();
				console.log("clk_dir");
				console.log(cur_path.join(""));
			}
			else if ($(this).hasClass("dir_back")) {
				cur_path.pop();
				updateList();
				console.log("clk_dir_back");
				console.log(cur_path.join(""));
			}
			else{
				console.log("clk_file");
				changeSong($(this));
			}
		}

	})
}
function changeSong(element){
	$(".playing").addClass("file");
	$(".file").removeClass("playing");
	element.removeClass("file")
	element.addClass("playing");
	console.log(cur_path.join("")+element.text());
	song.src = root_path+cur_path.join("")+element.text();
	song.play();
	if($("#btn_play").hasClass("btn_play")){
		$("#btn_play").removeClass("btn_play")
		$("#btn_play").addClass("btn_pause")
	}
}
$("#btn_play").on("click",function(e){
	console.log("btn_play");
	if($(this).hasClass("btn_play")){
		if(song.readyState==0){
			changeSong($(".file:first"));
		}
		else {
			song.play();
			$(this).removeClass("btn_play")
			$(this).addClass("btn_pause")
		}
	}
	else {
		song.pause();
		$(this).removeClass("btn_pause")
		$(this).addClass("btn_play")
	}
});
$("#seek").attr("min",0);
$("#seek").on("change input",function(){
	song.currentTime = $(this).val();
})
song.addEventListener("loadedmetadata",function(){
	$("#seek").attr("max",song.duration);
})
song.addEventListener("timeupdate",function(){
	let curtime = parseInt(song.currentTime, 10);
	$("#seek").val(curtime);
})
song.addEventListener("ended",function(){
	$("#btn_play").removeClass("btn_pause")
	$("#btn_play").addClass("btn_play")
	$("#btn_forword").click()
})
$("#btn_forword").on("click",function(e){
	console.log("btn_forword");
	if($(".playing").length){
		if($("#btn_play").hasClass("btn_play")){
			$(this).removeClass("btn_play")
			$(this).addClass("btn_pause")
		}
		if($(".playing").next(".file").length){
			changeSong($(".playing").next(".file"));
			song.currentTime = 0;
			song.play();
		}
		else{
			song.currentTime = 0;
		}
	}
});
$("#btn_backword").on("click",function(e){
	console.log("btn_backword");
	if($(".playing").length){
		if($("#btn_play").hasClass("btn_play")){
			$(this).removeClass("btn_play")
			$(this).addClass("btn_pause")
		}
		if($(".playing").prev(".file").length && song.currentTime<3){
			changeSong($(".playing").prev(".file"));
		}
		song.currentTime = 0;
		song.play();
	}
});
