<template lang="pug">
    h1 {{message}}
</template>
<script>
export default {
  data () {
    return {
      message: 'Hello Vue World?'
    }
  }
}
</script>
<style scoped lang="scss">
$color:blue;

h1 {
    color: $color;
    display: flex;
}
</style>
