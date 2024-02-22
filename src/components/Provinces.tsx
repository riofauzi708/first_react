import { useEffect, useState } from "react";

interface Province {
  id: string;
  name: string;
}

interface ProvincesProps {
  onProvinceSelect: (province: Province | null) => void;
}

const Provinces = ({ onProvinceSelect }: ProvincesProps) => {
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((response) => response.json())
      .then((data: Province[]) => {
        setProvinces(data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selected = provinces.find((province) => province.id === selectedId);
    onProvinceSelect(selected || null);
  };

  return (
    <select onChange={handleProvinceChange}>
      <option value="">Pilih Provinsi</option>
      {provinces.map((province) => (
        <option key={province.id} value={province.id}>
          {province.name}
        </option>
      ))}
    </select>
  );
};

export default Provinces;