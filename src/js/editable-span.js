Vue.component('editable-span',{
    props:["value","mode"],
    template: `
        <span class='editableSpan'>
            <span>{{value}}</span>
            <input v-show="editStatus" type="text" v-bind:value='value' v-on:input='onEditing'>
            <button v-show="mode === 'edit'"@click='editStatus = !editStatus'>{{editStatus?'确认':'编辑'}}</button>
        </span>
    `,
    data() {
        return {
            editStatus: false,
        }
    },
    methods: {
        onEditing(e) {
            this.$emit('edit',e.target.value)//发送事件‘edit’，传出value，
        }
    }
})