<template>
    <div style="background-color:#283443;height: 100%">
        <el-menu
                :default-active="$route.path"
                background-color="#283443"
                text-color="#eee"
                active-text-color="#ffd04b"
                router>
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/myanimelist">MyAnimeList</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        data(){
            return {

            }
        }
    }
</script>