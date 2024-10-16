import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
// Types
type IMenuItem = {
    id: string;
    icon: string;
    label: string;
    type: "link" | "dropdown";
    children?: IMenuItem[];
};

// Icon component
const Icon: React.FC<{ name: string }> = ({ name }) => {
    const icons: { [key: string]: JSX.Element } = {
        home: (
            <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        ),
        file: (
            <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
        ),
        chevronDown: (
            <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            >
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        ),
        chevronUp: (
            <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            >
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        ),
        star: (
            <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        ),
    };
    return icons[name] || null;
};

// Star Rating Component
const StarRating: React.FC<{
    rating: number;
    onRatingChange: (rating: number) => void;
}> = ({ rating, onRatingChange }) => {
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    onClick={() => onRatingChange(star)}
                    className={`star ${star <= (hoveredStar || rating) ? "filled" : ""}`}
                >
                    <Icon name="star" />
                </span>
            ))}
        </div>
    );
};

// Dropdown Component
const Dropdown: React.FC<{
    item: IMenuItem;
    isActive: boolean;
    onToggle: () => void;
    onSelect: (child: IMenuItem) => void;
}> = ({ item, isActive, onToggle, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeChild, setActiveChild] = useState(item.children?.[0] || null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
        onToggle();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="dropdown">
            <button
                onClick={handleToggle}
                className={`menu-item ${isActive ? "active" : ""}`}
            >
                <span className="menu-item-content">
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                </span>
                <span>{activeChild?.label}</span>
                <Icon name={isOpen ? "chevronUp" : "chevronDown"} />
            </button>
            {isOpen && (
                <div className="relative">
                    <div className="absolute right-10 bg-white border rounded">
                        {item.children?.map((child) => (
                            <button
                                key={child.id}
                                className="dropdown-item"
                                onClick={() => {
                                    setActiveChild(child);
                                    onSelect(child);
                                    setIsOpen(false);
                                }}
                            >
                                <Icon name={child.icon} />
                                <span>{child.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Menu Item Component
const MenuItem: React.FC<{
    item: IMenuItem;
    isActive: boolean;
    onClick: () => void;
    onSelect?: (child: IMenuItem) => void;
}> = ({ item, isActive, onClick, onSelect }) => {
    if (item.type === "dropdown" && onSelect) {
        return (
            <Dropdown
                item={item}
                isActive={isActive}
                onToggle={onClick}
                onSelect={onSelect}
            />
        );
    }

    return (
        <button
            onClick={onClick}
            className={`menu-item ${isActive ? "active" : ""}`}
        >
            <span className="menu-item-content">
                <Icon name={item.icon} />
                <span>{item.label}</span>
            </span>
        </button>
    );
};

// Main Sidebar Component
export default function Sidebar() {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [, setSelectedDropdownItem] = useState<IMenuItem | null>(null);
    const [rating, setRating] = useState(4.6);

    const menuItems: IMenuItem[] = [
        {
            id: "lexikon",
            icon: "home",
            label: "Item 1",
            type: "link",
        },
        {
            id: "preisschatzung",
            icon: "file",
            label: "Item 2",
            type: "link",
        },
        {
            id: "checklisten",
            icon: "file",
            label: "Item 3",
            type: "dropdown",
            children: [
                {
                    id: "check1",
                    icon: "file",
                    label: "subItem 1",
                    type: "link",
                },
                {
                    id: "check2",
                    icon: "file",
                    label: "subItem 2",
                    type: "link",
                },
            ],
        },
        { id: "ratgeber", icon: "file", label: "Item 4", type: "link" },
        {
            id: "mandatsnavigator",
            icon: "file",
            label: "Item 5",
            type: "link",
        },
        {
            id: "wohntraumfinder",
            icon: "home",
            label: "Item 6",
            type: "link",
        },
    ];

    const handleDropdownSelect = (child: IMenuItem) => {
        setSelectedDropdownItem(child);
        setActiveItem("checklisten");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>Header</h1>
                <p>Subheader</p>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.id}
                        item={item}
                        isActive={activeItem === item.id}
                        onClick={() => setActiveItem(item.id)}
                        onSelect={
                            item.type === "dropdown"
                                ? handleDropdownSelect
                                : undefined
                        }
                    />
                ))}
            </nav>
            <div className="sidebar-footer">
                <div className="avatar">
                    <img src="/assets/avatar.jpeg" alt="Profile" />
                </div>
                <div className="profile-info">
                    <h2>John Doe</h2>
                    <p>Designation - Software Engineer</p>
                </div>
                <div className="rating">
                    <StarRating rating={rating} onRatingChange={setRating} />
                    <span>{rating.toFixed(1)} von 5</span>
                </div>
            </div>
        </div>
    );
}
