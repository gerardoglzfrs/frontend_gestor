 <template>
    <div>
        <v-toolbar color="primary" dark >
            <v-toolbar-items>
                <v-img src="@/assets/ILN.png" />
                <v-img class="mt-4" style="height: 30px; width: 80px" src="@/assets/labsol.png" />
            </v-toolbar-items>
            <v-spacer />
            <v-toolbar-title>{{ usuarioLogeado.nombre.toUpperCase() }}</v-toolbar-title>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" @click="abrirModalRegLab">
                        <v-icon>fa fa-plus</v-icon>
                    </v-btn>
                </template>
                <span>Agregar laboratorio</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" @click="logOut">
                        <v-icon>fa fa-sign-out-alt</v-icon>
                    </v-btn>
                </template>
                <span>Cerrar sesion</span>
            </v-tooltip>
        </v-toolbar>
    <NuevoLaboratorio :agregarLaboratorio="abrirRegistroLab"/>
    <Logout :confirmacionLogout="abrirLogout"/>
    </div>
</template>

<script>
import { EventBus } from '@/EventBus'
import NuevoLaboratorio from '@/components/Admins/NuevoLaboratorio'
import { mapState } from "vuex"
import Logout from '../Logout'

export default {
    name: 'navAdmin',
    components: { NuevoLaboratorio, Logout },

    data: () => ({
        abrirRegistroLab: false,
        abrirLogout: false
    }),

    methods: {
        abrirModalRegLab(){
                this.abrirRegistroLab = true;
        },
        
        logOut(){
            this.abrirLogout = true;
        }
    },

    computed:{
        ...mapState(["usuarioLogeado"])
    },

    mounted(){
        EventBus.$on("cerrarRegistroLab", () => {
            this.abrirRegistroLab = false;
        })

        EventBus.$on("cerrarModelNuevoLaboratorio", () => {
            this.abrirRegistroLab = false;
        })

        EventBus.$on("cerrarLogoutAdmin", ()=>{
            this.abrirLogout = false;
        })
    }
}
</script>