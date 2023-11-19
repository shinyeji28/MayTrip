<!-- 자식 컴포넌트 -->

<template>
  <div>
    <QuillEditor :value="editorContent" :modules="modules"  @input="updateContent" theme="snow" toolbar="full" ref="editor"/>
  </div>
</template>

<script setup>
// https://vueup.github.io/vue-quill/api/methods.html

import { ref, onMounted, defineProps , defineEmits, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ImageUploader from 'quill-image-uploader';
import { registImage } from '@/api/board.js';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  content : String
});
const editor = ref(null);
const editorContent = ref(props.content);
// 이미지 업로더 모듈 설정
const modules = {
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: async (file) => {
      try {
        console.log("들어옴")
        const formData = new FormData();
        formData.append('file', file);

        // 이미지를 서버에 업로드
        const response = await registImage(formData);
        const imageUrl = response.data.url;
        const imageName = response.data.originImageName;
        // console.log(imagefile)


        // Quill 에디터의 커서 위치에 이미지 삽입
        const quill = editor.value?.getQuill();
        if (quill) {
          const range = quill.getSelection();
          const imageHtml = `<img src="${imageUrl}" alt="${imageName}">`;
          // editor.value.setHTML(imageHtml);  
          // quill.clipboard.dangerouslyPasteHTML(range.index, imageHtml, 'api');
          quill.clipboard.dangerouslyPasteHTML(range ? range.index : 0, imageHtml);
          // quill.insertEmbed(quill.getSelection().index, 'image', imageUrl);
          // quill.clipboard.dangerouslyPasteHTML(imageHtml, 'api');
          // editor.value.pasteHTML(imageHtml, 'api');
          console.log(quill.root.innerHTML);
          emit('changeEditor', quill.root.innerHTML);

        } else {
          console.error('Quill 인스턴스를 찾을 수 없습니다.');
          return Promise.reject('업로드 실패');
        }
        return Promise.resolve();
      } catch (error) {
        // 이미지 업로드 실패 시 에러 처리
        console.error('에러:', error);
        return Promise.reject('업로드 실패');
      }
    },
  },
};

// QuillEditor 컴포넌트가 마운트된 후 Quill 에디터 인스턴스에 접근
onMounted(() => { 
  editorContent.value = props.content; // 초기 내용 설정
});



const updateContent = (newContent) => {
  const content = editor.value.getHTML();
  emit('update:modelValue', content);
};
</script>
