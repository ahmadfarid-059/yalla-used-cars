"use client";
import Button from "@/components/ui/Button";
import { Car } from "@/types/cars";
import {
  Award,
  CheckCircle,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
function formatPrice(price: number, currency: string): string {
  if (isNaN(price)) return "N/A";
  return `${currency} ${price.toLocaleString()}`;
}
function ContactCard({ car }: { car: Car }) {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <div className="text-center space-y-4">
        {/* Price */}
        <div>
          <p className="text-3xl font-bold text-blue-600">
            {formatPrice(car.price, car.currency)}
          </p>
          <p className="text-gray-600">Final Price</p>
        </div>

        {/* Dealer info */}
        {car.auto_company_logo && (
          <div className="flex justify-center">
            <Image
              src={car.auto_company_logo}
              alt={car.auto_company_name || car.seller_name}
              width={120}
              height={60}
              className="object-contain"
              loading="lazy"
            />
          </div>
        )}

        <div>
          <p className="font-semibold">
            {car.auto_company_name || car.seller_name}
          </p>
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{car.city}</span>
          </div>
        </div>

        {/* Contact buttons */}
        <div className="space-y-3">
          <Button
            title={
              showPhoneNumber && car?.whatsapp_number
                ? String(car?.whatsapp_number) ?? ""
                : "Phone Number"
            }
            Icon={Phone}
            className="w-full py-3"
            onClick={() => setShowPhoneNumber((prev) => !prev)}
          />

          {car.whatsapp_access && (
            <Button
              title="WhatsApp"
              Icon={MessageCircle}
              variant="green"
              className="w-full py-3"
              onClick={() =>
                window.open(`https://wa.me/${car.whatsapp_number}`, "_blank")
              }
            />
          )}
        </div>

        {/* Features */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          {!!car.warranty && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Shield className="w-4 h-4" />
              <span>Warranty Available</span>
            </div>
          )}
          {!!car.is_featured && (
            <div className="flex items-center gap-2 text-sm text-orange-600">
              <Award className="w-4 h-4" />
              <span>Featured Listing</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <CheckCircle className="w-4 h-4" />
            <span>Verified Dealer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
