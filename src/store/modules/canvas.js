const state = {
  canvasParams: {
    context: null,
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0
  },
  currentRectangle: {
    startX: 0,
    startY: 0
  },
  drawnRectangles: [],
  isStarted: false
}

const mutations = {
  setParams (state, payload) {
    state.canvasParams.context = payload.context
    state.canvasParams.offsetX = payload.offsetX
    state.canvasParams.offsetY = payload.offsetY
    state.canvasParams.width = payload.width
    state.canvasParams.height = payload.height
  },
  startDrawing (state, payload) {
    state.currentRectangle.startX = parseInt(payload.clientX - state.canvasParams.offsetX)
    state.currentRectangle.startY = parseInt(payload.clientY - state.canvasParams.offsetY)
    // set start drawing flag
    state.isStarted = true
  },
  drawAll (state) {
    // function redraws all previous rectangles
    let context = state.canvasParams.context
    context.clearRect(0, 0, state.canvasParams.width, state.canvasParams.height)
    for (let i = 0; i < state.drawnRectangles.length; i++) {
      var rects = state.drawnRectangles[i]
      context.strokeRect(rects.left, rects.top, rects.right - rects.left, rects.bottom - rects.top)
    }
  }
}

const actions = {
  onDrawing ({commit, state}, payload) {
    // return if no drawing has started
    if (!state.isStarted) {
      return
    }
    let context = state.canvasParams.context
    // getting the current mouse position
    let mouseX = parseInt(payload.clientX - state.canvasParams.offsetX)
    let mouseY = parseInt(payload.clientY - state.canvasParams.offsetY)
    // calculating the rectangle height and width
    state.currentRectangle.width = mouseX - state.currentRectangle.startX
    state.currentRectangle.height = mouseY - state.currentRectangle.startY
    commit('drawAll')
    context.strokeRect(state.currentRectangle.startX, state.currentRectangle.startY, mouseX - state.currentRectangle.startX, mouseY - state.currentRectangle.startY)
  },
  drawn ({commit, state}, payload) {
    // create new rectangle
    let mouseX = parseInt(payload.clientX - state.canvasParams.offsetX)
    let mouseY = parseInt(payload.clientY - state.canvasParams.offsetY)
    let newRectangle = {
      left: Math.min(state.currentRectangle.startX, mouseX),
      right: Math.max(state.currentRectangle.startX, mouseX),
      top: Math.min(state.currentRectangle.startY, mouseY),
      bottom: Math.max(state.currentRectangle.startY, mouseY)
    }
    state.drawnRectangles.push(newRectangle)
    commit('drawAll')
    // remove drawing flag
    state.isStarted = false
  }
}

export default {
  state,
  mutations,
  actions
}
