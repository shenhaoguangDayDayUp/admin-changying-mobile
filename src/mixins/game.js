import {gameListDropdownApi} from '@/api/api'
import { common } from "@/logic";
export var game = {
    created () {

    },
    mounted () {
      this.getGame()
    },
    data(){
        return{
            gameList:[]
        }
    },
    methods: {
        
      async getGame(){
        var token = {
            headers: {
              "x-auth-token": common.getCommon()
            }
          };
      var {data} =  await   gameListDropdownApi.query({},token)
                
              this.gameList = data
              this.gameList.unshift({code:0,name:'全部'});
        }
    }

}