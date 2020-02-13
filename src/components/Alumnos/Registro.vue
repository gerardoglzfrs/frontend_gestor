<template>
    <div>
        <v-dialog v-model="openModelStudent" max-width="700" persistent>
            <v-form ref="formStudent">
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Registro</v-card-title>
                        <v-spacer />
                        <v-btn icon @click="closeModalStudent"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-card-subtitle class="subtitle-2 font-weight-black"><strong>Información del alumno</strong></v-card-subtitle>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-user" label="Nombre"  v-model="datosRegistro.nombre" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-id-card" label="Apellido paterno" v-model="datosRegistro.apellidoP" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-id-card" label="Apellido materno" v-model="datosRegistro.apellidoM" clearable />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-map-marker" label="Domicilio" v-model="datosRegistro.domicilio" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-phone" label="Numero telefono" v-model="datosRegistro.telefono" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-envelope" label="Correo" v-model="datosRegistro.correo" clearable />
                            </v-col>
                        </v-row>
                       
                        <v-card-subtitle class="subtitle-2 font-weight-black"><strong>Información escolar</strong></v-card-subtitle>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-university" label="Institución" v-model="datosRegistro.institucion" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-graduation-cap" label="Carrera" v-model="datosRegistro.carrera" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-select prepend-icon="fa fa-sort" label="Semestre" v-model="datosRegistro.semestre" :items="items"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-user" label="Usuario" v-model="datosRegistro.usuario" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field  prepend-icon="fa fa-lock" label="Contraseña" v-model="datosRegistro.psw" clearable />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-btn block color="success" rounded>Guardar registro</v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import {EventBus} from '../../EventBus'

export default {
    name: 'RegistroAlumno',
    props: ['openModelStudent'],

    data: () => ({
        items: ['1 Semestre','2 Semestre','3 Semestre','4 Semestre','5 Semestre','6 Semestre','7 Semestre','8 Semestre','9 Semestre','10 Semestre','11 Semestre','12 Semestre'],
        datosRegistro: {
            nombre: "",
            apellidoP: "",
            apellidoM: "",
            domicilio: "",
            telefono: "",
            correo: "",
            institucion: "",
            carrera: "",
            semestre: 0,
            usuario: "",
            contraseña: ""
        }
    }),

    methods: {
        closeModalStudent(){
            // this.$refs.formStudent.reset();
            EventBus.$emit('closeModalStudent');
        }
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
