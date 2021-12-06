<template>
  <div class="comment-smile">
    <ul>
      <li
        v-for="(item, index) in JSON.parse(JSON.stringify(this.emoticons))
          .default"
        :key="index"
        :data-smile="item.text"
        data-smile-type="default"
        @click="onSmile($event)"
      >
        <img
          :src="item.url | EmoticonSrc('default')"
          :alt="item.text"
          :data-emoticon="item.text"
          :data-index="index"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import eventBus from "../../common/js/eventBus";
import Smilies from "../../common/js/smilies";
export default {
  name: "Smilies",
  data() {
    return {
      emoticons: {},
    };
  },
  props: {
    msg: String,
  },
  methods: {
    onSmile(e) {
      let smileType = e.currentTarget.dataset['smileType'];
      let smileText
      if(smileType == 'default'){
        smileText = "[" + e.currentTarget.dataset["smile"] + "]";
      } else {
        smileText = "" + e.currentTarget.dataset["smile"] + "";
      }
      eventBus.$emit("onSmile", smileText);
    },
    flatten(arr) {
      return [].concat(
        ...arr.map((x) => (Array.isArray(x) ? this.flatten(x) : x))
      );
    },
  },
  beforeDestroy() {
    eventBus.$off("onSmile");
  },
  created() {
    // this.emoticons.push(Smilies.emoticons)
  },
  mounted() {
    // let newArr = []
    // for(let i in Smilies.emoticons){
    //   newArr[i] = Smilies.emoticons[i];
    // }
    // console.log('11',newArr['default'])
    // this.emoticons.push(JSON.parse(JSON.stringify(Smilies.emoticons)));
    // let aaa = JSON.parse(JSON.stringify(this.emoticons))[0];
    // console.log(JSON.parse(JSON.stringify(this.emoticons))[0]);
    this.emoticons = Smilies.emoticons;
    // console.log('原始',JSON.parse(JSON.stringify(this.emoticons)));
    // console.log("本地", JSON.parse(JSON.stringify(Smilies.emoticons)));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scope>
@import "../../assets/main.scss";
.comment-smile {
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    justify-items: auto;
    li {
      text-align: center;
      line-height: 1;
      padding: 5px;
      display: flex;
      &:hover {
        cursor: pointer;
        border: radius 3px;
        background-color: #f6f6f6;
      }
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
