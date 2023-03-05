<template>
    <h1>Files in {{ currentPath }}</h1>
    <button @click="switchPath('/')">Back</button>
    {{ colorMode.preference }}
    <div class="relative w-full h-64 flex">
        <img class="w-full h-64 object-cover object-center absolute"
            src="https://images.unsplash.com/photo-1676920410907-8d5f8dd4b5ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80">
        <div class="absolute self-end w-full bg-gradient-to-t from-indigo-900 to-transparent">
            <p class="font-bold text-4xl text-white ml-2 opacity-100">Home</p>
        </div>
    </div>
    <div class="ml-2 mt-2">
        <table class="min-w-full border-collapse block md:table">
            <thead class="block md:table-header-group">
                <tr
                    class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                    <th
                        class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Name</th>
                    <th
                        class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                        Path</th>
                </tr>
            </thead>
            <tbody class="block md:table-row-group">
                <tr v-for="file in files" :key="file.name">
                    <template v-if="file.name?.startsWith('.') && showHiddenFiles">
                        <td class="border border-grey-500 p-2 block md:table-cell text-blue-600 hover:cursor-pointer hover:text-blue-800"
                            @click="switchPath(file.path)">
                            {{ file.name }}</td>
                        <td class="border border-grey-500 p-2 block md:table-cell dark:text-white">{{ file.path }}</td>
                    </template>
                    <template v-else-if="!file.name?.startsWith('.') && file.children">
                        <td class="border border-grey-500 p-2 block md:table-cell text-blue-600 hover:cursor-pointer hover:text-blue-800"
                            @click="switchPath(file.path)"> {{ file.name }}</td>
                        <td class=" border border-grey-500 p-2 block md:table-cell dark:text-white">{{ file.path }}</td>
                    </template>
                    <template v-else-if="!file.name?.startsWith('.')">
                        <td class="border border-grey-500 p-2 block md:table-cell" @click="switchPath(file.path)"> {{
                            file.name
                        }}</td>
                        <td class=" border border-grey-500 p-2 block md:table-cell dark:text-white">{{ file.path }}</td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
    <label class="inline-flex items-center mt-3">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="showHiddenFiles"><span
            class="ml-2 text-gray-700">label</span>
    </label>
</template>

<script lang="ts" setup>
import { readDir, FileEntry } from '@tauri-apps/api/fs';
import { homeDir } from '@tauri-apps/api/path';

const colorMode = useColorMode();

let currentPath = await homeDir();

let showHiddenFiles = ref(false);

let files: Ref<FileEntry[]> = ref([]);

const getFiles = async () => {
    files.value = await readDir(currentPath);
};

getFiles();

const switchPath = (path: string) => {
    currentPath = path;
    getFiles();
};

</script>