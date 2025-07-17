# 🚗 YallaMotor - Used Cars Marketplace

A modern, high-performance used cars marketplace built with Next.js 14+ App Router, featuring advanced filtering, SEO optimization, and seamless user experience for car buying and selling in the UAE.

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 15+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Custom hooks for data fetching and state management
- **lucide-react** - Icons library

### UI Components & Icons

- **Lucide React** - Modern icon library
- **Custom UI Components** - Reusable component system
- **Responsive Design** - Mobile-first approach

### Performance & SEO

- **Server Components** - React Server Components for optimal performance
- **Dynamic Metadata** - SEO-optimized meta tags with `generateMetadata`
- **Image Optimization** - Next.js Image component with lazy loading
- **Core Web Vitals** - Optimized for LCP, FID, and CLS

### Data Management

- **Custom Hooks** - `useCars.tsx` for API state management
- **REST API** - Next.js API routes for backend functionality
- **TypeScript Interfaces** - Strongly typed data models

## 📁 Project Structure

```
yallamotor-cars/
├── app/
│   ├── api/
│   │   └── cars/
│   │       ├── route.ts              # Cars API endpoint
│   │       └── [id]/
│   │           └── route.ts          # Single car API
│   ├── used-cars/
│   │   ├── page.tsx                  # Cars listing page
│   │   ├── loading.tsx               # Loading UI
│   │   └── [id]/
│   │       ├── page.tsx              # Car detail page
│   │       ├── loading.tsx           # Detail loading UI
│   │       ├── not-found.tsx         # 404 page
│   │       └── components/
│   │           ├── CarDetails.tsx    # Main car detail component
│   │           ├── CarSpecifications.tsx # Car specs display
│   │           ├── ContactCard.tsx   # Dealer contact info
│   │           └── ImageGallery.tsx  # Image carousel
│   ├── layout.tsx                    # Root layout with navigation
│   ├── page.tsx                      # Homepage
│   └── globals.css                   # Global styles
├── components/
│   ├── ui/
│   │   ├── NavBar.tsx               # Main navigation
│   │   ├── Skeleton.tsx             # Loading skeletons
│   │   └── CarCard.tsx              # Car listing card
│   └── CarsList.tsx                 # Cars grid component
├── hooks/
│   └── useCars.tsx                  # Custom hook for car data
├── lib/
│   └── axios.ts                    # Api Client
|   |__ pagination.ts               # Pagination
├── services/
│   └── CarsService.ts               # API service layer
├── types/
│   └── cars.ts                      # TypeScript interfaces
├── data/
│   ├── data.json                    # Mock/sample data
│   └── helpers/
│       └── data.ts                  # Data helper functions
├── styles/
│   └── globals.css                  # Additional global styles
└── public/
    ├── favicon.ico
    └── assets/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd yallamotor-cars
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run type-check   # TypeScript type checking

# Testing & Quality
npm run test         # Run tests
npm run test:e2e     # End-to-end tests
npm run lighthouse   # Performance audit
```

## 🎯 Key Features

### Navigation & Browsing

- **Dual Navigation Tabs**: Used Cars and Featured Cars sections
- **Advanced Filtering**: Filter by make, model, year, price range, location
- **Responsive Grid Layout**: Optimized for desktop, tablet, and mobile
- **Search Functionality**: Real-time search with debouncing

### Car Detail Pages

- **Image Gallery**: Interactive carousel with thumbnail navigation (5-image display)
- **Comprehensive Specifications**: Engine, transmission, mileage, and features
- **Contact Integration**: Direct dealer contact with phone and WhatsApp
- **SEO Optimized**: Dynamic metadata generation for each car listing

### Performance Features

- **Lazy Loading**: Images load on-demand for better performance
- **Skeleton Loading**: Smooth loading states for better UX
- **Code Splitting**: Automatic route-based code splitting
- **Optimized Images**: Next.js Image component with proper sizing

## ⚡ Performance Optimization

### Core Web Vitals Optimization

#### Largest Contentful Paint (LCP) - Target: < 2.5s

- **Priority Image Loading**: Hero images use `priority` attribute
- **Optimized Image Formats**: WebP format with fallbacks
- **Proper Image Sizing**: Responsive images with `sizes` attribute
- **Font Optimization**: Preloaded fonts and font-display: swap

#### First Input Delay (FID) - Target: < 100ms

- **Server-Side Rendering**: Initial page renders on server
- **Minimal Client JavaScript**: Critical path optimized
- **Progressive Enhancement**: Core functionality works without JS

#### Cumulative Layout Shift (CLS) - Target: < 0.1

- **Fixed Image Dimensions**: Prevents layout shift during image loading
- **Skeleton Loaders**: Maintain layout during content loading
- **CSS Containment**: Layout containment for better performance

### Code Optimization

```tsx
// Example: Optimized CarCard component
const CarCard = memo(({ car, priority, index }: CarCardProps) => {
  return (
    <article className="car-card">
      <Image
        src={car.image}
        alt={`${car.year} ${car.make} ${car.model}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
        priority={index < 3} // Only first 3 images get priority
        placeholder="blur"
        loading={index < 3 ? "eager" : "lazy"}
      />
      {/* Rest of component */}
    </article>
  );
});
```

### Bundle Optimization

- **Dynamic Imports**: Components loaded on-demand
- **Tree Shaking**: Unused code eliminated
- **Minimal Dependencies**: Carefully selected package dependencies
- **CSS Purging**: Unused Tailwind classes removed in production

### Caching Strategy

```tsx
// API caching with Next.js
export async function GET() {
  return fetch("/api/cars", {
    next: {
      revalidate: 300, // Revalidate every 5 minutes
      tags: ["cars"], // For on-demand revalidation
    },
  });
}
```

## 🔍 SEO Implementation

### Dynamic Metadata Generation

```tsx
// Example: Car detail page metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const car = await getCarById(params.id);

  return {
    title: `${car.year} ${car.make} ${car.model} for Sale in ${car.city}`,
    description: `${car.year} ${car.make} ${car.model} for sale. ${car.mileage} km, ${car.fuelType}. Price: ${car.currency} ${car.price}`,
    openGraph: {
      title: `${car.year} ${car.make} ${car.model}`,
      description: `For sale in ${car.city} - ${car.currency} ${car.price}`,
      images: [car.mainImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${car.year} ${car.make} ${car.model}`,
      description: `For sale in ${car.city}`,
      images: [car.mainImage],
    },
  };
}
```

### Structured Data (JSON-LD)

- **Product Schema**: Rich snippets for car listings
- **BreadcrumbList**: Navigation structure
- **Organization Schema**: Business information
- **Review Schema**: Customer ratings and reviews

### URL Structure

```
/                                    # Homepage
/used-cars                          # Cars listing
/used-cars?make=toyota              # Filtered by make
/used-cars?make=toyota&model=camry  # Multiple filters
/used-cars/123                      # Car detail page
```

## 🚨 Known Issues & Solutions

### 1. Client-Side Navigation and `notFound()`

**Issue**: `notFound()` triggers before API request completes in client components

**Cause**: Initial hook state has `car: null` and `loading: false`

**Solution**:

```tsx
// ✅ Fixed implementation
const CarDetails = ({ id }: { id: string }) => {
  const { car, loading, error, response } = useCarDetail(Number(id));

  // Only show loading until hook initializes
  if (loading) return <LoadingSkeleton />;

  // Only trigger notFound for actual 404 responses
  if (response?.status === 404) {
    notFound();
  }

  // Keep loading if no car data yet
  if (!car) return <LoadingSkeleton />;

  return <CarDetailsContent car={car} />;
};
```

### 2. Image Gallery Performance

**Issue**: Loading all car images at once impacts performance

**Solution**: Implemented smart loading strategy

```tsx
// Only show 5 thumbnails: 1 before + current + 3 after
const getVisibleThumbnails = () => {
  if (pictures.length <= 5) return pictures;

  const visible = [];
  const prevIndex = (currentIndex - 1 + pictures.length) % pictures.length;
  visible.push(pictures[prevIndex]); // 1 before
  visible.push(pictures[currentIndex]); // current

  // 3 after current
  for (let i = 1; i <= 3; i++) {
    const nextIndex = (currentIndex + i) % pictures.length;
    visible.push(pictures[nextIndex]);
  }

  return visible;
};
```

### 3. Hydration Mismatches

**Issue**: Server and client render differently for dynamic content

**Solution**: Consistent data fetching and loading states

```tsx
// Consistent loading pattern
export default function CarsList({ initialData }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingSkeleton />;
  }

  return <CarsGrid data={initialData} />;
}
```

### 4. generateMetadata API Calls

**Issue**: API calls in `generateMetadata` can fail and break the page

**Solution**: Comprehensive error handling

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  try {
    const car = await getCarById(params.id);
    if (!car) return getNotFoundMetadata();
    return buildCarMetadata(car);
  } catch (error) {
    console.error("Metadata generation failed:", error);
    return getFallbackMetadata(params.id);
  }
}
```

## 🔧 Development Tips

### Local Development Workflow

1. **Start dev server**: `npm run dev`
2. **Check TypeScript**: `npm run type-check`
3. **Lint code**: `npm run lint`
4. **Test performance**: Open DevTools → Lighthouse

### Debugging API Issues

```tsx
// Add debug logging in development
if (process.env.NODE_ENV === "development") {
  console.log("API Response:", { car, loading, error, response });
}
```

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** iOS 14+
- **Chrome Mobile** Android 8+

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow TypeScript conventions**
4. **Test your changes locally**
5. **Commit with clear messages**: `git commit -m 'Add: amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open Pull Request**

### Code Style Guidelines

- Use **TypeScript** for all new components
- Follow **Tailwind CSS** utility patterns
- Write **descriptive component names**
- Add **proper TypeScript interfaces**
- Include **error handling** for API calls

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check component files for inline documentation
- **Issues**: Report bugs via GitHub Issues
- **Questions**: Use GitHub Discussions
- **Email**: dev@yallamotor.com

---

**Built with ❤️ using Next.js 14, TypeScript, and modern web technologies**

_Last updated: 2024_
