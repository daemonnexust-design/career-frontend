import { useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import { RefObject, useState } from 'react';
import { FEATURES } from '../components/wheelUtils';

export function useWheelScroll(containerRef: RefObject<HTMLElement>) {
    // 1. Map scroll (300vh) to 0-1 progress
    // Offset: Animation starts when top of container hits top of viewport,
    // and ends when bottom of container hits bottom of viewport.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 2. Calculate Rotation Logic
    // Symmetrical 360° Model:
    // We rotate the wheel exactly 360° over the scroll progress.
    // Each of the 5 features gets exactly 20% (0.2) of the scroll range.
    // Progress 0-0.2: Feature 0, Progress 0.2-0.4: Feature 1, etc.
    const INITIAL_ROTATION = 90; // Start with Slice 0 at 3 o'clock (90 deg)
    const TOTAL_ROTATION = 360;

    const rotation = useTransform(
        scrollYProgress,
        [0, 1],
        [INITIAL_ROTATION, INITIAL_ROTATION - TOTAL_ROTATION]
    );

    // 3. Determine Active Slice Index
    const [activeSliceIndex, setActiveSliceIndex] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const count = FEATURES.length;
        // Bias the index calculation forward +0.05 to trigger changes slightly sooner.
        // This ensures the text updates as soon as the new slice enters the "active visual zone".
        // Wheel is rotating 360 deg, so each slice is 72 deg.
        // At progress 0, rotation is 90 (center of slice 0 at 3 o'clock).
        // At progress 0.1 (halfway through slice 0 range if 5 slices total), it should be 72 deg? No.
        // Wait, if INITIAL_ROTATION is 90, and TOTAL_ROTATION is 360 over [0,1].
        // Then at progress p, rotation is 90 - 360 * p.
        // Slice i covers [i * 72, (i+1) * 72] relative degrees. 
        // We want the text to switch when the visual boundary (line) crosses 3 o'clock.

        const adjustedProgress = latest + 0.05;
        const index = Math.min(Math.max(Math.floor(adjustedProgress * count), 0), count - 1);

        if (index !== activeSliceIndex) {
            console.log(`Switching index: ${activeSliceIndex} -> ${index} at progress ${latest.toFixed(3)}`);
            setActiveSliceIndex(index);
        }
    });

    return {
        scrollYProgress,
        rotation,
        activeSliceIndex
    };
}
