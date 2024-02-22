import { useState } from 'react';
import Provinces from "./components/Provinces";
import Regencies from "./components/Regencies";
import Districts from "./components/Districts";
import Villages from "./components/Villages";

interface Province {
  id: string;
  name: string;
}

interface Regency {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
}

interface Village {
  id: string;
  name: string;
}

function App() {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedRegency, setSelectedRegency] = useState<Regency | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [selectedAll, setSelectedAll] = useState<any | null>(null);

  const handleProvinceSelect = (province: Province | null) => {
    setSelectedProvince(province);
    setSelectedRegency(null);
    setSelectedDistrict(null);
    setSelectedVillage(null);
  };

  const handleSelectAll = () => {
    setSelectedAll({
      province: selectedProvince,
      regency: selectedRegency,
      district: selectedDistrict,
      village: selectedVillage
    });
  };

  const isAllDataSelected = selectedProvince && selectedRegency && selectedDistrict && selectedVillage;

  return (
    <div>
      <h1>Data Wilayah Indonesia</h1>
      <h2>Provinsi</h2>
      <Provinces onProvinceSelect={handleProvinceSelect} />
      {selectedProvince && (
        <div>
          <h2>Kabupaten</h2>
          <Regencies provinceId={selectedProvince.id} onRegencySelect={setSelectedRegency} />
        </div>
      )}
      {selectedRegency && (
        <div>
          <h2>Kecamatan</h2>
          <Districts regencyId={selectedRegency.id} onDistrictSelect={setSelectedDistrict} />
        </div>
      )}
      {selectedDistrict && (
        <div>
          <h2>Kelurahan</h2>
          <Villages districtId={selectedDistrict.id} onVillageSelect={setSelectedVillage} />
        </div>
      )}
      {isAllDataSelected && (
        <div>
          <br></br>
          <button onClick={handleSelectAll}>Tampilkan Semua Data</button>
        </div>
      )}
      {selectedAll && (
        <div>
          <h2>Hasil</h2>
          <p>Provinsi : {selectedAll.province.name}</p>
          <p>Kabupaten : {selectedAll.regency.name}</p>
          <p>Kecamatan : {selectedAll.district.name}</p>
          <p>Desa/Kelurahan : {selectedAll.village.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;