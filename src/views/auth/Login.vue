<template>
  <form @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-md-4 offset-md-2 login-container">
        <h1>{{ $t('hello') }}</h1>
        <p class="subtitle">{{ $t('auth.field-completion-label') }}</p>

        <div class="form-group" :class="{ error: v$.form.email.$errors.length }">
            <label class="lbl">{{ $t('email-address') }}</label>
            <br>
            <input v-model="v$.form.email.$model" class="fields custom-input">
            <!-- error message -->
            <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
              <div class="error-msg" v-if="error.$validator === 'required'">{{ $t('validations.required') }}</div>
              <div class="error-msg" v-if="error.$validator === 'email'">{{ $t('validations.email') }}</div>
            </div>
        </div>

        <br>

        <div class="form-group" :class="{ error: v$.form.password.$errors.length }">
          <label class="lbl">{{ $t('password') }}</label>
          <br>
          <input v-model="v$.form.password.$model" type="password" class="fields custom-input">
          <!-- error message -->
          <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
              <div class="error-msg" v-if="error.$validator === 'required'">{{ $t('validations.required') }}</div>
          </div>
        </div>

        <br><br>

        <button class="custom-btn">{{ $t('auth.login') }}</button>
      </div>

      <div class="col-md-4 img-container">
        <img class="city-img" src="../../assets/images/smartwaste.png"/> 
      </div>
    </div>
  </form>
  
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  validations() {
    return {
      form: {
        email: {
          required, 
          email 
        },
        password: {
          required
        },
      },
    }
  },
  methods: {
    onSubmit() {
      this.v$.$touch();
      if (this.v$.$error) {
        this.$swal({
          icon: 'error',
          title: this.$t('error'),
          text: this.$t('form-validation-failed'),
        });
        return;
      }
      // actually submit form

      // redirect the page
      this.$router.push({name: 'Statistics'});
    }
  },
  created: function () {
    document.body.className = "login-map-background";
  },
  unmounted: function () {
    document.body.className = null;
  },
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
  .fields {
    font-size: 14px;
    letter-spacing: 0px;
    color: #292A2F;
    width: 60%;
  }
  .row {
    margin-top: 80px;
    width: 100%;
  }
  .city-img {
    width: -webkit-fill-available;
    height: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    object-fit: cover;
  }
  .login-container {
    background-color: white;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 50px;
  }
  .img-container {
    padding-left: 0px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  @media only screen and (max-width: 768px) {
    .city-img {
      display: none;
    }

    .row {
      text-align: center;
    }
  }
</style>