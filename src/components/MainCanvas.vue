<template>
  <canvas 
    class="canvas" 
    ref="canvas"
    width="900"
    height="800"
    @mousedown="startDrawing"
    @mousemove="onDrawing"
    @mouseup="drawn">
  </canvas>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'MainCanvas',
  mounted () {
    let canvas = this.$refs.canvas
    let params = {
      context: canvas.getContext('2d'),
      offsetX: canvas.offsetLeft,
      offsetY: canvas.offsetTop,
      width: canvas.clientWidth,
      height: canvas.clientHeight
    }
    params.context.strokeStyle = 'blue'
    params.context.lineWidth = 1
    this.setParams(params)
  },
  methods: {
    ...mapMutations([
      'setParams'
    ]),
    ...mapActions([
      'startDrawing',
      'onDrawing',
      'drawn'
    ])
  }
}
</script>

<style>
.canvas {
  border: 2px solid #000;
}
</style>
