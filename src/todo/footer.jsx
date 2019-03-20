export default {
    data() {
        return {
            author: 'ssx'
        }
    },
    methods:{
        changeName(){
            this.author = this.author == 'ssx'?'lili':'ssx'
        }
    },
    render() {
        return (
            <div id="footer">
            <span>Power by author: {this.author}</span>
                <button onClick={this.changeName}>修改作者</button>
        <br/>
        </div>
    )
    }
}