<template>
    <div>
        this is the DataMonitor
        <Button type="success" @click="testFun">Success</Button>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    // this.initMap();
    this.init();
  },
  methods: {
    init: function() {
      this.$http.get("/api/map", { params: { id: "testId" } }).then(ret => {
        console.log(ret);
      });
    },
    testFun: function() {
      this.$socket.emit('test', {name: 'test'});
    }
  }
};
</script>
<style>

</style>

