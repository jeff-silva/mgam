<template>
    <div class="bg-dark" style="font-family:monospace; color:lime; overflow:hidden;">
        
        <!-- object -->
        <template v-if="$typeof=='object'">
            <table class="table table-sm table-borderless m-0" style="color:inherit;">
                <colgroup>
                    <col width="150px">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr><td>{</td><td></td></tr>
                    <tr v-for="(o, oname) in value">
                        <td class="ps-5">{{ oname }}:</td>
                        <td>
                            <!-- <ui-pre :value="o" :show="typeof(o)!='object'" v-if="props.show"></ui-pre> -->
                            <!-- <div v-else>{{ o|typeof }}</div> -->
                            <pre class="m-0" style="white-space:nowrap;">{{ o }}</pre>
                        </td>
                    </tr>
                    <tr><td>}</td><td></td></tr>
                </tbody>
            </table>
        </template>

        <!-- array -->
        <template v-else>
            <pre>{{ value }}</pre>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        value: [Boolean, Number, String, Array, Object],
        show: {default:true},
    },

    filters: {
        typeof(value) {
            return Array.isArray(value)? 'array': (typeof value);
        },
    },

    methods: {
        typeof(value) {
            return Array.isArray(value)? 'array': (typeof value);
        },
    },

    computed: {
        $typeof() {
            if (Array.isArray(this.props.value)) {
                return 'array';
            }
            return typeof this.props.value;
        },
    },
    
    data() {
        return {
            props: JSON.parse(JSON.stringify(this.$props)),
        };
    },
}
</script>