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
            <h4
              key={categoryIndex}
              className={`text-left pt-2 scroll-m-20 text-lg font-semibold tracking-tight" ${
                categoryIndex !== 0 ? "border-t-2" : ""
              } text-md md:text-lg pl-3`}
            >
              {sources[categoryIndex].title}
            </h4>
            <ul className="h-40 py-1 overflow-auto scrollbar">
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
                      "w-full overflow-x-auto overflow-y-hidden justify-start px-3 text-xs md:text-base " +
                      (itemIndex === tempSourceIndex &&
                      categoryIndex === tempCategoryIndex
                        ? "bg-foreground hover:bg-primary hover:text-primary-foreground text-primary-foreground"
                        : "hover:bg-foreground hover:text-primary-foreground")
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
