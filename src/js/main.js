window.Main = {
    mounted: function () {
        var currentUser = AV.User.current();
        if (currentUser) {
            this.loginStatus = true //当前用户
            this.loginedUser.email = currentUser.attributes.email
            this.loginedUser.id = currentUser.id //获取当前用户id
        }
        let sharedId = ''
        let search = window.location.search
        let reg = /user_id=([A-Za-z\d]+)/  //匹配前缀为user_id= 里面为所以数字和大小写字母的  
        search = search.match(reg)
        if (search) {
            sharedId = search[1] //传入正则获取的ID
            this.mode = 'preview'
        }
        let getUserData = AV.Object.createWithoutData('_User', sharedId || this.loginedUser.id);//获取当前用户resume数据
        if (getUserData) {
            getUserData.fetch().then(() => {
                if (getUserData.attributes.resume) {
                    this.resume = getUserData.attributes.resume  //传入resume数据
                }
            })
        }
 
    },
    template: `
    <main class="page" id="app">
        <share-wrap v-show="shareVisible" :share-link="loginedUser.shareLink" @close="shareVisible = false"></share-wrap>
        <pickskin-wrap v-show='pickSkinVisible' @pick-skin='resume.skin = $event' @close="pickSkinVisible = false" ></pickskin-wrap>

        <aside-bar v-show="mode === 'edit'" :login-status='loginStatus' @share="onClickShare" @save="onClickSave" @print="onClickPrint" @pick-skin="onClickPickSkin" @preview="onClickPreview" @logout="onClickLogout"></aside-bar>
        <main>
            <top-bar :logined-user="loginedUser" :mode="mode" @quit-preview="onQuitPreview"></top-bar>
            <resume :resume="resume" :mode="mode" @on-edit="onEdit($event[0],$event[1])" ></resume>
        </main>
    </main>`,
    data() {
        return {
            mode: 'edit', loginStatus: false, loginVisible: false, signUpVisible: false, shareVisible: false,
            pickSkinVisible: false,
            resume: {
                skin: 'default',
                profile: {
                    yourName: '姓名',
                    job: '应聘职位',
                    age: '18',
                    sex: '男',
                    email: 'pengyuyan@email.com',
                    phone: '(+86)138-0013-8000',
                    blog: 'http://www.blog.com/'
                },
                education: [
                    {
                        school: '某某大学',
                        profession: '计算机软件专业',
                        degree: '本科',
                        time:'2014.09 - 2018.06',
                    },
                    {
                        school: '某某大学',
                        profession: '软件工程专业',
                        degree: '硕士',
                        time:'2018.09 - 2020.06',
                    },
                ],
                skills: [
                    {
                        skillName: 'HTML,CSS',
                        description: '百分百还原设计图',
                    },
                    {
                        skillName: '请输入技能',
                        description: '请输入技能描述',
                    },
                ],
                projects: [
                    {
                        projectName: '简历制作工具',
                        keyword: 'Vue，Vue-router',
                        time: '2018.01',
                        description: '请输入项目描述',
                        link: 'https://qq284378921.github.io/vue-resume-master/src'
                    },
                    {
                        projectName: '请输入项目名',
                        keyword: '请输入关键词',
                        time: '20XX.XX',
                        description: '请输入项目描述',
                        link: 'https://www.baidu.com'
                    },
                ],
                credentials: [
                    {
                        credentialName:'大学生英语四级',
                        time: '2018.01'
                    },
                    {
                        credentialName:'请输入获奖证书或技能证书',
                        time: '20XX.XX'
                    },
                ]
            },
            sharedResume: {
                skin: 'default',
                profile: {
                    yourName: '姓名',
                    job: '应聘职位',
                    age: '18',
                    sex: '男',
                    email: 'pengyuyan@email.com',
                    phone: '(+86)138-0013-8000',
                    blog: 'http://www.blog.com/'
                },
                education: [
                    {
                        school: '某某大学',
                        profession: '计算机软件专业',
                        degree: '本科',
                        time:'2014.09 - 2018.06',
                    },
                    {
                        school: '某某大学',
                        profession: '软件工程专业',
                        degree: '硕士',
                        time:'2018.09 - 2020.06',
                    },
                ],
                skills: [
                    {
                        skillName: 'HTML,CSS',
                        description: '百分百还原设计图',
                    },
                    {
                        skillName: '请输入技能',
                        description: '请输入技能描述',
                    },
                ],
                projects: [
                    {
                        projectName: '简历制作工具',
                        keyword: 'Vue，Vue-router',
                        time: '2018.01',
                        description: '请输入项目描述',
                        link: 'https://qq284378921.github.io/vue-resume-master/src'
                    },
                    {
                        projectName: '请输入项目名',
                        keyword: '请输入关键词',
                        time: '20XX.XX',
                        description: '请输入项目描述',
                        link: 'https://www.baidu.com'
                    },
                ],
                credentials: [
                    {
                        credentialName:'大学生英语四级',
                        time: '2018.01'
                    },
                    {
                        credentialName:'请输入获奖证书或技能证书',
                        time: '20XX.XX'
                    },
                ]
            },
            loginedUser: {
                name: '',
                email: '请登录',
                id: '',
                shareLink: '',
            },
        }
    },
    watch: {
        'resume.skin': function (newValue, oldValue) {
            document.getElementById('resumeSkin').href = "css/" + newValue + "Resume.css" //替换类名换肤
        },
    },
    methods: {
        onEdit(key, value) {//假设传入 resume.skills[0].name把她变成
            let reg = /\[(\d+)\]/g
            key = key.replace(reg, (match, number) => `.${number}`)//resume.skills.0.skillName
            key = key.split('.')
            let result = this
            for (let i = 0; i < key.length; i++) {
                if (i === key.length - 1) { //最后一个，及到name 的时候重新赋值一个新value
                    result[key[i]] = value
                } else {
                    result = result[key[i]] //一层一层进入，resume到skills，到0，再到name
                }
            }
        },
        onClickShare() {
            if (this.loginStatus) {
                this.loginedUser.shareLink = 'https://qq284378921.github.io/vue-resume-master/src/#/?user_id=' + this.loginedUser.id//获取分享链接
                this.shareVisible = true
            } else {
                this.$router.push('/login')
            }
        },

        onClickPrint() {
            window.print()
        },
        onClickPickSkin() {
            this.pickSkinVisible = true;
        },
        onClickSave() {
            if (this.loginStatus) {
                let UserData = AV.Object.createWithoutData('_User', this.loginedUser.id);
                UserData.set('resume', this.resume);
                UserData.save().then(() => {
                    alert('保存成功！')
                });
            } else {
                this.$router.push('/login')
            }
        },
        onClickPreview() {
            this.mode = 'preview'
        },
        onClickLogout() {//左下角登出button
            AV.User.logOut();
            alert('注销成功')
            window.location.reload()
        },

        onQuitPreview() {
            window.location.href = 'https://qq284378921.github.io/vue-resume-master/src/'//直接进入主页
        },

    }
}
Vue.component('app', Main)
