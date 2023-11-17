<!-- VQuillEditor.vue -->
<template>
    <div class="quill-editor"></div>
    <v-btn @click="submitContent">Submit</v-btn>

  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  });
  
  const emit = defineEmits('saveContent');

  let quillInstance;
  
  const submitContent = () => {
    console.log("제출");
    emit('saveContent',quillInstance.root.innerHTML)
  }
  
  onMounted(() => {
    quillInstance = new Quill('.quill-editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    });
  
    quillInstance.root.innerHTML = props.modelValue;

  });
  
  
  
  onUnmounted(() => {
    quillInstance.off('text-change');
    quillInstance = null;
  });
  </script>