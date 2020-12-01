<template>
  <div>
    <Modal
      :title="modalTitle"
      :closable="true"
      :mask="false"
      :mask-closable="true"
      v-model="currentInfoModel"
      @on-cancel="closeInfoModel"
      :width="width"
      class-name="info-modal"
    >
      <!-- <div slot="header">国土局网络信息</div> -->
      <div class="info-modal-wrap">
        <slot name="container"></slot>
      </div>

      <div slot="footer">
        <slot name="footer"></slot>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentInfoModel: false
    };
  },
  props: {
    width: {
      default: 350
    },
    modalTitle: {
      default: "信息"
    },
    infoModel: {
      default: false
    }
  },
  watch: {
    infoModel(newValue, oldValue) {
      this.currentInfoModel = newValue;
    }
  },
  methods: {
    closeInfoModel(e) {
      this.$emit("closeInfoModel", e);
    }
  }
};
</script>

<style lang="less">
.info-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  ::-webkit-scrollbar {
    /*滚动条整体样式*/

    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/

    height: 1px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/

    border-radius: 10px;

    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

    background: #203e7d;
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/

    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

    border-radius: 10px;

    background: #1f4b88;
  }

  .ivu-modal {
    top: 0;
  }
  .ivu-modal-content {
    background-color: rgba(25, 55, 113, 0.82);
    color: rgba(255, 255, 255, 0.75);
    .ivu-modal-header,
    .ivu-modal-footer {
      // border-color: #202f66;
      border-color: #1a1d3e;
      border-width: 0px;
    }
    // .ivu-modal-close {
    //   display: none;
    // }
  }
  .ivu-btn-small {
    padding: 3px 14px 4px;
    line-height: 1;
  }
  .ivu-modal-header-inner,
  .ivu-modal-header p {
    color: rgba(255, 255, 255, 0.75);
  }
  &-wrap {
    font-size: 14px;
    max-height: 620px;
    overflow: auto;
  }
  &-item {
    width: 100%;
    padding: 3px 0px;
    display: table;
  }
  &-title {
    color: #a6cbff;
    font-weight: 600;
    width: 20%;
    // height: 20px;
    // display: inline-block;
    text-align: right;
    padding: 0px 5px;
    box-sizing: border-box;
    float: left;
  }
  &-cont {
    width: 30%;
    //   height: auto;
    //   display: inline-block;
    float: left;
  }
  &-cont2 {
    width: 80%;
    //   height: auto;
    //   display: inline-block;
    float: left;
  }
  &-cont1 {
    width: 100%;
    font-size: 16px;
    padding-left: 15px;
    color: #a6cbff;
    &:hover {
      cursor: pointer;
      color: #c4dcfd;
    }
  }
}
</style>