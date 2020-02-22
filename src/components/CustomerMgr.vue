<template>
  <!-- <el-table :data="test_data" style="width: 100%">
    <el-table-column prop="id" label="用户id" width="80">
    </el-table-column>

    <el-table-column prop="wxid" label="微信id" width="100">
    </el-table-column>
    <el-table-column prop="avatar" label="头像" width="180">

      <template slot-scope="scope">
        <el-input v-model="scope.row.avatar" type="string" v-if="scope.row.is_edit"></el-input>
        <span v-else>{{scope.row.avatar}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="customer_name" label="客户名称" width="180">
      <template slot-scope="scope">
        <el-input v-model="scope.row.customer_name" type="string" v-if="scope.row.is_edit"></el-input>
        <span v-else>{{scope.row.customer_name}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="电话" width="100">
      <template slot-scope="scope">
        <el-input v-model="scope.row.phone" type="string" v-if="scope.row.is_edit"></el-input>
        <span v-else>{{scope.row.phone}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="地址" width="200">
      <template slot-scope="scope">
        <el-input v-model="scope.row.address" type="string" v-if="scope.row.is_edit"></el-input>
        <span v-else>{{scope.row.address}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick($event,scope.$index,scope.row)" type="text" size="small">
          {{scope.row.is_edit? "新增":"编辑"}}</el-button>
        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)"
          v-if="scope.row.is_real">删除</el-button>
      </template>
    </el-table-column>
    <div slot="append" style="text-align: center">
      <el-input value="id" disabled width="80"></el-input>
    </div>
  </el-table> -->
  <el-table :data="test_data" class="tb-edit" style="width: 100%">
    <el-table-column v-for="item in tableHead" :key=item.key :label="item.label" :property="item.property"
      :min-width="item.width">

      <template slot-scope="scope">
        <div v-if="item.key == 6">
          <el-button @click="handleClick($event,scope.$index,scope.row)" type="text" size="small">
            {{scope.row.is_edit? "新增":"编辑"}}</el-button>
          <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)"
            v-if="scope.row.is_real">删除</el-button>

        </div>
        <el-input v-model="scope.row[scope.column.property]" v-else-if="scope.row.is_edit"></el-input>
        <span v-else>{{scope.row[scope.column.property]}}</span>
      </template>
    </el-table-column>

  </el-table>
</template>
<script>
  let table_head = [
    { key: 0, label: "用户id", property: "id", width: "5%" },
    { key: 1, label: "微信id", property: "wxid", width: "15%" },
    { key: 2, label: "头像", property: "avatar", width: "20%" },
    { key: 3, label: "名称", property: "customer_name", width: "15%" },
    { key: 4, label: "电话", property: "phone", width: "10%" },
    { key: 5, label: "地址", property: "address", width: "25%" },
    { key: 6, label: "按钮", property: "buttons", width: "10%" },
  ];
  export default {
    name: 'CustomerMgr',
    data() {

      return {
        tableHead: table_head,
        tableData:
          [{ id: "001", wxid: 0xefafafa, avatar: "头像", customer_name: "老王", phone: 1345675432, address: "上城区水产城", is_edit: false, is_real: true }]
      }
    },
    computed: {
      test_data: function () {
        return this.tableData.concat([{ id: "000", wxid: 0xefafafa, avatar: "", customer_name: "", phone: "", address: "", is_edit: true, is_real: false }]);
      }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleClick(event, index, row) {
        if (event.target.innerText == "编辑") {
          event.target.innerText = "保存";
        } else if (event.target.innerText == "新增") {
          row.is_real = true;
          this.tableData.push(row);
        } else {
          event.target.innerText = "编辑";
          this.tableData[index] = row;
        }
        console.log('index is:' + index)
        row.is_edit = !row.is_edit;
        // console.log(row);
        console.log(event);
        // console.log('updated dataTable is:' + this.tableData[index])
        // console.log(parseInt('123x321'))
      }
    }
  }
</script>