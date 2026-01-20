import React, { useEffect, useRef, useCallback } from 'react';

interface Dot {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    baseSize: number;
    opacity: number;
    baseOpacity: number;
    phase: number;
    pulseIntensity: number;
    pulseDecay: number;
}

interface Pulse {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    speed: number;
    intensity: number;
}

interface InteractiveDotMeshProps {
    dotSpacing?: number;
    dotSize?: number;
    dotColor?: string;
    breatheIntensity?: number;
    cursorRadius?: number;
    cursorForce?: number;
}

const InteractiveDotMesh: React.FC<InteractiveDotMeshProps> = ({
    dotSpacing = 40,
    dotSize = 2.5,
    dotColor = '20, 184, 166', // Teal RGB
    breatheIntensity = 0.3,
    cursorRadius = 150,
    cursorForce = 25,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const pulsesRef = useRef<Pulse[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>();
    const timeRef = useRef(0);
    const lastPulseTimeRef = useRef(0);

    const initDots = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dots: Dot[] = [];
        const cols = Math.ceil(canvas.width / dotSpacing) + 1;
        const rows = Math.ceil(canvas.height / dotSpacing) + 1;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * dotSpacing;
                const y = row * dotSpacing;
                dots.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    size: dotSize,
                    baseSize: dotSize,
                    opacity: 0.5, // Higher base opacity for visibility
                    baseOpacity: 0.5,
                    phase: Math.random() * Math.PI * 2,
                    pulseIntensity: 0,
                    pulseDecay: 0.95,
                });
            }
        }
        dotsRef.current = dots;
    }, [dotSpacing, dotSize]);

    const spawnRandomPulse = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const pulse: Pulse = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 0,
            maxRadius: 300 + Math.random() * 200,
            speed: 3 + Math.random() * 2,
            intensity: 0.8 + Math.random() * 0.4,
        };
        pulsesRef.current.push(pulse);
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        timeRef.current += 0.02;

        // Spawn random pulses occasionally
        if (timeRef.current - lastPulseTimeRef.current > 2 + Math.random() * 3) {
            spawnRandomPulse();
            lastPulseTimeRef.current = timeRef.current;
        }

        // Update pulses
        pulsesRef.current = pulsesRef.current.filter(pulse => {
            pulse.radius += pulse.speed;
            return pulse.radius < pulse.maxRadius;
        });

        const mouse = mouseRef.current;

        dotsRef.current.forEach((dot) => {
            // Breathing effect with wave propagation
            const breatheOffset = Math.sin(timeRef.current + dot.phase + (dot.baseX + dot.baseY) * 0.01) * breatheIntensity;

            // Calculate pulse effects with displacement
            let pulseEffect = 0;
            let pulseDisplacementX = 0;
            let pulseDisplacementY = 0;
            pulsesRef.current.forEach(pulse => {
                const pdx = dot.baseX - pulse.x;
                const pdy = dot.baseY - pulse.y;
                const distance = Math.sqrt(pdx * pdx + pdy * pdy);
                const pulseWidth = 50;

                if (Math.abs(distance - pulse.radius) < pulseWidth) {
                    const proximity = 1 - Math.abs(distance - pulse.radius) / pulseWidth;
                    const fadeOut = 1 - (pulse.radius / pulse.maxRadius);
                    const effect = proximity * pulse.intensity * fadeOut;
                    pulseEffect = Math.max(pulseEffect, effect);

                    // Push dots outward from pulse center
                    if (distance > 0) {
                        const angle = Math.atan2(pdy, pdx);
                        const pushForce = effect * 15; // Similar to cursor force
                        pulseDisplacementX += Math.cos(angle) * pushForce;
                        pulseDisplacementY += Math.sin(angle) * pushForce;
                    }
                }
            });

            // Calculate distance from cursor
            const dx = mouse.x - dot.baseX;
            const dy = mouse.y - dot.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Cursor interaction
            if (distance < cursorRadius) {
                const force = (1 - distance / cursorRadius) * cursorForce;
                const angle = Math.atan2(dy, dx);
                dot.x = dot.baseX - Math.cos(angle) * force + pulseDisplacementX;
                dot.y = dot.baseY - Math.sin(angle) * force + pulseDisplacementY;
                dot.size = dot.baseSize + (1 - distance / cursorRadius) * 3 + pulseEffect * 2;
                dot.opacity = Math.min(1, dot.baseOpacity + (1 - distance / cursorRadius) * 0.5 + pulseEffect * 0.5);
            } else {
                // Return to base position with breathing and pulse displacement
                const targetX = dot.baseX + pulseDisplacementX;
                const targetY = dot.baseY + breatheOffset * 5 + pulseDisplacementY;
                dot.x += (targetX - dot.x) * 0.15;
                dot.y += (targetY - dot.y) * 0.15;
                dot.size += (dot.baseSize + pulseEffect * 3 - dot.size) * 0.2;
                dot.opacity = dot.baseOpacity + pulseEffect * 0.5;
            }

            // Draw dot with glow effect for brighter appearance
            const glowOpacity = dot.opacity * 0.3;

            // Outer glow
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${dotColor}, ${glowOpacity})`;
            ctx.fill();

            // Core dot
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${dotColor}, ${dot.opacity})`;
            ctx.fill();
        });

        animationRef.current = requestAnimationFrame(animate);
    }, [dotColor, breatheIntensity, cursorRadius, cursorForce, spawnRandomPulse]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -1000, y: -1000 };
    }, []);

    const handleResize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initDots();
    }, [initDots]);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [handleResize, handleMouseMove, handleMouseLeave, animate]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.9 }}
        />
    );
};

export default InteractiveDotMesh;
