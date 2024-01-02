import xml2js from "xml2js";

function isYouTubeChannelURL(url) {
  return url.includes("youtube.com");
}

const headers = {
  "Cache-Control": "no-cache",
};

export async function GET(request) {
  
  try {

    let url = new URL(request.url).searchParams.get("feedUrl");

    // Validate the URL
    if (!url || url.trim() === "") {
      return new Response(JSON.stringify({ error: "URL is empty" }), {
        status: 400,
      });
    }

    // Fallback if cache-control header is not working
    // Which seems to be decently often
    if (!isYouTubeChannelURL(url)) {
      url = `${url}?nocache=${Date.now()}`;
    }

    const response = await fetch(url, { headers });

    // Check the status of the response
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Fetch request failed with status ${response.status}`,
        }),
        {
          status: response.status,
        }
      );
    }

    const xmlData = await response.text();

    // Check if the feed is RDF
    const isRdf = xmlData.includes("<rdf:RDF");

    const jsonData = await xml2js.parseStringPromise(xmlData, {
      explicitArray: false,
      mergeAttrs: true,
    });

    // If the feed is RDF, handle the RDF structure
    if (isRdf) {
      if (
        jsonData["rdf:RDF"]?.channel?.items?.["rdf:li"] &&
        jsonData["rdf:RDF"].channel.items["rdf:li"].length > 100
      ) {
        jsonData["rdf:RDF"].channel.items["rdf:li"] = jsonData[
          "rdf:RDF"
        ].channel.items["rdf:li"].slice(0, 100);
      }
      if (jsonData["rdf:RDF"]?.item && jsonData["rdf:RDF"].item.length > 100) {
        jsonData["rdf:RDF"].item = jsonData["rdf:RDF"].item.slice(0, 100);
      }
    } else {
      // Handle RSS/Atom structure
      if (jsonData.feed?.entry && jsonData.feed.entry.length > 100) {
        jsonData.feed.entry = jsonData.feed.entry.slice(0, 100);
      } else if (
        jsonData.rss?.channel?.item &&
        jsonData.rss.channel.item.length > 100
      ) {
        jsonData.rss.channel.item = jsonData.rss.channel.item.slice(0, 100);
      }
    }

    return new Response(JSON.stringify(jsonData));
    
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}