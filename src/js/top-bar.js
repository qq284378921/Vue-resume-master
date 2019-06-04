Vue.component('top-bar',{
    props: ['mode','loginedUser'],
    template: `
    <div class="topBar">
        <span class='loginedUser'v-show="mode === 'edit'">您好：{{loginedUser.email}}</span>
        <input class="quitPreview" type="button" v-show="mode === 'preview'" @click="$emit('quit-preview')" value="退出预览模式" v-cloak>
</div>`
})