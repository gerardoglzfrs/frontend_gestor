<template>
    <div>
        <v-dialog v-model="agregarLaboratorio" max-width="700" persistent>
            <v-form ref="formLaboratorio"> 
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Agregar nuevo laboratorio</v-card-title>
                        <v-spacer />
                        <v-btn icon @click="cerrarModal()"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-card-subtitle class="subtitle-2" front-weight-black><strong>Datos del laboratorio</strong></v-card-subtitle>
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12">
                                <v-file-input accept="image/*" label="Logo de la institución" prepend-icon="fa fa-file-image" v-model="datosRegistro.imagen"></v-file-input>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-id-card" label="Nombre del laboratorio" v-model="datosRegistro.nombre" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-user" label="Usuario" v-model="datosRegistro.usuario" clearable />
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field  prepend-icon="fa fa-lock" label="Contraseña" v-model="datosRegistro.psw" clearable />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-btn block color="success" rounded>Agregar laboratorio</v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from '../../EventBus'

export default {
    props: ['agregarLaboratorio'],
    name: 'NuevoLaboratorio',

    data: () => ({
        datosRegistro: {
            imagen: null,
            nombre: '',
            usuario: '',
            psw: ''
        }
    }),

    methods: {  
      cerrarModal(){
            this.$refs.formLaboratorio.reset();
            EventBus.$emit("cerrarRegistroLab");
        }
    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key; 
            if(keypressed === "Escape"){
                this.cerrarModal();
            }    
        });
    }
}
</script>
