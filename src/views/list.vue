<template>
    <div>
        <h1 class="title">워크 플로우 목록</h1>
        <div class="list-wrap">
            
            <div class="serch-wrap">
                <div class="serch-input">
                    <v-text-field type="text" placeholder="검색어를 입력해주세요." prepend-inner-icon="mdi-magnify"  v-model="search"/>
                </div>
                <div style="display:flex; align-items:center;">
                    <span style="display:inline-block;margin-right:10px;">Date:{{ date }}</span>
                    <v-icon icon="mdi-refresh" style="cursor:pointer; margin-right:10px;" @click="refresh"/>
                    <v-select :items="['10', '20', '30']" v-model="itemsPerPage" @update:model-value="setListLength" />
                </div>
            </div>
            <div class="list-table">
                <v-data-table
                    :headers="headers"
                    :items="filteredItems"
                    class="elevation-1"
                    hide-default-footer
                >
                <template #[`item.name`]="{ item }">
                    <span style="color:#1297f2">{{ item.name }}
                        <v-icon icon="mdi-open-in-new" />
                    </span>
                </template>
                </v-data-table>
                <div class="pagination-wrap">
                    <v-pagination
                        v-model="currentPage"
                        :length="totalPages"
                        :total-visible="7"
                    ></v-pagination>
                </div>
            </div>
            <div class="list-button">
                <v-btn color="primary" @click="createWorkflow">워크플로우 생성</v-btn>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed,onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const headers = ref([
        { title: '문서번호', key: 'docNo' },
        { title: '워크플로우명', key: 'name' },
        { title: '업무유형', key: 'type' },
        { title: '작성일자', key: 'date' },
    ])
    const items = ref([
        { docNo: '1', name: '일반변경관리 ', type: '업무유형1', date: '2025-01-01' },
        { docNo: '2', name: '표준변경관리', type: '업무유형2', date: '2025-01-02' },
        { docNo: '3', name: '긴급변경관리', type: '업무유형3', date: '2025-01-03' },
    ])
    
    // 페이지네이션 관련
    const itemsPerPage = ref(10)
    const currentPage = ref(1)
    const search = ref('')
    const filteredItems = computed(() => {
        return items.value.filter(item => item.name.includes(search.value))
    })
    const totalPages = computed(() => {
        return Math.ceil(items.value.length / itemsPerPage.value)
    })
    
    
    const refresh = () => {
        search.value = ''
        currentPage.value = 1
    }
    const date = ref('')
    const getDate = () => {
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const day = today.getDate()
        const time = today.getHours()
        const minute = today.getMinutes()
        const second = today.getSeconds()
        date.value = `${year}-${month}-${day} ${time}:${minute}:${second}`
    }
    
    const setListLength = () => {
        if(itemsPerPage.value > items.value.length){
           alert('현재 리스트의 개수는 '+items.value.length+'개입니다.')
           itemsPerPage.value = 10
           return
        }
       console.log('페이지당 항목 수:')
    }
    const createWorkflow = () => {
        router.push('/view')
    }
    onMounted(() => {
        getDate()
    })
</script>