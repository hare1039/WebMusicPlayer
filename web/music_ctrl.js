// $("#btn_play")
// $("#btn_forword")
// $("#btn_backword")
var song = new Audio();

var cur_path = "";

$(".item").click(function(e){
	if($(this).hasClass("dir")){
		cur_path+=$(this).text()+"/";
		updateList();
	}
	else if ($(this).hasClass("dir_back")) {
		cur_path = cur_path.slice(0,cur_path.lastIndexOf("/")+1);
	}
	else{
		song.src = cur_path+$(this).text();
		song.play();
	}
});
