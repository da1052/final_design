<template>
  <el-select
    v-model="value10"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <template slot="prepend">123</template>
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options5: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value10: []
      }
    }
  }
</script>
