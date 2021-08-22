<template>
<div>
    <ckeditor id="ckeditor" 
    :editor="editor" 
    @ready="onReady"
    v-model="editorData" 
    :config="editconfig"></ckeditor>
</div>
</template>

<script>
import Editor from '@ckeditor/ckeditor5-build-decoupled-document'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'

export default {
  name: 'TheCkeditor',

  components: {
    //局部注册
    ckeditor: CKEditor.component
  },
  props: {
    content: {
      type: String,
      default: ''
    },
  
    editconfig:{
    type:Object,
    defalut:{
      placeholder:'请输入内容',
      language: 'zh-cn',
      ckfinder: {
        uploadUrl: '/'
      }
    }
    }
  },
  data() {
    return {
      editor: Editor,
      editorData: this.content,
    }
  },


  methods: {
   onReady( editor )  {
      editor.ui.getEditableElement().parentElement.insertBefore(
       editor.ui.view.toolbar.element,
       editor.ui.getEditableElement()
      );
     },
    getContent(){
      return this.editorData
    },
    setContent(val){
      this.editorData = val
    },
  },

}
</script>

<style>
.ck-editor__editable {
  min-height: 400px;
}
</style>

