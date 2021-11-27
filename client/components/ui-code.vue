<template>
    <div class="ui-code">
        <monaco-editor :value="value"
            v-bind="{height:'400px'}"
            :language="language"
            :theme="theme"
            @change="emitValue($event);"
        ></monaco-editor>
    </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue';

export default {
    components: { MonacoEditor },

    props: {
        value: {default:''},
        language: {default:'html'},
        theme: {default:'vs-dark'},
    },

    methods: {
        emitValue(value) {
            this.$emit('value', value);
            this.$emit('input', value);
            this.$emit('change', value);
        },
    },
}
</script>

<style>
.ui-code .overflow-guard {display:block; width:100% !important;}
</style>