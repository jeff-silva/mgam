<template>
    <div>
        <div class="row g-0 bg-dark">
            <div class="col-12">
                <ui-nav v-model="nav" :items="navItems" text-color="#fff" mode="horizontal"></ui-nav>
            </div>
            <div class="col-3">
                <ui-nav v-model="nav" :items="navItems" text-color="#fff" mode="vertical"></ui-nav>
            </div>
            <div class="col-9 bg-light">
                <pre class="bg-light m-0 p-3" style="max-height:400px; overflow:auto;">{{ $data }}</pre>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    data() {
        return {
            nav: "",
            navItems: [
                {to:"", icon:"fas fa-globe", label:"Home", children:[]},
                {to:"", icon:"fas fa-globe", label:"Shop", children:[
                    {to:"", icon:"fas fa-globe", label:"Produtos", children:[
                        {to:"", icon:"fas fa-globe", label:"Criar", children:[]},
                        {to:"", icon:"fas fa-globe", label:"Buscar", children:[]},
                    ]},
                ]},
                {to:"", icon:"fas fa-globe", label:"Configurações", children:[
                    {to:"", icon:"fas fa-globe", label:"Loja", children:[]},
                    {to:"", icon:"fas fa-globe", label:"Site", children:[]},
                    {to:"", icon:"fas fa-globe", label:"Usuários", children:[]},
                ]},
            ],
        };
    }
}
</script>