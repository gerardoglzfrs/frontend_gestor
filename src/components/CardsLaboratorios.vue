<template>
    <v-container>
        <h1 class="title">Laboratorios a nivel nacional</h1>
            <p class="font-weight-light">
                En este apartado podras visualizar cada uno de los laboratorios que existen a nivel nacional asi como el catalogo de proyectos
                con los que cuenta cada laboratorio.
            </p>
        <v-row>
            <v-col cols="12" md="4" lg="3" sm="6"  v-for="item of info" :key="item.title" class="my-2">
                <v-card elevation="5">
                    <v-list-item> 
                        <v-list-item-content>
                            <v-list-item-title class="subtitle-2"><p>{{ item.title }}</p></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img>
                    <v-card-text class="text--primary">
                        <div><strong>Total de proyectos: </strong>20</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.title} }" v-if="usuarioLogeado.tipUsuario === '0'" >Ver proyectos admin</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.title} }" v-else-if="usuarioLogeado.tipUsuario === '1'">Ver proyectos lab</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.title} }" v-else-if="usuarioLogeado.tipUsuario === '2'">Ver proyectos al</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.title} }" v-else>Ver catalogos</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name:'Metodologia'}">metodologia</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "CardsLaboratorios",
    data: () => ({
        info: [
            {title: "Universidad Tecnológica de Queretaro", cantidad: "20"},
            {title: "Instituto Tecnológico de Chihuahua", cantidad: "20"},
            {title: "Universidad Politécnica de Yucatán", cantidad: "20"}, 
            {title: "Instituto Tecnológico y de Estudios Superiores de Monterrey", cantidad: "20"}, 
            {title: "Laboratorio de Software Libre Zacatecas", cantidad: "20"}, 
            {title: "Benemérita Universidad Autónoma de Puebla", cantidad: "20"},
            {title: "Centro de Enseñanza Técnica y Superior, Universidad Baja California",cantidad: "20"},
        ]
    }),

    computed: {
        ...mapState(['usuarioLogeado'])
    },

   
}
</script>
