<template>
    <v-toolbar color="primary" dark>
        <v-toolbar-items>
            <v-img src="@/assets/logo.png" />
        </v-toolbar-items>
        <v-spacer />
        <v-toolbar-title>Gerardo González Flores</v-toolbar-title>
        <v-tooltip bottom>
            <template v-slot:activator="{on}">
                <v-btn text icon color="" v-on="on">
                    <v-icon>fa fa-user</v-icon>
                </v-btn>
            </template>
            <span>Mi perfil</span>
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

}
</script>