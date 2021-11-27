<template>
  <div>
    <div class="d-flex">
        <div class="bg-light border" style="min-width:200px; height:100vh; overflow:auto;">
            <div class="list-group list-group-flush">
                <template v-for="l in links">
                    <nuxt-link :to="l.to" class="list-group-item bg-transparent">{{ l.title }}</nuxt-link>
                </template>
            </div>
        </div>
        <div class="flex-grow-1 p-2" style="height:100vh; overflow:auto;">
            <template v-for="l in links">
                <h2 v-if="l.to==$route.path" class="mb-3">{{ l.title }}</h2>
            </template>

            <div v-if="$route.path=='/dev'">
                <!--  -->
            </div>
            
            <nuxt-child></nuxt-child>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {to:"/", title:"Home"},
                {to:"/dev", title:"Desenvolvimento"},
                {to:"/dev/endpoints", title:"Endpoints"},
                {to:"/dev/auth", title:"Autenticações"},
                {to:"/dev/files", title:"Arquivos"},
                {to:"/dev/nav", title:"Nav"},
                {to:"/dev/example", title:"Exemplo"},
            ],
        };
    },
}
</script>