<template>
  <el-table :data="tableData" class="tb-edit" style="width: 100%">
    <el-table-column v-for="item in tableHead" :key=item.key :label="item.label" :property="item.property"
      :min-width="item.width">
      <template slot-scope="scope">
        <div v-if="item.key == 7">
          <el-button @click="handleClick($event,scope.$index,scope.row)" type="text" size="small">
            编辑</el-button>
        </div>
        <span v-else-if="item.key==5">
          <span v-if="scope.row[content_type_property]==image_type" class="el-icon-picture"
            @click="handleClickMsg($event,scope.$index,scope.row)"></span>
          <span v-else-if="scope.row[content_type_property]==voice_type" class="el-icon-video-play"
            @click="handleClickMsg($event,scope.$index,scope.row)"></span>
          <span v-else>{{scope.row[scope.column.property]}}</span>
        </span>

        <el-input v-model="scope.row[scope.column.property]"
          v-else-if="(scope.row.is_edit && (item.key ==3||item.key==6))"></el-input>
        <span v-else>{{scope.row[scope.column.property]}}</span>
      </template>
    </el-table-column>

  </el-table>
</template>
<script>
  let table_head = [
    { key: 0, label: "id", property: "id", width: "5%" },
    { key: 1, label: "日期", property: "timestamp", width: "15%" },
    { key: 2, label: "微信id", property: "sent_wx_id", width: "15%" },
    { key: 3, label: "所属客户", property: "customer_name", width: "10%" },

    { key: 5, label: "内容", property: "content", width: "15%" },
    { key: 6, label: "状态", property: "status", width: "5%" },
    { key: 7, label: "操作", property: "operate", width: "5%" }
  ];
  export default {
    name: 'MessageMgr',
    data() {

      return {
        image_type: 'image',
        voice_type: 'voice',
        text_type: 'text',
        content_type_property: 'msg_type',
        tableHead: table_head,
        processed_row: -1,
        tableData:
          []
      }
    },

    mounted() {
      this.$axios.get('/message', { timeout: 5000 }).then(res => {
        // console.log(res.data);
        var server_data = res.data;
        server_data.forEach((value) => {
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
            // this.update_row(newval[this.processed_row]);
            this.processed_row = -1;
          }

        },
        deep: true
      }
    },
    methods: {

      handleClick(event, index, row) {
        if (event.target.innerText == "编辑") {

          event.target.innerText = "保存";
          // row.is_edit = true;
        } else {
          this.processed_row = index;
          event.target.innerText = "编辑";

        }
        console.log('index is:' + index)
        row.is_edit = !row.is_edit;
      },
      handleClickMsg(event, index, row) {

        console.log('index is:' + index)

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
          this.$axios.post(`/message`, row)
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