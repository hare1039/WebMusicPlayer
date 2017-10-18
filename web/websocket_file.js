var socket = new WebSocket("ws://pinkiebala.nctu.me:8023/ws/MusicPlayer");
socket.onmessage = onMessage;


function onMessage(event) {
    var input = JSON.parse(event.data);
    //console.log(event);
    //console.log(input);
    if(input.Action === "list"){
        $("#container").empty();
        //console.log("Got list");
        if(cur_path!=="/"){
            var file = $("<div>").text("back");
            file.addClass("item dir_back");
            setCtrl(file);
            $("#container").append(file);
        }
    }
    else if (input.Action === "item") {
        var file = $("<div>").text(input.Name);
        //var file = "<div>"+input.Name+"</div>"
        if (input.IsDir === "false") {
            file.addClass("item file")
        }
        else{
            file.addClass("item dir")
            file.attr("id",input.Name)
        }
        setCtrl(file);
        $("#container").append(file);
    }
}

function updateList() {
    var listAction = {
        Action: "list",
        Path: cur_path
    };
    socket.send(JSON.stringify(listAction));
    console.log("updateList");
    console.log(listAction);
}
/*window.setTimeout(
    updateList()
,5000);*/
socket.onopen =function(e){
    updateList();
}
