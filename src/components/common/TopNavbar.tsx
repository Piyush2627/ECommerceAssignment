import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
export const categories = [
  { slug: "cloths", label: "Cloths" },
  { slug: "electronics", label: "Electronics" },
  { slug: "furniture", label: "Furniture" },
  { slug: "shoes", label: "Shoes" },
];

export default function TopNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Marketa
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary text-gray-600"
              }
            >
              All
            </NavLink>

            {categories.map((cat) => (
              <NavLink
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-primary border-primary border-b-2 font-semibold"
                      : "hover:text-primary text-gray-600"
                  }`
                }
              >
                {cat.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 border-gray-100 bg-white">
              <div>youremail.com</div>
            </HoverCardContent>
          </HoverCard>
          <Button variant="default" size="sm">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
