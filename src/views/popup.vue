<template>
    <div class="popup-wrap">
        {{ data[groupIdx]?.wfGroupItemList[workIdx] }}
        <div class="settigItem">
            <div class="settingItemTitle">워크 플로우 그룹명 <span>*</span></div>
            <div class="settingItemContent">
               {{ data[groupIdx]?.wfGroupName }}
            </div>
        </div>
        <div class="settigItem">
            <div class="settingItemTitle">워크선택 <span>*</span></div>
            <div class="settingItemContent">
                <v-select :items="filteredItems" v-model="form.wfComponentsCode" item-title="title" item-value="value"  :placeholder="'워크를 선택해 주세요.'" v-if="mode === 'add'" />
                <span v-else>{{ form.wfComponentsCode }}</span>
                
            </div>
        </div>
        <div class="settigItem">
            <div class="settingItemTitle">결재 여부 <span>*</span></div>
            <div class="settingItemContent">
                <span style="margin-right:5px;">결재 선택</span>
                <v-checkbox v-model="form.approval"  style="margin-top:-15px;"/>
            </div>
        </div>
        <div class="settigItem">
            <div class="settingItemTitle">워크 플로우 설명 <span>*</span></div>
            <div class="settingItemContent">
                <v-textarea type="text" placeholder="워크 플로우 설명을 입력해주세요." rows="3" v-model="form.wfGroupItemDesc" />
            </div>
        </div>
        <div class="list-button center">
            <v-btn color="primary" @click="saveWorkflow">저장</v-btn>
            <v-btn color="primary" @click="cancelWorkflow" style="margin-left:10px;">취소</v-btn>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed, watch, nextTick } from 'vue'
    
    const props = defineProps({
        data: {
            type: Array,
            default: [],
        },
        groupIdx: {
            type: Number,
            default: null,
        },
        workIdx: {
            type: Number,
            default: null,
        },
        mode: {
            type: String,
            default: 'add',
        },
    })
    const form = ref({
        wfComponentsCode: null,
        approval: false,
        wfGroupItemDesc: '',
        wfGroupName: props.data[props.groupIdx]?.wfGroupName,
    })
    const emit = defineEmits(['save', 'cancel'])
    
    const allItems = ref([
        { title: '변경요청 등록', value: 'CHANGE_REQUEST' },
        { title: '영향도 분석/위험 평가', value: 'RISK_ASSESSMENT' },
        { title: '변경계획 수립', value: 'CHANGE_PLANNING' },
        { title: '변경 승인', value: 'CHANGE_APPROVAL' },
        { title: '변경 실행', value: 'CHANGE_EXECUTION' },
        { title: '검증 및 확인', value: 'VERIFICATION_VALIDATION' },
        { title: '변경결과 리뷰', value: 'CHANGE_REVIEW' },
        { title: '변경 종료', value: 'CHANGE_COMPLETION' },
    ])
    
    // 이미 선택된 항목들을 제외한 필터링된 items
    const filteredItems = computed(() => {
        if (!props.data || props.data.length === 0) {
            return allItems.value
        }
        
        // 전체 그룹 리스트에서 모든 사용된 wfComponentsCode 수집
        const usedCodes = []
        props.data.forEach(group => {
            if (group.wfGroupItemList && Array.isArray(group.wfGroupItemList)) {
                group.wfGroupItemList.forEach(item => {
                    if (item.wfComponentsCode) {
                        usedCodes.push(item.wfComponentsCode)
                    }
                })
            }
        })
        
        // 사용된 코드를 제외한 items 반환
        return allItems.value.filter(item => !usedCodes.includes(item.value))
    })
    const saveWorkflow = () => {
        console.log(form.value)
        emit('save',  form.value)
    }
    const cancelWorkflow = () => {
        emit('cancel')
    }
    watch(
        () => props.mode,
        () => {
        if(props.mode === 'edit'){
            nextTick(() => {
            form.value.wfComponentsCode = props.data[props.groupIdx]?.wfGroupItemList[props.workIdx]?.wfComponentsCode
            form.value.approval = props.data[props.groupIdx]?.wfGroupItemList[props.workIdx]?.approvalYn
            form.value.wfGroupItemDesc = props.data[props.groupIdx]?.wfGroupItemList[props.workIdx]?.wfGroupItemDesc
            })
        }
        },
        { immediate: true },
    )
</script>
<style scoped>
    .popup-wrap{padding:10px; background-color:#fff; border-radius:10px; }
    .settigItem{display:flex; justify-content:space-between; align-items:stretch; border-bottom:solid 1px #ddd;}
    .settingItemTitle{font-size:14px; font-weight:bold; color:#000; flex:0 0 150px; background-color:#f1f1f1; padding:10px;}
    .settingItemContent{flex:1; padding:10px; background-color:#fff; display:flex; align-items:center;}
</style>
