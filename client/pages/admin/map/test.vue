<template>
    <div>
        <ui-game></ui-game>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    layout: 'admin',
}
</script>