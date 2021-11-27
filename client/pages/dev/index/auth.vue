<template>
    <div>
        <div class="row g-0">
            <div class="col-12 d-flex bg-dark text-white p-3 mb-4" v-if="$auth.user">
                <div class="flex-grow-1">Bem vindo {{ $auth.user.name }}</div>
                <div><a href="javascript:;" class="text-white" @click="$auth.logout()">Sair</a></div>
            </div>

            <div class="col-12 col-lg-4 mb-5">
                <ui-auth-login></ui-auth-login>
            </div>
            <div class="col-12 col-lg-4 px-lg-2 mb-5">
                <ui-auth-register></ui-auth-register>
            </div>
            <div class="col-12 col-lg-4 mb-5">
                <ui-auth-password></ui-auth-password>
            </div>
        </div>
    </div>
</template>