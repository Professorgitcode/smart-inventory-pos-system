import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    BrainCircuit,
    Truck,
    Settings,
    ShieldCheck,
    Users,
    LucideGitGraph,
    LucideTrendingUpDown
} from "lucide-react";

export const sidebarNavigation = [
    {
        title: "Main",
        collapsible: false,
        items: [
            {
                label: "Dashboard",
                path: "/",
                icon: LayoutDashboard
            }
        ]
    },

    {
        title: "Operations",
        collapsible: true,
        items: [
            {
                label: "Inventory",
                path: "/inventory",
                icon: Package
            },
            {
                label: "POS System",
                path: "/pos",
                icon: ShoppingCart
            },
            {
                label: "Sales Reports",
                path: "/sales-reports",
                icon: LucideGitGraph
            }
        ]
    },

    {
        title: "Insights",
        collapsible: true,
        items: [
            {
                label: "Inventory Insights",
                path: "/inventory-insights",
                icon: LucideTrendingUpDown
            },
            {
                label: "Forecasting",
                path: "/forecasting",
                icon: BrainCircuit,
                badge: "AI"
            },
            {
                label: "Supplier Intelligence",
                path: "/supplier-intelligence",
                icon: Truck,
                badge: "NEW"
            },
            {
                label: "AI Procurement",
                disabled: true,
                icon: BrainCircuit,
                badge: "AI"
            }
        ]
    },

    {
        title: "System",
        collapsible: true,
        items: [
            {
                label: "Users",
                disabled: true,
                icon: Users
            },
            {
                label: "Audit Trail",
                disabled: true,
                icon: ShieldCheck
            },
            {
                label: "Settings",
                path: "/settings",
                icon: Settings
            }
        ]
    }
];