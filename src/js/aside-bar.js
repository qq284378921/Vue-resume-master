Vue.component('aside-bar',{
    props: ['loginStatus'],
    template: `
    <aside class='sidebar' v-cloak>
            <ul>
                <li>
                    <button @click="$emit('share')">分享</button>
                </li>
                <li>
                    <button @click="$emit('print')">打印</button>
                </li>
                <li>
                    <button @click="$emit('save')">保存</button>
                </li>
                <li>
                    <button @click="$emit('pick-skin')">换肤</button>
                </li>
                <li>
                    <button @click="$emit('preview')">预览</button>
                </li>
            </ul>
            <div class="logout">
                <button v-show='loginStatus' @click="$emit('logout')" v-cloak>登出</button>
                <button v-show='!loginStatus' @click="$emit('login')"><router-link to="/login" >登录</router-link></button>
            </div>
        </aside>
    `
})