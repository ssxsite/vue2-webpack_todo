<template>
    <div class="item-container" :class="[item.completed ? 'completed':'']">
        <input type="checkbox" class="left-radio" v-model="item.completed">
        {{item.text}}
        <button class="right-button" @click="deleteItem(item.key)">×</button>
    </div>

</template>

<script>
    export default {
        name: "todo-item",
        props:{
            item:{
                type:Object,
                required:true
            }
        },
        methods:{
            deleteItem:function (key) {
                this.$emit('del',key);
            }
        }
    }
</script>

<style scoped>
.item-container{
    width: 100%;
    position: relative;
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #cccccc;
    box-sizing: border-box;
    clear: both;
    padding-right: 15px;
    text-align: center;
}
.item-container.completed{
    color: #d9d9d9;
    text-decoration:line-through;
}
.item-container .left-radio{
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 40px;
    height: 36px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    color: #fff;
    background:url("../assets/img/round.svg")no-repeat;
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.item-container .left-radio:checked{
    background:url("../assets/img/done.svg")no-repeat;
    color: #fff;
}
.item-container .right-button{
    position: absolute;
    right: 15px;
    top: 0;
    bottom: 0;
    border: none;
    color: #a4499f;
    background-color: white;
    font-size: 36px;
    cursor: pointer;
}
</style>