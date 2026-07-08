"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  Smartphone, 
  ShoppingBag, 
  Cpu, 
  CreditCard, 
  Zap, 
  Settings, 
  DollarSign, 
  CalendarRange, 
  Calculator,
  ArrowRight,
  LayoutGrid,
  Box
} from "lucide-react";

export interface EstimatorData {
  hasEstimate: boolean;
  projectType: string;
  screens: number;
  addOns: string;
  budget: string;
  timeline: string;
  projectActualPrice?: string;
  discount?: string;
  screensPrice?: string;
  addOnsPrice?: string;
}

interface ProjectType {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  baseScreens: number;
  baseWeeks: number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: "landing",
    name: "Landing Page",
    basePrice: 150,
    description: "High-conversion single-page marketing or campaign website.",
    baseScreens: 1,
    baseWeeks: 1,
    icon: Layers,
  },
  {
    id: "webapp",
    name: "SaaS / Full Stack App",
    basePrice: 600,
    description: "Scalable, end-to-end full stack web application with user dashboard.",
    baseScreens: 6,
    baseWeeks: 4,
    icon: LayoutGrid,
  },
  {
    id: "mobile",
    name: "Mobile App (iOS/Android)",
    basePrice: 750,
    description: "Cross-platform mobile application built with React Native & Expo.",
    baseScreens: 8,
    baseWeeks: 7,
    icon: Smartphone,
  },
  {
    id: "ecommerce",
    name: "E-Commerce Store",
    basePrice: 400,
    description: "Shopify Custom Liquid or Next.js store with checkout integration.",
    baseScreens: 5,
    baseWeeks: 5,
    icon: ShoppingBag,
  },
  {
    id: "ai",
    name: "AI Integration & Agents",
    basePrice: 400,
    description: "Intelligent web agents, LLM automation flows, or AI chatbot helpers.",
    baseScreens: 4,
    baseWeeks: 5,
    icon: Cpu,
  },
  {
    id: "threed",
    name: "3D Site",
    basePrice: 250,
    description: "Immersive 3D interactive web experiences using WebGL/Three.js/Spline.",
    baseScreens: 3,
    baseWeeks: 3,
    icon: Box,
  },
];

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const ADD_ONS: AddOn[] = [
  {
    id: "ai",
    name: "AI Personalization Engine",
    price: 150,
    description: "Add user recommendations, semantic search, or advanced NLP filters.",
    icon: Cpu,
  },
  {
    id: "payments",
    name: "Payment Integration",
    price: 100,
    description: "Add subscription billing, shopping carts, and Stripe checkout.",
    icon: CreditCard,
  },
  {
    id: "cms",
    name: "CMS Content Manager",
    price: 150,
    description: "WordPress/Shopify admin backend or custom dashboard integration.",
    icon: Layers,
  },
  {
    id: "rush",
    name: "Priority Rush Delivery",
    price: 100,
    description: "Accelerate your project schedule by 35% - 50% priority support.",
    icon: Zap,
  },
];

interface PricingEstimatorProps {
  onProceed: (data: EstimatorData) => void;
}

export default function PricingEstimator({ onProceed }: PricingEstimatorProps) {
  const [selectedType, setSelectedType] = useState<ProjectType>(PROJECT_TYPES[1]); // SaaS app by default
  const [screens, setScreens] = useState<number>(6);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  // Update screens range when project type changes
  useEffect(() => {
    setScreens(selectedType.baseScreens);
  }, [selectedType]);

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  // Calculations
  const basePrice = selectedType.basePrice;
  const discount = basePrice * 0.5;
  const discountedBasePrice = basePrice - discount;
  const extraScreens = Math.max(0, screens - selectedType.baseScreens);
  const screensCost = extraScreens * 50;
  
  const addOnsCost = selectedAddOns.reduce((total, addOnId) => {
    const addOn = ADD_ONS.find((a) => a.id === addOnId);
    return total + (addOn ? addOn.price : 0);
  }, 0);

  const minPrice = discountedBasePrice + screensCost + addOnsCost;
  const maxPrice = Math.round(minPrice * 1.2); // 20% variance range

  // Timeline calculations
  const isRush = selectedAddOns.includes("rush");
  
  let timelineString = "";
  if (selectedType.id === "landing") {
    let minDays = 7;
    let maxDays = 10;
    
    // Add extra days for extra screens
    minDays += extraScreens * 2;
    maxDays += extraScreens * 3;
    
    // Add time for add-ons (except rush)
    const activeAddonsCount = selectedAddOns.filter(id => id !== "rush").length;
    minDays += activeAddonsCount * 1;
    maxDays += activeAddonsCount * 2;

    if (isRush) {
      minDays = Math.max(4, Math.round(minDays * 0.6));
      maxDays = Math.max(6, Math.round(maxDays * 0.6));
    }
    timelineString = `${minDays}-${maxDays} Days`;
  } else {
    // For other types in weeks
    let minWeeks = selectedType.id === "webapp" ? 3 : selectedType.id === "mobile" ? 6 : selectedType.id === "threed" ? 2 : 4; // webapp: 3-5, mobile: 6-9, threed: 2-4, ecommerce/ai: 4-6
    let maxWeeks = selectedType.id === "webapp" ? 5 : selectedType.id === "mobile" ? 9 : selectedType.id === "threed" ? 4 : 6;
    
    // Add time for extra screens
    const screensAddition = Math.ceil(extraScreens / 3);
    minWeeks += screensAddition;
    maxWeeks += screensAddition;

    // Add time for add-ons (except rush)
    const activeAddonsCount = selectedAddOns.filter(id => id !== "rush").length;
    minWeeks += Math.ceil(activeAddonsCount * 0.5);
    maxWeeks += Math.ceil(activeAddonsCount * 0.5);

    if (isRush) {
      minWeeks = Math.max(2, Math.round(minWeeks * 0.65));
      maxWeeks = Math.max(3, Math.round(maxWeeks * 0.65));
    }
    timelineString = `${minWeeks}-${maxWeeks} Weeks`;
  }

  const handleProceedClick = () => {
    const activeAddOnNames = selectedAddOns
      .map(id => ADD_ONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    onProceed({
      hasEstimate: true,
      projectType: selectedType.name,
      screens: screens,
      addOns: activeAddOnNames || "None",
      budget: `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()} USD`,
      timeline: timelineString,
      projectActualPrice: `$${basePrice.toLocaleString()} USD`,
      discount: `-$${discount.toLocaleString()} USD (50% Off)`,
      screensPrice: extraScreens > 0 ? `+$${screensCost.toLocaleString()} USD` : "$0 USD (Base included)",
      addOnsPrice: `+$${addOnsCost.toLocaleString()} USD`,
    });
  };

  return (
    <section className="section" id="estimator">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "50px" }} className="reveal visible">
          <p className="section-label">Interactive Quote</p>
          <h2 className="section-title">
            Scope & <span className="gradient-text">Pricing Estimator</span>
          </h2>
          <p className="section-sub" style={{ margin: "16px auto 0" }}>
            Design your project scope below in real-time. Transparent estimation with zero surprises.
          </p>
        </div>

        <div className="estimator-grid">
          {/* Left panel: Inputs */}
          <div className="estimator-inputs">
            {/* Step 1: Project Type */}
            <div className="estimator-step card-glow reveal visible">
              <div className="step-header">
                <span className="step-num">01</span>
                <div>
                  <h3 className="step-title">Select Base Project Type</h3>
                  <p className="step-desc">Choose the primary platform for your product.</p>
                </div>
              </div>

              <p className="pricing-disclaimer-india" style={{ marginTop: 0, marginBottom: "15px" }}>
                🇮🇳 <strong>For Indian Clients & Startups:</strong> Special localized rates are available. We can discuss and negotiate the final price to fit your budget!
              </p>

              <div className="discount-notice-box" style={{ 
                background: "rgba(124, 58, 237, 0.08)", 
                border: "1px solid rgba(124, 58, 237, 0.25)", 
                borderRadius: "12px", 
                padding: "12px 16px", 
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "12px"
              }}>
                <span style={{ fontSize: "16px" }}>🔥</span>
                <p style={{ margin: 0, color: "var(--white)", lineHeight: "1.4" }}>
                  <strong>50% Special Discount Applied!</strong> The discount is applied directly to the base project price (add-ons and screen upgrades are regular price).
                </p>
              </div>

              <div className="type-cards-grid">
                {PROJECT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type)}
                      className={`type-card glass card-glow ${isSelected ? "active" : ""}`}
                      data-hover
                    >
                      <div className="type-card-accent" />
                      <div className="type-icon-wrap">
                        <Icon size={22} />
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div className="type-name">{type.name}</div>
                        <div className="type-cost">Starts at ${type.basePrice.toLocaleString()}</div>
                        <p className="type-info">{type.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Screen scale slider */}
            <div className="estimator-step card-glow reveal visible" style={{ marginTop: "40px" }}>
              <div className="step-header">
                <span className="step-num">02</span>
                <div>
                  <h3 className="step-title">Define Scale & Pages</h3>
                  <p className="step-desc">How many unique views, dashboards, or subpages does it need?</p>
                </div>
              </div>

              <div className="glass slider-box card-glow">
                <div className="slider-labels">
                  <span>Screens & Subpages</span>
                  <span className="slider-counter gradient-text">{screens} screens</span>
                </div>
                
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={screens}
                  onChange={(e) => setScreens(Number(e.target.value))}
                  className="estimator-slider"
                />
                
                <div className="slider-helper">
                  <span>Base includes {selectedType.baseScreens} screens</span>
                  {extraScreens > 0 && (
                    <span style={{ color: "var(--emerald)" }}>
                      +{extraScreens} extra screens (+${screensCost})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div className="estimator-step card-glow reveal visible" style={{ marginTop: "40px" }}>
              <div className="step-header">
                <span className="step-num">03</span>
                <div>
                  <h3 className="step-title">Choose Add-Ons & Features</h3>
                  <p className="step-desc">Supercharge your product with custom features and priority timelines.</p>
                </div>
              </div>

              <div className="addons-grid">
                {ADD_ONS.map((addon) => {
                  const Icon = addon.icon;
                  const isSelected = selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`addon-card glass card-glow ${isSelected ? "active" : ""}`}
                      data-hover
                    >
                      <div className="addon-check">
                        <div className={`addon-check-inner ${isSelected ? "checked" : ""}`} />
                      </div>
                      <div className="addon-icon-wrap">
                        <Icon size={18} />
                      </div>
                      <div style={{ textAlign: "left", flexGrow: 1 }}>
                        <div className="addon-meta">
                          <span className="addon-name">{addon.name}</span>
                          <span className="addon-price">+${addon.price}</span>
                        </div>
                        <p className="addon-desc">{addon.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right panel: Summary Sticky Card */}
          <div className="estimator-summary-wrap">
            <div className="glass summary-sticky-card card-glow">
              <div className="summary-header">
                <Calculator size={22} className="summary-calc-icon" />
                <h3>Quote Summary</h3>
              </div>

              <div className="summary-divider" />

              <div className="summary-details">
                {/* 1. Project actual price */}
                <div className="summary-line">
                  <span>Project Base Price ({selectedType.name})</span>
                  <span className="font-mono">${basePrice.toLocaleString()}</span>
                </div>

                {/* 2. Discount on that (50% off) */}
                <div className="summary-line text-emerald">
                  <span>50% Special Discount</span>
                  <span className="font-mono">-${discount.toLocaleString()}</span>
                </div>
                
                {/* 3. Screens count and screens price */}
                <div className="summary-line">
                  <span>Screens ({screens} total)</span>
                  <span>{extraScreens > 0 ? `${extraScreens} extra` : "Base included"}</span>
                </div>
                {extraScreens > 0 && (
                  <div className="summary-line sub-line font-mono">
                    <span>↳ Additional Screen Price</span>
                    <span>+${screensCost.toLocaleString()}</span>
                  </div>
                )}

                {/* 4. Add-ons price */}
                <div className="summary-line">
                  <span>Custom Add-Ons</span>
                  <span>{selectedAddOns.length} selected</span>
                </div>

                {selectedAddOns.map((id) => {
                  const addOn = ADD_ONS.find(a => a.id === id);
                  if (!addOn) return null;
                  return (
                    <div key={id} className="summary-line sub-line font-mono">
                      <span>↳ {addOn.name}</span>
                      <span>+${addOn.price.toLocaleString()}</span>
                    </div>
                  );
                })}
                {selectedAddOns.length > 0 && (
                  <div className="summary-line sub-line font-mono" style={{ fontWeight: 600 }}>
                    <span>↳ Add-Ons Total Cost</span>
                    <span>+${addOnsCost.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="summary-divider" />

              {/* 5. Total price */}
              <div className="result-price-box">
                <div className="result-label">Total Estimated Price (50% Off Applied)</div>
                <div className="result-value gradient-text">
                  ${minPrice.toLocaleString()} – ${maxPrice.toLocaleString()}
                </div>
                <div className="result-currency">USD (Project Rate)</div>
                <p style={{ fontSize: "10.5px", color: "var(--muted)", marginTop: "8px", lineHeight: "1.4" }}>
                  *Note: 50% discount is applied only to the base project price. Extra screens and custom add-ons are regular price.
                </p>
              </div>

              <div className="result-meta-grid">
                <div className="result-meta-card card-glow">
                  <CalendarRange size={16} className="text-violet" />
                  <div>
                    <div className="meta-lbl">Duration</div>
                    <div className="meta-val">{timelineString}</div>
                  </div>
                </div>
                <div className="result-meta-card card-glow">
                  <Zap size={16} className="text-emerald" />
                  <div>
                    <div className="meta-lbl">Warranty</div>
                    <div className="meta-val">30 Days Included</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleProceedClick}
                className="btn-primary btn-glow start-project-btn" 
                data-hover
              >
                <span>Proceed with Estimate</span>
                <ArrowRight size={16} />
              </button>

              <p className="pricing-disclaimer-india">
                🇮🇳 <strong>For Indian Clients & Startups:</strong> Special localized rates are available. We can discuss and negotiate the final price to fit your budget!
              </p>

              <p className="pricing-disclaimer">
                *Estimate calculations are based on standard design and development specifications. Final proposal pricing is fixed-cost upon scoping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
