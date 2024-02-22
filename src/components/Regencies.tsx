import React, { useEffect, useState } from "react";

interface Regency {
  id: string;
  name: string;
}

interface RegenciesProps {
  provinceId: string | null;
  onRegencySelect: (regency: Regency | null) => void;
}

const Regencies = ({ provinceId, onRegencySelect }: RegenciesProps) => {
  const [regencies, setRegencies] = useState<Regency[]>([]);

  useEffect(() => {
    if (provinceId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
        .then((response) => response.json())
        .then((data: Regency[]) => {
          setRegencies(data);
        })
        .catch((error) => {
          console.error("Error fetching regencies:", error);
        });
    } else {
      setRegencies([]);
    }
  }, [provinceId]);

  const handleRegencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selected = regencies.find((regency) => regency.id === selectedId);
    onRegencySelect(selected || null);
  };

  return (
    <select onChange={handleRegencyChange}>
      <option value="">Pilih Kota/Kabupaten</option>
      {regencies.map((regency) => (
        <option key={regency.id} value={regency.id}>
          {regency.name}
        </option>
      ))}
    </select>
  );
};

export default Regencies;