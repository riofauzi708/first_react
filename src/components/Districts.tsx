import React, { useEffect, useState } from "react";

interface District {
  id: string;
  name: string;
}

interface DistrictsProps {
  regencyId: string | null;
  onDistrictSelect: (district: District | null) => void;
}

const Districts = ({ regencyId, onDistrictSelect }: DistrictsProps) => {
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    if (regencyId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`)
        .then((response) => response.json())
        .then((data: District[]) => {
          setDistricts(data);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    } else {
      setDistricts([]);
    }
  }, [regencyId]);

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selected = districts.find((district) => district.id === selectedId);
    onDistrictSelect(selected || null);
  };

  return (
    <select onChange={handleDistrictChange}>
      <option value="">Pilih Kecamatan</option>
      {districts.map((district) => (
        <option key={district.id} value={district.id}>
          {district.name}
        </option>
      ))}
    </select>
  );
};

export default Districts;