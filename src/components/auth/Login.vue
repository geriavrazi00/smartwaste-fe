<template>
  <div>
    <h1>Përshëndetje!</h1>
    <p class="subtitle">Ju lutem plotësoni e-mail-in tuaj dhe fjalëkalimin</p>
    
    <div>
      <div>
        <label class="lbl">Adresa e-mail</label>
        <br>
        <input v-model="email" class="fields">
      </div>

      <br>

      <div>
        <label class="lbl">Fjalëkalimi</label>
        <br>
        <input v-model="password" type="password" class="fields">
      </div>

      <br><br>

      <button class="login">Hyr</button>
    </div>
  </div>
  
</template>

<script>
export default {
  props: [],
  data() {
  return {
    email: "",
      password: ""
  }
  },
  methods: {}
}
</script>

<style scoped>
  h1 {
    font-family: ttcommons-bold;
    font-size: 36px;
    letter-spacing: 0px;
    color: #272D3B;
  }
  .subtitle {
    font-size: 17px;
    letter-spacing: 0px;
    color: #9696A7;
  }
  .lbl {
    font-size: 20px;
    letter-spacing: 0px;
    color: #222222;
  }
  .login {
    background: #37CEB7 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 10px #00000029;
    border-radius: 7px;
    font: normal normal normal 17px;
    letter-spacing: 0px;
    color: #FFFFFF;
    width: 148px;
    border: transparent;
    padding: 5px;
    cursor: pointer;
  }
  .fields {
    font-size: 14px;
    letter-spacing: 0px;
    color: #292A2F;
    opacity: 1;
  }
</style>