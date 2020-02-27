<template>
    <div>
        <v-dialog v-model="openModel" max-width="400" persistent>
            <v-form ref="formLogin" v-model="isValid">
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Iniciar sesión</v-card-title> 
                        <v-spacer />
                        <v-btn icon @click="closeModalLogin()"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field :rules="rulesUser" prepend-icon="fas fa-user-circle" label="Usuario" v-model="user.usuario" clearable />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field :rules="rulesPsw" prepend-icon="fas fa-lock" label="Contraseña" v-model="user.password" clearable
                                        :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                        :type="show ? 'text' : 'password'"
                                        @click:append="show = !show"/>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-btn block :disabled="!isValid" color="success" @click="login(user)" rounded>Ingresar</v-btn>
                            </v-row>
                        </v-container>
                        <div class="text-center my-2">
                            <span>¿No tienes cuenta?</span><a @click="openModalStudent"> Regístrate ahora</a>
                        </div>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from '../EventBus'
import { mapActions } from 'vuex'

export default {
    props: ['openModel'],
    name: 'Login',

    data: () => ({
        openFormStudent: false,
        isValid: true,
        rulesUser: [
            value => !!value || "Usuario requerido",
            value => (value || '').length >= 2 || "El usuario debe de tener 8 caracteres" 
        ],
        rulesPsw: [
            value => !!value || "Contraseña requerida",
            value => (value || '').length >= 2 || "La contraseña debe de tener minimo 8 carateres"
        ],
        user: {
            usuario: '',
            password: '',
        },
        show: false
    }),

    methods: {
        openModalStudent(){
            EventBus.$emit("openModalStudent")
        },
        
        closeModalLogin(){
        EventBus.$emit("closeLoginTachita");
            try {
                this.$refs.formLogin.reset();
            } catch (error) {
            }
        },

        ...mapActions(["login"]),
    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key;
            if(keypressed === "Escape"){
                this.closeModalLogin();
            }
        });
    }

}
</script>
