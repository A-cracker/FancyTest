<template>
<div>
    <ckeditor id="ckeditor" 
    :editor="editor" 
    @ready="onReady"
    v-model="editorData" 
    :config="editorConfig"></ckeditor>
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
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    
  },
  data() {
    return {
      editor: Editor,
      editorData: this.content,
      editorConfig: {
        toolbar: ['heading','|','bold','italic','Link','bulletedList','numberedList','blockQuote','|','undo','redo',],
        placeholder: this.placeholder,
        language: 'zh-cn',
        //使用ckfinder上传时要注意返回的格式
        //应该是{"uploaded":1,"url":"/"}
        //或者{"uploaded":true,"url":"/"}
        ckfinder: {
          uploadUrl: '/'
        }
      },
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
  width:100%;
  height:209.54px;
  border:1px #D3D3D3 solid;
}
</style>

