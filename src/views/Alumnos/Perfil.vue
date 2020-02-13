<template>
    <div>
        <navAlumn />
        <Info />
        <Proyecto />
    </div>
</template>

<script>
import navAlum from '@/components/navegacion/navAlum'
import Info from '@/components/Alumnos/Info'
import Proyecto from '@/components/Alumnos/Proyecto'

export default {
    name: 'Perfil',
    components: { navAlum, info, Proyecto }
}
</script>