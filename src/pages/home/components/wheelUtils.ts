// Feature Configuration
export const FEATURES = [
    {
        id: 'cv-assessment',
        label: 'CV Assessment',
        icon: 'ri-file-user-line',
        color: 'from-teal-600 to-teal-900',
        description: 'Get instant feedback on your CV against industry standards.',
        path: '/upload-cv'
    },
    {
        id: 'email-generation',
        label: 'Email Generation',
        icon: 'ri-mail-send-line',
        color: 'from-slate-600 to-slate-900',
        description: 'Craft professional emails for every stage of the hiring process.',
        path: '/email-control'
    },
    {
        id: 'cover-letter',
        label: 'Cover Letter',
        icon: 'ri-quill-pen-line',
        color: 'from-indigo-600 to-indigo-900',
        description: 'Generate tailored cover letters for specific job descriptions.',
        path: '/cover-letter'
    },
    {
        id: 'company-research',
        label: 'Company Research',
        icon: 'ri-building-4-line',
        color: 'from-blue-700 to-blue-950',
        description: 'Get deep intelligence briefs on your target companies.',
        path: '/company-research'
    },
    {
        id: 'interview-prep',
        label: 'Interview Prep',
        icon: 'ri-user-voice-line',
        color: 'from-emerald-600 to-emerald-900',
        description: 'Practice with AI-simulated interview scenarios.',
        path: '/interview-prep'
    }
];

// Helper to calculate SVG path for a slice
export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

export function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M", x, y,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z" // Close path to center
    ].join(" ");

    return d;
}
