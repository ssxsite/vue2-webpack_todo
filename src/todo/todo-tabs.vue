<template>
    <div class="tabs-container">
        <span class="left-item">{{leftItem}} items left</span>
        <ul class="tabs-ul">
            <li v-for="state in states" @click="filter(state)" :class="[filterValue == state ? 'active':'']">{{state}}</li>
        </ul>
        <button class="right-item" @click="clearAllCompleted()">Clear Completed</button>
    </div>
</template>

<script>
    export default {
        name: "todo-tabs",
        data(){
            return{
                filterValue:'all',
                states: ['all', 'active', 'completed']
            }
        },
        methods:{
            filter:function (value) {
                this.filterValue = value;
                console.log("this.filterValue------",this.filterValue);
                this.$emit('filter',value);
            },
            clearAllCompleted:function () {
                this.$emit('clearAllCompleted');
            }
        },
        props:{
            leftItem:{
                type:Number,
                required:true
            }
        }
    }
</script>

<style scoped>
.tabs-container{
    width: 100%;
    display: flex;
    height: 46px;
    padding-top: 10px;
    line-height: 36px;
    border-top: 1px solid #ccc;
}
.tabs-container .left-item{
    display: inline-block;
    width: 100px;
}
.tabs-container .right-item{
    margin-left: 30px;
    height: 36px;
    display: inline-block;
    width: 120px;
    background-color: #fff;
    border: none;
    cursor: pointer;
    outline: none;
}
.tabs-container ul{
    clear: both;
    flex: 1;
    display: flex;
    height: 36px;
    line-height: 36px;
}
.tabs-container ul>li{
    float: left;
    text-align: center;
    border-radius: 3px;
    flex: 1;
}
.tabs-container ul>li.active{
    border: 1px solid #a4499f;
}
</style>