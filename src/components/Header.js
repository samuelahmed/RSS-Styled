import ThemeToggle from "./ui/themeToggle";

export default function Header({
  selectedSourceName,
  selectedSourceFeedLength,
}) {
  return (
    <header className="border-b-2 fixed top-0 w-full z-50 text-center bg-background font-medium flex justify-center">
      <div>
        {selectedSourceName ? selectedSourceName : "No Source Selected"}
        &nbsp;&nbsp;&nbsp;
        {selectedSourceFeedLength ? selectedSourceFeedLength + " items" : ""}
      </div>
      {/* replace with 'settings' icon and have theme toggle in dropdown */}
      <ThemeToggle />
    </header>
  );
}
