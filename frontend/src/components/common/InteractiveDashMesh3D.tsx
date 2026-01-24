import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

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

const COLORS = [
    new THREE.Color(0x14b8a6),
    new THREE.Color(0x2dd4bf),
    new THREE.Color(0x5eead4),
    new THREE.Color(0x06b6d4),
    new THREE.Color(0x22d3ee),
];

interface DashData {
    refX: number;
    refY: number;
    refZ: number;
    x: number;
    y: number;
    z: number;
    scale: number;
    rotation: number;
    lifeOffset: number;
    colorIndex: number;
}

interface Props {
    dashSpacing?: number;
}

const InteractiveDashMesh3D: React.FC<Props> = ({ dashSpacing = 1.2 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const instancedMeshRef = useRef<THREE.InstancedMesh>();
    const dashDataRef = useRef<DashData[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetMouseRef = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);
    const hoverProgressRef = useRef(0);
    const isHoveringRef = useRef(false);
    const animationRef = useRef<number>();
    const viewSizeRef = useRef({ width: 20, height: 15 });

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.z = 15;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const dashGeometry = new THREE.PlaneGeometry(0.5, 0.04); // More elongated, less confetti-like
        const dashMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
        });

        // Calculate view dimensions based on camera FOV to cover full window
        const fov = 60;
        const cameraZ = 15;
        const vFOV = (fov * Math.PI) / 180;
        const viewHeight = 2 * Math.tan(vFOV / 2) * cameraZ * 1.2; // 1.2 for padding
        const aspect = window.innerWidth / window.innerHeight;
        const viewWidth = viewHeight * aspect * 1.2;
        viewSizeRef.current = { width: viewWidth, height: viewHeight };
        const cols = Math.ceil(viewWidth / dashSpacing);
        const rows = Math.ceil(viewHeight / dashSpacing);
        const instanceCount = cols * rows;

        const instancedMesh = new THREE.InstancedMesh(
            dashGeometry,
            dashMaterial,
            instanceCount
        );
        instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        scene.add(instancedMesh);
        instancedMeshRef.current = instancedMesh;

        const dashData: DashData[] = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = (col - cols / 2) * dashSpacing;
                const y = (row - rows / 2) * dashSpacing;
                dashData.push({
                    refX: x,
                    refY: y,
                    refZ: 0,
                    x: x,
                    y: y,
                    z: 0,
                    scale: 0.3 + Math.random() * 0.3,
                    rotation: Math.random() * Math.PI * 2,
                    lifeOffset: Math.random() * 100,
                    colorIndex: Math.floor(Math.random() * COLORS.length),
                });
            }
        }
        dashDataRef.current = dashData;

        const colorArray = new Float32Array(instanceCount * 3);
        for (let i = 0; i < instanceCount; i++) {
            const color = COLORS[dashData[i].colorIndex];
            colorArray[i * 3] = color.r;
            colorArray[i * 3 + 1] = color.g;
            colorArray[i * 3 + 2] = color.b;
        }
        instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(colorArray, 3);

        const dummy = new THREE.Object3D();

        const animate = () => {
            timeRef.current += 0.016;
            const time = timeRef.current;

            const target = targetMouseRef.current;
            const current = mouseRef.current;
            current.x += (target.x - current.x) * 0.02;
            current.y += (target.y - current.y) * 0.02;

            const targetHover = isHoveringRef.current ? 1 : 0;
            hoverProgressRef.current += (targetHover - hoverProgressRef.current) * 0.03;
            const hoverProgress = hoverProgressRef.current;

            const vs = viewSizeRef.current;
            const wanderX = snoise(time * 0.08, 0, 0) * vs.width * 0.35;
            const wanderY = snoise(0, time * 0.08, 0) * vs.height * 0.35;
            const focusX = current.x * hoverProgress + wanderX * (1 - hoverProgress);
            const focusY = current.y * hoverProgress + wanderY * (1 - hoverProgress);
            const focusZ = -2;
            const focusOuterRadius = Math.min(vs.width, vs.height) * 0.5;

            dashDataRef.current.forEach((dash, i) => {
                const normX = dash.x / 15;
                const normY = dash.y / 10;

                const distToFocus = Math.sqrt(
                    Math.pow(dash.x - focusX, 2) +
                    Math.pow(dash.y - focusY, 2) +
                    Math.pow(dash.z - focusZ, 2)
                );

                let focusIntensity = 0;
                if (distToFocus < focusOuterRadius) {
                    const t = distToFocus / focusOuterRadius;
                    // Sharper falloff - fewer dashes at max size
                    focusIntensity = Math.pow(Math.sin(t * Math.PI), 2);
                }

                const noiseX = snoise(normX * 3, normY * 3, time * 0.15 + 100);
                const noiseY = snoise(normX * 3, normY * 3, time * 0.15);
                const noiseZ = snoise(normX * 3, normY * 3, time * 0.15 + 50);

                const noiseX2 = snoise(normX * 0.8, normY * 0.8, time * 0.08 + 45);
                const noiseY2 = snoise(normX * 0.8, normY * 0.8, time * 0.08 + 87);
                const noiseZ2 = snoise(normX * 0.8, normY * 0.8, time * 0.08 + 120);

                const delayFactor = Math.min(1, distToFocus / 15) * 0.03 + 0.01;
                const dirX = dash.refX - dash.x;
                const dirY = dash.refY - dash.y;
                const dirZ = dash.refZ - dash.z;
                const dist = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);

                if (dist > 0.01) {
                    const strength = Math.min(1, dist / 2) * delayFactor;
                    dash.x += dirX * strength;
                    dash.y += dirY * strength;
                    dash.z += dirZ * strength;
                }

                const activityLevel = focusIntensity;
                let dispX = noiseX2 * (0.1 + activityLevel * 1.5);
                let dispY = noiseY2 * (0.1 + activityLevel * 1.5);
                let dispZ = noiseZ2 * (0.1 + activityLevel * 2.0);

                dispX += noiseX * activityLevel * 0.8;
                dispY += noiseY * activityLevel * 0.8;
                dispZ += noiseZ * activityLevel * 1.2;

                const finalX = dash.x + dispX;
                const finalY = dash.y + dispY;
                const finalZ = dash.z + dispZ;

                const baseScale = 0.1;
                const activeScale = 1.2 + Math.sin((dash.lifeOffset + time * 0.8) * 0.8) * 0.3;
                const targetScale = baseScale + (activeScale - baseScale) * activityLevel;
                dash.scale += (targetScale - dash.scale) * 0.08;

                if (activityLevel > 0.1) {
                    const targetRotation = Math.atan2(focusY - dash.y, focusX - dash.x);
                    const rotDiff = targetRotation - dash.rotation;
                    const normalizedDiff = Math.atan2(Math.sin(rotDiff), Math.cos(rotDiff));
                    dash.rotation += normalizedDiff * 0.05;
                } else {
                    dash.rotation += snoise(normX * 2, normY * 2, time * 0.3) * 0.02;
                }

                dummy.position.set(finalX, finalY, finalZ);
                dummy.rotation.z = dash.rotation;
                dummy.scale.set(dash.scale, dash.scale, 1);
                dummy.updateMatrix();
                instancedMesh.setMatrixAt(i, dummy.matrix);

                const opacity = Math.min(1, 0.3 + dash.scale * 0.3 + activityLevel * 0.4);
                const color = COLORS[dash.colorIndex];
                colorArray[i * 3] = color.r * opacity;
                colorArray[i * 3 + 1] = color.g * opacity;
                colorArray[i * 3 + 2] = color.b * opacity;
            });

            instancedMesh.instanceMatrix.needsUpdate = true;
            if (instancedMesh.instanceColor) {
                instancedMesh.instanceColor.needsUpdate = true;
            }

            renderer.render(scene, camera);
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;

            // Use accurate raycasting to find intersection with Z=0 plane
            const vec = new THREE.Vector3(x, y, 0.5);
            vec.unproject(camera);
            vec.sub(camera.position).normalize();
            const distance = -camera.position.z / vec.z;
            const pos = new THREE.Vector3().copy(camera.position).add(vec.multiplyScalar(distance));

            targetMouseRef.current = { x: pos.x, y: pos.y };
            isHoveringRef.current = true;
        };

        const handleMouseLeave = () => {
            isHoveringRef.current = false;
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Update view dimensions for wander limits
            const vFOV = (camera.fov * Math.PI) / 180;
            const height = 2 * Math.tan(vFOV / 2) * camera.position.z * 1.2;
            const width = height * camera.aspect * 1.2;
            viewSizeRef.current = { width, height };
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            renderer.dispose();
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, [dashSpacing]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
};

export default InteractiveDashMesh3D;
