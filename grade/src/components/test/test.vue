<<template>
	 <editor :content="content" :height="500" :auto-height="false" ></editor>
</template>

<script>
import VueHtml5Editor from 'vue-html5-editor'

  const editor = new VueHtml5Editor({
    showModuleName: true,
    visibleModules:[
      "link",
      "unlink",
      "image",
      "undo"
    ],
    image: {
      sizeLimit: 512 * 1024,
      upload: {
        url: '127.0.0.1:3000/img',
        headers: {},
        params: {},
        fieldName: 'file'
      },
      uploadHandler(res) {
        var json = JSON.parse(res);
        // console.log(json.file[0].path);
        if (!json) {
          console.log(json.error);
        } else {
          // console.log(json);
          return json.file[0].path;
        }
        // return json;
      }
    }
  })	

  export default {
  	data () {
  		return {
  			content: ''
  		}
  	},
  	components: {
  		editor
  	}
  }
</script>

<style lang="stylus">
	
</style>