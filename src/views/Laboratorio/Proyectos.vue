<template>
    <div>
        <navLab />
        <MisProyectos />
    </div>
</template>

<script>
import navLab from '@/components/navegacion/navLab'
import MisProyectos from '@/components/Laboratorio/MisProyectos'

export default {
    name: 'TodosProyectos',
    components: { MisProyectos, navLab }
}
</script>
