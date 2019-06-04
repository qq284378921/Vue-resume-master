Vue.component('resume',{
    props: ['resume','mode'],
    methods: {
        onAddEducation() {
            this.resume.education.push({
                school: '某某大学',
                profession: '某某专业',
                degree: '本科',
                time:'20XX.00 - 20XX.XX',
            })
        },
        onRemoveEducation(index) {
            this.resume.education.splice(index, 1)
        },
        onAddSkill() {
            this.resume.skills.push({
                skillName: '请输入技能',
                description: '请输入技能描述',
            })
        },
        onRemoveSkill(index) {
            this.resume.skills.splice(index, 1)
        },
        onAddProject() {
            this.resume.projects.push({
                projectName: '请输入项目名',
                keyword: '请输入关键词',
                time: '20XX.XX',
                description: '请输入项目描述',
                link: 'https://www.baidu.com'
            })
        },
        onRemoveProject(index) {
            this.resume.projects.splice(index, 1)
        },
        onAddCredential() {
            this.resume.credentials.push({
                    credentialName:'请输入获奖证书或技能证书',
                    time: '20XX.XX'
            })
        },
        onRemoveCredential(index) {
            this.resume.credentials.splice(index,1)
        }
    },
    template:  `<div class="resume" id='resume'>
    <section class="profile">
        <h2 class='yourName' >
            <editable-span :mode="mode" v-bind:value="resume.profile.yourName" v-on:edit="$emit('on-edit',['resume.profile.yourName',$event])"></editable-span>
        </h2>
        <div class="profileData">
        <p>
            <span class='age'>年龄：
            <editable-span :mode="mode" v-bind:value="resume.profile.age" v-on:edit="$emit('on-edit',['resume.profile.age',$event])"></editable-span>
            </span>
            <span class="sex">性别：
            <editable-span :mode="mode" v-bind:value="resume.profile.sex" v-on:edit="$emit('on-edit',['resume.profile.sex',$event])"></editable-span>
            </span>
        </p>
        <p class="email">
            <editable-span :mode="mode" v-bind:value="resume.profile.email" v-on:edit="$emit('on-edit',['resume.profile.email',$event])"></editable-span>
        </p>
        <p class="phone">
            <editable-span :mode="mode" v-bind:value="resume.profile.phone" v-on:edit="$emit('on-edit',['resume.profile.phone',$event])"></editable-span>
        </p>
        <p class="blog">
            <editable-span :mode="mode" v-bind:value="resume.profile.blog" v-on:edit="$emit('on-edit',['resume.profile.blog',$event])"></editable-span>
        </p>
        </div>
        <h3 class='job'>
            <editable-span :mode="mode" v-bind:value="resume.profile.job" v-on:edit="$emit('on-edit',['resume.profile.job',$event])"></editable-span>
        </h3>
    </section>
    <section class="education">
        <h3>教育背景</h3>
        <ul>
            <li v-for="school,index in resume.education">
            <span class="school"><editable-span :mode="mode" :value='school.school' @edit="$emit('on-edit',['resume.education['+index+'].school',$event])"></editable-span></span>
            <span class="profession"><editable-span :mode="mode" :value='school.profession' @edit="$emit('on-edit',['resume.education['+index+'].profession',$event])"></editable-span></span>
            <span class="degree"><editable-span :mode="mode" :value='school.degree' @edit="$emit('on-edit',['resume.education['+index+'].degree',$event])"></editable-span></span>     
            <span class="time"><editable-span :mode="mode" :value='school.time' @edit="$emit('on-edit',['resume.education['+index+'].time',$event])"></editable-span></span>     
                <span class="remove" v-show="mode === 'edit'" @click="onRemoveEducation(index)">x</span>
            </li>
            <li class='addEducation' v-show="mode === 'edit'" @click="onAddEducation">添加</li>
        </ul>
    </section>
    <section class="skills">
    <h3>专业技能</h3>
        <ul>
            <li v-for="skill,index in resume.skills">
                <span class="skill"><editable-span :mode="mode" :value='skill.skillName' @edit="$emit('on-edit',['resume.skills['+index+'].skillName',$event])"></editable-span></span>
                <span class="description"><editable-span :mode="mode" :value='skill.description' @edit="$emit('on-edit',['resume.skills['+index+'].description',$event])"></editable-span></span>
                <span class="remove" v-show="mode === 'edit'" @click="onRemoveSkill(index)">x</span>
            </li>
            <li class='addSkill' v-show="mode === 'edit'" @click="onAddSkill">添加</li>
        </ul>
    </section>
    <section class="projects">
        <h3>项目经验</h3>
        <ul>
            <li v-for="project,index in resume.projects">
                <div class='project'>
                    <span class="projectName"><editable-span :mode="mode" :value='project.projectName' @edit="$emit('on-edit',['resume.projects['+index+'].projectName',$event])"></editable-span></span>
                    <span class="keyword"><editable-span :mode="mode" :value='project.keyword' @edit="$emit('on-edit',['resume.projects['+index+'].keyword',$event])"></editable-span></span>
                    <span class="time"><editable-span :mode="mode" :value='project.time' @edit="$emit('on-edit',['resume.projects['+index+'].time',$event])"></editable-span></span>
                </div>
                <p class="description"><editable-span :mode="mode" :value='project.description' @edit="$emit('on-edit',['resume.projects['+index+'].description',$event])"></editable-span></p>
                <p class="link">预览链接：<editable-span :mode="mode" :value='project.link' @edit="$emit('on-edit',['resume.projects['+index+'].link',$event])"></editable-span></p>
                <span class="remove" v-show="mode === 'edit'" @click="onRemoveProject(index)">x</span>
            </li>
            <li class="addProject" v-show="mode === 'edit'" @click='onAddProject'>添加</li>
        </ul>
    </section>
    <section class="credentials">
        <h3>获奖证书</h3>
        <ul>
            <li v-for="credential,index in resume.credentials">
            <span class="credentialName"><editable-span :mode="mode" :value='credential.credentialName' @edit="$emit('on-edit',['resume.credentials['+index+'].credentialName',$event])"></editable-span></span>
            <span class="time"><editable-span :mode="mode" :value='credential.time' @edit="$emit('on-edit',['resume.credentials['+index+'].time',$event])"></editable-span></span>     
                <span class="remove" v-show="mode === 'edit'" @click="onRemoveCredential(index)">x</span>
            </li>
            <li class='addCredential' v-show="mode === 'edit'" @click="onAddCredential">添加</li>
        </ul>
    </section>
</div>`
})