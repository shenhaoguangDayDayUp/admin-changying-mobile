<template>
    <div>
        <v-flex xs12 sm5 md3>
            <v-menu ref="start" :close-on-content-click="false" v-model="menu"
                :nudge-right="40" :return-value.sync="queryParams.start" lazy
                transition="scale-transition" offset-y full-width min-width="290px" >
                <v-text-field slot="activator" v-model="queryParams.start" label="开始时间" readonly ></v-text-field>
                <v-date-picker :max='startMax'  locale='zh-Hans' v-model="queryParams.start" no-title scrollable >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">取消</v-btn>
                    <v-btn flat color="primary" @click="$refs.start.save(queryParams.start)">确定</v-btn>
                </v-date-picker>
            </v-menu>
        </v-flex>
        <v-flex xs12 sm5 md3>
            <v-menu ref="end" :close-on-content-click="false" v-model="menus"
                :nudge-right="40" :return-value.sync="queryParams.end" lazy
                transition="scale-transition" offset-y full-width min-width="290px" >
                <v-text-field slot="activator"  v-model="queryParams.end" label="结束时间" readonly ></v-text-field>
                <v-date-picker :min='startMin' :max='max'    locale='zh-Hans' v-model="queryParams.end" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menus = false">取消</v-btn>
                    <v-btn flat color="primary" @click="$refs.end.save(queryParams.end)">确定</v-btn>
                </v-date-picker>
            </v-menu>
        </v-flex>
    </div>
</template>
<script>
import { mixin } from "@/mixins/search";
export default {
    mixins: [mixin],
    data(){
        return{
            menu:false,
            menus:false,
        }
    },
    mounted(){
        console.log(888)
        console.log(this.$route)
    },
    props:{
    }
}
</script>
