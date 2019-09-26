<template>
    <el-container>
        <el-header>

            <el-input placeholder="请输入内容" v-model="search_text" class="input-with-select"
                      style="margin-top: 15px;width: 600px">
                <el-select v-model="search_name" slot="prepend" placeholder="请选择" style="width:100px">
                    <el-option
                            v-for="item in search_name_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" v-on:click="doSearch()"></el-button>
            </el-input>

        </el-header>
        <el-main>
            <el-table :data="tableData" border style="width: 100%" max-height="700">
                <el-table-column align="center" header-align="center"
                        prop="anime_id"
                        label="MAL-ID"
                        width="100">
                </el-table-column>
                <el-table-column align="center" header-align="center"
                        label="英文名"
                        width="400">
                    <template slot-scope="scope">
                        <div v-html="scope.row.en_name"></div>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center"
                        label="日文名"
                        width="400">
                    <template slot-scope="scope">
                        <div v-html="scope.row.jp_name"></div>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center"
                        label="图片"
                        width="100">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 50px; height: 50px"
                                :src="scope.row.pic"
                                fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center"
                        prop="anime_type"
                        label="播出类型"
                        width="100">
                </el-table-column>
                <el-table-column align="center" header-align="center"
                        prop="episodes"
                        label="集数"
                        width="100">
                </el-table-column>
                <el-table-column align="center" header-align="center"
                        prop="premiered"
                        label="播出时间"
                        width="250">
                </el-table-column>
                <el-table-column align="center" header-align="center"
                        label="制片方"
                        width="400">
                    <template slot-scope="scope">
                        <div v-html="scope.row.producers"></div>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center"
                        label="工作室"
                        width="400">
                    <template slot-scope="scope">
                        <div v-html="scope.row.studios"></div>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center"
                        prop="source"
                        label="原作类型"
                        width="100">
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    import {search} from "@/api/mal-anime";
    export default {
        data() {
            return {
                search_text: '',
                search_name_options: [{
                    value: 'animeId',
                    label: 'MAL-ID'
                }, {
                    value: 'enName',
                    label: '英文名'
                }, {
                    value: 'jpName',
                    label: '日文名'
                }, {
                    value: 'producers',
                    label: '制片方'
                }, {
                    value: 'studios',
                    label: '工作室'
                }],
                search_name: 'jpName',
                tableData: []
            }
        },
        methods:{
            doSearch(){
                let name = this.search_name;
                let text = this.search_text.trim();
                if (name==""||text=="") {
                    this.$message.error("请设置搜索条件");
                    return;
                }
                search({name:name,text:text})
                    .then((response) => {
                        this.tableData = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>