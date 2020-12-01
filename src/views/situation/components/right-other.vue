<template>
  <div class="right-other">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        v-for="(item,index) in allOrgList"
        :key="index"
        :title="item.orgName"
        :name="item.orgId"
      >
        <div
          class="org-item"
          v-for="(children, _index) in item.orgStatisticsVoList"
          :key="_index"
          @click="showInfo(children)"
        >{{children.orgName}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "rightOther",
  props: {
    allOrgList: {
      type: Array,
      default: []
    },
    nowOrgId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      activeName: "1"
    };
  },
  watch: {
    nowOrgId(newValue, oldValue) {
      this.initList();
    }
  },
  mounted() {
    this.initList();
  },
  methods: {
    showInfo(item) {
      this.$emit("showInfo", item);
    },
    initList() {
      if (this.nowOrgId) {
        this.activeName = this.nowOrgId;
      } else {
        if (this.allOrgList && this.allOrgList.length > 0) {
          this.activeName = this.allOrgList[0].orgId;
        }
      }
    }
  }
};
</script>

<style lang="scss" >
::-webkit-scrollbar {
  /*滚动条整体样式*/

  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/

  height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 5px;

  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  border-radius: 5px;

  background: rgba(0, 0, 0, 0.2);
}
.right-other {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 5px;
  background-color: transparent;
  .org-item {
    width: 100%;
    padding: 10px 0px;
    color: #96afda;
    &:hover {
      cursor: pointer;
      color: #94a7c7;
    }
  }
  .el-collapse {
    border-width: 0;
    .el-collapse-item__header {
      background-color: transparent;
      color: #88c2f7;
      border-color: #1b265b;
    }
    .el-collapse-item__wrap {
      background-color: transparent;
      color: #88c2f7;
      border-color: #1b265b;
    }
  }
}
</style>