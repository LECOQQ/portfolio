import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ParticleField } from '@/ui/particle-field'

type FrameQueue = Map<number, (_time: number) => void>

function createMediaQueryList(matches: boolean): MediaQueryList {
  return {
    matches,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }
}

function createCanvasContext(): CanvasRenderingContext2D {
  return {
    arc: vi.fn(),
    beginPath: vi.fn(),
    clearRect: vi.fn(),
    clip: vi.fn(),
    fill: vi.fn(),
    lineTo: vi.fn(),
    moveTo: vi.fn(),
    restore: vi.fn(),
    save: vi.fn(),
    setLineDash: vi.fn(),
    setTransform: vi.fn(),
    stroke: vi.fn(),
  } as unknown as CanvasRenderingContext2D
}

describe('ParticleField', () => {
  let canvasContext: CanvasRenderingContext2D
  let frameQueue: FrameQueue
  let nextFrameId: number

  beforeEach(() => {
    canvasContext = createCanvasContext()
    frameQueue = new Map()
    nextFrameId = 0

    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      nextFrameId += 1
      frameQueue.set(nextFrameId, callback)
      return nextFrameId
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((frameId) => {
      frameQueue.delete(frameId)
    })
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      canvasContext,
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  function runNextFrame(time: number) {
    const frame = frameQueue.entries().next().value
    if (!frame) throw new Error('No animation frame was scheduled')

    const [frameId, callback] = frame
    frameQueue.delete(frameId)
    act(() => callback(time))
  }

  it('renders one static frame when no fine pointer is available', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => createMediaQueryList(false)),
    )

    render(<ParticleField />)
    runNextFrame(16)

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)
    expect(frameQueue.size).toBe(0)
  })

  it('reuses protected-region geometry across animated frames', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) =>
        createMediaQueryList(query === '(hover: hover) and (pointer: fine)'),
      ),
    )

    render(
      <>
        <section data-testid="muted-region" data-particle-muted />
        <ParticleField />
      </>,
    )
    const mutedRegion = screen.getByTestId('muted-region')
    const getBoundingClientRect = vi
      .spyOn(mutedRegion, 'getBoundingClientRect')
      .mockReturnValue({
        bottom: 100,
        height: 100,
        left: 0,
        right: 100,
        top: 0,
        width: 100,
        x: 0,
        y: 0,
        toJSON: vi.fn(),
      })

    runNextFrame(40)
    runNextFrame(56)
    runNextFrame(80)

    expect(getBoundingClientRect).toHaveBeenCalledTimes(1)
    expect(canvasContext.clearRect).toHaveBeenCalledTimes(2)
    expect(frameQueue.size).toBe(1)
  })

  it('stops the animation loop while the document is hidden', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) =>
        createMediaQueryList(query === '(hover: hover) and (pointer: fine)'),
      ),
    )
    const visibilityState = vi
      .spyOn(document, 'visibilityState', 'get')
      .mockReturnValue('visible')

    render(<ParticleField />)
    runNextFrame(40)
    visibilityState.mockReturnValue('hidden')
    act(() => document.dispatchEvent(new Event('visibilitychange')))

    expect(frameQueue.size).toBe(0)
  })
})
