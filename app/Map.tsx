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
          defaultLayers.vector.normal.map, // Ensure you are using the normal.map layer
          {
            center: { lat: 50, lng: 5 },
            zoom: 4,
            pixelRatio: window.devicePixelRatio || 1
          }
        );

        window.addEventListener('resize', () => map.getViewPort().resize());

        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        const moveMapToLocation = (map: any, lat: number, lng: number, zoom: number) => {
          map.setCenter({ lat, lng });
          map.setZoom(zoom);
        };

        // Move map to specific locale
        moveMapToLocation(map, 52.5159, 13.3777, 14);

    
        const addMarker = (map: any, coords: { lat: number, lng: number }) => {
          const marker = new H.map.Marker(coords);
          map.addObject(marker);
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
          { lat: 52.6000, lng: 13.4800 }
        ];

        markerCoordinates.forEach(coords => addMarker(map, coords));
      } catch (error) {
        console.error('Error loading HERE Maps API:', error);
      }
    };

    loadHereMaps();
  }, []);

  return <div id="mapContainer" style={{ width: '100%', height: '500px' }} />;
};

export default Map;