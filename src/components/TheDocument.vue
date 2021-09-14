<template>
 <div class="back">
    <ckeditor
    class=".ck-editor__editable"
      :editor="editor"
      @ready="onReady"
      v-model="content"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue2";  //仅在这个页面使用使用不在main是全局引入了
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn.js';
export default {
  name: "TheDocument",
    components: {
    ckeditor: CKEditor.component,     
  },
  data() {
    return {
      editor: DecoupledEditor,
      content: "请输入内容",
      editorConfig: {
        language: "zh-cn", // 中文
        placeholder: this.placeholder,
        // toolbar: ["bold", "fontColor", "numberedList"],  //l留下加粗，字体颜色，排序
        removePlugins: ['MediaEmbed'], //除去视频按钮
        fontFamily:{
          options:[
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
            '宋体,SimSun',
            '仿宋,FangSong',
            '楷体,KaiTi',
            '黑体,SimHei',
            '微软雅黑,Microsoft YaHei',
            '楷体_GB2312,KaiTi_GB2312',
            '隶书,LiSu',
            '幼圆,YouYuan',
            '华文细黑,STXihei',
            '华文楷体,STKaiti',
            '华文宋体,STSong',
            '华文仿宋,STFangsong',
            '华文彩云,STCaiyun',
            '华文琥珀,STHupo',
            '华文行楷,STXingkai',
            '华文隶书,STLisu',
            '华文新魏,STXinwei',
            '方正舒体,FZShuTi',
            '方正姚体,FZYaoti'
          ]
        },
        fontSize:{
          options:[
            12,
            14,
            16,
            18,
            20,
            22,
            24,
            26,
            28,
            30,
            32,
            34,
            36
          ]
        }
      },
    };
  },
  methods: {
    onReady(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
  },
};
</script>
<style scoped>
.ck-editor__editable
{
  width: 18cm;
  min-height: 21cm;
  padding: 0.5cm 1.5cm 0.5cm;
  margin:0.5cm auto;
  border:1px #D3D3D3 solid;
  background:white;
  box-shadow:0 0 5px rgba(0, 0, 0, 0.1);
  font-size:14px;
  line-height:1.6;
  word-wrap:break-word;
}
.back{
height:100%;
background:#FAFAFA;
}
</style>

