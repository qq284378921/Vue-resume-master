window.Login = {
    data() {
        return {
            login: {
                email: '',
                keyword: ''
            },            
        }
    }   , 
    methods: {
        onLogin() {
            AV.User.logIn(this.login.email, this.login.password).then((loggedInUser) => {
                alert('登录成功');
                window.location.href = 'https://qq284378921.github.io/vue-resume-master/src'//登录成功后直接进入主页
            }, function (error) {
                if (error.code === 211) {
                    alert('账号不存在，请重新输入')
                } else if (error.code === 210) {
                    alert('账号或者密码错误，请重新输入')
                }
            });
        },
    },
    template: `
        <div class="loginWrap" v-cloak>
            <form @submit.prevent="onLogin">
                <router-link class="close" to="/">x</router-link>
                <h2>登录</h2>
                <div class="row">
                    <label>邮箱：
                        <input type="email" v-model='login.email'>
                    </label>
                </div>
                <div class="row">
                    <label>密码：
                        <input type="password" v-model='login.password'>
                    </label>
                </div>
                <div class="row">
                    <button type='submit' >确认登录</button><router-link to="/signup">未注册</router-link>
                </div>
            </form>
        </div>`,    
}
Vue.component('login-wrap',Login)
