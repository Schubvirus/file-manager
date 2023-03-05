
import TheNavbar from '~~/components/TheNavbar.vue';

<template>
    <div class="flex">
        <div class="flex-none">
            <TheNavbar />
        </div>
        <div class="dark:bg-zinc-800 h-screen flex-grow overflow-scroll">
            <slot />
        </div>
    </div>
</template>