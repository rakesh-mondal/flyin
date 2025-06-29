import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SearchPage from './pages/Search';
import SlidingNumberDemo from './components/ui/SlidingNumberDemo';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import PaymentConfirmation from './pages/PaymentConfirmation';
import Curation from './pages/Curation';
import LanguageDemo from './pages/LanguageDemo';

function App() {
  // Create a client instance inside the component to avoid hooks being called at the module level
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/curation" element={<Curation />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
            <Route path="/sliding-number-demo" element={<SlidingNumberDemo />} />
            <Route path="/language-demo" element={<LanguageDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
