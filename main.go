package main

import(
	//"html/template"
	"log"
	"io/ioutil"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	// "encoding/json"
	"strconv"
)
var root = "./web/mnt"
func main(){
	router := gin.Default()
	router.GET("/ws/MusicPlayer", func(c *gin.Context){
		wshandler(c.Writer, c.Request)})
	router.Static("/MusicPlayer/", "./web")
	router.Run(":8023")
	log.Println("Serveing on 8023")
}
var upgrader =websocket.Upgrader{}
func wshandler(w http.ResponseWriter, r *http.Request){
	conn, err := upgrader.Upgrade(w, r, nil)
	//defer conn.Close()
	if err != nil{
		log.Println("Failed to set websocket upgrade: %+v", err)
		return
	}
	var msg map[string]interface{}
	for{
		err = conn.ReadJSON(&msg)
		if err != nil{
			log.Println("Failed to read json", err)
			return
		}
		log.Println(msg["Action"].(string))
		switch msg["Action"].(string){
		case "list":
			log.Println("Got list")
			msg_out := UpdateList{
				"list",
			}
			log.Println(msg_out);
			conn.WriteJSON(msg_out)
			files, err := ioutil.ReadDir(root+msg["Path"].(string))
			log.Println(root+msg["Path"].(string));
			if err != nil{
				log.Fatal(err)
			}
			for _,f:=range files{
				msg_out := Item{
					"item",
					f.Name(),
					strconv.FormatBool(f.IsDir()),
				}
				conn.WriteJSON(msg_out)
			}
		}
	}

}
type UpdateList struct{
	Action string
}
type Item struct{
	Action string//joystick
	Name string
	IsDir string
}
