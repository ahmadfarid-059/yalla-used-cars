import { Car } from "@/types/cars";
import { Calendar, Car as CarIcon, Fuel, Gauge, Settings } from "lucide-react";

const generateSpecifications = (car: Car) => {
  return [
    { label: "Year", value: car.year, icon: Calendar, color: "" },
    {
      label: "Mileage",
      value: `${car.km_driven.toLocaleString()} km`,
      icon: Gauge,
      color: "",
    },
    { label: "Fuel Type", value: car.fuel_type, icon: Fuel, color: "" },
    {
      label: "Transmission",
      value: car.transmission_type,
      icon: Settings,
      color: "",
    },
    { label: "Engine", value: `${car.engine_cc}cc`, icon: CarIcon, color: "" },
    { label: "Body Style", value: car.body_style, icon: CarIcon, color: "" },
    {
      label: "Color",
      value: car.exterior_color,
      icon: null,
      color: "text-primary",
    },
    { label: "Doors", value: car.doors, icon: null, color: "" },
    { label: "Seats", value: car.seats, icon: null, color: "" },
    {
      label: "Specs",
      value: car.regional_specs ? "GCC" : "Imported",
      icon: null,
      color: "",
    },
  ].filter((spec) => spec.value);
};

function CarSpecifications({ car }: { car: Car }) {
  const specs = generateSpecifications(car);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <CarIcon className="w-5 h-5 text-primary" />
        Vehicle Highlights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
          >
            {spec.icon && <spec.icon className="w-5 h-5 text-gray-600" />}
            <div>
              <span className="text-sm text-gray-600">{spec.label}</span>
              <p className={`font-semibold ${spec.color}`}>{spec.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarSpecifications;
