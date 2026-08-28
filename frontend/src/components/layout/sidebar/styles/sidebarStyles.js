import React from "react";

export const GlobalSidebarStyles = () => (
  <style>{`
    .sidebar-scroll-node {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
    }
    
    .sidebar-scroll-node::-webkit-scrollbar { 
      width: 4px; 
    }
    
    .sidebar-scroll-node::-webkit-scrollbar-track { 
      background: transparent; 
    }
    
    .sidebar-scroll-node::-webkit-scrollbar-thumb { 
      background: rgba(255, 255, 255, 0.1); 
      border-radius: 4px; 
    }
    
    .sidebar-scroll-node::-webkit-scrollbar-thumb:hover { 
      background: rgba(255, 255, 255, 0.2); 
    }
  `}</style>
);
