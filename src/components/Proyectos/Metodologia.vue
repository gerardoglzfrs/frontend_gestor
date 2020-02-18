<template>
    <div>
        <v-container>
            <v-card color="grey lighten-3">
                <v-card-title>Metodología</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <v-text-field prepend-icon="fas fa-user-circle" label="Nombre de la metodología" clearable />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field prepend-icon="fas fa-user-circle" label="Nombre de la fase" clearable />
                        </v-col>
                        <v-col cols="10" sm="5" md="5" lg="5">
                            <v-text-field prepend-icon="fas fa-user-circle" label="Nombre de actividad" clearable />
                        </v-col>
                        <v-col cols="2" sm="3" md="3" lg="3">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn text icon color="primary" class="mt-4" v-on="on">
                                        <v-icon>fa fa-plus</v-icon>
                                    </v-btn>
                                </template>
                                <span>Agregar fase</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-btn class="success ml-7">Agregar</v-btn>
                        </v-col>
                    </v-row>
                    <!-- Tabla de metodologia -->
                    <v-toolbar class="mt-5" flat color="white">
                        <v-toolbar-title><p class="title">Metodología</p></v-toolbar-title>
                    </v-toolbar> 
                    <v-data-table :headers="headers" >

                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>

export default {
    name: 'Metodologia',

    data: () => ({
        headers: [
            {text: "Actividad", value: "actividad"}
        ]
    })
}
</script>
