import Settings from "./ui/settings";

export default function Header({
  selectedSourceName,
  selectedSourceFeedLength,
}) {
  return (
    <header className="border-b-2 fixed top-0 w-full z-50 text-center bg-background font-medium flex flex-row items-center">
      {/* <div className="flex flex-row"> */}
        <div className="grow ">
          {selectedSourceName ? selectedSourceName : "No Source Selected"}
          &nbsp;&nbsp;&nbsp;
          {selectedSourceFeedLength ? selectedSourceFeedLength + " items" : ""}
        </div>
        {/* replace with 'settings' icon and have theme toggle in dropdown */}
        <div className="px-4">
          <Settings />
        </div>
      {/* </div> */}
    </header>
  );
}
