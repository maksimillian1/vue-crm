<template>
  <form class="card auth-card" @submit.prevent="submitForm">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
                <input
                    id="email"
                    type="text"
                    v-model="email"
                    :class="{invalid: $v.email.$dirty && (!$v.email.required || !$v.email.email)}"
                >
                <label for="email">Email</label>
                <small 
                class="helper-text invalid"
                v-if="$v.email.$dirty && !$v.email.email"
                >
                    Invalid email
                </small>
                <small 
                class="helper-text invalid"
                v-if="$v.email.$dirty && !$v.email.required"
                >
                    Missing email
                </small>
                
            </div>
            <div class="input-field">
                <input
                id="password"
                type="password"
                v-model="password"
                :class="{invalid: $v.password.$dirty && (!$v.password.required || !$v.password.minLength)}"
                >
                <label for="password">Пароль</label>
                <small 
                class="helper-text invalid"
                v-if="$v.password.$dirty && !$v.password.minLength"
                >
                    Invalid password
                </small>
                <small 
                class="helper-text invalid"
                v-if="$v.password.$dirty && !$v.password.required"
                >
                    Missing password
                </small>
            </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            :class="{invalid: $v.name.required && $v.name.$dirty}"
            v-model="name"
        >
        <label for="name">Имя</label>
        <small 
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          Missing name
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="isAgreementChecked" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            :disabled="!isAgreementChecked"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
    data: () => ({
        email: '',
        password: '',
        name: '',
        isAgreementChecked: false
    }),
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(6)},
        name: {required},
        isAgreementChecked: {checked: v => v}
    },
    methods: {
        async submitForm() {
            if(this.$v.$invalid) {
                this.$v.$touch();
                return;
            }
            const formData = {
                email: this.email,
                password: this.password,
                name: this.name
            }
          try {
            await this.$store.dispatch('register', formData)
            this.$router.push('/');            
          } catch (error) {}
        }
    }
}
</script>