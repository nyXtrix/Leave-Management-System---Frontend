import { Bell } from "lucide-react";

const WorkflowDiagram = () => (
  <div className="relative w-full max-w-2xl mx-auto select-none">
    <svg
      viewBox="0 0 560 380"
      className="w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="560" height="380" rx="24" fill="#F8FAFC" />

      <g transform="translate(20, 20)">
        <path
          d="M130 80 L220 80"
          stroke="#D0D5DD"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-14"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M310 80 L390 80"
          stroke="#D0D5DD"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-14"
            dur="1.5s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </path>
        <path
          d="M480 100 L480 200"
          stroke="#10b981"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-14"
            dur="1.5s"
            repeatCount="indefinite"
            begin="0.6s"
          />
        </path>
        <path
          d="M350 100 L200 190"
          stroke="#F97316"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-14"
            dur="1.5s"
            repeatCount="indefinite"
            begin="0.6s"
          />
        </path>
        <path
          d="M480 240 L330 290"
          stroke="#D0D5DD"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-14"
            dur="1.5s"
            repeatCount="indefinite"
            begin="0.9s"
          />
        </path>
        <path
          d="M200 230 L260 290"
          stroke="#D0D5DD"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-14"
            dur="1.5s"
            repeatCount="indefinite"
            begin="0.9s"
          />
        </path>

        <rect
          x="20"
          y="58"
          width="110"
          height="44"
          rx="10"
          fill="#fff"
          stroke="#E4E7EC"
          strokeWidth="1.5"
        />
        <text
          x="75"
          y="77"
          textAnchor="middle"
          fill="#344054"
          fontSize="10"
          fontWeight="700"
        >
          Employee
        </text>
        <text x="75" y="91" textAnchor="middle" fill="#667085" fontSize="9">
          Submits Request
        </text>

        <rect
          x="220"
          y="58"
          width="90"
          height="44"
          rx="10"
          fill="#fff"
          stroke="#E4E7EC"
          strokeWidth="1.5"
        />
        <text
          x="265"
          y="77"
          textAnchor="middle"
          fill="#344054"
          fontSize="10"
          fontWeight="700"
        >
          Manager
        </text>
        <text x="265" y="91" textAnchor="middle" fill="#667085" fontSize="9">
          Reviews
        </text>

        <rect
          x="390"
          y="58"
          width="90"
          height="44"
          rx="10"
          fill="#fff"
          stroke="#E4E7EC"
          strokeWidth="1.5"
        />
        <text
          x="435"
          y="77"
          textAnchor="middle"
          fill="#344054"
          fontSize="10"
          fontWeight="700"
        >
          HR Lead
        </text>
        <text x="435" y="91" textAnchor="middle" fill="#667085" fontSize="9">
          Final Approval
        </text>

        <rect
          x="430"
          y="200"
          width="90"
          height="40"
          rx="10"
          fill="#D1FAE5"
          stroke="#6EE7B7"
          strokeWidth="1.5"
        >
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        <text
          x="475"
          y="218"
          textAnchor="middle"
          fill="#059669"
          fontSize="10"
          fontWeight="700"
        >
          Approved
        </text>
        <text x="475" y="232" textAnchor="middle" fill="#10b981" fontSize="9">
          Balance Updated
        </text>

        <rect
          x="150"
          y="190"
          width="90"
          height="40"
          rx="10"
          fill="#FFF7ED"
          stroke="#FDBA74"
          strokeWidth="1.5"
        >
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2s"
            repeatCount="indefinite"
            begin="1s"
          />
        </rect>
        <text
          x="195"
          y="208"
          textAnchor="middle"
          fill="#EA580C"
          fontSize="10"
          fontWeight="700"
        >
          Forwarded
        </text>
        <text x="195" y="222" textAnchor="middle" fill="#F97316" fontSize="9">
          Re-routed
        </text>

        <rect
          x="250"
          y="278"
          width="90"
          height="40"
          rx="10"
          fill="#fff"
          stroke="#E4E7EC"
          strokeWidth="1.5"
        />
        <foreignObject x="272" y="288" width="50" height="20">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-[10px] font-bold text-secondary-700">
              Notify
            </span>
            <Bell className="h-3.5 w-3.5 text-primary-500" />
          </div>
        </foreignObject>
        <text x="295" y="310" textAnchor="middle" fill="#667085" fontSize="9">
          Employee Alerted
        </text>

        <circle r="4" fill="#FF1919">
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#wf-path1" />
          </animateMotion>
        </circle>
        <path
          id="wf-path1"
          d="M130 80 L220 80 L310 80 L390 80 L480 80 L480 220 L330 290"
        />
      </g>
    </svg>
  </div>
);

export default WorkflowDiagram;
