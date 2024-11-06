import { useState, useEffect } from "react";

export function useTransformAddress(addresses) {
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = "ec2bada8dd6f4e3ea22e305ea294ff13";


  useEffect(() => {

    const fetchCoordinates = async () => {
      if (addresses && addresses.length > 0) {
        setLoading(true);
        setError(null);

        try {
          const coords = await Promise.all(
            addresses.map(async (address) => {
              if (!address) return null;

              const response = await fetch(
                `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
                  address
                )}&apiKey=${apiKey}`
              );

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const result = await response.json();

              if (result && result.features && result.features.length > 0) {
                const { lat, lon } = result.features[0].properties;
                return { lat, lon };
              } else {
                console.error("No coordinates found for the given address");
                return null;
              }
            })
          );

          setCoordinates(coords);
        } catch (error) {
          console.error("Error fetching coordinates:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCoordinates();
  }, [addresses]);

  return { coordinates, loading, error };
}
