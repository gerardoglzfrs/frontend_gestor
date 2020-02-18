<template>
    <div>
        <v-dialog v-model="openModelStudent" max-width="800" persistent>
            <v-form ref="formStudent" v-model="esValido">
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Registro</v-card-title>
                        <v-spacer />
                        <v-btn icon @click="closeModalStudent()"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-card-subtitle class="subtitle-2 font-weight-black"><strong>Información del alumno</strong></v-card-subtitle>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="nomAlumno" prepend-icon="fa fa-user" label="Nombre"  v-model="datosAlumno.nombre" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="apAlumno" prepend-icon="fa fa-id-card" label="Apellido paterno" v-model="datosAlumno.apellidoP" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="amAlumno" prepend-icon="fa fa-id-card" label="Apellido materno" v-model="datosAlumno.apellidoM" clearable />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="domicilioAlumno" prepend-icon="fa fa-map-marker" label="Domicilio" v-model="datosAlumno.domicilio" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="telefonoAlumno" prepend-icon="fa fa-phone" label="Numero telefono" v-model="datosAlumno.telefono" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="correoAlumno" prepend-icon="fa fa-envelope" label="Correo" v-model="datosAlumno.correo" clearable />
                            </v-col>
                        </v-row>
                        <v-card-subtitle class="subtitle-2 font-weight-black"><strong>Información escolar</strong></v-card-subtitle>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="escuelaAlumno" prepend-icon="fa fa-university" label="Institución" v-model="datosAlumno.institucion" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="carreraAlumno" prepend-icon="fa fa-graduation-cap" label="Carrera" v-model="datosAlumno.carrera" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-select :rules="semestreAlumno" prepend-icon="fa fa-sort" label="Semestre" v-model="datosAlumno.semestre" :items="items"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="usuarioAlumno" prepend-icon="fa fa-user" label="Usuario" v-model="datosAlumno.usuario" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="pswAlumno" prepend-icon="fa fa-lock" label="Contraseña" v-model="datosAlumno.psw" clearable />
                            </v-col>
                            <!-- <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field :rules="confirmacionPsw"  prepend-icon="fa fa-lock" label="Confirmar contraseña" v-model="datosAlumno.psw" clearable />
                            </v-col> -->
                        </v-row>
                        <v-row>
                            <v-btn :disabled="!esValido" block color="success" @click="agregarAlumno(datosAlumno)" rounded>Guardar registro</v-btn>
                        </v-row>

                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import {EventBus} from '../../EventBus'
import { mapActions } from 'vuex'


export default {
    name: 'RegistroAlumno',
    props: ['openModelStudent'],


    data: () => ({
        regresar: false,
        items: ['1 Semestre','2 Semestre','3 Semestre','4 Semestre','5 Semestre','6 Semestre','7 Semestre','8 Semestre','9 Semestre','10 Semestre','11 Semestre','12 Semestre'],
        esValido: true,
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
            psw: ""
        },
        nomAlumno: [
            value => !!value || "El nombre es requerido",
        ],
        apAlumno: [
            value => !!value || "El apellido paterno es requerido"
        ],
        amAlumno: [
            value => !!value || "El apellido materno es requerido"
        ],
        domicilioAlumno: [
            value => !!value || "El domicilio es requerido"
        ],
        telefonoAlumno: [
             value => !!value || "El número de teléfono es requerido"
        ],
        correoAlumno: [
            value => !!value || "El correo es requerido"
        ],
        escuelaAlumno: [
            value => !!value || "La institución es requerida"
        ],
        carreraAlumno: [
            value => !!value || "La carrera es requerida"
        ],
        semestreAlumno: [
            value => !!value || "El semestre es requerido"
        ],
        usuarioAlumno: [
            value => !!value || "El usuario es requerido"
        ],
        pswAlumno: [
            value => !!value || "La contraseña es requerida"
        ],
        // confirmacionPsw: [
        //     value => !!value || "La confirmacion es requerida"
        // ]
    }),

    methods: {
        closeModalStudent(){
            // this.$refs.formStudent.reset();
            EventBus.$emit('closeModalStudent');
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
    }

}
</script>
