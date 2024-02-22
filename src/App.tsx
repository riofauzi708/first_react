import { useState } from 'react';
import Provinces from "./components/Provinces";
import Regencies from "./components/Regencies";
import Districts from "./components/Districts";
import Villages from "./components/Villages";
import './index.css';

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
    setSelectedAll(null);
  };

  const handleRegencySelect = (regency: Regency | null) => {
    setSelectedRegency(regency);
    setSelectedDistrict(null);
    setSelectedVillage(null);
    setSelectedAll(null);
  };

  const handleDistrictSelect = (district: District | null) => {
    setSelectedDistrict(district);
    setSelectedVillage(null);
    setSelectedAll(null);
  };

  const handleVillageSelect = (village: Village | null) => {
    setSelectedVillage(village);
    setSelectedAll(null);
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
    <div className='bg-white max-sm:w-32'>
    <div className="bg-slate-300 py-10 my-20 mx-40 rounded-lg">
      <h1 className="container max-sm:w-52 pb-10 text-4xl font-bold text-center mx-auto bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-red-100">DATA WILAYAH INDONESIA</h1>
      <div className="bg-white rounded-lg mx-auto w-96">
        <div className="shadow-lg p-4 mb-4">
        <h2 className="text-lg font-bold mb-2">Provinsi</h2>
        <div>
          <Provinces onProvinceSelect={handleProvinceSelect} />
          </div>
        </div>
        {selectedProvince && (
          <div className="shadow-lg p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Kabupaten</h2>
            <div className="w-64">
              <Regencies provinceId={selectedProvince.id} onRegencySelect={handleRegencySelect} />
            </div>
          </div>
        )}
        {selectedRegency && (
          <div className="shadow-lg p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Kecamatan</h2>
            <div className="w-64">
              <Districts regencyId={selectedRegency.id} onDistrictSelect={handleDistrictSelect} />
            </div>
          </div>
        )}
        {selectedDistrict && (
          <div className="shadow-lg p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Kelurahan</h2>
            <Villages districtId={selectedDistrict.id} onVillageSelect={handleVillageSelect} />
          </div>
        )}
        {isAllDataSelected && (
          <div className="shadow-lg p-4 flex justify-end">
          <button className="bg-black text-white px-4 py-2 rounded-md" onClick={handleSelectAll}>
            Tampilkan Semua Data
          </button>
        </div>
        )}
        {selectedAll && (
          <div className="shadow-lg p-4 mt-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Hasil</h2>
            <p>Provinsi: {selectedAll.province.name}</p>
            <p>Kabupaten: {selectedAll.regency.name}</p>
            <p>Kecamatan: {selectedAll.district.name}</p>
            <p>Desa/Kelurahan: {selectedAll.village.name}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;