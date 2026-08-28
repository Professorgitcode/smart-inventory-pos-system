import { sidebarNavigation } from "./sidebar.config";
import SidebarGroup from "./SidebarGroup";

const SidebarNavigation = ({ theme, searchTerm }) => {
    return (
        <>
            {sidebarNavigation.map(group => (
                <SidebarGroup
                    key={group.title}
                    group={group}
                    theme={theme}
                    searchTerm={searchTerm}
                />
            ))}
        </>
    );
};

export default SidebarNavigation;