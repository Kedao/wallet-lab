import { useEffect, useRef } from 'react'

interface EntropyVisualizerProps {
  paused: boolean
}

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
  life: number
}

interface CircuitNode {
  x: number
  y: number
}

interface CircuitPath {
  nodes: CircuitNode[]
  activeSignal: number // 0 to 1 position along path
  speed: number
}

export function EntropyVisualizer({ paused }: EntropyVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Refs to hold state between renders without re-triggering
  const particles = useRef<Particle[]>([])
  const circuits = useRef<CircuitPath[]>([])
  const timeRef = useRef(0)

  // Generates a random circuit path (PCB trace style)
  const createCircuit = (width: number, height: number): CircuitPath => {
    const nodes: CircuitNode[] = []
    // Grid size for converting random points to snapped grid
    const gridSize = 40 
    
    let currentX = Math.floor(Math.random() * (width / gridSize)) * gridSize
    let currentY = Math.floor(Math.random() * (height / gridSize)) * gridSize
    
    nodes.push({ x: currentX, y: currentY })
    
    const length = 3 + Math.floor(Math.random() * 5) // 3 to 8 segments
    
    for (let i = 0; i < length; i++) {
        // Move in cardinal directions or strictly diagonal to simulate PCB traces
        const direction = Math.floor(Math.random() * 4)
        const step = gridSize * (1 + Math.floor(Math.random() * 2)) // Longer segments possible
        
        if (direction === 0) currentX += step
        else if (direction === 1) currentX -= step
        else if (direction === 2) currentY += step
        else if (direction === 3) currentY -= step
        
        // Clamp to screen
        currentX = Math.max(0, Math.min(width, currentX))
        currentY = Math.max(0, Math.min(height, currentY))
        
        nodes.push({ x: currentX, y: currentY })
    }
    
    return {
      nodes,
      activeSignal: Math.random(),
      speed: 0.005 + Math.random() * 0.01
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Re-init visual elements on resize
      // 1. Nebula Particles
      const colors = [
          'rgba(255, 255, 255, 0.9)', // White
          'rgba(50, 255, 100, 0.8)',  // Bright Green
          'rgba(100, 200, 255, 0.8)', // Sky Blue
          'rgba(255, 100, 200, 0.8)', // Neon Pink
          'rgba(180, 100, 255, 0.8)', // Violet
          'rgba(0, 255, 255, 0.8)'    // Cyan
      ]
      particles.current = Array.from({ length: 300 }).map(() => ({ // Increased to 300
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 1.5, // Faster movement (was 0.8)
        vy: (Math.random() - 0.5) * 1.5,
        life: Math.random()
      }))

      // 2. PCB Circuits
      circuits.current = Array.from({ length: 25 }).map(() => createCircuit(canvas.width, canvas.height))
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    
    // Initial setup if empty
    if (particles.current.length === 0) {
        updateDimensions();
    }

    let animationFrameId: number

    const drawOscilloscope = (width: number, height: number, time: number) => {
       ctx.beginPath()
       ctx.strokeStyle = `rgba(100, 255, 218, 0.7)` // Cyan, Opacity 0.7
       ctx.lineWidth = 2
       
       const points = 80 // More smoothness but jagged noise
       // Multiple lines for chaos
       for(let line = 0; line < 2; line++) {
            ctx.beginPath()
            for (let i = 0; i <= width; i += width / points) {
                // Combine sine waves with random noise
                // Increased Amplitude significantly
                const noise = (Math.random() - 0.5) * 200 // Big jumps
                const wave = Math.sin(i * 0.01 + time * 10 + line) * 80
                const y = height / 2 + wave + noise
                
                if (i === 0) ctx.moveTo(i, y)
                else ctx.lineTo(i, y)
            }
            ctx.stroke()
       }
    }

    const drawPCB = () => {
        // Draw static connecting lines (Traces)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        circuits.current.forEach(circuit => {
            if (circuit.nodes.length < 2) return

            // 1. Base Trace (The dark PCB line)
            ctx.beginPath()
            ctx.strokeStyle = 'rgba(30, 41, 59, 1)' // Dark slate
            ctx.lineWidth = 4
            ctx.moveTo(circuit.nodes[0].x, circuit.nodes[0].y)
            for(let i=1; i<circuit.nodes.length; i++){
                ctx.lineTo(circuit.nodes[i].x, circuit.nodes[i].y)
            }
            ctx.stroke()

            // 2. Node Pads (Circles at corners)
            ctx.fillStyle = 'rgba(51, 65, 85, 1)'
            circuit.nodes.forEach(node => {
                ctx.beginPath()
                ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
                ctx.fill()
            })

            // 3. Active Signal (The moving light)
            if (!paused) {
                circuit.activeSignal += circuit.speed
                if (circuit.activeSignal > 1) circuit.activeSignal = 0
            }

            // Calculate current position of the signal
            const totalSegments = circuit.nodes.length - 1
            const activeSegmentIndex = Math.floor(circuit.activeSignal * totalSegments)
            const segmentProgress = (circuit.activeSignal * totalSegments) - activeSegmentIndex
            
            const startNode = circuit.nodes[activeSegmentIndex]
            const endNode = circuit.nodes[activeSegmentIndex + 1]
            
            if (startNode && endNode) {
                const signalX = startNode.x + (endNode.x - startNode.x) * segmentProgress
                const signalY = startNode.y + (endNode.y - startNode.y) * segmentProgress

                // Signal Glow
                ctx.shadowBlur = 10
                ctx.shadowColor = 'rgba(250, 204, 21, 1)' // Gold glow
                ctx.fillStyle = 'rgba(250, 204, 21, 1)'
                ctx.beginPath()
                ctx.arc(signalX, signalY, 3, 0, Math.PI * 2)
                ctx.fill()
                ctx.shadowBlur = 0 // Reset
            }
        })
    }

    const render = () => {
      timeRef.current += 0.01

      // Always clear canvas
      ctx.fillStyle = '#020617' // Slate-950 equivalent (Deep Space Black)
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // 1. Draw Nebula Background (Subtle)
      ctx.globalCompositeOperation = 'screen'
      particles.current.forEach(p => {
        if (!paused) {
            p.x += p.vx
            p.y += p.vy
            p.life -= 0.005

            // Wrap around
            if (p.x < 0) p.x = canvas.width
            if (p.x > canvas.width) p.x = 0
            if (p.y < 0) p.y = canvas.height
            if (p.y > canvas.height) p.y = 0
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
      ctx.globalCompositeOperation = 'source-over'

      // 2. Draw PCB Background & Signals
      drawPCB()

      // 3. Draw Oscilloscope (Noise)
      // Even if paused, we draw the oscilloscope to show the "captured" noise state
      // instead of a flat line.
      drawOscilloscope(canvas.width, canvas.height, timeRef.current)

      if (!paused) {
        animationFrameId = requestAnimationFrame(render)
      }
    }
    
    // Start loop
    render()

    return () => {
      window.removeEventListener('resize', updateDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [paused])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full object-cover"
    />
  )
}
