//路由版本，此文件已经不使用，使用main.js
var app = new Vue({
    el: '#app',
    data: {
        mode: 'edit', loginStatus: false, loginVisible: false, signUpVisible: false, shareVisible: false,
        pickSkinVisible: false,
        resume: {
            skin: 'default',
            profile: {
                yourName: '姓名',
                job: '应聘职位',
                age: '年龄',
                sex: '性别',
                email: '邮箱',
                phone: '联系电话',
            },
            skills: [
                {
                    skillName: '请输入技能',
                    description: '请输入技能描述',
                },
                {
                    skillName: '请输入技能',
                    description: '请输入技能描述',
                },
            ],
            projects: [
                {
                    projectName: '请输入项目名',
                    keyword: '请输入关键词',
                    description: '请输入项目描述'
                },
                {
                    projectName: '请输入项目名',
                    keyword: '请输入关键词',
                    description: '请输入项目描述'
                },
            ]
        },
        sharedResume: {
            profile: {
                yourName: '姓名',
                job: '应聘职位',
                age: '年龄',
                sex: '性别',
                email: '邮箱',
                phone: '联系电话',
            },
            skills: [
                {
                    skillName: '请输入技能',
                    description: '请输入技能描述',
                },
                {
                    skillName: '请输入技能',
                    description: '请输入技能描述',
                },
            ],
            projects: [
                {
                    projectName: '请输入项目名',
                    keyword: '请输入关键词',
                    description: '请输入项目描述'
                },
                {
                    projectName: '请输入项目名',
                    keyword: '请输入关键词',
                    description: '请输入项目描述'
                },
            ]
        },
        loginedUser: {
            name: '',
            email: '请登录',
            id: '',
            shareLink: '',
        },
        
        
    },
    watch: {
        'resume.skin': function(newValue, oldValue) {
            document.getElementById('resume').className = 'resume '+ newValue //替换类名换肤
        },
        // 'resume' : function() {
        //     console.log(resume);
        //     return this.resume
        // }
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
                app.loginedUser.shareLink = 'http://127.0.0.1:8080/src/?user_id=' + this.loginedUser.id//获取分享链接
                this.shareVisible = true
            } else {
                this.loginVisible = true;
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
                this.loginVisible = true
            }
        },       
        onClickPreview() {
            this.mode = 'preview'
        },
        onClickLogin() { //左下角登录button
            this.loginVisible = true;
        },
        onClickLogout() {//左下角登出button
            AV.User.logOut();
            alert('注销成功')
            window.location.reload()
        },
    
        onQuitPreview() {
            window.location.href = 'http://127.0.0.1:8080/src/'//直接进入主页
        },

    }
})
