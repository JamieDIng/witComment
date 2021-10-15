<template>
    <div>
        MockJS测试
        <div class="demo">

        </div>
    </div>
</template>
<script>
// eslint-disable-next-line
import mock from '../api/mock'
import axios from 'axios'
export default {
    data() {
        return {
            
        }
    },
    mounted(){
        axios.post("/comments").then(response => {
            if (response.data) {
                //console.log(response.data)
            }
        })
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
@import '../assets/main.scss';

</style>