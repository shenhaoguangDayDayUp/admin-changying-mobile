<template>
    <v-flex xs12 sm5 md3>
            <v-menu ref="start" :close-on-content-click="false"
                v-model="menu" :nudge-right="40" :return-value.sync="queryParams.start"
                lazy transition="scale-transition" offset-y full-width min-width="290px" >
                <v-text-field slot="activator" v-model="queryParams.start" label="开始时间"  readonly  ></v-text-field>
                <v-date-picker :max='startMax'  locale='zh-Hans' v-model="queryParams.start" no-title scrollable >
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">取消</v-btn>
                <v-btn flat color="primary" @click="$refs.start.save(queryParams.start)">确定</v-btn>
                </v-date-picker>
            </v-menu>
        </v-flex>
</template>
<script>
export default {
    props:{
        
    }
}
</script>
