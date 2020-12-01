<style>
.table-cont {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
}
.table-cont .ivu-table th,
.table-cont .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
.table-cont .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
  background-color: #171e3a;
}
.table-cont .ivu-table-stripe .ivu-table-body tr.ivu-table-row-hover td,
.table-cont .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-hover td,
.table-cont tr.ivu-table-row-hover td {
  background-color: #1a1a35;
  cursor: pointer;
}
.table-cont .ivu-table td,
.table-cont .ivu-table th {
  border-bottom-width: 0px;
}
.table-cont .ivu-table-wrapper {
  border-width: 0px;
}
.table-cont .ivu-table {
  color: #c1d5ec;
  background-color: #131430;
}
.table-cont .ivu-table td {
  background-color: #131430;
}
.table-cont .ivu-table:after,
.table-cont .ivu-table:before {
  background-color: #131430;
}
</style>

<template>
  <div class="table-cont" id="tableCont">
    <Table
      stripe
      :height="tableHeight"
      :columns="columns1"
      :data="systemMsgList"
      @on-row-dblclick="dblClickRow"
    >
      <template slot-scope="{ row }" slot="createTime">
        <strong>{{ formatTime(row.createTime) }}</strong>
      </template>
    </Table>
    <show-model :infoModel="infoModel">
      <div slot="container">
        <div v-if="showDetail.messageTitle" class="info-modal-wrap">
          <!-- <div v-for="(value, key) in showDetail" :key="key" class="info-modal-item">
            <span class="info-modal-title">
              {{key}}:
            </span>
            <span class="info-modal-cont">{{value}}</span>
          </div>-->
          <div class="info-modal-item">
            <span class="info-modal-title">消息来源:</span>
            <span class="info-modal-cont">{{showDetail.messageTitle}}</span>
          </div>
          <div class="info-modal-item">
            <span class="info-modal-title">消息内容:</span>
            <span class="info-modal-cont">{{showDetail.content}}</span>
          </div>
          <div class="info-modal-item">
            <span class="info-modal-title">时间:</span>
            <span class="info-modal-cont">{{formatTime(showDetail.createTime)}}</span>
          </div>
        </div>
        <div v-else>暂无信息</div>
      </div>
      <div slot="footer">
        <Button type="info" size="small" @click="closeInfoModel">关闭</Button>
      </div>
    </show-model>
  </div>
</template>

<script>
import showModel from "./common/showModel";
import { formatTime } from "@/utils/index";
export default {
  data() {
    return {
      tableHeight: 300,
      infoModel: false,
      formatTime: formatTime,
      columns1: [
        {
          title: "消息来源",
          key: "messageTitle"
        },
        {
          title: "消息内容",
          key: "content"
        },
        {
          title: "时间",
          slot: "createTime"
        }
      ],
      dataList: [],
      tableHeight: 0,
      showDetail: {}
    };
  },
  props: {
    systemMsgList: {
      type: Array,
      default: []
    }
  },
  watch: {
    systemMsgList(newValue, oldValue) {}
  },
  components: {
    showModel
  },
  mounted() {
    this.initTableHeight();
    this.getData();
  },
  methods: {
    //关闭对话框
    closeInfoModel() {
      this.showDetail = {};
      this.infoModel = false;
    },
    //双击表格行
    dblClickRow(row) {
      this.showDetail = { ...row };
      this.infoModel = true;
    },
    initTableHeight() {
      const dom = document.getElementById("tableCont");
      this.tableHeight = dom.offsetHeight - 20;
    },
    async getData() {
      this.dataList = [
        {
          type: "数据库审计",
          ip: "9.77.249.136",
          ip1: "9.77.249.136",
          content: "SHOW FULL TABLES ",
          time: "2018-12-29 04：15：25"
        },
        {
          type: "数据库审计",
          ip: "9.77.249.136",
          ip1: "9.77.249.136",
          content: "SHOW FULL TABLES ",
          time: "2018-12-29 04：15：25"
        },
        {
          type: "数据库审计",
          ip: "9.77.249.136",
          ip1: "9.77.249.136",
          content: "SHOW FULL TABLES ",
          time: "2018-12-29 04：15：25"
        },
        {
          type: "数据库审计",
          ip: "9.77.249.136",
          ip1: "9.77.249.136",
          content: "SHOW FULL TABLES ",
          time: "2018-12-29 04：15：25"
        },
        {
          type: "数据库审计",
          ip: "9.77.249.136",
          ip1: "9.77.249.136",
          content: "SHOW FULL TABLES ",
          time: "2018-12-29 04：15：25"
        }
      ];
    }
  }
};
</script>

