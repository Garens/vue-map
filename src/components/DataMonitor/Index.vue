<template>
  <div class="data-monitor">
    <dataCenter></dataCenter>
  </div>
</template>
<script>
import dataCenter from "@/views/situation/index"
export default {
  data() {
    return {
      // testData: 'this is defualt.'
    };
  },
  components: { dataCenter },
  computed: {
    testData() {
      return this.$store.state.realData.message;
    }
  },
  mounted() {
    // this.initMap();
    this.init();
    console.log(123)
  },
  methods: {
    init: function () {
      this.$http.get("/api/map", { params: { id: "testId" } }).then(ret => {
        console.log(ret);
      });
    },
    testFun: function () {
      this.$socket.emit('test', { name: 'test' });
      console.log(1111111, this.$store.state.realData.message)
    }
  }
};
</script>
<style scope>
.data-monitor {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

