let socket = new WebSocket("ws://localhost:8024/ws/MusicPlayer");
socket.onmessage = onMessage;


function onMessage(event) {
    let input = JSON.parse(event.data);
    //console.log(event);
    //console.log(input);
    if(input.Action === "list"){
        $("#container").empty();
        on_msg = false;
        //console.log("Got list");
        if(cur_path.length!=1){
            let file = $("<div>").text("back");
            file.addClass("item dir_back");
            setCtrl(file);
            $("#container").append(file);
        }
    }
    else if (input.Action === "item") {
        let file = $("<div>").text(input.Name);
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
    else if (input.Action === "end") {
        lightPlaying();
    }
}

function updateList() {
    on_msg = true;
    let listAction = {
        Action: "list",
        Path: cur_path.join("")
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
