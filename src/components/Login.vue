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
                        <v-row>
                            <v-col cols="12">
                                <v-text-field :rules="rulesUser" prepend-icon="fas fa-user-circle" label="Usuario" v-model="usuario.usuario" clearable />
                            </v-col>
                        </v-row>
                         <v-row>
                            <v-col cols="12">
                                <v-text-field :rules="rulesPsw" prepend-icon="fas fa-lock" label="Contraseña" v-model="usuario.password" clearable
                                    :append-icon="usuario.show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="usuario.show ? 'text' : 'password'"
                                    @click:append="usuario.show = !usuario.show"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-btn block :disabled="!isValid" color="success" @click="login(usuario)" rounded>Ingresar</v-btn>
                        </v-row>
                        <div class="text-center my-2">
                            <span>¿No tienes cuenta?</span><a @click="openModalStudent()"> Regístrate ahora</a>
                            <Registro :openModelStudent="openFormStudent"/>
                        </div>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from '../EventBus'
import Registro from '@/components/Alumnos/Registro.vue'
import { mapActions } from 'vuex'

export default {
    props: ['openModel'],
    name: 'login',
    components: {Registro},

    data: () => ({
        openFormStudent: false,
        isValid: true,
        rulesUser: [
            value => !!value || "Usuario requerido",
            value => (value || '').length >= 8 || "El usuario debe de tener 8 caracteres" 
        ],
        rulesPsw: [
            value => !!value || "Contraseña requerida",
            value => (value || '').length >= 8 || "La contraseña debe de tener un minimo de 8 caracteres" 
        ],
        usuario: {
            usuario: '',
            password: '',
            show: false
        }
    }),

    methods: {
        openModalStudent(){
            this.openFormStudent = true;
            EventBus.$emit("closeLogin");
        },
        
        closeModalLogin(){
            this.$refs.formLogin.reset();
            EventBus.$emit("closeLogin");
        },

        ...mapActions(["login"])
    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key;
            if(keypressed === "Escape"){
                this.closeModalLogin();
            }
        });
        
        EventBus.$on('closeModalStudent', ()=>{
            this.openFormStudent = false;    
        });
    }

}
</script>
