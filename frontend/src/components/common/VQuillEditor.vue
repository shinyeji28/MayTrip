<!-- VQuillEditor.vue -->
<template>
  <div class="quill-editor"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(['update:modelValue']);

let quillInstance;
const editorContent = ref(props.modelValue);

onMounted(() => {
  quillInstance = new Quill(".quill-editor", {
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
  });

  quillInstance.root.innerHTML = props.modelValue;

  quillInstance.on("text-change", () => {
    const content = quillInstance.root.innerHTML;
    emit('update:modelValue', content); 
  });
});

onUnmounted(() => {
  quillInstance.off("text-change");
  quillInstance = null;
});
</script>
