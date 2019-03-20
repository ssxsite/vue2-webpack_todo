<template>
    <div class="container">
        <input type="text" placeholder="接下来做什么？" class="test-input" style="width: 100%;" autocomplete="off"
        @keyup.13="addItems($event)" v-model="itemName">
        <TODO_Item v-for="item in getShowItems()" v-bind:item="item"  @del="deleteItem"></TODO_Item>
        <Todo_Tabs @filter="filter = $event" v-bind:leftItem="getUnFinishedItemLength()" @clearAllCompleted="clearAllCompleted()"></Todo_Tabs>
    </div>
</template>

<script>
    import TODO_Item from "./todo-item.vue";
    import Todo_Tabs from "./todo-tabs.vue";
    var items = [];
    export default {
        name: "todo",
        components:{
            TODO_Item,
            Todo_Tabs
        },
        data(){
            return{
                items:items,
                item_key:0,
                filter:'all',
                itemName:''
            }
        },
        methods:{
            addItems:function(e) {
                if(this.items.length == 0){
                    this.item_key = 0;
                };
                this.items.unshift({
                    text:e.target.value,
                    key:this.item_key++,
                    completed:false
                });
                this.itemName = ''
            },
            deleteItem:function (key) {
                console.log("key----",key);
                // this.items.splice(this.items.findIndex(item => item.key === key), 1);
                this.items = this.items.filter((item) => item.key !== key);
            },
            getShowItems:function () {
                if(this.filter == 'all'){
                    return this.items;
                }
               let complete = this.filter === 'completed';
                return this.items.filter((item) => item.completed === complete);
            },
            getUnFinishedItemLength:function () {
                return this.items.filter((item) => item.completed === false).length;
            },
            clearAllCompleted:function () {
                this.items = this.items.filter((item) => item.completed == false );
            }
        }
    }
</script>

<style scoped>
.container{
    width: 500px;
    margin: 10px auto;
    background-color: white;
    box-sizing: border-box;
}
@import '../assets/styles/toto.scss'
</style>