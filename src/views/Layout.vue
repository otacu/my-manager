<template>
    <el-container :style="height">
        <el-aside>
            <sidebar></sidebar>
        </el-aside>
        <el-container>
            <el-header>
                <div class="right-menu">
                    <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                        <div class="avatar-wrapper">
                            <img  class="user-avatar">
                            <i class="el-icon-caret-bottom" />
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided>
                                <span style="display:block;" @click="logout">Log Out</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main style="padding: 0px">

                <el-tabs
                        v-model="activeIndex"
                        type="border-card"
                        closable
                        v-if="openTab.length"
                        @tab-click='tabClick'
                        @tab-remove='tabRemove'
                >
                    <el-tab-pane
                            :key="item.name"
                            v-for="(item, index) in openTab"
                            :label="item.name"
                            :name="item.route"
                    >
                    </el-tab-pane>
                </el-tabs>

                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Sidebar from "../components/Sidebar/index";
    import {mapState} from 'vuex';
    export default {
        name: "Layout",
        components: {Sidebar},
        data(){
            return {
                height: {
                    height: window.innerHeight + 'px'
                }
            }
        },
        methods: {
            async logout() {
                await this.$store.dispatch('logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            },
            //tab标签点击时，切换相应的路由
            tabClick(tab){
                this.$router.push({path: tab.name});
            },
            //移除tab标签
            tabRemove(targetName){
                if (targetName == '/home') {
                    return
                }
                this.$store.dispatch('delete_tab', targetName);
                if (this.activeIndex === targetName) {
                    // 设置当前激活的路由
                    if (this.openTab && this.openTab.length >= 1) {
                        this.$store.dispatch('set_active_index', this.openTab[this.openTab.length - 1].route);
                        this.$router.push({path: this.activeIndex});
                    } else {
                        this.$router.push({path: '/home'});
                    }
                }
            }

        },
        mounted() {
            // 初始化tab页
            this.$store.dispatch('reset_tabs')
            if (this.$route.path !== '/' && this.$route.path !== '/home') {
                this.$store.dispatch('add_tab', {route: '/home', name: '首页'});
                this.$store.dispatch('add_tab', {route: this.$route.path, name: this.$route.name});
                this.$store.dispatch('set_active_index', this.$route.path);
            } else {
                this.$store.dispatch('add_tab', {route: '/home', name: '首页'});
                this.$store.dispatch('set_active_index', '/home');
                this.$router.push('/home');
            }
        },
        computed: {
            ...mapState([
                'openTab'
            ]),
            activeIndex: {
                get () {
                    return this.$store.state.activeIndex;
                },
                set (val) {
                    this.$store.dispatch('set_active_index', val);
                }
            }
        },
        watch: {
            '$route'(to, from){
                //判断路由是否已经打开
                //已经打开的 ，将其置为active
                //未打开的，将其放入队列里
                let flag = false;
                for (let tab of this.openTab) {
                    if (tab.name === to.name) {
                        this.$store.dispatch('set_active_index', to.path)
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    this.$store.dispatch('add_tab', {route: to.path, name: to.name});
                    this.$store.dispatch('set_active_index', to.path);
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background .3s;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
</style>