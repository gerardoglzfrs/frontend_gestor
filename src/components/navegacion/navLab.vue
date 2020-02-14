<template>
    <v-toolbar color="primary" dark>
        <v-toolbar-title><v-img src="@/assets/logo.png"></v-img></v-toolbar-title>
        <v-spacer />
        <v-toolbar-title>Gerardo González Flores</v-toolbar-title>
        <v-tooltip bottom>
            <template v-slot:activator="{on}">
                <v-btn text icon color="" v-on="on">
                    <v-icon>fa fa-plus</v-icon>
                </v-btn>
            </template>
            <span>Nuevo proyecto</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{on}">
                <v-btn text icon color="" v-on="on">
                    <v-icon>fa fa-tasks</v-icon>
                </v-btn>
            </template>
            <span>Proyectos</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn text icon color="" v-on="on">
                <v-icon>fa fa-sign-out-alt</v-icon>
              </v-btn>
            </template>
            <span>Cerrar sesion</span>
        </v-tooltip>
    </v-toolbar>
</template>

<script>
export default {
    name: "navLab"
    

}
</script>