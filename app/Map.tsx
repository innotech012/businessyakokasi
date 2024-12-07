"use client";

import { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadHereMaps = async () => {
      try {
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js');

        const H = (window as any).H;

        const platform = new H.service.Platform({
          apikey: '6-zqCcBMPmGWLqKmBUE4gVxnPSAdE-QCfx5jvbDaYmM'
        });

        const defaultLayers = platform.createDefaultLayers();

        const map = new H.Map(
          document.getElementById('mapContainer') as HTMLElement,
          defaultLayers.vector.normal.map,
          {
            center: { lat: 50, lng: 5 },
            zoom: 4,
            pixelRatio: window.devicePixelRatio || 1
          }
        );

        window.addEventListener('resize', () => map.getViewPort().resize());

        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        const moveMapToBerlin = (map: any) => {
          map.setCenter({ lat: 52.5159, lng: 13.3777 });
          map.setZoom(14);
        };

        moveMapToBerlin(map);

        
        const addMarkersToMap = (map: any) => {
          const berlinMarker = new H.map.Marker({ lat: 52.5159, lng: 13.3777 });
          map.addObject(berlinMarker);
          console.log('Berlin marker added');

          const anotherMarker = new H.map.Marker({ lat: 52.5200, lng: 13.4050 });
          map.addObject(anotherMarker);
          console.log('Another marker added');

          const customMarker = new H.map.Marker({ lat: 52.5300, lng: 13.4100 });
          map.addObject(customMarker);
          console.log('Custom marker added');
        };

        addMarkersToMap(map);
      } catch (error) {
        console.error('Error loading HERE Maps API:', error);
      }
    };

    loadHereMaps();
  }, []);

  return <div id="mapContainer" style={{ width: '100%', height: '500px' }} />;
};

export default Map;