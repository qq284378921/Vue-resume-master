window.Share = {
    props: ['shareLink'],
    methods: {
        onClickCopy(el) {
            el.target.select();
            document.execCommand("Copy"); // 执行浏览器复制命令
            alert('已复制到粘贴板')
        },
    },
    template: `
    <div  class="shareWrap" v-cloak>
        <div class="shareContent">
            <h3>您的简历分享地址</h3>
            点击文本框直接复制：<input @click="onClickCopy" type="text" :value="shareLink">
            <span class="close" @click="$emit('close')">x</span>
        </div>
    </div>
    `,
}
Vue.component('share-wrap', Share)
