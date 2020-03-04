<template>
    <div>
        <v-snackbar color="green" v-model="msjsuccess" top>¡{{ msjSatisfactorio }}! <v-btn color="white" text @click="msjsuccess=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="msjerror" top>¡{{ msjErrorRegistro }}! <v-btn color="white" text @click="msjerror=false">Cerrar</v-btn></v-snackbar>

        <v-dialog v-model="agregarLaboratorio" max-width="950" persistent>
            <v-form ref="formLaboratorio" v-model="isValid"> 
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Agregar nuevo laboratorio</v-card-title>
                        <v-spacer />
                        <v-btn icon @click="cerrarModal()"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-card-subtitle class="subtitle-2" front-weight-black style="padding: 5px;"><strong>Datos del laboratorio</strong></v-card-subtitle>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-text-field :rules="nombre" prepend-icon="fa fa-id-card" label="Nombre del laboratorio" v-model="datosRegistro.nombre" clearable />
                                </v-col>
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-select :rules="tipLabs" :items="tipLab"  prepend-icon="fa fa-university" label="Tipo de laboratorio" v-model="datosRegistro.tipoLaboratorio"  clearable />
                                </v-col>
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-file-input :rules="ruleslogo" @change="obtenerlogo($event)" accept="image/*" label="Logo de la institución" prepend-icon="fa fa-file-image" show-size chips></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-text-field :rules="usuario" prepend-icon="fa fa-user" label="Usuario" v-model="datosRegistro.usuario" clearable />
                                </v-col>
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-text-field :rules="contraseña" prepend-icon="fa fa-lock" label="Contraseña" v-model="datosRegistro.psw" clearable 
                                    :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append="show = !show"/>
                                </v-col> 
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <v-text-field :rules="confirmacionPsw" prepend-icon="fa fa-lock" label="Confirmar" v-model="pswConfirm" clearable 
                                    :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
                                    :type="show1 ? 'text' : 'password'"
                                    @click:append="show1 = !show1"
                                    />
                                </v-col>    
                            </v-row>
                        </v-container>
                            <v-row>
                                <v-btn :disabled="!isValid" block color="success" rounded @click="guardarLaboratorio()">Agregar laboratorio</v-btn>
                            </v-row>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import { EventBus } from '../../EventBus'
import gql from 'graphql-tag'

export default {
    props: ['agregarLaboratorio'],
    name: 'NuevoLaboratorio',
    data: () => ({
        logo:  {},
        msjsuccess: false,
        msjerror: false,
        msjErrorRegistro: "",
        msjSatisfactorio: "",
        show: false,
        show1: false,
        pswConfirm: "",
        tipLab:['Intel', 'Labsol'],
        datosRegistro: {
            nombre: '',
            tipoLaboratorio: '',
            usuario: '',
            psw: ''
        },
        ruleslogo: [
            value => !!value || "La imagen es requerida",
            value => !value || value.size < 1000000 || "El archivo debe de pesar menos de 1mb"
        ],
        nombre: [
            value => !!value || "El nombre requerido"
        ],
        tipLabs: [
             value => !!value || "Seleccione el tipo de laboratorio"
        ],
        usuario: [
            value => !!value || "El usuario requerido"
        ],
        contraseña: [
            value => !!value || "El contraseña requerido"
        ],
        isValid: true

    }),

    computed:{
        confirmacionPsw(){
            return [
                this.datosRegistro.psw === this.pswConfirm || "La contraseña no coincide"
            ]
        }
    },

    methods: {  
        cerrarModal(){
            EventBus.$emit("cerrarRegistroLab");
            try {
                this.$refs.formLaboratorio.reset();                
            } catch (error) {
            }
        },

        obtenerlogo(e){
            this.logo = e;
        },
        
        async guardarLaboratorio(){
            try {              
                const {data} = await this.$apollo.mutate({
                    mutation: gql`
                        mutation($nombre: String!, $tipoLaboratorio: String!, $usuario: String!, $psw: String!)
                        {
                            nuevoLab(nombre: $nombre, tipoLaboratorio: $tipoLaboratorio, usuario: $usuario, clave: $psw)
                        }
                    `,
                    variables: {
                        nombre: this.datosRegistro.nombre,
                        tipoLaboratorio: this.datosRegistro.tipoLaboratorio,
                        usuario: this.datosRegistro.usuario,
                        psw: this.datosRegistro.psw
                    }
                })
                // Mandar el logo
                let formData = new FormData();
                formData.append("imagen",this.logo, `${this.datosRegistro.nombre}.jpg`);

                await axios.post("/api/logos/upload", formData, {
                    headers: {
                        "Content-Type":"multipart/form-data",
                        "labname":`${this.datosRegistro.nombre}`,
                        Autorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                const msj = data.nuevoLab
                if (msj == "Laboratorio registrado") {
                    this.msjSatisfactorio = msj;
                    this.msjsuccess = true;
                    setTimeout(()=>{
                        this.msjsuccess = false;
                        EventBus.$emit("cerrarModelNuevoLaboratorio");
                        try {
                            this.$refs.formLaboratorio.reset();
                        } catch (error) {
                        }
                    }, 3000);
                    EventBus.$emit("actualizar");
                } else {
                    this.msjErrorRegistro = msj;
                    this.msjerror = true;
                    setTimeout(()=>{
                        this.msjerror = false;
                    },3000);
                }
                
            } catch (error) {
                
            }
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
