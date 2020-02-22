<template>
  <el-row class="tac">
   <el-col :span="24">
    <h5>开单管理</h5>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      router
      @open="handleOpen"
      @close="handleClose">
        <el-menu-item index="1" >
            <i class="el-icon-document"></i>
            <span slot="title">客户管理</span>
        </el-menu-item>

        <el-menu-item index="2" >
            <i class="el-icon-document"></i>
            <span slot="title">商品管理</span>
        </el-menu-item>

        <el-menu-item index="3" >
            <i class="el-icon-document"></i>
            <span slot="title">消息管理</span>
        </el-menu-item>

        <el-submenu index="4">
        <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">订单管理</span>
        </template>
          <el-menu-item index="4-1">客户A</el-menu-item>
          <el-menu-item index="4-2">客户B</el-menu-item>
        </el-submenu>
       
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">历史订单</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

    </el-menu>
  </el-col>
  </el-row>
</template>

<script>
  export default {
    'name':'NavMenu',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key+'open', keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key+'close', keyPath)
      }
    }
  }
</script>