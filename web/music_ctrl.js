// $("#btn_play")
// $("#btn_forword")
// $("#btn_backword")


var song = new Audio();

var cur_path = "/";
var root_path = "mnt/"
function setCtrl(element){
	element.on("click",function(e){
		console.log("click");
		if($(this).hasClass("dir")){
			cur_path+=element.text()+"/";
			updateList();
			console.log("clk_dir");
			console.log(cur_path);
		}
		else if ($(this).hasClass("dir_back")) {
			cur_path = cur_path.slice(0,-1);

			console.log(cur_path);
			cur_path = cur_path.slice(0,cur_path.lastIndexOf("/")+1);
			console.log(cur_path);
			updateList();
			console.log("clk_dir_back");
			console.log(cur_path);
		}
		else{
			$(".playing").addClass("file");
			$(".file").removeClass("playing");
			$(this).removeClass("file")
			$(this).addClass("playing");
			console.log("clk_file");
			console.log(cur_path+$(this).text());
			song.src = root_path+cur_path+$(this).text();
			song.play();
		}
	})
}
