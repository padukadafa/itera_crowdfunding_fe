import { cn } from "@/lib/utils";
import { Facebook, Instagram, X } from "lucide-react";

const Footer = ({ className }: React.ComponentProps<"footer">) => {
  return (
    <footer
      className={cn(
        "border-t-2 border-b-2 w-full py-10 px-72 flex items-center justify-between",
        className
      )}
    >
      <p>© 2025 Clarity. All rights reserved</p>
      <div></div>
      <div className="flex items-center gap-x-4">
        <p>Ikuti kami:</p>
        <Facebook />
        <X />
        <Instagram />
      </div>
    </footer>
  );
};

export default Footer;
