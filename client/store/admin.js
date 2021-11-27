export default {
    state: {
        menu: [
            {to:"/admin", icon:"fas fa-globe", label:"Dashboard", children:[]},
            {to:"/admin/users", icon:"fas fa-user", label:"Usuários", children:[
                {to:"/admin/users", icon:"fas fa-user-friends", label:"Buscar", children:[]},
                {to:"/admin/users/new", icon:"fas fa-user-plus", label:"Criar", children:[]},
            ]},
            {to:"/admin/settings", icon:"fas fa-cog", label:"Sistema", children:[
                {to:"/admin/files", icon:"fas fa-file-image", label:"Arquivos", children:[]},
                {to:"/admin/settings", icon:"fas fa-cogs", label:"Configurações", children:[]},
            ]},
            {to:"/admin/map/test", icon:"fas fa-map", label:"Mapa", children:[
                {to:"/admin/map/test", icon:"fas fa-map", label:"Mapa", children:[]},
            ]},
        ],

        userOptions: [
            {to:"/admin/users/me", icon:"fas fa-user", label:"Meus dados", children:[]},
        ],

        settings: [
            {to:"/admin/settings", icon:"fas fa-cog", label:"Sistema", children:[]},
            {to:"/admin/settings/email", icon:"fas fa-envelope", label:"E-mail", children:[]},
            {to:"/admin/settings/user", icon:"fas fa-user-cog", label:"Usuário", children:[]},
        ],
    },
}