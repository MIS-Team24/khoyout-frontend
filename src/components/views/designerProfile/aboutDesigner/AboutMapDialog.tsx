import { Dialog, DialogContent } from "@/components/ui";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { markerImg, markerShadow } from "@/assets";
import { MapPin } from "lucide-react";

const legalIcon = new Icon({
  iconUrl: markerImg,
  shadowUrl: markerShadow,
  shadowSize: [40, 40],
  iconSize: [40, 40],
  iconAnchor: [18, 38],
  shadowAnchor: [12, 40],
  popupAnchor: [0, -40],
});

const position: [number, number] = [31.214457, 29.994616];

type AboutMapDialogProps = {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
  location?: [number, number];
};

export default function AboutMapDialog({
  isOpen,
  onChange,
  location,
}: AboutMapDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="z-[100] min-h-[90%] w-full max-w-[90%] overflow-hidden !rounded !px-0 pb-0">
        <div>
          <div className="-mt-3 ml-5 flex items-center gap-x-2 pb-2 font-medium">
            <MapPin size={18} className="mb-0.5" />
            <p>84 Omar Lotfy st., El Ibrahimeya, Alexandria</p>
          </div>
          <MapContainer
            className="z-[50] h-full w-full"
            center={location ?? position}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location ?? position} icon={legalIcon} />
          </MapContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}
