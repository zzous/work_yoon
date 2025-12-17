<template>
    <div>
        <h1 class="title">워크 플로우 생성</h1>
        <div class="textbox">
            <v-icon icon="mdi-alert-circle"  class="s-icon" size="30"></v-icon>
            <span>등록할 워크 플로우의 기본 정보 입력 후 워크 플로우를 지정할 수 있습니다.</span>
            <span>워크 플로우는 '변경요청 등록'으로 시작해서 변경종료로 끝나야 합니다.</span>
        </div>
        <div class="groupSetting">
            <div class="settigItem">
                <div class="settingItemTitle">워크 플로우 명 <span>*</span></div>
                <div class="settingItemContent">
                    <v-text-field type="text" placeholder="워크 플로우 명을 입력해주세요." v-model="form.name"/>
                </div>
            </div>
            <div class="settigItem">
                <div class="settingItemTitle">워크 플로우 설명 <span>*</span></div>
                <div class="settingItemContent">
                    <v-textarea type="text" placeholder="워크 플로우 설명을 입력해주세요." rows="3" v-model="form.description" />
                </div>
            </div>
            <div class="settigItem">
                <div class="settingItemTitle">워크 플로우 그룹명 <span>*</span></div>
                <div class="settingItemContent">
                    <v-text-field type="text" placeholder="워크 플로우 명을 입력해주세요." v-model="form.groupName" />
                    <v-btn color="outline" @click="addWorkflowGroup" :disabled="form.groupName.length === 0" >추가</v-btn>
                </div>
            </div>
        </div>
        <div class="groupwork">
            <h2 style="font-size:16px; font-weight:bold; color:#000; margin-bottom:10px;">워크 플로우 설정</h2>
            <div class="group-list-empty" v-if="wfGroupList?.length === 0">
                <v-icon icon="mdi-alert-circle"  class="s-icon" size="30" color="#666" style="margin-bottom:10px;"></v-icon>
                등록된 그룹이 없습니다. 그룹을 추가 해 주세요</div>
            <div :class="['group-list', {'cloumn': wfGroupList.length > 1}]" v-else>
                <div class="group-item" v-for="(group, index) in wfGroupList" :key="group.id">
                    <div class="group-item-header">
                        <span>{{ group.wfGroupName }}</span>
                        <div>
                            <v-icon icon="mdi-plus" @click="addWork('add', index)" />
                            <v-icon icon="mdi-minus" @click="removeGroup(group)" />
                        </div>
                    </div>
                    <div class="item-list" v-if="group.wfGroupItemList.length > 0">
                        <div class="item-wrap" v-for="(work, idx) in group.wfGroupItemList" :key="work.id">
                            <div class="item-header"><v-icon icon="mdi-folder-outline" style="margin-right:10px; color:#666;"  />{{ WORK_TYPE[work.wfComponentsCode]?.name }}</div>
                            <div class="item-content">
                                <div class="code"><v-icon icon="mdi-folder-multiple-outline" style="margin-right:10px;"  />컴포넌트 Code :{{ work.wfComponentsCode }}</div>
                                <div class="description"><v-icon icon="mdi-file-document-outline" style="margin-right:10px;"  />설명 :{{ work.wfGroupItemDesc }}</div>
                                <div class="approval"><span v-if="work.approvalYn"> <v-icon icon="mdi-account" style="margin-right:10px;"   />결재 아이템</span></div>
                                <div class="button">
                                    <v-icon icon="mdi-pencil" @click="addWork('edit', index, idx)" />
                                    <v-icon icon="mdi-trash-can" @click="removeWork(group, idx)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-button center">
            <v-btn color="primary" @click="createWorkflow" :disabled="wfGroupList.some(item => item.wfGroupItemList.length === 0) || form.name.length === 0 ">저장</v-btn>
            <v-btn color="primary" @click="cancelWorkflow" style="margin-left:10px;">목록</v-btn>
        </div>
        <v-dialog v-model="dialog" width="700">
           <popup :data="wfGroupList"  :groupIdx="workIndex" :workIdx="workIdx" @save="saveWork" @cancel="cancelWork" :mode="mode" />
        </v-dialog>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import popup from './popup.vue'
    import { WORK_TYPE } from './data'
    const router = useRouter()
    const createWorkflow = () => {
        const params = {
            wfName: form.value.name,
            wfDesc: form.value.description,
            serviceGroupUuid:'service-group-uuid-001',
            wfGroupList: wfGroupList.value,

        }
        console.log(params)
    }
    const cancelWorkflow = () => {
        router.push('/list')
    }
    const form = ref({
        name: '',
        description: '',
        groupName: '',
    })
    const workIndex = ref(null)
    const workIdx = ref(null)
    const dialog = ref(false)
    const mode = ref('add')
    const wfGroupList = ref([])
    const addWorkflowGroup = () => {
        // dialog.value = true
        wfGroupList.value.push({
            wfGroupName: form.value.groupName,
            wfGroupItemList: [],
        })
        form.value.groupName = ''

    }
    const addWork = (type, index, idx) => {
        mode.value = type
        workIndex.value = index
        if(mode.value === 'edit'){
            console.log(idx)
            workIdx.value = idx
        }
        dialog.value = true
       
    }
    const removeGroup = (group) => {
        wfGroupList.value = wfGroupList.value.filter(item => item.wfGroupName !== group.wfGroupName)
    }
    const removeWork = (group, idx) => {
        group.wfGroupItemList.splice(idx, 1)
    }
    const saveWork = (work) => {
        const currentGroup = wfGroupList.value[workIndex.value]
        console.log(work,mode.value == 'add', workIndex.value, currentGroup)
        // 그룹 객체의 속성 업데이트
        currentGroup.wfGroupName = work.wfGroupName
        currentGroup.wfGroupDesc = form.value.description
        currentGroup.displayOrder = workIndex.value
        if(mode.value == 'add'){
        // wfGroupItemList 배열에 아이템 추가
            currentGroup.wfGroupItemList.push({
                wfComponentsCode: work.wfComponentsCode,
                wfGroupItemDesc: work.wfGroupItemDesc,
                approvalYn: work.approval,
                displayOrder: currentGroup.wfGroupItemList.length
            })
        }else{
            currentGroup.wfGroupItemList[workIdx.value] = {
                wfComponentsCode: work.wfComponentsCode,
                wfGroupItemDesc: work.wfGroupItemDesc,
                approvalYn: work.approval,
                displayOrder: currentGroup.wfGroupItemList.length
            }
        }
        
        dialog.value = false // 저장 후 다이얼로그 닫기
    }
    const cancelWork = () => {
        dialog.value = false
    }
</script>
<style scoped>
.textbox{padding:10px 10px 10px 80px; background-color:#bbcdd8; border-radius:10px; position: relative; margin:20px 0;}
.textbox span{display:block;margin-bottom:10px; padding-left:10px; position: relative;}
.textbox span:after{content: ''; display: block; width: 7px; height: 2px; background-color:#000; position: absolute; top: 11px; left: 0;}
.textbox .s-icon{position: absolute; top: 20px; left: 30px;}
.groupSetting{border-top:solid 1px #000; }
.settigItem{display:flex; justify-content:space-between; align-items:stretch; border-bottom:solid 1px #ddd;}
.settingItemTitle{font-size:14px; font-weight:bold; color:#000; flex:0 0 200px; background-color:#f1f1f1; padding:10px;}
.settingItemContent{flex:1; padding:10px; background-color:#fff; display:flex; align-items:center;}
.settingItemContent > button{margin-left:10px;}
.v-field__input{background-color:#fff;}
.groupwork{margin:20px 0; border:solid 1px #ddd; padding:10px; background-color:#fff; border-radius:10px;}
.group-item{}
.group-item-header{display:flex; justify-content:space-between; align-items:center; padding:10px; background-color:#1297f2;color:#fff; margin-bottom: 10px;}
.item-wrap{border:solid 1px #ddd;  background-color:#fff; border-radius:10px;flex:0 0 220px; height:240px ;position: relative; max-width: 220px; margin-right:10px;}
.item-header{display:flex;  align-items:center; padding:10px; background-color:#f1f1f1;}
.item-content{padding:10px; text-align:left;}
.code{font-size:14px; font-weight:bold; color:#1297f2; margin-bottom:10px;}
.description{font-size:14px; color:#000; height:44px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
.approval{font-size:14px; color:#000;}
.button{display:flex; justify-content:flex-end; align-items:center; position: absolute; right:10px; bottom:10px}
.button > div{margin-left:10px;}
.button  .v-icon{cursor:pointer; font-size:20px; border:solid 1px #1297f2; color:#1297f2;border-radius:5px; padding:10px; width:30px; height:30px;}
.button  .v-icon +.v-icon{margin-left:10px;}
.button  .v-icon:hover{color:#fff; background-color:#1297f2;}
.group-list-empty{display:flex; flex-direction:column; justify-content:center; align-items:center; padding:30px; background-color:#f1f1f1; border-radius:10px;}
.item-list{display: flex; overflow: hidden;overflow-x: auto;}
.group-list.cloumn{display:flex;overflow: hidden;overflow-x: auto;}
.group-list.cloumn .group-item{flex: 0 0 250px;
margin-right: 10px}
.group-list.cloumn .item-list{display:block;}
.group-list.cloumn .item-list .item-wrap{margin:0 20px 10px 20px}
</style>