window.SignUp = {
    data() {
        return { 
            signUp: {
                email: '',
                password: '',
                confirmPassword: '',
            },
        }
    },  
    methods: {
        onSignUp() {
            if (this.signUp.password === this.signUp.confirmPassword) {
                var user = new AV.User();
                user.setEmail(this.signUp.email);
                user.setUsername(this.signUp.email)
                user.setPassword(this.signUp.password);
                user.signUp().then((loginedUser) => {
                    alert('注册成功')
                    this.$router.push('/login')
                }, (function (error) {
                    if(error.code === 203) {
                        alert('该邮箱已存在')
                    }
                }));
            } else {
                alert('两次输入的密码不一致，请重新确认')
            }
        },
    },
    template: `
        <div class="signUpWrap" v-cloak>
            <form class='signUpForm' v-on:submit.prevent="onSignUp" >
                <router-link class="close" to="/login">x</router-link>                            
                <h2>注册</h2>
                <div class="row">
                    <label>注册邮箱：
                        <input type="email" v-model='signUp.email'>
                    </label>
                </div>
                <div class="row">
                    <label>设置密码：
                        <input type="password" v-model='signUp.password'>
                    </label>
                </div>
                <div class="row">
                    <label>确认密码：
                        <input type="password" v-model='signUp.confirmPassword'>
                    </label>
                    <span v-show='signUp.confirmPassword !== signUp.password'>!</span>
                </div>
                <div class="row">
                    <button type='submit' >确认注册</button>
                    <router-link to="/login" >已有账号，请登录</router-link>
                </div>
            </form></div>`,
}
Vue.component('signup-wrap',SignUp)
