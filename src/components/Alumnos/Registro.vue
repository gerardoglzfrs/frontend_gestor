<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡Registrado! <v-btn color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="msjerror" top>¡{{ msjErrorRegistro }}! <v-btn color="white" text @click="msjerror=false">Cerrar</v-btn></v-snackbar>

        <v-dialog v-model="openModelStudent" max-width="800" persistent>
            <v-form ref="formStudent" v-model="esValido">
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Registro</v-card-title>
                        <v-spacer />
                        <v-btn icon @click="closeModalStudent()"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-container fluid>
                        <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 5px;"><strong>Información del alumno</strong></v-card-subtitle>
                            <v-row>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="nomAlumno" prepend-icon="fa fa-user" label="Nombre" v-model="datosAlumno.nombre" clearable dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="apAlumno" prepend-icon="fa fa-id-card" label="Apellido paterno" v-model="datosAlumno.apellidoP" clearable dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="amAlumno" prepend-icon="fa fa-id-card" label="Apellido materno" v-model="datosAlumno.apellidoM" clearable dense />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="domicilioAlumno" prepend-icon="fa fa-map-marker" label="Domicilio" v-model="datosAlumno.domicilio" clearable dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field v-mask="mask" :rules="telefonoAlumno" type="text" prepend-icon="fa fa-phone" label="Número telefono" v-model="datosAlumno.telefono" clearable dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="correoAlumno" prepend-icon="fa fa-envelope" label="Correo" v-model="datosAlumno.correo" clearable dense />
                                </v-col>
                            </v-row>
                            <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 5px;"><strong>Información escolar</strong></v-card-subtitle>
                            <v-row>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="escuelaAlumno" prepend-icon="fa fa-university" label="Institución" v-model="datosAlumno.institucion" clearable dense/>
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="carreraAlumno" prepend-icon="fa fa-graduation-cap" label="Carrera" v-model="datosAlumno.carrera" clearable dense/>
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field v-mask="mask1" dense :rules="semestreAlumno" required v-model="datosAlumno.semestre" clearable prepend-icon="fa fa-sort" type="text" label="Semestre" min="1" max="13"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="usuarioAlumno" prepend-icon="fa fa-user" label="Usuario" v-model="datosAlumno.usuario" clearable dense />
                                </v-col>
                                <v-col cols="12" sm="6" md="4" lg="4">
                                    <v-text-field :rules="pswAlumno" prepend-icon="fa fa-lock" label="Contraseña" v-model="datosAlumno.psw" clearable dense
                                    :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"/>
                                </v-col>
                                <v-col cols="12" sm=" 6" md="4" lg="4">
                                    <v-text-field :rules="confirmacionPsw" prepend-icon="fa fa-lock" label="Confirmar" v-model="pswConfirm" clearable dense 
                                    :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show1 ? 'text' : 'password'"
                                    @click:append="show1 = !show1"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-btn :disabled="!esValido" block color="success" @click="agregarAlumno(datosAlumno)" rounded>Guardar registro</v-btn>
                            </v-row>
                             <div class="text-center my-2">
                                <span>¿Ya tienes una cuenta?</span><a @click="abrirLogin"> Inicia ahora</a>
                            </div>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import {EventBus} from '../../EventBus'
import { mapActions } from 'vuex'
import { mask, mask1 } from "vue-the-mask"

export default {
    name: 'RegistroAlumno',
    props: ['openModelStudent'],

    directives:{
        mask,
        mask1
    },

    data: () => ({
        mask: '(###)-###-####',
        mask1: '##',
        show: false,
        show1: false,
        regresarLogin: false,
        pswConfirm: "",
        msjsuccess: false,
        msjErrorRegistro: "",
        msjerror: false,
        esValido: true,
        items: ['1 Semestre','2 Semestre','3 Semestre','4 Semestre','5 Semestre','6 Semestre','7 Semestre','8 Semestre','9 Semestre','10 Semestre','11 Semestre','12 Semestre'],
        datosAlumno: {
            nombre: "",
            apellidoP: "",
            apellidoM: "",
            domicilio: "",
            telefono: "",
            correo: "",
            institucion: "",
            carrera: "",
            semestre: "",
            usuario: "",
            psw: "",
        },
        nomAlumno: [
            value => !!value || "El nombre es requerido",
            value => {
                const nombre = /[`~!@#$%^&*()_°¬|+\-=?;:'"1234567890,<>\{\}\[\]\\\/]/gi;
				return !nombre.test(value) || "Solo se permiten letras";
            }
        ],
        apAlumno: [
            value => !!value || "El apellido paterno es requerido",
            value => {
                const nombre = /[`~!@#$%^&*()_°¬|+\-=?;:'"1234567890,<>\{\}\[\]\\\/]/gi;
				return !nombre.test(value) || "Solo se permiten letras";
            }
        ],
        amAlumno: [
            value => !!value || "El apellido materno es requerido",
            value => {
                const nombre = /[`~!@#$%^&*()_°¬|+\-=?;:'"1234567890,<>\{\}\[\]\\\/]/gi;
				return !nombre.test(value) || "Solo se permiten letras";
            }
        ],
        domicilioAlumno: [
            value => !!value || "El domicilio es requerido",
        ],
        telefonoAlumno: [
            value => !!value || "El número de teléfono es requerido",
            value => (value || "").length === 14 || "Solo se permiten 10 digitos"
        ],
        correoAlumno: [
            value => !!value || "El correo es requerido",
            value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Correo invalido'
            },
            value => /.+@.+/.test(value) || "El correo debe de ser valido"
        ],
        escuelaAlumno: [
            value => !!value || "La institución es requerida",
            value => {
                const nombre = /[`~!@$%^&*()_°¬|+\-=?;:'",<>\{\}\[\]\\\/]/gi;
				return !nombre.test(value) || "Solo se permiten letras";
            }
        ],
        carreraAlumno: [
            value => !!value || "La carrera es requerida",
            value => {
                const nombre = /[`~!@#$%^&*()_°¬|+\-=?;:'"1234567890,<>\{\}\[\]\\\/]/gi;
				return !nombre.test(value) || "Solo se permiten letras";
            }
        ],
        semestreAlumno: [
            value => !!value || "El semestre es requerido",
            value => (value || "") <= 12 || "Semestre incorrecto"
        ],
        usuarioAlumno: [
            value => !!value || "El usuario es requerido",
            value => (value || "").length > 7 || "Minimo 8 caracteres"
        ],
        pswAlumno: [
            value => !!value || "La contraseña es requerida",
            value => (value || "").length > 7 || "Minimo 8 caracteres"
        ]        
    }),

    computed: {
        confirmacionPsw(){
            return [
                this.datosAlumno.psw === this.pswConfirm || "La contraseña no coincide"
            ]
        }
    },

    methods: {
        closeModalStudent(){
            EventBus.$emit('closeModalStudent');
            try {
                this.$refs.formStudent.reset();
            } catch (error) {
            }
        },

        abrirLogin(){
            this.closeModalStudent();
            EventBus.$emit("cerrarRegistro")
        },

        ...mapActions(["agregarAlumno"]),
    },

    mounted() {
        document.addEventListener("keydown", event => {
            const keypressed = event.key;
            if(keypressed === "Escape"){
                this.closeModalStudent();
            }
        });

        EventBus.$on('successRegistro',(msj) => {
            this.msjsuccess = true;
            setTimeout(() => {
                EventBus.$emit('cerrarRegistro',(msj));
                this.msjsuccess = false;
                try {
                    this.$refs.formStudent.reset();
                } catch (error) {
            }
            },3000)
        });

        EventBus.$on('errorRegistro', (msj)=>{
            this.msjErrorRegistro = msj;
            this.msjerror = true;
            setTimeout(()=>{
                this.msjerror = false;
            }, 3000);
        });
    }

}
</script>
