 <template>
    <div>
        <v-toolbar color="primary" dark >
            <v-toolbar-items>
                <v-img src="@/assets/logo.png" />
            </v-toolbar-items>
            <v-spacer />
            <v-toolbar-title>Gerardo González Flores</v-toolbar-title>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" @click="abrirModalRegLab">
                        <v-icon>fa fa-plus</v-icon>
                    </v-btn>
                </template>
                <span>Nuevo laboratorio</span>
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

    <NuevoLaboratorio :agregarLaboratorio="abrirRegistroLab"/>
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import NuevoLaboratorio from '@/components/Admins/NuevoLaboratorio'
 
export default {
    name: 'navAdmin',
    components: { NuevoLaboratorio },

    data: () => ({
        abrirRegistroLab: false
    }),

    methods: {
       abrirModalRegLab(){
            this.abrirRegistroLab = true;
       }
    },

    mounted(){
        EventBus.$on("cerrarRegistroLab", () => {
            this.abrirRegistroLab = false;
        });
    }
}
</script>