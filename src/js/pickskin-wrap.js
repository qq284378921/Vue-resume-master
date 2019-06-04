Vue.component('pickskin-wrap', {
    methods: {
        onSkinPeeler(skin) {
            document.getElementById('resumeSkin').href = "css/" + skin + "Resume.css" //替换类名换肤            
            this.$emit('pick-skin',skin)
        },
    },
    template: `
    <div class="pickSkinWrap">
        <div class="pickSkin">
            <button @click="onSkinPeeler('default')">默认</button><button @click="onSkinPeeler('simple')">简约风</button><button @click="onSkinPeeler('blue')">蓝色风</button>
            <span class="close" @click="$emit('close')">x</span>
        </div>
    </div>
    `,
})