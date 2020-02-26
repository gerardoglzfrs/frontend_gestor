<template>
  <div>
    <v-card elevation="6">
      <v-toolbar>
        <v-card-title>Datos personales</v-card-title>
        <v-spacer />
        <v-icon>fa fa-user</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-container fluid>
          <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 5px;"><strong>Información del alumno</strong></v-card-subtitle>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-user" label="Nombre" clearable dense />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-id-card" label="Apellido paterno" clearable dense />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-id-card" label="Apellido materno" clearable dense />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-map-marker" label="Domicilio" clearable dense />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-phone" label="Número de telefono" clearable dense />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-envelope" label="Correo" clearable dense />
            </v-col>
          </v-row>
          <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 5px;"><strong>Información escolar</strong></v-card-subtitle>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-university" label="Institución" clearable dense />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-graduation-cap" label="Carrera" clearable dense />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field type="text" prepend-icon="fa fa-sort" label="Semestre" clearable dense />
            </v-col>
          </v-row>
          <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 5px;"><strong>Cuenta</strong></v-card-subtitle>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-user" label="Usuario" clearable dense />
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-lock" label="Contraseña" clearable dense
              :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"/>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-text-field prepend-icon="fa fa-lock" label="Contraseña" clearable dense
              :append-icon="show1 ? 'fa fa-eye' : 'fa fa-eye-slash'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-btn class="px-6"  large color="primary" outlined>Modificar datos</v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-btn class="px-11" large color="green" outlined>Actualizar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
    name: "InfoDelAlumno",

    data: ()=>({
      show: false,
      show1:false
    })
}
</script>
