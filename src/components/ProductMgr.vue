<template>
  <el-table :data="test_data" class="tb-edit" style="width: 100%">
    <el-table-column v-for="item in tableHead" :key=item.key :label="item.label" :property="item.property"
      :min-width="item.width">

      <template slot-scope="scope">
        <div v-if="item.key == 5">
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
    { key: 0, label: "产品id", property: "id", width: "5%" },
    { key: 1, label: "名称", property: "name", width: "15%" },
    { key: 2, label: "规格", property: "spec", width: "10%" },
    { key: 3, label: "价格", property: "price", width: "15%" },
    { key: 4, label: "备注", property: "comment", width: "15%" },
    { key: 5, label: "操作", property: "buttons", width: "15%" }
  ];
  export default {
    name: 'ProductMgr',
    data() {

      return {
        tableHead: table_head,
        processed_row: -1,
        tableData:
          []
      }
    },
    computed: {
      test_data: function () {
        return this.tableData.concat([{ id: "", name: "", spec: "", price: "", comment: "", is_edit: true, is_real: false }]);
      }
    },
    mounted() {
      this.$axios.get('/product', { timeout: 5000 }).then(res => {
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
        this.$axios.post(`/product/delete`, rows[index])
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
          this.$axios.post(`/product`, row)
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