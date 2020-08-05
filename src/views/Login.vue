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
        </div>
        <div class="card-action">
            <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
                Войти
                <i class="material-icons right">send</i>
            </button>
            </div>

            <p class="center">
                Нет аккаунта?
                <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/constants/messages'
export default {
    data: () => ({
        email: '',
        password: ''
    }),
    validations: {
        email: {email, required},
        password: {required, minLength: minLength(6)}
    },
    methods: {
        async submitForm() {
            if(this.$v.$invalid) {
                this.$v.$touch();
                return;
            }
            const formData = {
                email: this.email,
                password: this.password
            }
            try {
                await this.$store.dispatch('login', formData);
                this.$router.push('/');
                this.$message(messages.login)
            } catch (error) {}
        }
    },
}
</script>