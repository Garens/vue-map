<template>
    <div>
        <p>{{testData}}</p>
        <Button type="success" @click="testFun">Success</Button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // testData: 'this is defualt.'
    };
  },
  components: {},
  computed: {
    testData () {
      return this.$store.state.realData.message;
    }
  },
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
      console.log(1111111, this.$store.state.realData.message)
    }
  }
};
</script>
<style>

</style>

