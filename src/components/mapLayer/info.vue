<template>
  <div class="info">
    <div class="info-title">疫情实时大数据报告</div>
    <div class="info-title-desc">数据更新至{{info.overseaLastUpdateTime}}</div>
    <Tabs value="name1">
      <TabPane label="国内疫情" name="name1">
        <div class="wrap">
          <div class="cont">
            <div class="cont-item">
              <div class="cont-item-num">{{chinaTotal.total.confirm}}</div>
              <div class="cont-item-title">累计确诊</div>
              <div class="cont-item-desc">
                较昨日
                <span
                  class="cont-item-desc-num"
                >{{chinaTotal.today.confirm > -1 ? '+' : ''}}{{chinaTotal.today.confirm}}</span>
              </div>
            </div>
            <div class="cont-item">
              <div
                class="cont-item-num now"
              >{{chinaTotal.total.confirm - chinaTotal.total.heal - chinaTotal.total.dead}}</div>
              <div class="cont-item-title">现有确诊</div>
              <div class="cont-item-desc">
                较昨日
                <span
                  class="cont-item-desc-num now"
                >{{chinaTotal.today.storeConfirm > -1 ? '+' : ''}}{{chinaTotal.today.storeConfirm}}</span>
              </div>
            </div>
            <div class="cont-item">
              <div class="cont-item-num input">{{chinaTotal.total.input}}</div>
              <div class="cont-item-title">境外输入</div>
              <div class="cont-item-desc">
                较昨日
                <span
                  class="cont-item-desc-num input"
                >{{chinaTotal.today.input > -1 ? '+' : ''}}{{chinaTotal.today.input}}</span>
              </div>
            </div>
          </div>

          <div class="cont">
            <div class="cont-item">
              <div class="cont-item-num heal">{{chinaTotal.total.heal}}</div>
              <div class="cont-item-title">累计治愈</div>
              <div class="cont-item-desc">
                较昨日
                <span
                  class="cont-item-desc-num heal"
                >{{chinaTotal.today.heal > -1 ? '+' : ''}}{{chinaTotal.today.heal}}</span>
              </div>
            </div>
            <div class="cont-item">
              <div class="cont-item-num dead">{{chinaTotal.total.dead}}</div>
              <div class="cont-item-title">累计死亡</div>
              <div class="cont-item-desc">
                较昨日
                <span
                  class="cont-item-desc-num dead"
                >{{chinaTotal.today.dead > -1 ? '+' : ''}}{{chinaTotal.today.dead}}</span>
              </div>
            </div>
            <div class="cont-item">
              <div class="cont-item-num ext">{{chinaTotal.extData.noSymptom}}</div>
              <div class="cont-item-title">无症状</div>
              <div class="cont-item-desc">
                较昨日
                <span
                  class="cont-item-desc-num ext"
                >{{chinaTotal.extData.incrNoSymptom > -1 ? '+' : ''}}{{chinaTotal.extData.incrNoSymptom}}</span>
              </div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane label="全球疫情" name="name2">
        <div class="wrap">
          <div class="cont">
            <div class="cont-item">
              <div class="cont-item-num now">{{worldData.confirm - worldData.heal - worldData.dead}}</div>
              <div class="cont-item-title">现有确诊</div>
              <div class="cont-item-desc">
                较昨日
                <span
                  class="cont-item-desc-num now"
                >{{(worldData.todayConfirm - worldData.todayDead - worldData.todayHeal) > -1 ? '+' : ''}}{{worldData.todayConfirm - worldData.todayDead - worldData.todayHeal}}</span>
              </div>
            </div>
            <div class="cont-item">
              <div class="cont-item-num">{{worldData.confirm}}</div>
              <div class="cont-item-title">累计确诊</div>
              <div class="cont-item-desc">
                较昨日
                <span
                  class="cont-item-desc-num"
                >{{worldData.todayConfirm > -1 ? '+' : ''}}{{worldData.todayConfirm}}</span>
              </div>
            </div>
            <div class="cont-item">
              <div class="cont-item-num heal">{{worldData.heal}}</div>
              <div class="cont-item-title">累计治愈</div>
              <div class="cont-item-desc">
                较昨日
                <span
                  class="cont-item-desc-num heal"
                >{{worldData.todayHeal > -1 ? '+' : ''}}{{worldData.todayHeal}}</span>
              </div>
            </div>
            <div class="cont-item">
              <div class="cont-item-num dead">{{worldData.dead}}</div>
              <div class="cont-item-title">累计死亡</div>
              <div class="cont-item-desc">
                较昨日
                <span
                  class="cont-item-desc-num dead"
                >{{worldData.todayDead > -1 ? '+' : ''}}{{worldData.todayDead}}</span>
              </div>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getInfoList } from "@/api/map";
export default {
  data() {
    return {
      info: {},
      list: [],
      worldData: {},
      chinaTotal: {
        total: {},
        today: {},
        extData: {}
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      // let res = await this.$http.get("https://c.m.163.com/ug/api/wuhan/app/data/list-total");
      let { data } = await getInfoList();
      console.log(data)
      this.info = data.data
      let { chinaTotal } = this.info;
      this.chinaTotal = chinaTotal;
      this.formatData()
    },
    formatData() {
      let { areaTree } = this.info;
      let confirm = 0;
      let dead = 0;
      let heal = 0;

      let todayConfirm = 0;
      let todayDead = 0;
      let todayHeal = 0;
      areaTree.forEach(item => {
        confirm += item.total.confirm
        dead += item.total.dead
        heal += item.total.heal
        todayConfirm += item.today.confirm
        todayDead += item.today.dead
        todayHeal += item.today.heal

      });
      this.worldData = {
        confirm,
        dead,
        heal,
        todayConfirm,
        todayDead,
        todayHeal
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.info {
  position: fixed;
  width: 500px;
  left: 30px;
  top: 20px;
  background-color: rgba(3, 64, 130, 0.698);
  color: #ffffff;
  padding: 25px 35px;
  border-radius: 5px;
  &-title {
    font-size: 28px;
    line-height: 32px;
    padding-bottom: 20px;
    &-desc {
      font-size: 14px;
      color: #9e9e9e;
      text-align: left;
    }
  }
  .cont {
    color: #ffffff;
    display: flex;
    &-item {
      flex: 33%;
      padding: 15px;
      &-num {
        color: #e91e63;
        font-size: 26px;
      }
      &-title {
        font-size: 18px;
        color: #ffffff;
      }
      &-desc {
        color: #adadad;
        font-size: 16px;
        &-num {
          color: #e91e63;
        }
      }
      .now {
        color: #ff5722;
      }
      .input {
        color: #f90;
      }
      .heal {
        color: #19be6b;
      }
      .dead {
        color: #a2a2a2;
        // text-decoration: line-through;
      }
      .ext {
        color: #00bcd4;
      }
    }
  }
}
</style>

<style lang="scss">
.info {
  .ivu-tabs-nav .ivu-tabs-tab {
    color: #aaaaaa;
  }
  .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #ffffff;
  }
  .ivu-tabs-ink-bar {
    background-color: #ffffff;
  }
}
</style>