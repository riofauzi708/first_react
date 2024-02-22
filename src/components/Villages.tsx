import React, { useEffect, useState } from "react";

interface Village {
  id: string;
  name: string;
}

interface VillagesProps {
  districtId: string | null;
  onVillageSelect: (village: Village | null) => void;
}

const Villages = ({ districtId, onVillageSelect }: VillagesProps) => {
  const [villages, setVillages] = useState<Village[]>([]);

  useEffect(() => {
    if (districtId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`)
        .then((response) => response.json())
        .then((data: Village[]) => {
          setVillages(data);
        })
        .catch((error) => {
          console.error("Error fetching villages:", error);
        });
    } else {
      setVillages([]);
    }
  }, [districtId]);

  const handleVillageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selected = villages.find((village) => village.id === selectedId);
    onVillageSelect(selected || null);
  };

  return (
    <div>
      <select onChange={handleVillageChange}>
        <option value="">Pilih Desa/Kelurahan</option>
        {villages.map((village) => (
          <option key={village.id} value={village.id}>
            {village.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Villages;