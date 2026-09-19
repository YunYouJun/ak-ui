import { environment, finite } from './shared.mjs'

// Original point-field renderer. No official assets or proprietary shaders.
export function createParticleField(canvas, options = {}) {
  const { view, lifetime } = environment(canvas)
  const { signal } = lifetime
  const motion = view.matchMedia('(prefers-reduced-motion: reduce)')
  const count = Math.min(4000, Math.max(1, Math.floor(finite(options.count, 360))))
  const points = new Float32Array(count * 2)
  const color = /^#[\da-f]{6}$/i.test(options.color ?? '') ? options.color : '#19d1ff'
  const rgb = [1, 3, 5].map(start => parseInt(color.slice(start, start + 2), 16) / 255)
  let pattern = ['grid', 'orbit', 'wave'].includes(options.pattern) ? options.pattern : 'wave'
  let paused = !!options.paused, visible = true, destroyed = false, lost = false
  let frame = 0, lastTime = 0, elapsed = 0, width = 1, height = 1, ratio = 1
  let gl, context, program, buffer, position, tint, size
  try { if (options.renderer !== '2d') gl = canvas.getContext('webgl', { alpha: true, antialias: false }) } catch { /* use fallback */ }
  if (!gl) {
    try { context = canvas.getContext('2d') } catch { /* retain CSS fallback */ }
  }

  function release() {
    if (gl) { if (buffer) gl.deleteBuffer(buffer); if (program) gl.deleteProgram(program) }
    buffer = program = undefined
  }
  function initialize() {
    if (!gl) return
    release()
    const shaders = []
    try {
      for (const [type, source] of [
        [gl.VERTEX_SHADER, 'attribute vec2 p; uniform float s; void main(){gl_Position=vec4(p,0.,1.);gl_PointSize=s;}'],
        [gl.FRAGMENT_SHADER, 'precision mediump float; uniform vec3 c; void main(){float a=1.-smoothstep(.12,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(c,a*.7);}'],
      ]) {
        const shader = gl.createShader(type)
        shaders.push(shader)
        gl.shaderSource(shader, source); gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Shader unavailable')
      }
      program = gl.createProgram()
      shaders.forEach(shader => gl.attachShader(program, shader))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Renderer unavailable')
      position = gl.getAttribLocation(program, 'p')
      tint = gl.getUniformLocation(program, 'c')
      size = gl.getUniformLocation(program, 's')
      buffer = gl.createBuffer()
      if (!buffer) throw new Error('Buffer unavailable')
    } catch { release() }
    finally { shaders.forEach(shader => { if (shader) gl.deleteShader(shader) }) }
  }
  initialize()
  function renderer() { return gl && program && !lost ? 'webgl' : context ? '2d' : 'static' }
  function draw() {
    if (destroyed) return
    canvas.dataset.akRenderer = renderer()
    const columns = Math.ceil(Math.sqrt(count * width / height)), rows = Math.ceil(count / columns)
    const time = elapsed / 1000
    for (let i = 0; i < count; i++) {
      const u = i % columns / Math.max(1, columns - 1), v = Math.floor(i / columns) / Math.max(1, rows - 1)
      let x = (u - .5) * 1.8, y = (v - .5) * 1.7
      if (pattern === 'wave') y += Math.sin(u * 9 + time * .45 + v * 3) * .16
      if (pattern === 'orbit') {
        const angle = i * 2.399963 + time * .09, radius = Math.sqrt((i + 1) / count) * .86
        x = Math.cos(angle) * radius * Math.min(1, height / width)
        y = Math.sin(angle) * radius
      }
      points[i * 2] = x; points[i * 2 + 1] = y
    }
    if (renderer() === 'webgl') {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, points, gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
      gl.uniform3fv(tint, rgb); gl.uniform1f(size, 3 * ratio)
      gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.drawArrays(gl.POINTS, 0, count)
    } else if (context) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, width, height)
      context.fillStyle = color; context.globalAlpha = .6
      for (let i = 0; i < count; i++) context.fillRect((points[i * 2] + 1) * width / 2, (1 - points[i * 2 + 1]) * height / 2, 1.5, 1.5)
    }
  }
  function running() { return !destroyed && !paused && !motion.matches && visible && !canvas.ownerDocument.hidden && !lost && renderer() !== 'static' }
  function tick(now) {
    frame = 0
    if (!running()) return
    if (lastTime) elapsed += Math.min(50, now - lastTime)
    lastTime = now; draw(); frame = view.requestAnimationFrame(tick)
  }
  function update() {
    view.cancelAnimationFrame(frame); frame = 0; lastTime = 0
    if (destroyed) return
    canvas.dataset.akMotion = running() ? 'running' : 'paused'
    draw()
    if (running()) frame = view.requestAnimationFrame(tick)
  }
  function resize() {
    const rect = canvas.getBoundingClientRect()
    width = Math.max(1, rect.width); height = Math.max(1, rect.height)
    ratio = Math.min(2, Math.max(1, view.devicePixelRatio || 1))
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio)
    draw()
  }
  const resizeObserver = view.ResizeObserver ? new view.ResizeObserver(resize) : undefined
  resizeObserver?.observe(canvas)
  if (!resizeObserver) view.addEventListener('resize', resize, { signal })
  const observer = view.IntersectionObserver ? new view.IntersectionObserver(entries => { visible = entries[0].isIntersecting; update() }) : undefined
  observer?.observe(canvas)
  motion.addEventListener('change', update, { signal })
  canvas.ownerDocument.addEventListener('visibilitychange', update, { signal })
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); lost = true; update() }, { signal })
  canvas.addEventListener('webglcontextrestored', () => { lost = false; initialize(); resize(); update() }, { signal })
  resize(); update()
  return {
    pause() { paused = true; update() },
    resume() { paused = false; update() },
    setPattern(value) { if (['grid', 'orbit', 'wave'].includes(value)) { pattern = value; draw() } },
    get renderer() { return renderer() },
    destroy() {
      if (destroyed) return
      destroyed = true; view.cancelAnimationFrame(frame); lifetime.abort()
      observer?.disconnect(); resizeObserver?.disconnect(); release()
      delete canvas.dataset.akMotion; delete canvas.dataset.akRenderer
    },
  }
}
