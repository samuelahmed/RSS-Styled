import devSources from "../sources/dev";
import newsSources from "../sources/news";
import techSources from "../sources/tech";
import youtubeSources from "../sources/youtube";
import podcastSources from "../sources/podcast";
import { useState } from "react";
import useSourceKeyboardNav from "@/hooks/useSourceKeyboardNav";
import { Button } from "@/components/ui/button";

export default function Sources({ setSelectedSource, selectedSourceURL }) {
  const sources = [
    { title: "News", data: newsSources },
    { title: "Tech", data: techSources },
    { title: "Dev", data: devSources },
    { title: "Youtube", data: youtubeSources },
    { title: "Podcast", data: podcastSources },
  ];

  const sourceData = sources.map((source) => source.data);
  const [tempSourceIndex, setTempSourceIndex] = useState(0);
  const [tempCategoryIndex, setTempCategoryIndex] = useState(0);

  const itemRefs = useSourceKeyboardNav({
    selectedSourceURL,
    initialRefs: sources.map(() => new Map()),
    sourceData,
    setTempSourceIndex,
    setTempCategoryIndex,
    tempSourceIndex,
    tempCategoryIndex,
    setSelectedSource,
  });

  return (
    <aside>
      <div
        className="scrollbar fixed overflow-y-auto scrollbar w-1/3 md:w-1/5 border-r-2"
        style={{ height: "94vh" }}
      >
        {sourceData.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <p
              key={categoryIndex}
              className={`text-left ${
                categoryIndex !== 0 ? "border-t-2" : ""
              } text-md md:text-lg pl-3`}
            >
              {sources[categoryIndex].title}
            </p>
            <ul className="h-40 pl-3 pr-0.5 py-1 overflow-auto scrollbar space-y-0.5">
              {category.map((item, itemIndex) => (
                <div
                  ref={(el) => {
                    if (el) {
                      itemRefs.current[categoryIndex].set(itemIndex, el);
                    }
                  }}
                  key={itemIndex}
                >
                  <Button
                    variant="outline"
                    className={
                      "w-full overflow-x-auto overflow-y-hidden justify-start px-1 text-xs md:text-base " +
                      (itemIndex === tempSourceIndex &&
                      categoryIndex === tempCategoryIndex
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary hover:text-primary-foreground")
                    }
                    onClick={() => {
                      setTempSourceIndex(itemIndex);
                      setTempCategoryIndex(categoryIndex);
                      setSelectedSource((prevState) => ({
                        ...prevState,
                        name: item.title,
                        url: item.url,
                      }));
                    }}
                  >
                    {item.title}
                  </Button>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
