import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import {
  MapPin,
  ShieldAlert,
  ArrowRight,
  Map as MapIcon,
} from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useAuthStore } from '../store/authStore.js';
import { t } from '../lib/i18n.js';

// Custom Pin Icon
const customMarkerIcon = new L.DivIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color:#123B5D; color:#E8B84A; border-radius:6px; width:28px; height:28px; display:flex; align-items:center; justify-content:center; border:2px solid #E8B84A; box-shadow:0 2px 8px rgba(18,59,93,0.3); font-weight:bold; font-size:12px;">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

export const MyLandGISPage: React.FC = () => {
  const { language } = useAuthStore();
  const navigate = useNavigate();

  const [parcels, setParcels] = useState<any[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const [, setLoading] = useState(true);

  const centerPosition: [number, number] = [23.2625, 77.4150];

  useEffect(() => {
    api.searchParcels({})
      .then((res: any) => {
        if (res.success) {
          setParcels(res.data);
          const p1042 = res.data.find((p: any) => p.surveyNumber === '1042');
          if (p1042) setSelectedParcel(p1042);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const projectCorridorCoordinates: [number, number][] = [
    [23.255, 77.405],
    [23.258, 77.435],
    [23.268, 77.436],
    [23.265, 77.404],
  ];

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="soft-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold text-xs shadow-soft">
              <MapIcon className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-[#123B5D] tracking-tight">
              {t('gisTitle', language)}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#667784] mt-1">
            {t('gisSub', language)}
          </p>
        </div>

        {/* Layer Switcher */}
        <div className="flex items-center space-x-1 p-1 bg-[#F8FAFC] border border-[#DDE6EC] rounded-lg self-start sm:self-auto text-xs">
          <button
            onClick={() => setMapType('streets')}
            className={`px-3 py-1.5 font-bold rounded-md transition cursor-pointer ${
              mapType === 'streets'
                ? 'bg-[#123B5D] text-white shadow-soft'
                : 'text-[#667784] hover:text-[#123B5D]'
            }`}
          >
            {t('layerCadastral', language)}
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`px-3 py-1.5 font-bold rounded-md transition cursor-pointer ${
              mapType === 'satellite'
                ? 'bg-[#123B5D] text-white shadow-soft'
                : 'text-[#667784] hover:text-[#123B5D]'
            }`}
          >
            {t('layerSatellite', language)}
          </button>
        </div>
      </div>

      {/* Main GIS View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left GIS Leaflet Canvas (8 cols) */}
        <div className="lg:col-span-8 soft-card overflow-hidden h-[540px] relative">
          <MapContainer
            center={centerPosition}
            zoom={15}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url={
                mapType === 'streets'
                  ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
              }
            />

            {/* Project Acquisition Corridor */}
            <Polygon
              positions={projectCorridorCoordinates}
              pathOptions={{
                color: '#123B5D',
                fillColor: '#123B5D',
                fillOpacity: 0.15,
                weight: 2,
                dashArray: '6, 6',
              }}
            />

            {/* Cadastral Parcels */}
            {parcels.map((p) => {
              const isSelected = selectedParcel?.id === p.id;
              let coords: [number, number][] = [];

              if (p.surveyNumber === '1042') {
                coords = [
                  [23.2610, 77.4130],
                  [23.2640, 77.4130],
                  [23.2640, 77.4170],
                  [23.2610, 77.4170],
                ];
              } else if (p.surveyNumber === '1043') {
                coords = [
                  [23.2610, 77.4170],
                  [23.2640, 77.4170],
                  [23.2640, 77.4210],
                  [23.2610, 77.4210],
                ];
              } else {
                coords = [
                  [23.2580, 77.4130],
                  [23.2610, 77.4130],
                  [23.2610, 77.4170],
                  [23.2580, 77.4170],
                ];
              }

              return (
                <Polygon
                  key={p.id}
                  positions={coords}
                  eventHandlers={{
                    click: () => setSelectedParcel(p),
                  }}
                  pathOptions={{
                    color: isSelected ? '#2E7D5B' : '#123B5D',
                    fillColor: isSelected ? '#2E7D5B' : '#EAF3F8',
                    fillOpacity: isSelected ? 0.45 : 0.25,
                    weight: isSelected ? 3 : 1.5,
                  }}
                />
              );
            })}

            {/* Marker on Selected Parcel */}
            <Marker position={[23.2625, 77.4150]} icon={customMarkerIcon}>
              <Popup>
                <div className="p-1 text-xs">
                  <strong>{t('surveyNo', language)} #{selectedParcel?.surveyNumber || '1042'}</strong>
                  <br />
                  {selectedParcel?.village || 'Rampur'} ({selectedParcel?.recordedAreaHa || '2.43'} ha)
                </div>
              </Popup>
            </Marker>
          </MapContainer>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm border border-[#DDE6EC] p-3 rounded-lg shadow-soft text-xs space-y-1.5">
            <div className="font-bold text-[#123B5D] text-[11px] uppercase tracking-wider">{t('legendTitle', language)}</div>
            <div className="flex items-center space-x-2 text-[#243746]">
              <span className="w-3 h-3 rounded-sm bg-[#2E7D5B]"></span>
              <span>{t('legendNotified', language)}</span>
            </div>
            <div className="flex items-center space-x-2 text-[#243746]">
              <span className="w-3 h-3 rounded-sm bg-[#123B5D]/30 border border-[#123B5D]"></span>
              <span>{t('legendHighway', language)}</span>
            </div>
          </div>
        </div>

        {/* Right Cadastral Parcel Dossier (4 cols) */}
        <div className="lg:col-span-4 soft-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
            <h3 className="text-sm font-bold text-[#123B5D] uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#123B5D]" />
              {t('parcelInfoTitle', language)}
            </h3>
            {selectedParcel && <StatusBadge status={selectedParcel.currentStatus} />}
          </div>

          {selectedParcel ? (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F5FAFC] border border-[#DDE6EC] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#667784]">{t('selectedSurveyNo', language)}:</span>
                  <span className="font-mono font-bold text-[#123B5D]">#{selectedParcel.surveyNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667784]">{t('selectedVillage', language)}:</span>
                  <span className="font-semibold text-[#243746]">{selectedParcel.village}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667784]">{t('selectedDistrict', language)}:</span>
                  <span className="font-semibold text-[#243746]">{selectedParcel.tehsil}, {selectedParcel.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667784]">{t('selectedRecordedArea', language)}:</span>
                  <span className="font-bold text-[#2E7D5B] font-mono">{selectedParcel.recordedAreaHa} ha</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667784]">{t('selectedLandType', language)}:</span>
                  <span className="font-semibold text-[#243746]">{selectedParcel.landType}</span>
                </div>
              </div>

              {selectedParcel.cases?.[0] && (
                <div className="p-3.5 rounded-xl bg-[#FFF9F0] border border-[#E8B84A]/60 space-y-2">
                  <div className="font-bold text-[#123B5D] text-xs">
                    {t('associatedProject', language)}: {selectedParcel.cases[0].project?.name}
                  </div>
                  <div className="text-[11px] text-[#667784]">
                    {t('caseReference', language)}: <strong>#{selectedParcel.cases[0].caseReference}</strong> • {t('currentStage', language)}: <strong>{selectedParcel.cases[0].stage}</strong>
                  </div>
                  <button
                    onClick={() => navigate(`/cases/${selectedParcel.cases[0].id}`)}
                    className="w-full mt-2 py-2 px-3 bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer"
                  >
                    <span>{t('openCaseBtn', language)}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E8B84A]" />
                  </button>
                </div>
              )}

              <button
                onClick={() => navigate(`/grievance/new?survey=${selectedParcel.surveyNumber}`)}
                className="w-full py-2 px-3 bg-white border border-[#DDE6EC] hover:bg-[#F8FAFC] text-[#123B5D] text-xs font-semibold rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer shadow-soft"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#C7972D]" />
                <span>{t('serviceGrievanceTitle', language)}</span>
              </button>
            </div>
          ) : (
            <p className="text-xs text-[#667784]">{t('clickParcelPrompt', language)}</p>
          )}
        </div>
      </div>
    </div>
  );
};
