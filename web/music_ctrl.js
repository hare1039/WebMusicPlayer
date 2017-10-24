song = new Audio();

var cur_path = ["/"];
let song_path;
let root_path = "./mnt"
let on_msg = false
let cur_list = [];
let playing_id = 0;

$("#container").height($(window).height()-$("#footer").height()-$("#header").height()-20);
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
			else{
				console.log("clk_file");
				updateCurList();
				changeSong(cur_path.join(""),$(this).text());
			}
		}

	})
}
$("#btn_back").on("click",function(e){
	if(!on_msg){
		cur_path.pop();
		updateList();
		console.log("clk_btn_back");
		console.log(cur_path.join(""));
		console.log(cur_list);
		console.log(playing_id);
	}
});
function updateCurList(){
	song_path = cur_path.join("");
	cur_list.length =0;//clear the list
	$(".file").each(function(){//rewrite
		cur_list.push($(this).text());
	});
}
function lightPlaying(){
	$(".file").removeClass("playing");
	$(".file").filter(function(){
		if(cur_list[playing_id] !== undefined)
			return $(this).text() == cur_list[playing_id];
		else
			return false;
	}).addClass("playing");//if playing song on screen, lignt it
}
function changeSong(c_path,song_name){
	document.getElementById("seek").disabled = false;
	for(let i=0; i<cur_list.length; i++){
		if(song_name == cur_list[i])
			playing_id = i;
	}//playing_id follow cur_list
	lightPlaying();
	console.log(c_path+song_name);
	song.src = root_path+c_path+song_name;
	song.play();
	$("#btn_play").removeClass("btn_play")
	$("#btn_play").addClass("btn_pause")
	$("#playing_song").text(song_name);
}
$("#btn_play").on("click",function(e){
	console.log("btn_play");
	if($(this).hasClass("btn_play")){
		if(song.readyState==0){
			updateCurList();
			changeSong(cur_path.join(""),cur_list[0]);
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
document.getElementById("seek").disabled = true;
$("#seek").attr("min",0);
$("#seel").val(0);
$("#seek").on("change input",function(){
	song.currentTime = $(this).val();
})
function HHMMSS(ipt){
	let time = parseInt(ipt, 10);
	let hr = Math.floor(time/3600);
	let min = Math.floor((time - hr * 3600) / 60);
	let sec = time - hr*3600 - min * 60;
	let rt = [];
	if(hr){
		rt.push(hr);
		if(min<10){min = "0"+min;}
	}
	rt.push(min);
	if(sec<10){sec = "0"+sec;}
	rt.push(sec);
	return rt.join(":");
}
song.addEventListener("loadedmetadata",function(){
	$("#seek").attr("max",song.duration);
	$("#duration").text(HHMMSS(song.duration));
})
song.addEventListener("timeupdate",function(){
	let curtime = parseInt(song.currentTime, 10);
	$("#seek").val(curtime);
	$("#curtime").text(HHMMSS(song.currentTime));
})
song.addEventListener("ended",function(){
	$("#btn_play").removeClass("btn_pause")
	$("#btn_play").addClass("btn_play")
	$("#btn_forword").click()
})
$("#btn_forword").on("click",function(e){
	console.log("btn_forword");
	if(song.readyState){
		if($("#btn_play").hasClass("btn_play")){
			$(this).removeClass("btn_play")
			$(this).addClass("btn_pause")
		}
		switch (repeat_count) {
			case 0:
				if(cur_list[playing_id+1] !== undefined){
					changeSong(song_path,cur_list[playing_id+1]);
					song.currentTime = 0;
					song.play();
				}
				else if(song.paused){
					song.currentTime = 0;
				}
				break;
			case 1:
				changeSong(song_path,cur_list[(playing_id+1)%cur_list.length]);
				console.log("next:"+cur_list[(playing_id+1)%cur_list.length]);
				break;
			case 2:
				changeSong(song_path,cur_list[playing_id]);
				break;
			default:

		}
	}
});
$("#btn_backword").on("click",function(e){
	console.log("btn_backword");
	if(song.readyState){
		if($("#btn_play").hasClass("btn_play")){
			$(this).removeClass("btn_play")
			$(this).addClass("btn_pause")
		}
		t = (playing_id-1)<0?0:(playing_id-1)
		if(cur_list[t] !== undefined && song.currentTime<2){
			changeSong(song_path,cur_list[t]);
		}
		else {
			changeSong(song_path,cur_list[playing_id]);
		}
	}
});
$("#btn_back").hide();
let repeat_count=0;
$("#repeat_count").hide();
$("#btn_repeat").on("click",function(e){
	repeat_count = (repeat_count+1)%3;
	switch (repeat_count) {
		case 0:
			$("#repeat_count").hide(100);
			$("#btn_repeat").removeClass("btn_repeat_light");
			break;
		case 1:
			$("#btn_repeat").addClass("btn_repeat_light");
			break;
		case 2:
			$("#repeat_count").show(100);
			break;
		default:

	}
})
