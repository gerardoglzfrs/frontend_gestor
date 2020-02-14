<template>
    <div>
        <v-dialog v-model="openLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Enviando solicitud...
          <v-progress-linear indeterminate color="white" class="mb-0" />
        </v-card-text>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import { EventBus } from '../../EventBus'

export default {
    props: ["openLoading"],
    watch:{
        openLoading(val){
            if(!val) return
             setTimeout(() => EventBus.$emit("closeLoader"), 2000)
        }
    }
}
</script>

<style scoped>
    #transparente{
        background-color: rgba(255, 255, 255, 0) 
    }
</style>