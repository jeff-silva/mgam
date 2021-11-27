<template>
    <div>
        <!-- <monaco-editor :value="html"
            v-bind="{width:235, height:400, language:'html', theme:'vs-dark'}"
            @change="$emit('update:html', $event);"
        ></monaco-editor> -->

        <ckeditor v-model="props.html" @input="$emit('update:html', props.html);"></ckeditor>
    </div>
</template>

<script>
// import MonacoEditor from 'monaco-editor-vue';

import Vue from 'vue';
import CKEditor from 'ckeditor4-vue';
Vue.use(CKEditor);

export default {
    // components: { MonacoEditor },

    props: {
        html: {default:''},
    },

    data() {
        return {
            props: JSON.parse(JSON.stringify(this.$props)),
        };
    },
}
</script>