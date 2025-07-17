import { PaginationMeta } from "@/lib/pagination";

export interface Car {
  // Basic car information
  id: number;
  used_car_id: number;
  ad_id: number;
  title: string;
  title_ar: string;
  subtitle: string;
  full_name: string;
  slug: string;

  // Make and Model
  make: string;
  make_ar: string;
  make_title: string;
  make_name: string;
  make_en_title: string;
  make_id: number;
  make_country_name: string;
  model: string;
  model_title: string;
  model_name: string;
  model_en_title: string;
  model_id: number;
  car_make_id: number;
  car_model_id: number;
  car_version_id: number | null;
  parent_car_model_id: number | null;

  // Vehicle specifications
  year: number;
  price: number;
  emi_price: number;
  export_price: number | null;
  currency: string;
  km_driven: number;
  engine_cc: number;
  horsepower: number;
  cylinders: string;
  doors: string;
  seats: number;

  // Vehicle details
  body_style: string;
  fuel_type: string;
  transmission_type: string;
  drive_type: number;
  exterior_color: string;
  interior_color: number;
  regional_specs: number;

  // Condition and history
  car_condition: number;
  body_condition: string;
  mechanical_condition: string;
  accident_history: number;
  service_history: boolean;
  number_of_owners: number;
  after_market_modifications: string | null;

  // Location
  city: string;
  city_name: string;
  city_id: number;
  country: string;
  place_id: number;
  area_id: number;
  location: string;
  longitude: number;
  latitude: number;

  // Description and features
  description: string;
  picture_title: string;

  // Feature flags (bitwise)
  safety: number;
  comfort: number;
  windows: number;
  sound_system: number;
  addons_extras: number;
  misc: number;

  // Seller information
  seller_type: string;
  seller_name: string;
  user_id: number;
  auto_company_id: number;
  auto_company_branch_id: number;
  auto_company_name: string;
  auto_company_address: string;
  auto_company_logo: string;
  auto_company_show_logo: boolean;
  auto_company_oktium_key: string;
  international_dealer: boolean;
  is_oem_agency: boolean;

  // Contact information
  mobile: number;
  landline_number: number;
  whatsapp_number: string;
  whatsapp_access: boolean;
  whatsapp_tracking: boolean;
  whatsapp_click: string | null;
  show_whatsapp_access: string;

  // Media
  pictures: string[];
  pictures_count: number;
  videos_count: number | null;
  has_pic: number;
  thumb_picture: string;
  slideshow_picture: string;
  mobile_listing_main: string;
  three_sixty_url: string | null;
  video_url: number;

  // URLs and links
  complete_url: string;
  used_car_complete_url: string;
  external_link: string;
  oem_cta_text: string | null;
  oem_cta_link: string | null;

  // Status and visibility
  status: string;
  export_status: string | null;
  package_type: string;
  locale: string;
  classifier: number;
  ad_classifier: number;
  car_category: number;
  performance_category: string | null;

  // Pricing and negotiation
  price_negotiable: number;
  price_hidden: boolean;
  hide_price_history: boolean;
  price_valuation_dealdrive: number | null;

  // Badges and features
  badges: number;
  urgent_badge: boolean;
  warranty_badge: boolean;
  finance_available_badge: boolean;
  available_for_rent_badge: boolean;
  gcc_standard_badge: boolean;
  is_featured: boolean;
  is_cpo: number;

  // Featured and promotion
  featured: number;
  featured_by: number;
  featured_till: string | null;
  featured_at: string | null;

  // Analytics and tracking
  views: number;
  phone_views: number;
  sms_sent: number;
  last_viewed: number;
  conversation_count: number | null;
  number_of_contacts: string | null;

  // Timestamps
  posted: number;
  updated: number;
  created_at: string;
  updated_at: string;
  activated_at: string;
  bumped_at: string;
  schedule_bumped_at: string | null;
  last_emailed: string | null;
  payment_at: string | null;

  // System fields
  sphinx_internal_id: number;
  sphinx_internal_class: string;
  sphinx_deleted: number;
  reference_no: number;
  scraped_record_original_id: string;

  // Warranty
  warranty: number;
  warranty_terms: number;
  warranty_date: string | null;

  // Import/Export
  title_for_import: string;
  import_country_list: string | null;
  enable_import_country: string | null;

  // Process tracking
  completed_steps: number;
  created_by: string | null;
  updated_by: string | null;

  // Additional features
  suggestions_tags: string | null;
  issues: number;
  hide_last_updated: boolean;
  is_refreshed: boolean;
  refresh_count: number;

  // Payment
  payment_gateway_id: string | null;
  payment_status: string | null;
  payment_merchant_reference: string | null;

  // Third-party integrations
  carzaty_offer_map: string | null;
  carzaty_offer_price: string | null;
  carzaty_query_id: string | null;
  carzaty_trim_id: string | null;
  is_shared_to_carswitch: boolean;

  // User feedback
  user_rating: number | null;
  user_experience: string | null;

  // Navigation
  gmaps: string | null;

  // Pagination (when returned in lists)
  total_pages: number;
  total_entries: number;

  // Miscellaneous
  delta: number;
  mobile_verification: string;
  used_cars_stats: number;
  associated_data: any | null;
}

export interface ApiDataStructure {
  status: number;
  message: string | null;
  data: {
    page_total: number;
    per_page: number;
    total_entries: number;
    used_cars: Car[];
    featured_used_cars: Car[];
    export_used_cars: Car[];
    // Other metadata
    [key: string]: any;
  };
}

export interface CarsListResponse {
  status: number;
  message: string | null;
  data: {
    used_cars: Car[];
    pagination: PaginationMeta;
    page_total: number;
    per_page: number;
    total_entries: number;
    filters?: Record<string, any>;
    filterStats?: {
      totalCars: number;
      makes: string[];
      cities: string[];
      fuelTypes: string[];
      bodyStyles: string[];
      priceRange: {
        min: number;
        max: number;
        average: number;
      };
      yearRange: {
        min: number;
        max: number;
      };
    };
    meta?: Record<string, any>;
  };
}

export interface CarDetailResponse {
  status: number;
  message: string | null;
  data: {
    car: Car;
    relatedCars: Car[];
    sameDealerCars: Car[];
    stats: {
      similarCarsCount: number;
      averagePrice: number;
      averageMileage: number;
      priceComparison: "below_average" | "average" | "above_average";
      mileageComparison: "below_average" | "average" | "above_average";
    };
    meta: {
      retrieved_at: string;
      related_cars_count: number;
      same_dealer_cars_count: number;
      has_similar_cars: boolean;
    };
  };
}

export interface SearchResponse {
  status: number;
  message: string | null;
  data: {
    used_cars: Car[];
    pagination: PaginationMeta;
    searchQuery: string;
    suggestions: string[];
    filters: Record<string, any>;
    sortBy: string;
    sortOrder: string;
    meta: {
      searchPerformed: boolean;
      filtersApplied: number;
      totalResults: number;
      executionTime: number;
    };
  };
}

export interface CarsFilters {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  city?: string;
  fuelType?: string;
  transmissionType?: string;
  bodyStyle?: string;
  sortBy?: "price" | "year" | "km_driven" | "updated";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  featured?: boolean;
}
