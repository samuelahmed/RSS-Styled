import { useEffect, useState, createRef, useRef } from "react";
import { formatDate } from "../utils";
import useFeedKeyboardNav from "@/hooks/useFeedKeyboardNav";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Feed({
  fetchedFeed,
  showModal,
  selectedSourceFeed,
  setShowModal,
  setSelectedSource,
  setSelectedArticle,
  selectedSourceURL,
}) {
  let counter = 1;
  const [tempArticleIndex, setTempArticleIndex] = useState(0);

  const setSelectedSourceFeed = (feed) => {
    setSelectedSource((prevState) => ({
      ...prevState,
      feed: feed,
    }));
  };

  const setSelectedArticleIndex = (index) => {
    setSelectedArticle((prevState) => ({
      ...prevState,
      index: index,
    }));
  };

  const setSelectedArticleContent = (content) => {
    setSelectedArticle((prevState) => ({
      ...prevState,
      content: content,
    }));
  };

  const itemRef = useFeedKeyboardNav({
    initialRefs: selectedSourceFeed.map(() => createRef()),
    showModal,
    selectedSourceURL,
    tempArticleIndex,
    selectedSourceFeed,
    setShowModal,
    setTempArticleIndex,
    setSelectedArticle,
    setSelectedSource,
    setSelectedArticleIndex,
    setSelectedArticleContent,
  });

  console.log(fetchedFeed);
  useEffect(() => {
    const serverDataItemType = {
      atom: fetchedFeed?.feed?.entry,
      rss: fetchedFeed?.rss?.channel?.item,
      rdf: fetchedFeed?.rdf?.item,
    };
    if (serverDataItemType.atom && serverDataItemType.atom.length > 0) {
      setSelectedSourceFeed(serverDataItemType.atom);
    } else if (serverDataItemType.rss && serverDataItemType.rss.length > 0) {
      setSelectedSourceFeed(serverDataItemType.rss);
    } else if (serverDataItemType.rdf && serverDataItemType.rdf.length > 0) {
      setSelectedSourceFeed(serverDataItemType.rdf);
    }
    setTempArticleIndex(0);
    setSelectedArticleIndex(null);
  }, [fetchedFeed]);

  return (
    <>
      <div className="h-screen flex-grow px-1 overflow-auto scrollbar mb-6 pt-1">
        <Table>
          {/* <TableCaption>Select a source to populate your feed</TableCaption> */}
          <TableBody>
            {selectedSourceFeed.map((item, index) => (
              <TableRow
                key={index}
                ref={index === tempArticleIndex ? itemRef : null}
                className={
                  tempArticleIndex === index
                    ? "bg-foreground hover:bg-primary text-primary-foreground cursor-pointer"
                    : "hover:bg-foreground hover:text-primary-foreground cursor-pointer"
                }


                
                onClick={() => {
                  setTempArticleIndex(index);
                  setSelectedArticleIndex(index);
                  setSelectedArticleContent(item);
                  setShowModal(true);
                }}
              >
                <TableCell className="font-medium">{counter++}.</TableCell>
                <TableCell className="font-medium flex flex-row whitespace-nowrap">
                  {formatDate(item)}
                </TableCell>
                <TableCell>
                  {typeof item.title === "string" ? item.title : item.title?._}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
