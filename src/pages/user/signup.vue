<template lang="html">
  <div class="signup container">
    <div class="step">
      <ul>
        <li class="active">
          <span>1</span>
          <div>手机验证</div>
        </li>
        <li>
          <span>2</span>
          <div>企业基本信息</div>
        </li>
        <li>
          <span>3</span>
          <div>后台验证</div>
        </li>
      </ul>
    </div>
    
    <div class="row">
      <div class="col s12">This div is 12-columns wide on all screen sizes</div>
      <div class="col s6">6-columns (one-half)</div>
      <div class="col s6">6-columns (one-half)</div>
    </div>
    <div class="row">
     <div class="col s12">
       <div class="card white">


         <input-box></input-box>
         <div class="card-content">
           <span class="card-title"></span>
           <p></p>
         </div>
         <div class="card-action">
           <button class="btn btn-primary">立即注册</button>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import InputBox from '@/components/InputBox'

export default {
  components: {
    InputBox,
  },
}
</script>

<style lang="scss">
.step {
    width: 100%;
}
.card {
    width: 100%;
}
</style>
