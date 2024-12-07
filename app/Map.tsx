"use client";

import { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadHereMaps = async () => {
      try {
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");

        const H = (window as any).H;

        const platform = new H.service.Platform({
          apikey: "6-zqCcBMPmGWLqKmBUE4gVxnPSAdE-QCfx5jvbDaYmM",
        });

        const defaultLayers = platform.createDefaultLayers();

        const map = new H.Map(
          document.getElementById("mapContainer") as HTMLElement,
          defaultLayers.vector.normal.map,
          {
            center: { lat: 52.5159, lng: 13.3777 },
            zoom: 14,
            pixelRatio: window.devicePixelRatio || 1,
          }
        );

        window.addEventListener("resize", () => map.getViewPort().resize());

        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        const addCustomDOMMarker = (
          map: any,
          coords: { lat: number; lng: number },
          number: number
        ) => {
          const outerDiv = document.createElement("div");
      
          outerDiv.style.position = "relative";
          outerDiv.style.width = "24px";
          outerDiv.style.height = "36px"; 
          outerDiv.style.backgroundColor = "orange";
          outerDiv.style.borderRadius = "50% 50% 50% 50%"; 
          outerDiv.style.clipPath = "polygon(50% 100%, 100% 30%, 50% 0%, 0% 30%)"; 
          outerDiv.style.border = "2px solid black";
        
          const innerDiv = document.createElement("div");
          innerDiv.style.position = "absolute";
          innerDiv.style.top = "50%";
          innerDiv.style.left = "50%";
          innerDiv.style.transform = "translate(-50%, -50%)"; // Keeps text centered
          innerDiv.style.color = "black";
          innerDiv.style.fontWeight = "bold";
          innerDiv.style.fontSize = "12px";
          innerDiv.style.fontFamily = "Arial, sans-serif";
          innerDiv.innerText = number.toString();
        
          outerDiv.appendChild(innerDiv);
        
          const domIcon = new H.map.DomIcon(outerDiv);
          const domMarker = new H.map.DomMarker(coords, { icon: domIcon });
          map.addObject(domMarker);
        };
        

        const markerCoordinates = [
          { lat: 52.5159, lng: 13.3777 },
          { lat: 52.5200, lng: 13.4050 },
          { lat: 52.5300, lng: 13.4100 },
          { lat: 52.5400, lng: 13.4200 },
          { lat: 52.5500, lng: 13.4300 },
          { lat: 52.5600, lng: 13.4400 },
          { lat: 52.5700, lng: 13.4500 },
          { lat: 52.5800, lng: 13.4600 },
          { lat: 52.5900, lng: 13.4700 },
          { lat: 52.6000, lng: 13.4800 },
        ];

        markerCoordinates.forEach((coords, index) =>
          addCustomDOMMarker(map, coords, index + 1)
        );
      } catch (error) {
        console.error("Error loading HERE Maps API:", error);
      }
    };

    loadHereMaps();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <div id="mapContainer" style={{ width: "500px", height: "500px" }} />
    </div>
  );
};

export default Map;
