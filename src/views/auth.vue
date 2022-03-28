<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";
import { patLogin, patList } from "../api/api";
import { Dialog } from "vant";
export default {
  data() {
    return {
      onLineProject: {},
      openid: "",
      pat_list: [],
    };
  },
  methods: {
    async init() {
      this.openid = this.$route.params.openid;
      window.localStorage.setItem("openid", this.openid);
      let agt_params = this.$route.params.agt_params;
      let params = { username: this.openid, password: this.openid };
      let pat_params = { openid: this.openid };
      await patLogin(params).then((res) => {
        window.localStorage.setItem("token", res.headers.authorization);
      });
      await patList(pat_params).then((res) => {
        this.pat_list = res.data.data;
        this.$store.dispatch("setPatList", this.pat_list);
        if (this.pat_list.length == 1) {
          this.$store.dispatch("setPatObject", this.pat_list[0]);
        }
      });
      if (agt_params == "SCANQRCODE") {
        this.$router.push({ path: `/scan-qrcode` });
      } else {
        //设置下标，标记对应的跳转位置
        //H医院id跳首页
        //O跳待缴费界面
        //R跳lis界面
        let id_arr = agt_params.split("_"); 
        let id_type = id_arr[0];
        let id = id_arr[1];
        let mp_pat = null;
        let uri = "";
        switch (id_type) { 
          case "O": 
            mp_pat = this.pat_list.filter(item =>item.id == id)[0]; 
            if (mp_pat == null) {
              Dialog.alert({
                message: "患者信息没绑定无法进行缴费",
              }).then(() => {});
              return;
            }
            this.$store.dispatch("setPatObject", mp_pat);
          
            uri = "/pending-list";
            break;
          case "R":
             mp_pat = this.pat_list.filter(item =>item.id == id)[0]; 
            if (mp_pat == null) {
              Dialog.alert({
                message: "患者信息没绑定无法进行查看",
              }).then(() => {});
              return;
            }
              this.$store.dispatch("setPatObject", mp_pat);
            uri = "/lis"; 
            break;
          default:
            window.localStorage.setItem("hospital_id", id); 
            uri = "/home";
            break;
        } 
        window.localStorage.setItem("agt_params", agt_params); 
        this.$router.push({ path: uri});
      }
    },
  },
  mounted() {
    // let openid = this.$route.params.openid;
    // window.localStorage.setItem("openid", openid);
    // this.$router.push({ path: `/home` });
    this.init();
  },
};
</script>

<style scoped lang="less">
/deep/ .van-tabbar-item__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  .iconfont {
    font-size: 24px;
  }
}
</style>
