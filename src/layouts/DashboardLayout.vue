<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
    <main>
        <Navbar/>

        <div class="">
            <Sidebar/>
            <RouterView/>
        </div>
    </main>
</template>


