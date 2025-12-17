<script setup>
</script>

<template>
  <div class="app">
   <div class="app-content">
    <router-view />
   </div>
  </div>
</template>
<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

</script>
<style>
.app {
  width: 100%;
  height: 100%;
}
.app-content{width:1500px; margin:0 auto; padding:20px; background-color:#f1f1f1;}
.title{font-size:24px; font-weight:bold; color:#000;}

  .list-button{display:flex; justify-content:flex-end; margin-top:20px;}
  .list-button.center{justify-content:center;}
  .serch-wrap{display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; margin-top:20px;}
  .serch-input{flex:0 0 300px;}
  .v-field {width:100%; height:40px; border:1px solid #ddd; border-radius:5px; padding:0 10px; background-color:#fff;}
  .v-field__field{height:40px;}
  .v-field--variant-filled .v-field__overlay{background-color:#fff}
  .v-input--density-default .v-field__input{min-height:40px; max-height:40px;}
  .v-field__input{padding:0 !important; line-height:38px !important;}
  .v-field__field{height:40px;}

  .v-input{height:40px;}
  .v-textarea .v-field__field{height:auto !important; min-height:40px !important;}
  .v-textarea.v-input{height:auto !important;}
  .v-textarea .v-field{height:auto !important;}
  .v-table > .v-table__wrapper > table > thead > tr > th{font-size:14px; font-weight:bold; color:#000; background-color:#f7f9fa;}
  .v-field--variant-filled .v-field__overlay{background-color:#fff !important;}
  .v-field__outline{display:none !important;}
</style>



