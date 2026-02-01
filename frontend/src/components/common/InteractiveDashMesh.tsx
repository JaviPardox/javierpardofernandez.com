import React, { useEffect, useRef, useCallback } from 'react';

// Simplex 3D Noise
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;

const grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
];

const p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36,
    103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26,
    197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174,
    20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158,
    231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
    102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
    200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
    226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227,
    47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163,
    70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113,
    224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144,
    12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181,
    199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205,
    93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

const perm = new Array(512);
const gradP = new Array(512);

for (let i = 0; i < 256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[p[i] % 12];
}

function snoise(x: number, y: number, z: number): number {
    let n0, n1, n2, n3;
    const s = (x + y + z) * F3;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);
    const t = (i + j + k) * G3;
    const X0 = i - t, Y0 = j - t, Z0 = k - t;
    const x0 = x - X0, y0 = y - Y0, z0 = z - Z0;

    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
        if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
        else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
        else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
        if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
        else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
        else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }

    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;

    const ii = i & 255, jj = j & 255, kk = k & 255;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 < 0) n0 = 0;
    else {
        const gi0 = gradP[ii + perm[jj + perm[kk]]];
        t0 *= t0;
        n0 = t0 * t0 * (gi0[0] * x0 + gi0[1] * y0 + gi0[2] * z0);
    }

    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 < 0) n1 = 0;
    else {
        const gi1 = gradP[ii + i1 + perm[jj + j1 + perm[kk + k1]]];
        t1 *= t1;
        n1 = t1 * t1 * (gi1[0] * x1 + gi1[1] * y1 + gi1[2] * z1);
    }

    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 < 0) n2 = 0;
    else {
        const gi2 = gradP[ii + i2 + perm[jj + j2 + perm[kk + k2]]];
        t2 *= t2;
        n2 = t2 * t2 * (gi2[0] * x2 + gi2[1] * y2 + gi2[2] * z2);
    }

    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 < 0) n3 = 0;
    else {
        const gi3 = gradP[ii + 1 + perm[jj + 1 + perm[kk + 1]]];
        t3 *= t3;
        n3 = t3 * t3 * (gi3[0] * x3 + gi3[1] * y3 + gi3[2] * z3);
    }

    return 32 * (n0 + n1 + n2 + n3);
}

interface Dash {
    refX: number;
    refY: number;
    x: number;
    y: number;
    velocity: number;
    scale: number;
    rotation: number;
    lifeOffset: number;
    color: string;
}

const COLORS = [
    'rgba(20, 184, 166, ',
    'rgba(45, 212, 191, ',
    'rgba(94, 234, 212, ',
    'rgba(6, 182, 212, ',
    'rgba(34, 211, 238, ',
];

interface Props {
    dashSpacing?: number;
    fullScreen?: boolean;
    className?: string;
}

const InteractiveDashMesh: React.FC<Props> = ({
    dashSpacing = 50,
    fullScreen = true,
    className = ""
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dashesRef = useRef<Dash[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const targetMouseRef = useRef({ x: -9999, y: -9999 });
    const animationRef = useRef<number>();
    const timeRef = useRef(0);
    const hoverProgressRef = useRef(0);
    const isHoveringRef = useRef(false);

    const initDashes = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dashes: Dash[] = [];
        const cols = Math.ceil(canvas.width / dashSpacing) + 2;
        const rows = Math.ceil(canvas.height / dashSpacing) + 2;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * dashSpacing;
                const y = row * dashSpacing;
                dashes.push({
                    refX: x,
                    refY: y,
                    x: x,
                    y: y,
                    velocity: 0,
                    scale: 0.3 + Math.random() * 0.3,
                    rotation: Math.random() * Math.PI * 2,
                    lifeOffset: Math.random() * 100,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                });
            }
        }
        dashesRef.current = dashes;
    }, [dashSpacing]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        if (dashesRef.current.length === 0) {
            initDashes();
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        timeRef.current += 0.016;
        const time = timeRef.current;

        const target = targetMouseRef.current;
        const current = mouseRef.current;
        current.x += (target.x - current.x) * 0.02;
        current.y += (target.y - current.y) * 0.02;
        const mouseX = current.x;
        const mouseY = current.y;

        const targetHover = isHoveringRef.current ? 1 : 0;
        hoverProgressRef.current += (targetHover - hoverProgressRef.current) * 0.03;
        const hoverProgress = hoverProgressRef.current;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const wanderX = centerX + snoise(time * 0.08, 0, 0) * canvas.width * 0.4;
        const wanderY = centerY + snoise(0, time * 0.08, 0) * canvas.height * 0.4;
        const focusX = mouseX * hoverProgress + wanderX * (1 - hoverProgress);
        const focusY = mouseY * hoverProgress + wanderY * (1 - hoverProgress);
        const focusOuterRadius = 700;

        dashesRef.current.forEach((dash) => {
            const px = dash.x;
            const py = dash.y;
            const normX = px / canvas.width;
            const normY = py / canvas.height;

            const distToFocus = Math.sqrt(
                Math.pow(px - focusX, 2) + Math.pow(py - focusY, 2)
            );
            let focusIntensity = 0;
            if (distToFocus < focusOuterRadius) {
                const t = distToFocus / focusOuterRadius;
                focusIntensity = Math.sin(t * Math.PI);
            }

            const noiseX = snoise(normX * 5, normY * 5, time * 0.2 + 100);
            const noiseY = snoise(normX * 5, normY * 5, time * 0.2);
            const noiseX2 = snoise(normX * 1.2, normY * 1.2, time * 0.12 + 45);
            const noiseY2 = snoise(normX * 1.2, normY * 1.2, time * 0.12 + 87);

            const delayFactor = Math.min(1, distToFocus / 800) * 0.03 + 0.01;
            const direction = [dash.refX - dash.x, dash.refY - dash.y];
            const dist = Math.sqrt(direction[0] * direction[0] + direction[1] * direction[1]);

            if (dist > 0.5) {
                const strength = Math.min(1, dist / 20) * delayFactor;
                dash.x += direction[0] * strength;
                dash.y += direction[1] * strength;
            }

            const activityLevel = focusIntensity;
            let dispX = noiseX2 * (5 + activityLevel * 80);
            let dispY = noiseY2 * (5 + activityLevel * 80);
            dispX += noiseX * activityLevel * 40;
            dispY += noiseY * activityLevel * 40;

            const finalX = dash.x + dispX;
            const finalY = dash.y + dispY;

            dash.velocity = activityLevel;
            const baseScale = 0.05;
            const activeScale = 1.5 + Math.sin((dash.lifeOffset + time * 0.8) * 0.8) * 0.4;
            const targetScale = baseScale + (activeScale - baseScale) * activityLevel;
            dash.scale += (targetScale - dash.scale) * 0.08;

            if (activityLevel > 0.1) {
                const targetRotation = Math.atan2(focusY - py, focusX - px);
                const rotDiff = targetRotation - dash.rotation;
                const normalizedDiff = Math.atan2(Math.sin(rotDiff), Math.cos(rotDiff));
                dash.rotation += normalizedDiff * 0.05;
            } else {
                dash.rotation += snoise(normX * 2, normY * 2, time * 0.3) * 0.02;
            }

            const baseLength = 10;
            const baseWidth = 2;
            const drawLength = baseLength * (0.4 + dash.scale * 0.8);
            const drawWidth = baseWidth * (0.4 + dash.scale * 0.6);
            const opacity = Math.min(0.85, 0.3 + dash.scale * 0.35 + dash.velocity * 0.3);

            if (drawLength < 0.5 || opacity < 0.05) return;

            ctx.save();
            ctx.translate(finalX, finalY);
            ctx.rotate(dash.rotation);

            if (dash.velocity > 0.2) {
                ctx.beginPath();
                ctx.roundRect(
                    -drawLength / 2 - 2,
                    -drawWidth / 2 - 2,
                    drawLength + 4,
                    drawWidth + 4,
                    (drawWidth + 4) / 2
                );
                ctx.fillStyle = dash.color + (opacity * 0.15) + ')';
                ctx.fill();
            }

            ctx.beginPath();
            ctx.roundRect(-drawLength / 2, -drawWidth / 2, drawLength, drawWidth, drawWidth / 2);
            ctx.fillStyle = dash.color + opacity + ')';
            ctx.fill();

            ctx.restore();
        });

        animationRef.current = requestAnimationFrame(animate);
    }, [initDashes]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        targetMouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        isHoveringRef.current = true;
    }, []);

    const handleMouseLeave = useCallback(() => {
        isHoveringRef.current = false;
    }, []);

    const handleResize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (fullScreen) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            // For container-based resizing, we rely on ResizeObserver or simple parent size
            const parent = canvas.parentElement;
            if (parent) {
                const rect = parent.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        }
        initDashes();
    }, [initDashes, fullScreen]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        handleResize();

        // Safety check: Trigger resize again after a delay to handle production layout timing
        const timeoutId = setTimeout(() => handleResize(), 100);
        // Second check for slower devices/loading
        const timeoutId2 = setTimeout(() => handleResize(), 500);

        // Use ResizeObserver for non-fullscreen mode
        let resizeObserver: ResizeObserver | null = null;
        if (!fullScreen && canvas.parentElement) {
            resizeObserver = new ResizeObserver(() => handleResize());
            resizeObserver.observe(canvas.parentElement);
        } else {
            window.addEventListener('resize', handleResize);
        }

        window.addEventListener('mousemove', handleMouseMove);
        // If not full screen, maybe scope events? 
        // Actually for simplicity, we keep global mouse tracking but local coordinates in handleMouseMove

        document.body.addEventListener('mouseleave', handleMouseLeave);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(timeoutId2);
            if (resizeObserver) {
                resizeObserver.disconnect();
            } else {
                window.removeEventListener('resize', handleResize);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [handleResize, handleMouseMove, handleMouseLeave, animate, fullScreen]);

    return (
        <canvas
            ref={canvasRef}
            className={fullScreen ? "fixed inset-0 pointer-events-none z-0" : `pointer-events-none absolute inset-0 ${className}`}
        />
    );
};

export default InteractiveDashMesh;
