'use client'

import { useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
  phase: number
  size: number
}

const AREA_PER_POINT = 1000
const INFLUENCE_RADIUS = 145
const GRID_STEP = 28
const MUTED_PARTICLE_OPACITY = 0.18
const MUTED_PARTICLE_FEATHER = 120
const INTERACTION_PROTECTION_PADDING = 20
const INTERACTION_PROTECTION_FEATHER = 48
const MUTED_PARTICLE_SELECTOR = '[data-particle-muted]'
const PARTICLE_FOREGROUND_SELECTOR =
  'a, button, input, textarea, select, [data-particle-foreground]'
const SIGNAL_GRID_OPACITY = 0.055
const SIGNAL_RING_OPACITY = 0.14
const TARGET_FRAME_INTERVAL = 1000 / 30

function smoothstep(value: number): number {
  const clamped = Math.min(Math.max(value, 0), 1)
  return clamped * clamped * (3 - 2 * clamped)
}

function getMutedOpacityForRect(
  x: number,
  y: number,
  mutedRect: DOMRect,
): number {
  const isInside =
    x >= mutedRect.left &&
    x <= mutedRect.right &&
    y >= mutedRect.top &&
    y <= mutedRect.bottom
  const distanceX = Math.max(mutedRect.left - x, 0, x - mutedRect.right)
  const distanceY = Math.max(mutedRect.top - y, 0, y - mutedRect.bottom)
  const outsideDistance = Math.hypot(distanceX, distanceY)
  const insideDistance = isInside
    ? Math.min(
        x - mutedRect.left,
        mutedRect.right - x,
        y - mutedRect.top,
        mutedRect.bottom - y,
      )
    : 0
  const signedDistance = isInside ? -insideDistance : outsideDistance
  const featherProgress = smoothstep(
    (signedDistance + MUTED_PARTICLE_FEATHER) / (MUTED_PARTICLE_FEATHER * 2),
  )

  return MUTED_PARTICLE_OPACITY + (1 - MUTED_PARTICLE_OPACITY) * featherProgress
}

// A page can carry several `[data-particle-muted]` regions (e.g. the hero
// and a closing CTA) — a point close to any one of them gets dimmed, so the
// combined opacity is the minimum (most-muted) across all regions.
function getMutedOpacity(x: number, y: number, mutedRects: DOMRect[]): number {
  let opacity = 1

  for (const mutedRect of mutedRects) {
    opacity = Math.min(opacity, getMutedOpacityForRect(x, y, mutedRect))
  }

  return opacity
}

function getInteractionStrengthForRect(
  x: number,
  y: number,
  mutedRect: DOMRect,
): number {
  const distanceX = Math.max(mutedRect.left - x, 0, x - mutedRect.right)
  const distanceY = Math.max(mutedRect.top - y, 0, y - mutedRect.bottom)
  const outsideDistance = Math.hypot(distanceX, distanceY)

  return Math.pow(
    smoothstep(
      (outsideDistance - INTERACTION_PROTECTION_PADDING) /
        INTERACTION_PROTECTION_FEATHER,
    ),
    0.65,
  )
}

function getInteractionStrength(
  x: number,
  y: number,
  mutedRects: DOMRect[],
): number {
  let strength = 1

  for (const mutedRect of mutedRects) {
    strength = Math.min(
      strength,
      getInteractionStrengthForRect(x, y, mutedRect),
    )
  }

  return strength
}

function getForegroundInteractionStrength(
  x: number,
  y: number,
  foregroundRects: DOMRect[],
): number {
  return getInteractionStrength(x, y, foregroundRects)
}

function createPoints(width: number, height: number): Point[] {
  const pointCount = Math.max(240, Math.ceil((width * height) / AREA_PER_POINT))
  const points: Point[] = []
  let seed = (width * 73856093) ^ (height * 19349663)

  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }

  for (let index = 0; index < pointCount; index += 1) {
    points.push({
      x: random() * width,
      y: random() * height,
      phase: random() * Math.PI * 2,
      size: 0.5 + random() * 0.38,
    })
  }

  return points
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) return

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      strength: 0,
      active: false,
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    let points: Point[] = []
    let renderedX = new Float32Array()
    let renderedY = new Float32Array()
    let influences = new Float32Array()
    let mutedRects: DOMRect[] = []
    let foregroundRects: DOMRect[] = []
    let mutedRectsDirty = true
    let foregroundRectsDirty = true
    let animationFrame = 0
    let lastDrawTime = 0
    let width = 0
    let height = 0

    const shouldAnimate = () =>
      finePointer.matches &&
      !reduceMotion.matches &&
      document.visibilityState === 'visible'

    const refreshMutedRects = () => {
      mutedRects = Array.from(
        document.querySelectorAll<HTMLElement>(MUTED_PARTICLE_SELECTOR),
        (element) => element.getBoundingClientRect(),
      )
      mutedRectsDirty = false
    }

    const refreshForegroundRects = () => {
      foregroundRects = Array.from(
        document.querySelectorAll<HTMLElement>(PARTICLE_FOREGROUND_SELECTOR),
        (element) => element.getBoundingClientRect(),
      )
      foregroundRectsDirty = false
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const pixelRatio = Math.min(window.devicePixelRatio, 2)

      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      points = createPoints(width, height)
      renderedX = new Float32Array(points.length)
      renderedY = new Float32Array(points.length)
      influences = new Float32Array(points.length)
    }

    const drawSignalField = (time: number, animate: boolean) => {
      if (pointer.strength < 0.01) return

      const radius = INFLUENCE_RADIUS * 0.82
      const startX = Math.floor((pointer.x - radius) / GRID_STEP) * GRID_STEP
      const startY = Math.floor((pointer.y - radius) / GRID_STEP) * GRID_STEP

      context.save()
      context.beginPath()
      context.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2)
      context.clip()
      context.beginPath()

      for (let x = startX; x <= pointer.x + radius; x += GRID_STEP) {
        context.moveTo(x, pointer.y - radius)
        context.lineTo(x, pointer.y + radius)
      }
      for (let y = startY; y <= pointer.y + radius; y += GRID_STEP) {
        context.moveTo(pointer.x - radius, y)
        context.lineTo(pointer.x + radius, y)
      }

      context.lineWidth = 0.5
      context.strokeStyle = `rgba(241, 244, 239, ${
        SIGNAL_GRID_OPACITY * pointer.strength
      })`
      context.stroke()
      context.restore()

      context.save()
      context.beginPath()
      context.arc(pointer.x, pointer.y, radius * 0.42, 0, Math.PI * 2)
      context.moveTo(pointer.x + radius * 0.72, pointer.y)
      context.arc(pointer.x, pointer.y, radius * 0.72, 0, Math.PI * 2)
      context.setLineDash([2, 7])
      context.lineDashOffset = animate ? -time * 0.0012 : 0
      context.lineWidth = 0.6
      context.strokeStyle = `rgba(241, 244, 239, ${
        SIGNAL_RING_OPACITY * pointer.strength
      })`
      context.stroke()
      context.restore()
    }

    const draw = (time = 0) => {
      animationFrame = 0
      const animate = shouldAnimate()

      if (
        animate &&
        lastDrawTime > 0 &&
        time - lastDrawTime < TARGET_FRAME_INTERVAL
      ) {
        animationFrame = window.requestAnimationFrame(draw)
        return
      }

      lastDrawTime = time
      if (mutedRectsDirty) refreshMutedRects()
      if (pointer.active && foregroundRectsDirty) refreshForegroundRects()

      context.clearRect(0, 0, width, height)
      pointer.x += (pointer.targetX - pointer.x) * 0.18
      pointer.y += (pointer.targetY - pointer.y) * 0.18
      const targetStrength =
        pointer.active && animate
          ? Math.min(
              getInteractionStrength(
                pointer.targetX,
                pointer.targetY,
                mutedRects,
              ),
              getForegroundInteractionStrength(
                pointer.targetX,
                pointer.targetY,
                foregroundRects,
              ),
            )
          : 0
      pointer.strength +=
        (targetStrength - pointer.strength) *
        (targetStrength > pointer.strength ? 0.09 : 0.12)

      points.forEach((point, index) => {
        const deltaX = pointer.x - point.x
        const deltaY = pointer.y - point.y
        const distance = Math.hypot(deltaX, deltaY)
        const influence =
          Math.max(0, 1 - distance / INFLUENCE_RADIUS) * pointer.strength
        const easedInfluence = influence * influence
        const drift = animate ? Math.sin(time * 0.0002 + point.phase) * 0.28 : 0

        renderedX[index] = point.x + deltaX * easedInfluence * 0.035
        renderedY[index] = point.y + deltaY * easedInfluence * 0.035 + drift
        influences[index] = easedInfluence
      })

      drawSignalField(time, animate)

      points.forEach((point, index) => {
        const influence = influences[index]!
        const breathing = animate
          ? Math.sin(time * 0.00018 + point.phase) * 0.025
          : 0
        const radius = point.size + influence * 0.75
        const mutedOpacity = getMutedOpacity(
          renderedX[index]!,
          renderedY[index]!,
          mutedRects,
        )

        context.beginPath()
        context.arc(
          renderedX[index]!,
          renderedY[index]!,
          radius,
          0,
          Math.PI * 2,
        )
        context.fillStyle = `rgba(241, 244, 239, ${
          (0.27 + breathing + influence * 0.28) * mutedOpacity
        })`
        context.fill()
      })

      if (animate) animationFrame = window.requestAnimationFrame(draw)
    }

    const scheduleDraw = () => {
      if (animationFrame === 0 && document.visibilityState === 'visible') {
        animationFrame = window.requestAnimationFrame(draw)
      }
    }

    const invalidateParticleRects = () => {
      mutedRectsDirty = true
      foregroundRectsDirty = true
      scheduleDraw()
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!shouldAnimate()) return

      if (pointer.strength === 0) {
        pointer.x = event.clientX
        pointer.y = event.clientY
      }
      pointer.targetX = event.clientX
      pointer.targetY = event.clientY
      pointer.active = true
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    const handleResize = () => {
      resize()
      lastDrawTime = 0
      invalidateParticleRects()
    }

    const handleAnimationPreference = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = 0
      lastDrawTime = 0
      pointer.active = false
      invalidateParticleRects()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
        return
      }

      lastDrawTime = 0
      invalidateParticleRects()
    }

    const mutationObserver = new MutationObserver(invalidateParticleRects)

    resize()
    scheduleDraw()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', invalidateParticleRects, {
      passive: true,
    })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener(
      'pointerleave',
      handlePointerLeave,
    )
    document.addEventListener('visibilitychange', handleVisibilityChange)
    reduceMotion.addEventListener('change', handleAnimationPreference)
    finePointer.addEventListener('change', handleAnimationPreference)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', invalidateParticleRects)
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener(
        'pointerleave',
        handlePointerLeave,
      )
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      reduceMotion.removeEventListener('change', handleAnimationPreference)
      finePointer.removeEventListener('change', handleAnimationPreference)
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 motion-reduce:opacity-70"
    />
  )
}
