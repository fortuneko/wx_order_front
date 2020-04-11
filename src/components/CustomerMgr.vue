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
        <el-input v-model="scope.row[scope.column.property]" v-else-if="(scope.row.is_edit && item.key !=0)"></el-input>
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
    { key: 3, label: "名称", property: "name", width: "15%" },
    { key: 4, label: "电话", property: "phone", width: "10%" },
    { key: 5, label: "地址", property: "address", width: "25%" },
    { key: 6, label: "按钮", property: "buttons", width: "10%" },
  ];
  export default {
    name: 'CustomerMgr',
    data() {

      return {
        tableHead: table_head,
        processed_row: -1,
        tableData:
          [{ id: "001", wxid: 0xefafafa, avatar: "头像", name: "老王", phone: 1345675432, address: "上城区水产城", is_edit: false, is_real: true }]
      }
    },
    computed: {
      test_data: function () {
        return this.tableData.concat([{ id: "", wxid: 0xefafafa, avatar: "", name: "", phone: "", address: "", is_edit: true, is_real: false }]);
      }
    },
    mounted() {
      this.$axios.get('/customer', { timeout: 5000 }).then(res => {
        // console.log(res.data);
        var server_data = res.data;
        server_data.forEach((value) => {
          value.is_real = true;
          value.is_edit = false;
        })
        this.tableData = server_data;
        console.log(res.data);
      }).catch(err => {
      });

    },
    watch: {
      tableData: {
        handler(newval, oldval) {
          if (this.processed_row != -1) {
            this.update_row(newval[this.processed_row]);
            this.processed_row = -1;
          }

        },
        deep: true
      }
    },
    methods: {
      deleteRow(index, rows) {
        this.$axios.post(`/customer/delete`, rows[index])
          .then(res => {
            console.log('post res=>', res);
          })
        rows.splice(index, 1);
      },
      handleClick(event, index, row) {
        if (event.target.innerText == "编辑") {

          event.target.innerText = "保存";
          // row.is_edit = true;
        } else if (event.target.innerText == "新增") {
          row.is_real = true;
          this.tableData.push(row);
          this.processed_row = index;
        } else {
          this.processed_row = index;
          event.target.innerText = "编辑";

        }
        console.log('index is:' + index)
        row.is_edit = !row.is_edit;
      },
      update_row(row) {
        var is_changed = false;
        var BreakException = {};
        console.log('last row is:');
        console.log(this.processed_row);
        console.log('current row is:');
        console.log(row);
        try {
          this.tableHead.forEach((value) => {
            if (row[value.property] != this.processed_row[value.property]) {
              is_changed = true;
              console.log('data has been changed');
              throw BreakException;
            }
          })
        } catch (e) {
          if (e !== BreakException) throw e;
        }
        if (is_changed) {
          this.$axios.post(`/customer`, row)
            .then(res => {
              console.log('post res=>', res);
            })
        } else {
          console.log('data not changed');
        }

      }
    }
  }
</script>