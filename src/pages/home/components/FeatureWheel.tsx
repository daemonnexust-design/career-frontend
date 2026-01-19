import { useNavigate } from 'react-router-dom';
import { FEATURES, describeArc, polarToCartesian } from './wheelUtils';
import { MotionValue, motion, useTransform } from 'framer-motion';

interface FeatureWheelProps {
    rotation: MotionValue<number>;
    isLoggedIn?: boolean;
}

export default function FeatureWheel({ rotation, isLoggedIn = true }: FeatureWheelProps) {
    const navigate = useNavigate();

    const handleSliceClick = (path: string | undefined) => {
        if (isLoggedIn) {
            navigate(path || '#');
        } else {
            navigate('/login');
        }
    };

    // Sizing
    const RADIUS = 550; // Optimized radius for better layout balance
    const VIEWBOX_SIZE = RADIUS * 2 + 100; // Add padding
    const CENTER = VIEWBOX_SIZE / 2;

    // Angle per slice
    const SLICE_ANGLE = 360 / FEATURES.length;

    // Counter-rotation value for the labels (negate the wheel rotation)
    const counterRotation = useTransform(rotation, r => -r); // Using prop rotation

    return (
        <div className="relative w-[1100px] h-[1100px] flex items-center justify-center overflow-visible pointer-events-none">
            <motion.div
                className="w-full h-full flex items-center justify-center pointer-events-auto"
                style={{ rotate: rotation, transformOrigin: 'center' }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
                    className="overflow-visible"
                    style={{ overflow: 'visible' }}
                >
                    {/* Drop shadow filter */}
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="25" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        {/* Gradients for each feature */}
                        {FEATURES.map((feature) => (
                            <radialGradient id={`grad-${feature.id}`} key={feature.id} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="30%" stopColor="rgba(255,255,255,0.15)" />
                                <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
                            </radialGradient>
                        ))}
                    </defs>

                    {FEATURES.map((feature, i) => {
                        const startAngle = i * SLICE_ANGLE;
                        const endAngle = (i + 1) * SLICE_ANGLE;

                        // Generate Path
                        const pathData = describeArc(CENTER, CENTER, RADIUS, startAngle, endAngle);

                        // Calculate Label Position (polar to cartesian for text center)
                        const midAngle = startAngle + (SLICE_ANGLE / 2);
                        // Place content at 68% radius for balanced positioning
                        const labelPos = polarToCartesian(CENTER, CENTER, RADIUS * 0.68, midAngle);

                        // Base colors for stroke/fill reference
                        const sliceColor =
                            i === 0 ? '#0d9488' : // Teal 600
                                i === 1 ? '#475569' : // Slate 600
                                    i === 2 ? '#4f46e5' : // Indigo 600
                                        i === 3 ? '#1d4ed8' : // Blue 700
                                            '#059669';            // Emerald 600

                        return (
                            <g
                                key={feature.id}
                                className="group cursor-pointer"
                                onClick={() => handleSliceClick(feature.path)}
                            >
                                {/* Slice Sector */}
                                <path
                                    d={pathData}
                                    fill={`url(#grad-${feature.id})`}
                                    className="stroke-white/10 stroke-[1px] transition-all duration-300 ease-out group-hover:brightness-110"
                                />

                                <path
                                    d={pathData}
                                    className="stroke-white/10 stroke-2 transition-all duration-300"
                                    fill={sliceColor}
                                    fillOpacity="0.85"
                                />

                                {/* Content Label Group (Transforms for better stability) */}
                                <g transform={`translate(${labelPos.x - 150}, ${labelPos.y - 125})`}>
                                    <foreignObject
                                        width="300"
                                        height="250"
                                        style={{ overflow: 'visible' }}
                                        className="overflow-visible pointer-events-none"
                                    >
                                        <motion.div
                                            className="flex flex-col items-center justify-center text-center p-4 origin-center"
                                            style={{
                                                rotate: counterRotation,
                                                width: 300,
                                                height: 250,
                                                transformOrigin: 'center center'
                                            }}
                                        >
                                            <div className="flex flex-col items-center gap-3">
                                                <i className={`${feature.icon} text-4xl sm:text-5xl text-white drop-shadow-xl opacity-90`}></i>
                                                <span className="text-white text-2xl md:text-3xl font-bold font-serif leading-tight max-w-[240px] drop-shadow-lg select-none tracking-tight">
                                                    {feature.label}
                                                </span>
                                            </div>
                                        </motion.div>
                                    </foreignObject>
                                </g>
                            </g>
                        );
                    })}

                    {/* Inner Circle (The "Hub") - Proportional Size */}
                    <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.2} fill="white" filter="url(#glow)" stroke="#f3f4f6" strokeWidth="1" />
                    <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.2} fill="white" />

                </svg>
            </motion.div>

            {/* Active Indicator (Static Notch @ 3 o'clock) */}
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="bg-white p-3.5 rounded-full shadow-2xl border-4 border-white/20 flex items-center justify-center scale-110">
                    <div className="w-2.5 h-2.5 bg-black rounded-full" />
                </div>
            </div>

        </div>
    );
}
